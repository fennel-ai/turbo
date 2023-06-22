import { useCallback, useState } from 'react';
import { LinkButton, Syntax } from 'ui';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Diagram.module.scss';
import useResizeObserver from 'use-resize-observer';

import Grid from './Grid';
import Sources from './Sources';
import Datasets from './Datasets';
import DerivedDatasets from './DerivedDatasets';
import Features from './Features';
import SourceConnectors from './SourceConnectors';
import RestAPI from './RestAPI';
import LookupEdges from './LookupEdges';
import APIQueryEdges from './APIQueryEdges';
import PipelineEdges from './PipelineEdges';
import clsx from 'clsx';

const SVG_VARIANTS = {
	shown: {
		scale: 0.9,
		opacity: 0.5,
	},
	hidden: {
		scale: 1,
		opacity: 1,
	}
}

const SNIPPETS: Record<string, { language: string, code: string }> = {
	"0": {
		language: 'python',
		code: `postgres = Postgres(host=...<credentials>...)
kafka = Kafka(...<credentials>...)


@dataset
@source(postgres.table("user_info", cursor="signup_time"), every="1m")
@meta(owner="data-oncall@fennel.ai", tags=["PII"])
class User:
    uid: int = field(key=True)
    dob: datetime
    country: str
    signup_time: datetime = field(timestamp=True)


@dataset
@source(kafka.topic('transactions'))
@meta(owner="chris@fennel.ai")
class Transaction:
    uid: int
    amount: float
    payment_country: str
    merchant_id: int
    timestamp: datetime`
	},
	"1": {
		language: 'python',
		code: `meta(owner="ahmed@fennel.ai")
@dataset
class UserTransactionsAbroad:
    uid: int = field(key=True)
    amount_1d: float
    amount_1w: float
    timestamp: datetime

    @pipeline(version=1)
    @inputs(User, Transaction)
    def first_pipeline(cls, user: Dataset, transaction: Dataset):
        joined = transaction.left_join(user, on=["uid"])
        abroad = joined.filter(lambda df: df["country"] != df["payment_country"])
        return abroad.groupby("uid").aggregate([
           Sum(of="amount", window=Window("1d"), into_field="amount_1d"),
           Sum(of="amount", window=Window("1w"), into_field="amount_1w"),
        ])`
	},
	"2": {
		language: 'python',
		code: `@featureset
class UserFeature:
    uid: int = feature(id=1)
    age: float = feature(id=2)

    @extractor
    @inputs(uid)
    @outputs(age)
    def get_age(cls, ts: pd.Series, uids: pd.Series):
        dobs = User.lookup(ts=ts, uid=uids, fields=["dob"])
        ages = [dob - datetime.now() for dob in dobs]
        return pd.Series(ages)`
	},
	"3": {
		language: 'bash',
		code: `$ fennel=<SOME_URL_INSIDE_YOUR_VPC>

$ curl -X POST "$fennel/api/v1/extract_features" \
  -H "content-type: application/json" \
  -H "Authorization: Bearer REDACTED" \
  -d '{
    "output_features": ["UserFeature.age", "UserFeature.uid"],
    "input_features": ["UserFeature.uid"],
    "data": [
      {"UserFeature.uid": 1},
      {"UserFeature.uid": 2},
      {"UserFeature.uid": 3},
    ],
  }'


# features are returned as json
[
  { "UserFeature.age": 21, "UserFeature.uid": 1},
  { "UserFeature.age": 23, "UserFeature.uid": 2},
  { "UserFeature.age": 48, "UserFeature.uid": 3},
]`
	},
}

const DAG = ({ activeItem = "0" }: { activeItem: string }) => {
	const [showCode, setShowCode] = useState<boolean>(false);
	const { ref, width, height } = useResizeObserver();

	const onShowCode = useCallback(() => {
		setShowCode(prev => !prev);
	}, []);

	return (
		<div className={styles.root}>
			<motion.svg animate={showCode ? 'shown' : 'hidden'} variants={SVG_VARIANTS} ref={ref} className={styles.diagram} width="740" height="453" viewBox="0 0 740 453" fill="none" xmlns="http://www.w3.org/2000/svg">
				<motion.g animate={`${activeItem}`} clip-path="url(#clip0_522_11836)">
					<Grid />

					{/** Write Path Label */}
					<g filter="url(#filter0_b_522_11836)">
						<rect width="96" height="32" transform="translate(325 1)" fill="white" fill-opacity="0.95" />
						<path d="M334.72 22L331.71 11.878H333.138L334.986 18.066C335.061 18.3273 335.131 18.6027 335.196 18.892C335.261 19.1813 335.331 19.5173 335.406 19.9C335.49 19.4893 335.569 19.1487 335.644 18.878C335.728 18.6073 335.807 18.3367 335.882 18.066L337.8 11.878H339.284L341.188 18.066C341.272 18.3367 341.351 18.6167 341.426 18.906C341.501 19.1953 341.575 19.5267 341.65 19.9C341.743 19.4707 341.823 19.116 341.888 18.836C341.963 18.556 342.033 18.304 342.098 18.08L343.96 11.878H345.36L342.308 22H340.992L338.542 13.992L336.064 22H334.72ZM349.893 15.098V16.302H349.305C348.68 16.302 348.185 16.484 347.821 16.848C347.467 17.2027 347.289 17.7113 347.289 18.374V22H345.973V15.168H347.205L347.317 16.54H347.191C347.285 16.092 347.509 15.728 347.863 15.448C348.218 15.1587 348.661 15.014 349.193 15.014C349.315 15.014 349.427 15.0233 349.529 15.042C349.641 15.0513 349.763 15.07 349.893 15.098ZM351.128 22V15.154H352.444V22H351.128ZM351.772 13.53C351.538 13.53 351.333 13.446 351.156 13.278C350.988 13.1007 350.904 12.8953 350.904 12.662C350.904 12.4193 350.988 12.214 351.156 12.046C351.333 11.878 351.538 11.794 351.772 11.794C352.014 11.794 352.22 11.878 352.388 12.046C352.556 12.214 352.64 12.4193 352.64 12.662C352.64 12.8953 352.556 13.1007 352.388 13.278C352.22 13.446 352.014 13.53 351.772 13.53ZM353.626 15.154H357.63V16.26H353.626V15.154ZM356.286 22H354.97V13.012H356.286V22ZM361.697 22.168C361.034 22.168 360.446 22.0187 359.933 21.72C359.42 21.412 359.018 20.992 358.729 20.46C358.44 19.9187 358.295 19.2933 358.295 18.584C358.295 17.8653 358.435 17.2353 358.715 16.694C359.004 16.1527 359.396 15.728 359.891 15.42C360.395 15.112 360.978 14.958 361.641 14.958C362.294 14.958 362.859 15.098 363.335 15.378C363.82 15.658 364.194 16.05 364.455 16.554C364.726 17.058 364.861 17.6507 364.861 18.332V18.822L358.995 18.836L359.023 17.954H363.545C363.545 17.3847 363.372 16.9273 363.027 16.582C362.682 16.2367 362.22 16.064 361.641 16.064C361.202 16.064 360.824 16.162 360.507 16.358C360.199 16.5447 359.961 16.8247 359.793 17.198C359.634 17.562 359.555 18.0007 359.555 18.514C359.555 19.3353 359.742 19.97 360.115 20.418C360.488 20.8567 361.025 21.076 361.725 21.076C362.238 21.076 362.658 20.9733 362.985 20.768C363.312 20.5627 363.531 20.264 363.643 19.872H364.875C364.707 20.6 364.348 21.1647 363.797 21.566C363.246 21.9673 362.546 22.168 361.697 22.168ZM371.755 11.878V22H370.383V11.878H371.755ZM374.317 18.388H371.447V17.156H374.023C374.704 17.156 375.227 16.974 375.591 16.61C375.955 16.2367 376.137 15.7373 376.137 15.112C376.137 14.4773 375.955 13.9873 375.591 13.642C375.227 13.2873 374.723 13.11 374.079 13.11H371.139V11.878H374.317C374.98 11.878 375.554 12.0133 376.039 12.284C376.524 12.5547 376.902 12.9327 377.173 13.418C377.444 13.9033 377.579 14.4727 377.579 15.126C377.579 15.7513 377.444 16.3113 377.173 16.806C376.902 17.3007 376.524 17.688 376.039 17.968C375.554 18.248 374.98 18.388 374.317 18.388ZM380.638 22.168C379.91 22.168 379.336 21.9767 378.916 21.594C378.505 21.2113 378.3 20.712 378.3 20.096C378.3 19.4707 378.524 18.9713 378.972 18.598C379.42 18.2153 380.045 17.9913 380.848 17.926L383.004 17.758V17.562C383.004 17.1793 382.934 16.876 382.794 16.652C382.654 16.4187 382.462 16.2553 382.22 16.162C381.977 16.0593 381.702 16.008 381.394 16.008C380.843 16.008 380.414 16.1247 380.106 16.358C379.807 16.582 379.658 16.904 379.658 17.324H378.51C378.51 16.848 378.631 16.4327 378.874 16.078C379.116 15.7233 379.457 15.448 379.896 15.252C380.344 15.056 380.862 14.958 381.45 14.958C382.019 14.958 382.514 15.0607 382.934 15.266C383.363 15.462 383.694 15.7653 383.928 16.176C384.17 16.5773 384.292 17.086 384.292 17.702V22H383.172L383.032 20.894C382.854 21.286 382.546 21.5987 382.108 21.832C381.678 22.056 381.188 22.168 380.638 22.168ZM381.016 21.146C381.641 21.146 382.131 20.9593 382.486 20.586C382.84 20.2033 383.018 19.69 383.018 19.046V18.682L381.268 18.822C380.689 18.878 380.269 19.0133 380.008 19.228C379.756 19.4427 379.63 19.718 379.63 20.054C379.63 20.418 379.751 20.6933 379.994 20.88C380.246 21.0573 380.586 21.146 381.016 21.146ZM385.277 15.154H389.281V16.26H385.277V15.154ZM387.937 22H386.621V13.012H387.937V22ZM391.778 21.986H390.462V11.696H391.778V16.204C391.992 15.8307 392.3 15.532 392.702 15.308C393.103 15.0747 393.57 14.958 394.102 14.958C394.97 14.958 395.618 15.2147 396.048 15.728C396.477 16.2413 396.692 16.9367 396.692 17.814V22H395.376V18.108C395.376 17.6413 395.306 17.268 395.166 16.988C395.035 16.6987 394.844 16.4887 394.592 16.358C394.349 16.2273 394.064 16.162 393.738 16.162C393.318 16.162 392.958 16.2553 392.66 16.442C392.37 16.6287 392.151 16.8807 392.002 17.198C391.852 17.5153 391.778 17.87 391.778 18.262V21.986Z" fill="#4F3FA6" />
						<path fill-rule="evenodd" clip-rule="evenodd" d="M409.537 13.114C409.226 13.1023 408.927 13.2367 408.728 13.4773C408.569 13.671 408.532 13.9095 408.516 14.0836C408.5 14.2648 408.5 14.4956 408.5 14.7588V19.2409C408.5 19.5041 408.5 19.7349 408.516 19.9161C408.532 20.0902 408.569 20.3288 408.728 20.5224C408.927 20.763 409.226 20.8974 409.537 20.8857C409.788 20.8764 409.991 20.7453 410.131 20.6414C410.278 20.5332 410.45 20.3799 410.647 20.205L413.172 17.9601C413.278 17.8666 413.379 17.7767 413.457 17.694C413.542 17.6042 413.636 17.4877 413.691 17.3311C413.766 17.1167 413.766 16.883 413.691 16.6686C413.636 16.512 413.542 16.3955 413.457 16.3057C413.379 16.223 413.278 16.1331 413.172 16.0396C413.168 16.0358 413.164 16.032 413.16 16.0282L410.647 13.7947C410.45 13.6199 410.278 13.4665 410.131 13.3583C409.991 13.2544 409.788 13.1234 409.537 13.114Z" fill="#4F3FA6" />
						<path fill-rule="evenodd" clip-rule="evenodd" d="M404.037 13.114C403.726 13.1023 403.427 13.2367 403.228 13.4773C403.069 13.671 403.032 13.9095 403.016 14.0836C403 14.2648 403 14.4956 403 14.7588V19.2409C403 19.5041 403 19.7349 403.016 19.9161C403.032 20.0902 403.069 20.3288 403.228 20.5224C403.427 20.763 403.726 20.8974 404.037 20.8857C404.288 20.8764 404.491 20.7453 404.631 20.6414C404.778 20.5332 404.95 20.3799 405.147 20.205L407.672 17.9601C407.778 17.8666 407.879 17.7767 407.957 17.694C408.042 17.6042 408.136 17.4877 408.191 17.3311C408.266 17.1167 408.266 16.883 408.191 16.6686C408.136 16.512 408.042 16.3955 407.957 16.3057C407.879 16.223 407.778 16.1331 407.672 16.0396C407.668 16.0358 407.664 16.032 407.66 16.0282L405.147 13.7947C404.95 13.6199 404.778 13.4665 404.631 13.3583C404.491 13.2544 404.288 13.1234 404.037 13.114Z" fill="#4F3FA6" />
					</g>
					{/** END Write Path Label */}

					{/** Read Path Label */}
					<g filter="url(#filter1_b_522_11836)">
						<rect width="95" height="32" transform="translate(454 1)" fill="white" fill-opacity="0.95" />
						<path fill-rule="evenodd" clip-rule="evenodd" d="M465.963 13.114C466.275 13.1023 466.574 13.2367 466.772 13.4773C466.932 13.671 466.968 13.9095 466.984 14.0836C467 14.2648 467 14.4956 467 14.7588V19.2409C467 19.5041 467 19.7349 466.984 19.9161C466.968 20.0902 466.932 20.3288 466.772 20.5224C466.574 20.763 466.275 20.8974 465.963 20.8857C465.712 20.8764 465.509 20.7453 465.369 20.6414C465.223 20.5332 465.05 20.3799 464.853 20.205L462.328 17.9601C462.223 17.8666 462.122 17.7767 462.043 17.694C461.958 17.6042 461.864 17.4877 461.809 17.3311C461.734 17.1167 461.734 16.883 461.809 16.6686C461.864 16.512 461.958 16.3955 462.043 16.3057C462.122 16.223 462.223 16.1331 462.328 16.0396C462.332 16.0358 462.337 16.032 462.341 16.0282L464.854 13.7947C465.05 13.6199 465.223 13.4665 465.369 13.3583C465.509 13.2544 465.712 13.1234 465.963 13.114Z" fill="#14B876" />
						<path fill-rule="evenodd" clip-rule="evenodd" d="M471.463 13.114C471.775 13.1023 472.074 13.2367 472.272 13.4773C472.432 13.671 472.468 13.9095 472.484 14.0836C472.5 14.2648 472.5 14.4956 472.5 14.7588V19.2409C472.5 19.5041 472.5 19.7349 472.484 19.9161C472.468 20.0902 472.432 20.3288 472.272 20.5224C472.074 20.763 471.775 20.8974 471.463 20.8857C471.212 20.8764 471.009 20.7453 470.869 20.6414C470.723 20.5332 470.55 20.3799 470.353 20.205L467.828 17.9601C467.723 17.8666 467.622 17.7767 467.543 17.694C467.458 17.6042 467.364 17.4877 467.309 17.3311C467.234 17.1167 467.234 16.883 467.309 16.6686C467.364 16.512 467.458 16.3955 467.543 16.3057C467.622 16.223 467.723 16.1331 467.828 16.0396C467.832 16.0358 467.837 16.032 467.841 16.0282L470.354 13.7947C470.55 13.6199 470.723 13.4665 470.869 13.3583C471.009 13.2544 471.212 13.1234 471.463 13.114Z" fill="#14B876" />
						<path d="M479.548 22H478.176V11.878H481.998C483.081 11.878 483.925 12.1487 484.532 12.69C485.148 13.222 485.456 13.964 485.456 14.916C485.456 15.616 485.283 16.2087 484.938 16.694C484.602 17.1793 484.121 17.5247 483.496 17.73L485.554 22H484.028L482.138 17.996H479.548V22ZM479.548 13.11V16.778H482.012C482.647 16.778 483.137 16.6147 483.482 16.288C483.837 15.9613 484.014 15.5087 484.014 14.93C484.014 14.342 483.832 13.894 483.468 13.586C483.113 13.2687 482.623 13.11 481.998 13.11H479.548ZM489.574 22.168C488.911 22.168 488.323 22.0187 487.81 21.72C487.297 21.412 486.895 20.992 486.606 20.46C486.317 19.9187 486.172 19.2933 486.172 18.584C486.172 17.8653 486.312 17.2353 486.592 16.694C486.881 16.1527 487.273 15.728 487.768 15.42C488.272 15.112 488.855 14.958 489.518 14.958C490.171 14.958 490.736 15.098 491.212 15.378C491.697 15.658 492.071 16.05 492.332 16.554C492.603 17.058 492.738 17.6507 492.738 18.332V18.822L486.872 18.836L486.9 17.954H491.422C491.422 17.3847 491.249 16.9273 490.904 16.582C490.559 16.2367 490.097 16.064 489.518 16.064C489.079 16.064 488.701 16.162 488.384 16.358C488.076 16.5447 487.838 16.8247 487.67 17.198C487.511 17.562 487.432 18.0007 487.432 18.514C487.432 19.3353 487.619 19.97 487.992 20.418C488.365 20.8567 488.902 21.076 489.602 21.076C490.115 21.076 490.535 20.9733 490.862 20.768C491.189 20.5627 491.408 20.264 491.52 19.872H492.752C492.584 20.6 492.225 21.1647 491.674 21.566C491.123 21.9673 490.423 22.168 489.574 22.168ZM496.142 22.168C495.414 22.168 494.84 21.9767 494.42 21.594C494.009 21.2113 493.804 20.712 493.804 20.096C493.804 19.4707 494.028 18.9713 494.476 18.598C494.924 18.2153 495.549 17.9913 496.352 17.926L498.508 17.758V17.562C498.508 17.1793 498.438 16.876 498.298 16.652C498.158 16.4187 497.966 16.2553 497.724 16.162C497.481 16.0593 497.206 16.008 496.898 16.008C496.347 16.008 495.918 16.1247 495.61 16.358C495.311 16.582 495.162 16.904 495.162 17.324H494.014C494.014 16.848 494.135 16.4327 494.378 16.078C494.62 15.7233 494.961 15.448 495.4 15.252C495.848 15.056 496.366 14.958 496.954 14.958C497.523 14.958 498.018 15.0607 498.438 15.266C498.867 15.462 499.198 15.7653 499.432 16.176C499.674 16.5773 499.796 17.086 499.796 17.702V22H498.676L498.536 20.894C498.358 21.286 498.05 21.5987 497.612 21.832C497.182 22.056 496.692 22.168 496.142 22.168ZM496.52 21.146C497.145 21.146 497.635 20.9593 497.99 20.586C498.344 20.2033 498.522 19.69 498.522 19.046V18.682L496.772 18.822C496.193 18.878 495.773 19.0133 495.512 19.228C495.26 19.4427 495.134 19.718 495.134 20.054C495.134 20.418 495.255 20.6933 495.498 20.88C495.75 21.0573 496.09 21.146 496.52 21.146ZM504.362 22.168C503.699 22.168 503.13 22.0187 502.654 21.72C502.178 21.412 501.809 20.9873 501.548 20.446C501.296 19.9047 501.17 19.2887 501.17 18.598C501.17 17.898 501.301 17.2773 501.562 16.736C501.823 16.1853 502.197 15.7513 502.682 15.434C503.167 15.1167 503.746 14.958 504.418 14.958C504.95 14.958 505.421 15.07 505.832 15.294C506.252 15.5087 506.579 15.8307 506.812 16.26V11.696H508.114V22H506.938L506.826 20.754C506.602 21.2113 506.271 21.5613 505.832 21.804C505.403 22.0467 504.913 22.168 504.362 22.168ZM504.628 20.978C505.076 20.978 505.459 20.8753 505.776 20.67C506.103 20.4647 506.355 20.18 506.532 19.816C506.709 19.452 506.798 19.032 506.798 18.556C506.798 18.08 506.709 17.6647 506.532 17.31C506.355 16.946 506.103 16.6613 505.776 16.456C505.459 16.2507 505.076 16.148 504.628 16.148C504.18 16.148 503.797 16.2553 503.48 16.47C503.163 16.6753 502.92 16.96 502.752 17.324C502.584 17.6787 502.5 18.0893 502.5 18.556C502.5 19.032 502.584 19.452 502.752 19.816C502.92 20.18 503.163 20.4647 503.48 20.67C503.797 20.8753 504.18 20.978 504.628 20.978ZM515.437 11.878V22H514.065V11.878H515.437ZM517.999 18.388H515.129V17.156H517.705C518.386 17.156 518.909 16.974 519.273 16.61C519.637 16.2367 519.819 15.7373 519.819 15.112C519.819 14.4773 519.637 13.9873 519.273 13.642C518.909 13.2873 518.405 13.11 517.761 13.11H514.821V11.878H517.999C518.661 11.878 519.235 12.0133 519.721 12.284C520.206 12.5547 520.584 12.9327 520.855 13.418C521.125 13.9033 521.261 14.4727 521.261 15.126C521.261 15.7513 521.125 16.3113 520.855 16.806C520.584 17.3007 520.206 17.688 519.721 17.968C519.235 18.248 518.661 18.388 517.999 18.388ZM524.319 22.168C523.591 22.168 523.017 21.9767 522.597 21.594C522.187 21.2113 521.981 20.712 521.981 20.096C521.981 19.4707 522.205 18.9713 522.653 18.598C523.101 18.2153 523.727 17.9913 524.529 17.926L526.685 17.758V17.562C526.685 17.1793 526.615 16.876 526.475 16.652C526.335 16.4187 526.144 16.2553 525.901 16.162C525.659 16.0593 525.383 16.008 525.075 16.008C524.525 16.008 524.095 16.1247 523.787 16.358C523.489 16.582 523.339 16.904 523.339 17.324H522.191C522.191 16.848 522.313 16.4327 522.555 16.078C522.798 15.7233 523.139 15.448 523.577 15.252C524.025 15.056 524.543 14.958 525.131 14.958C525.701 14.958 526.195 15.0607 526.615 15.266C527.045 15.462 527.376 15.7653 527.609 16.176C527.852 16.5773 527.973 17.086 527.973 17.702V22H526.853L526.713 20.894C526.536 21.286 526.228 21.5987 525.789 21.832C525.36 22.056 524.87 22.168 524.319 22.168ZM524.697 21.146C525.323 21.146 525.813 20.9593 526.167 20.586C526.522 20.2033 526.699 19.69 526.699 19.046V18.682L524.949 18.822C524.371 18.878 523.951 19.0133 523.689 19.228C523.437 19.4427 523.311 19.718 523.311 20.054C523.311 20.418 523.433 20.6933 523.675 20.88C523.927 21.0573 524.268 21.146 524.697 21.146ZM528.958 15.154H532.962V16.26H528.958V15.154ZM531.618 22H530.302V13.012H531.618V22ZM535.459 21.986H534.143V11.696H535.459V16.204C535.674 15.8307 535.982 15.532 536.383 15.308C536.785 15.0747 537.251 14.958 537.783 14.958C538.651 14.958 539.3 15.2147 539.729 15.728C540.159 16.2413 540.373 16.9367 540.373 17.814V22H539.057V18.108C539.057 17.6413 538.987 17.268 538.847 16.988C538.717 16.6987 538.525 16.4887 538.273 16.358C538.031 16.2273 537.746 16.162 537.419 16.162C536.999 16.162 536.64 16.2553 536.341 16.442C536.052 16.6287 535.833 16.8807 535.683 17.198C535.534 17.5153 535.459 17.87 535.459 18.262V21.986Z" fill="#14B876" />
					</g>
					{/** END Read Path Label */}

					<RestAPI />
					<APIQueryEdges />
					<Features />
					<LookupEdges />

					{/** Separator */}
					<line x1="438" y1="2" x2="438" y2="451" stroke="#DBDBE6" stroke-width="2" stroke-linecap="square" stroke-dasharray="2 5" />
					{/** END Separator */}

					<DerivedDatasets />
					<PipelineEdges />
					<Datasets />

					{/** Connector Edges */}
					<SourceConnectors />
					{/** END Connector Edges */}

					<Sources />
				</motion.g>
				<rect x="1" y="1" width="738" height="451" rx="32" stroke="#F0F0F5" strokeWidth="2" />

				<defs>
					<motion.linearGradient
						animate={{
							x1: [136, 180 * 2],
							x2: [136, 180],
							y1: [0, 0],
							y2: [0, 0]
						}}
						transition={{
							duration: 1,
							repeatDelay: 0.5,
							repeat: Infinity
						}}
						id="sources-pulse"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#0091FF" stopOpacity="0" />
						<stop stopColor="#6958CA" />
						<stop offset="1" stopColor="#6958CA" stopOpacity="0" />
					</motion.linearGradient>

					<motion.linearGradient
						animate={{
							x1: [265, 310 * 2],
							x2: [265, 310],
							y1: [0, 0],
							y2: [0, 0]
						}}
						transition={{
							duration: 1.5,
							delay: 0.5,
							repeatDelay: 0.5,
							repeat: Infinity
						}}
						id="pipelines-pulse-1"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#0091FF" stopOpacity="0" />
						<stop stopColor="#6958CA" />
						<stop offset="1" stopColor="#6958CA" stopOpacity="0" />
					</motion.linearGradient>

					<motion.linearGradient
						animate={{
							x1: [265, 310 * 2],
							x2: [265, 310],
							y1: [0, 0],
							y2: [0, 0]
						}}
						transition={{
							duration: 1.5,
							delay: 0.5,
							repeatDelay: 0.5,
							repeat: Infinity
						}}
						id="pipelines-pulse-2"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#0091FF" stopOpacity="0" />
						<stop stopColor="#6958CA" />
						<stop offset="1" stopColor="#6958CA" stopOpacity="0" />
					</motion.linearGradient>

					<filter id="filter0_b_522_11836" x="310" y="-7" width="119" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter1_b_522_11836" x="446" y="-7" width="117" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter2_b_522_11836" x="603" y="201" width="130" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter3_b_522_11836" x="489" y="105" width="112" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter4_b_522_11836" x="487" y="290" width="114" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter5_b_522_11836" x="30" y="75" width="110" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter6_b_522_11836" x="20" y="202" width="120" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<filter id="filter7_b_522_11836" x="48" y="330" width="92" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_522_11836" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_522_11836" result="shape" />
					</filter>
					<clipPath id="clip0_522_11836">
						<rect x="1" y="1" width="738" height="451" rx="32" fill="white" />
					</clipPath>
				</defs>
			</motion.svg>
			<AnimatePresence>
				{
					showCode ? (
						<motion.div 
							className={styles.show_code_window}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 16 }}
							style={{ width, height }}
						>
							<Syntax className={styles.code} language={SNIPPETS[activeItem].language} code={SNIPPETS[activeItem].code} />
						</motion.div>
					) : null
				}
			</AnimatePresence>
			<LinkButton icon={null} className={clsx(styles.show_code, styles[showCode ? 'show_code_shown' : 'show_code_hidden'])} color="invert" onClick={onShowCode}>{showCode ? 'Hide' : 'Show'} Code</LinkButton>
		</div>
	)
}

export default DAG;