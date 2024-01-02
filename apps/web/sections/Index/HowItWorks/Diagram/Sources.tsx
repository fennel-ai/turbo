import { useTheme } from "@emotion/react";
import { motion } from 'framer-motion';

const VARIANTS = {
	"0": {
		opacity: 1,
	},
	"1": {
		opacity: 0.24
	},
	"2": {
		opacity: 0.24
	},
	"3": {
		opacity: 0.24
	},
}

const Sources = () => {
	const theme = useTheme();
	return (
		<motion.g variants={VARIANTS}>
			<g filter="url(#filter5_b_522_11836)">
				<rect x="34" y="79" width="102" height="40" rx="12" fill={theme.glass} />
				<path d="M58.9541 89.2295C58.7109 89.2295 58.623 89.2412 58.5146 89.25C58.5088 89.25 58.5059 89.25 58.5 89.25C56.3437 89.25 55.5 90 55.5 90C55.5059 90.0059 55.5146 90.0088 55.5205 90.0146C55.415 90.0088 55.3184 90 55.21 89.9971C55.2012 89.9971 55.1924 89.9971 55.1836 89.9971C54.5185 89.9971 53.874 90.1025 53.2676 90.2871C52.7197 89.9971 51.8584 89.6455 50.7187 89.4375C50.2207 89.3232 49.6465 89.2441 48.9932 89.2441C48.9141 89.2441 48.835 89.2471 48.7559 89.25C48.7529 89.25 48.7529 89.25 48.75 89.25C48.7324 89.25 48.7148 89.25 48.6973 89.25C47.5605 89.291 46.2685 89.4697 45.3223 90.5039C44.5049 91.3945 44.1533 92.7275 44.25 94.5791C44.2881 95.2441 44.543 97.3975 45.0762 99.46C45.6064 101.517 46.5674 104.25 48.75 104.25C49.79 104.25 51.3486 103.957 52.4941 103.301C52.4971 103.301 52.5 103.298 52.5 103.298C52.5029 103.588 52.5029 103.775 52.5 104.238C52.5 104.276 52.5 104.317 52.5029 104.355L52.5381 104.836C52.5703 105.226 52.6025 105.633 52.6025 105.85C52.6025 107.367 54.1406 108.75 55.8281 108.75C57.4746 108.75 59.25 107.484 59.25 104.71V103.532C59.3613 103.529 59.5371 103.529 59.5371 103.529C60.0937 103.559 60.8262 103.377 61.2539 103.148C62.1768 102.65 62.6807 101.877 61.7695 102.094C61.3301 102.199 61.0019 102.229 60.7236 102.231C61.3623 101.807 62.0332 101.065 62.5928 99.7793C63.709 97.2129 64.1748 92.7217 63.1201 91.1396C62.0156 89.4785 60.0351 89.2295 58.9541 89.2295ZM58.9541 90.7295C59.6924 90.7295 61.1484 90.8789 61.875 91.9688C62.6338 93.1143 62.1445 98.4844 60.4219 100.497C60.5859 100.187 60.706 99.7266 60.75 99C60.75 98.376 60.7148 96.2871 60.75 96C60.7969 95.6104 60.7646 94.9131 60.75 94.5C60.7617 94.4443 60.7617 94.3857 60.7617 94.3184C60.7617 93.624 60.5127 93.0146 60.1875 92.4932C60.1611 92.4434 60.1318 92.3936 60.0996 92.3438C60.0703 92.2998 60.0439 92.2559 60.0146 92.2148C59.7773 91.8574 59.4726 91.5176 59.0889 91.21C58.7578 90.9199 58.5 90.75 58.5 90.75C58.5 90.75 58.6758 90.7295 58.9541 90.7295ZM48.9932 90.7441C49.9746 90.7441 50.7305 90.958 51.4014 91.207C51.3164 91.2686 51.2285 91.333 51.1494 91.4004C50.4492 91.8252 50.0303 92.4287 49.793 93.1348C49.6055 93.5684 49.5 94.0283 49.5 94.5C49.5 94.5557 49.5088 94.6084 49.5146 94.6641C49.5059 94.8574 49.5 95.0537 49.5 95.25V95.2529C49.5 95.2588 49.5 95.2617 49.5 95.2646C49.5 95.332 49.5234 95.4492 49.5234 95.6104C49.5234 96.375 49.5 98.0332 49.5 99C49.5 100.649 51.2637 102.003 51.7236 102.003C51.7324 102.003 51.7412 102.003 51.75 102C50.874 102.501 49.5615 102.75 48.75 102.75C46.7607 102.75 45.8144 95.7275 45.75 94.5C45.5771 91.2275 46.9834 90.8115 48.75 90.75C48.832 90.7471 48.9141 90.7441 48.9932 90.7441ZM55.1836 91.4971C56.499 91.5176 57.4101 91.8398 58.0312 92.2852C58.2891 92.4961 58.623 92.8213 58.8896 93.2285C59.1445 93.6826 59.25 94.1426 59.25 94.5C58.3066 94.5791 57.5215 94.6201 57.1728 95.1738C56.3789 96.4395 56.9736 98.5781 57.5303 99.5391C57.5889 99.6445 58.2393 100.257 58.5 100.5C58.5937 100.588 58.1543 100.708 58.0664 100.802C57.8144 101.062 57.8174 101.851 57.7646 102.738C57.7559 102.747 57.75 102.75 57.75 102.75C57.75 102.75 57.7529 102.832 57.7588 102.946C57.7559 103.031 57.75 103.107 57.75 103.198V104.71C57.75 106.594 56.7012 107.25 55.8281 107.25C54.8994 107.25 54.1025 106.491 54.1025 105.85C54.1025 105.472 54.041 104.827 54 104.25C54.0088 102.917 54 102.434 54 102C54 101.581 53.25 101.25 53.25 101.25C53.3437 101.03 53.6484 100.582 53.6484 100.582C53.874 100.014 53.9941 99.4746 54 98.25C54.0029 97.6904 53.9268 97.0811 53.7685 96.3838C53.5518 95.4316 52.831 94.5088 51.75 94.5H51.0351C51.0644 94.1953 51.1113 93.9434 51.1758 93.7295C51.3691 93.2871 51.7236 92.8711 52.1777 92.5195C52.2832 92.458 52.3828 92.3965 52.4678 92.3145C53.2207 91.8252 54.1758 91.4971 55.1836 91.4971ZM51.0205 96H51.0615C51.0439 96.0205 51.0234 96.0381 51.0205 96.0586C51.0205 96.041 51.0176 96.0176 51.0205 96ZM59.25 96.0059H59.2529C59.2353 96.2871 59.2295 96.7676 59.2441 98.2002C59.2471 98.5342 59.25 98.8242 59.25 99C59.25 99.0645 59.2588 99.0967 59.2646 99.1523C59.0742 98.9736 58.8603 98.7715 58.7666 98.6748C58.4883 98.1387 58.3008 97.3594 58.2978 96.7383C58.3652 96.75 58.4355 96.7529 58.5088 96.7412C58.9394 96.6826 59.2705 96.2344 59.25 96.0674C59.2471 96.0439 59.2236 96.0293 59.209 96.0117C59.2236 96.0088 59.2353 96.0059 59.25 96.0059ZM51.0205 96.1025C51.0264 96.2871 51.3369 96.6914 51.75 96.75C51.9521 96.7793 52.1279 96.7061 52.2744 96.6152C52.2832 96.6475 52.2978 96.6826 52.3037 96.7148C52.4385 97.2979 52.5029 97.7988 52.5 98.2441C52.4971 99.1963 52.415 99.583 52.3037 99.8906C52.1953 100.061 52.0693 100.274 51.9639 100.477C51.6211 100.236 51 99.5918 51 99C51 98.4902 51.0059 97.79 51.0117 97.1309C51.0146 96.7266 51.0176 96.4219 51.0205 96.1025Z" fill="#035D85" />
				<path d="M75.092 94.2H76.408V104H75.092V94.2ZM75.372 98.946H78.62V100.192H75.372V98.946ZM75.372 94.2H78.62V95.432H75.372V94.2ZM78.62 95.432V94.2C79.236 94.2 79.782 94.3213 80.258 94.564C80.734 94.8067 81.112 95.152 81.392 95.6C81.672 96.0387 81.812 96.58 81.812 97.224C81.812 97.9053 81.672 98.4653 81.392 98.904C81.112 99.3333 80.734 99.6553 80.258 99.87C79.782 100.075 79.236 100.183 78.62 100.192V98.946C79.0307 98.9367 79.3713 98.8853 79.642 98.792C79.922 98.6893 80.132 98.512 80.272 98.26C80.4213 98.008 80.496 97.6627 80.496 97.224C80.496 96.8227 80.426 96.4913 80.286 96.23C80.146 95.9687 79.936 95.7727 79.656 95.642C79.3853 95.502 79.04 95.432 78.62 95.432ZM82.3666 100.57C82.3666 99.338 82.642 98.414 83.1926 97.798C83.7433 97.1727 84.5086 96.86 85.4886 96.86C86.478 96.86 87.248 97.1727 87.7986 97.798C88.3586 98.414 88.6386 99.338 88.6386 100.57C88.6386 101.727 88.3586 102.614 87.7986 103.23C87.248 103.837 86.478 104.14 85.4886 104.14C84.5086 104.14 83.7433 103.837 83.1926 103.23C82.642 102.614 82.3666 101.727 82.3666 100.57ZM85.4886 102.992C85.834 102.992 86.128 102.931 86.3706 102.81C86.6133 102.689 86.8093 102.516 86.9586 102.292C87.1173 102.068 87.2293 101.811 87.2946 101.522C87.3693 101.223 87.4066 100.906 87.4066 100.57C87.4066 100.187 87.3693 99.842 87.2946 99.534C87.2293 99.226 87.1173 98.9553 86.9586 98.722C86.8093 98.4887 86.6133 98.3113 86.3706 98.19C86.128 98.0593 85.834 97.994 85.4886 97.994C85.1526 97.994 84.8633 98.0593 84.6206 98.19C84.378 98.3113 84.182 98.4887 84.0326 98.722C83.8833 98.9553 83.7713 99.226 83.6966 99.534C83.6313 99.842 83.5986 100.187 83.5986 100.57C83.5986 100.906 83.6313 101.223 83.6966 101.522C83.7713 101.811 83.8833 102.068 84.0326 102.292C84.182 102.516 84.378 102.689 84.6206 102.81C84.8633 102.931 85.1526 102.992 85.4886 102.992ZM92.7455 104.154C92.1388 104.154 91.6115 104.051 91.1635 103.846C90.7248 103.641 90.3795 103.361 90.1275 103.006C89.8848 102.642 89.7588 102.227 89.7495 101.76H90.9815C90.9815 102.059 91.0655 102.306 91.2335 102.502C91.4015 102.689 91.6161 102.829 91.8775 102.922C92.1388 103.015 92.4188 103.062 92.7175 103.062C93.0255 103.062 93.3055 103.025 93.5575 102.95C93.8095 102.875 94.0148 102.759 94.1735 102.6C94.3321 102.441 94.4115 102.245 94.4115 102.012C94.4115 101.76 94.3135 101.555 94.1175 101.396C93.9215 101.228 93.6695 101.121 93.3615 101.074C93.1935 101.055 93.0115 101.032 92.8155 101.004C92.6195 100.976 92.4235 100.953 92.2275 100.934C92.0315 100.906 91.8541 100.883 91.6955 100.864C91.1821 100.78 90.7715 100.565 90.4635 100.22C90.1555 99.8747 90.0015 99.4687 90.0015 99.002C90.0015 98.5633 90.1228 98.1853 90.3655 97.868C90.6081 97.5413 90.9348 97.2893 91.3455 97.112C91.7561 96.9347 92.2088 96.846 92.7035 96.846C93.2168 96.846 93.6695 96.9347 94.0615 97.112C94.4628 97.2893 94.7801 97.546 95.0135 97.882C95.2468 98.2087 95.3681 98.6053 95.3775 99.072H94.1455C94.1175 98.736 93.9728 98.4607 93.7115 98.246C93.4595 98.0313 93.1281 97.924 92.7175 97.924C92.4841 97.924 92.2508 97.9567 92.0175 98.022C91.7935 98.0873 91.6021 98.1947 91.4435 98.344C91.2941 98.4933 91.2195 98.694 91.2195 98.946C91.2195 99.17 91.2941 99.352 91.4435 99.492C91.6021 99.632 91.8401 99.7207 92.1575 99.758C92.2041 99.7673 92.3255 99.786 92.5215 99.814C92.7175 99.842 92.9368 99.8747 93.1795 99.912C93.4221 99.94 93.6275 99.968 93.7955 99.996C94.1688 100.061 94.4908 100.183 94.7615 100.36C95.0415 100.528 95.2561 100.747 95.4055 101.018C95.5548 101.279 95.6295 101.578 95.6295 101.914C95.6295 102.418 95.4988 102.838 95.2375 103.174C94.9761 103.501 94.6261 103.748 94.1875 103.916C93.7581 104.075 93.2775 104.154 92.7455 104.154ZM96.3334 97H100.757V98.134H96.3334V97ZM97.6354 101.2H98.8674V101.704C98.8674 101.919 98.8767 102.115 98.8954 102.292C98.9234 102.46 98.9981 102.595 99.1194 102.698C99.2501 102.801 99.4647 102.852 99.7634 102.852H100.757V104H99.2454C98.8254 104 98.4987 103.902 98.2654 103.706C98.0321 103.51 97.8687 103.235 97.7754 102.88C97.6821 102.525 97.6354 102.105 97.6354 101.62V101.2ZM98.8674 101.2H97.6354V95.026H98.8674V101.2ZM107.829 104C107.829 104.616 107.707 105.139 107.465 105.568C107.222 105.997 106.877 106.319 106.429 106.534C105.981 106.758 105.444 106.87 104.819 106.87C104.24 106.87 103.755 106.763 103.363 106.548C102.971 106.343 102.667 106.072 102.453 105.736C102.238 105.4 102.107 105.031 102.061 104.63L103.279 104.588C103.316 104.803 103.395 105.013 103.517 105.218C103.638 105.433 103.811 105.601 104.035 105.722C104.268 105.853 104.571 105.918 104.945 105.918C105.505 105.918 105.92 105.755 106.191 105.428C106.461 105.101 106.597 104.625 106.597 104C106.597 104 106.657 104 106.779 104C106.909 104 107.054 104 107.213 104C107.371 104 107.511 104 107.633 104C107.763 104 107.829 104 107.829 104ZM103.027 100.486C103.027 100.813 103.055 101.13 103.111 101.438C103.176 101.737 103.274 102.007 103.405 102.25C103.545 102.483 103.717 102.67 103.923 102.81C104.137 102.941 104.399 103.006 104.707 103.006C105.416 103.006 105.906 102.754 106.177 102.25C106.457 101.746 106.597 101.013 106.597 100.052C106.597 100.052 106.653 100.052 106.765 100.052C106.877 100.052 106.984 100.052 107.087 100.052C107.189 100.052 107.241 100.052 107.241 100.052C107.241 100.957 107.147 101.713 106.961 102.32C106.774 102.927 106.475 103.384 106.065 103.692C105.663 104 105.136 104.154 104.483 104.154C103.997 104.154 103.582 104.061 103.237 103.874C102.891 103.687 102.611 103.431 102.397 103.104C102.191 102.768 102.037 102.381 101.935 101.942C101.841 101.494 101.795 101.009 101.795 100.486H103.027ZM103.027 100.514H101.795C101.795 100.001 101.841 99.5247 101.935 99.086C102.037 98.638 102.191 98.2507 102.397 97.924C102.611 97.588 102.891 97.3267 103.237 97.14C103.582 96.9533 103.997 96.86 104.483 96.86C105.136 96.86 105.663 97.014 106.065 97.322C106.475 97.6207 106.774 98.0733 106.961 98.68C107.147 99.2867 107.241 100.047 107.241 100.962C107.241 100.953 107.189 100.953 107.087 100.962C106.984 100.962 106.877 100.962 106.765 100.962C106.653 100.962 106.597 100.962 106.597 100.962C106.597 99.982 106.457 99.2447 106.177 98.75C105.906 98.246 105.416 97.994 104.707 97.994C104.399 97.994 104.137 98.064 103.923 98.204C103.717 98.344 103.545 98.5307 103.405 98.764C103.274 98.9973 103.176 99.268 103.111 99.576C103.055 99.8747 103.027 100.187 103.027 100.514ZM107.829 104H106.597V97H107.829V104ZM113.429 98.092C112.953 98.092 112.538 98.1993 112.183 98.414C111.838 98.6193 111.563 98.932 111.357 99.352C111.152 99.772 111.04 100.309 111.021 100.962C111.021 100.962 110.989 100.962 110.923 100.962C110.867 100.962 110.807 100.962 110.741 100.962C110.685 100.962 110.657 100.962 110.657 100.962C110.676 100.327 110.737 99.758 110.839 99.254C110.951 98.75 111.115 98.3207 111.329 97.966C111.553 97.602 111.833 97.3267 112.169 97.14C112.515 96.9533 112.935 96.86 113.429 96.86C113.429 96.86 113.429 96.9253 113.429 97.056C113.429 97.1773 113.429 97.3173 113.429 97.476C113.429 97.6347 113.429 97.7793 113.429 97.91C113.429 98.0313 113.429 98.092 113.429 98.092ZM109.789 104V97H111.021V104H109.789ZM118.982 101.914L120.144 102.082C120.022 102.502 119.836 102.871 119.584 103.188C119.332 103.496 119.01 103.734 118.618 103.902C118.235 104.07 117.782 104.149 117.26 104.14C116.69 104.14 116.182 104.005 115.734 103.734C115.286 103.463 114.936 103.057 114.684 102.516C114.441 101.975 114.32 101.312 114.32 100.528C114.32 99.716 114.441 99.0393 114.684 98.498C114.936 97.9473 115.286 97.5367 115.734 97.266C116.182 96.9953 116.69 96.86 117.26 96.86C117.642 96.86 118.011 96.9253 118.366 97.056C118.72 97.1773 119.042 97.3827 119.332 97.672C119.621 97.9613 119.845 98.358 120.004 98.862C120.172 99.3567 120.246 99.9773 120.228 100.724H119.052C119.07 100.005 119 99.4453 118.842 99.044C118.683 98.6427 118.464 98.358 118.184 98.19C117.913 98.022 117.605 97.938 117.26 97.938C116.914 97.938 116.625 98.0173 116.392 98.176C116.168 98.3253 115.986 98.526 115.846 98.778C115.715 99.03 115.617 99.31 115.552 99.618C115.496 99.926 115.468 100.229 115.468 100.528C115.468 100.808 115.496 101.097 115.552 101.396C115.617 101.695 115.715 101.97 115.846 102.222C115.976 102.465 116.154 102.665 116.378 102.824C116.611 102.973 116.905 103.048 117.26 103.048C117.624 103.048 117.918 102.997 118.142 102.894C118.366 102.791 118.543 102.651 118.674 102.474C118.804 102.297 118.907 102.11 118.982 101.914ZM114.614 99.744H119.822V100.724H114.614V99.744ZM124.464 104.154C123.858 104.154 123.33 104.051 122.882 103.846C122.444 103.641 122.098 103.361 121.846 103.006C121.604 102.642 121.478 102.227 121.468 101.76H122.7C122.7 102.059 122.784 102.306 122.952 102.502C123.12 102.689 123.335 102.829 123.596 102.922C123.858 103.015 124.138 103.062 124.436 103.062C124.744 103.062 125.024 103.025 125.276 102.95C125.528 102.875 125.734 102.759 125.892 102.6C126.051 102.441 126.13 102.245 126.13 102.012C126.13 101.76 126.032 101.555 125.836 101.396C125.64 101.228 125.388 101.121 125.08 101.074C124.912 101.055 124.73 101.032 124.534 101.004C124.338 100.976 124.142 100.953 123.946 100.934C123.75 100.906 123.573 100.883 123.414 100.864C122.901 100.78 122.49 100.565 122.182 100.22C121.874 99.8747 121.72 99.4687 121.72 99.002C121.72 98.5633 121.842 98.1853 122.084 97.868C122.327 97.5413 122.654 97.2893 123.064 97.112C123.475 96.9347 123.928 96.846 124.422 96.846C124.936 96.846 125.388 96.9347 125.78 97.112C126.182 97.2893 126.499 97.546 126.732 97.882C126.966 98.2087 127.087 98.6053 127.096 99.072H125.864C125.836 98.736 125.692 98.4607 125.43 98.246C125.178 98.0313 124.847 97.924 124.436 97.924C124.203 97.924 123.97 97.9567 123.736 98.022C123.512 98.0873 123.321 98.1947 123.162 98.344C123.013 98.4933 122.938 98.694 122.938 98.946C122.938 99.17 123.013 99.352 123.162 99.492C123.321 99.632 123.559 99.7207 123.876 99.758C123.923 99.7673 124.044 99.786 124.24 99.814C124.436 99.842 124.656 99.8747 124.898 99.912C125.141 99.94 125.346 99.968 125.514 99.996C125.888 100.061 126.21 100.183 126.48 100.36C126.76 100.528 126.975 100.747 127.124 101.018C127.274 101.279 127.348 101.578 127.348 101.914C127.348 102.418 127.218 102.838 126.956 103.174C126.695 103.501 126.345 103.748 125.906 103.916C125.477 104.075 124.996 104.154 124.464 104.154Z" fill={theme.on} />
				<rect x="33.5" y="78.5" width="103" height="41" rx="12.5" stroke={theme.border.light} />
			</g>
			<g filter="url(#filter6_b_522_11836)">
				<rect x="24" y="206" width="112" height="40" rx="12" fill={theme.glass} />
				<path fillRule="evenodd" clipRule="evenodd" d="M53.8442 224.57L51.3579 226.002L53.8442 227.428C54.4722 227.789 54.6861 228.586 54.3236 229.212C53.961 229.834 53.16 230.047 52.5351 229.687L48.0813 227.128C47.784 226.956 47.5777 226.687 47.4867 226.384C47.4427 226.245 47.423 226.101 47.4275 225.959C47.4306 225.857 47.4457 225.754 47.4731 225.651C47.5625 225.333 47.7703 225.047 48.0798 224.868L52.5321 222.311C53.157 221.952 53.9595 222.165 54.3205 222.79C54.6861 223.414 54.4722 224.209 53.8442 224.57ZM51.4899 231.505L47.0392 228.95C46.7995 228.812 46.5356 228.759 46.2807 228.78C45.6011 228.828 45.0687 229.393 45.0687 230.08V235.195C45.0687 235.917 45.6527 236.5 46.3778 236.5C47.1029 236.5 47.6884 235.916 47.6884 235.195V232.334L50.1807 233.766C50.8073 234.128 51.6083 233.914 51.9692 233.29C52.3303 232.666 52.1179 231.866 51.4899 231.505ZM46.3535 226.501L44.5029 228.34C44.4498 228.395 44.3482 228.438 44.2708 228.438H44.1373H43.8642H43.7277C43.6534 228.438 43.5487 228.395 43.4956 228.34L41.6449 226.501C41.5919 226.45 41.5494 226.346 41.5494 226.272V226.136V225.864V225.73C41.5494 225.654 41.5919 225.55 41.6449 225.497L43.4941 223.658C43.5472 223.604 43.6519 223.562 43.7262 223.562H43.8627H44.1358H44.2708C44.3466 223.562 44.4498 223.604 44.5029 223.658L46.3535 225.497C46.4066 225.55 46.4491 225.654 46.4491 225.73V225.864V226.136V226.272C46.4491 226.344 46.4066 226.448 46.3535 226.501ZM44.8745 225.991C44.8745 225.917 44.829 225.813 44.7759 225.758L44.2404 225.227C44.1873 225.174 44.0842 225.13 44.0083 225.13H43.9871C43.9128 225.13 43.8081 225.174 43.7565 225.227L43.2211 225.758C43.168 225.813 43.127 225.917 43.127 225.991V226.012C43.127 226.086 43.168 226.189 43.2211 226.242L43.7565 226.775C43.8096 226.827 43.9128 226.871 43.9871 226.871H44.0083C44.0827 226.871 44.1873 226.827 44.2404 226.775L44.7759 226.242C44.829 226.189 44.8745 226.086 44.8745 226.012V225.991ZM36.5086 220.492L40.9608 223.05C41.2005 223.187 41.4659 223.241 41.7208 223.22C42.3989 223.17 42.9328 222.606 42.9328 221.919V216.803C42.9328 216.084 42.3458 215.5 41.6237 215.5C40.8986 215.5 40.3131 216.084 40.3131 216.803V219.666L37.8192 218.231C37.1942 217.871 36.3933 218.085 36.0307 218.709C35.6682 219.335 35.8821 220.131 36.5086 220.492ZM46.2807 223.22C46.5356 223.241 46.801 223.187 47.0392 223.05L51.4899 220.492C52.1164 220.131 52.3303 219.334 51.9692 218.709C51.6083 218.085 50.8073 217.872 50.1807 218.231L47.6884 219.666V216.803C47.6884 216.084 47.1029 215.5 46.3778 215.5C45.6527 215.5 45.0687 216.084 45.0687 216.803V221.919C45.0671 222.606 45.6011 223.17 46.2807 223.22ZM41.7208 228.78C41.4645 228.759 41.199 228.812 40.9608 228.95L36.5086 231.505C35.8821 231.866 35.6682 232.666 36.0292 233.29C36.3918 233.912 37.1927 234.126 37.8177 233.766L40.3115 232.334V235.195C40.3115 235.917 40.8971 236.5 41.6222 236.5C42.3442 236.5 42.9313 235.916 42.9313 235.195V230.08C42.9328 229.393 42.3989 228.828 41.7208 228.78ZM40.5133 226.384C40.5573 226.245 40.5755 226.101 40.5724 225.959C40.5679 225.857 40.5542 225.754 40.5254 225.651C40.4374 225.333 40.2281 225.047 39.9156 224.868L35.4664 222.311C34.8384 221.952 34.0375 222.165 33.678 222.79C33.3139 223.414 33.5293 224.209 34.1573 224.57L36.6436 226.002L34.1558 227.428C33.5278 227.789 33.3139 228.586 33.6764 229.212C34.0375 229.834 34.8369 230.047 35.4649 229.687L39.9141 227.128C40.2159 226.957 40.4193 226.687 40.5133 226.384Z" fill="#29B5E8" />
				<path d="M68.34 231.154C67.5187 231.154 66.8233 231.009 66.254 230.72C65.6847 230.421 65.246 230.025 64.938 229.53C64.6393 229.035 64.4853 228.489 64.476 227.892H65.792C65.792 228.275 65.8947 228.62 66.1 228.928C66.3053 229.227 66.5993 229.465 66.982 229.642C67.3647 229.819 67.822 229.908 68.354 229.908C68.774 229.908 69.1613 229.857 69.516 229.754C69.88 229.642 70.1693 229.465 70.384 229.222C70.5987 228.979 70.706 228.662 70.706 228.27C70.706 228.083 70.6593 227.887 70.566 227.682C70.482 227.477 70.328 227.29 70.104 227.122C69.88 226.945 69.558 226.823 69.138 226.758C69.0167 226.739 68.8767 226.721 68.718 226.702C68.5687 226.683 68.4053 226.665 68.228 226.646C68.06 226.627 67.8967 226.609 67.738 226.59C67.5793 226.571 67.444 226.553 67.332 226.534C66.9213 226.469 66.5573 226.366 66.24 226.226C65.9227 226.086 65.6567 225.904 65.442 225.68C65.2273 225.456 65.064 225.199 64.952 224.91C64.8493 224.621 64.798 224.303 64.798 223.958C64.798 223.389 64.952 222.885 65.26 222.446C65.5773 222.007 66.002 221.667 66.534 221.424C67.066 221.172 67.6587 221.046 68.312 221.046C69.0027 221.046 69.6047 221.177 70.118 221.438C70.6407 221.699 71.0513 222.059 71.35 222.516C71.6487 222.964 71.812 223.477 71.84 224.056H70.524C70.496 223.505 70.2767 223.071 69.866 222.754C69.4647 222.437 68.942 222.278 68.298 222.278C67.9153 222.278 67.556 222.343 67.22 222.474C66.8933 222.595 66.6273 222.777 66.422 223.02C66.2167 223.253 66.114 223.552 66.114 223.916C66.114 224.345 66.24 224.663 66.492 224.868C66.744 225.064 67.0847 225.195 67.514 225.26C67.6167 225.269 67.7473 225.288 67.906 225.316C68.074 225.335 68.2513 225.358 68.438 225.386C68.634 225.414 68.8113 225.437 68.97 225.456C69.138 225.475 69.2733 225.493 69.376 225.512C69.936 225.587 70.412 225.745 70.804 225.988C71.2053 226.221 71.5087 226.529 71.714 226.912C71.9287 227.285 72.036 227.724 72.036 228.228C72.036 228.853 71.868 229.385 71.532 229.824C71.196 230.263 70.748 230.594 70.188 230.818C69.628 231.042 69.012 231.154 68.34 231.154ZM78.5056 231V227.514H79.7236V231H78.5056ZM78.5056 227.514C78.5056 227.187 78.473 226.875 78.4076 226.576C78.3423 226.268 78.2443 225.997 78.1136 225.764C77.983 225.531 77.8103 225.344 77.5956 225.204C77.381 225.064 77.1243 224.994 76.8256 224.994C76.1163 224.994 75.6216 225.246 75.3416 225.75C75.0616 226.245 74.9216 226.982 74.9216 227.962C74.9216 227.962 74.8703 227.962 74.7676 227.962C74.665 227.962 74.5576 227.962 74.4456 227.962C74.343 227.953 74.2916 227.953 74.2916 227.962C74.2916 227.047 74.385 226.287 74.5716 225.68C74.7583 225.073 75.0523 224.621 75.4536 224.322C75.8643 224.014 76.3963 223.86 77.0496 223.86C77.535 223.86 77.9456 223.953 78.2816 224.14C78.627 224.327 78.9023 224.588 79.1076 224.924C79.3223 225.251 79.4763 225.638 79.5696 226.086C79.6723 226.525 79.7236 227.001 79.7236 227.514H78.5056ZM73.6896 231V224H74.9216V231H73.6896ZM81.1987 227.57C81.1987 226.338 81.474 225.414 82.0247 224.798C82.5753 224.173 83.3407 223.86 84.3207 223.86C85.31 223.86 86.08 224.173 86.6307 224.798C87.1907 225.414 87.4707 226.338 87.4707 227.57C87.4707 228.727 87.1907 229.614 86.6307 230.23C86.08 230.837 85.31 231.14 84.3207 231.14C83.3407 231.14 82.5753 230.837 82.0247 230.23C81.474 229.614 81.1987 228.727 81.1987 227.57ZM84.3207 229.992C84.666 229.992 84.96 229.931 85.2027 229.81C85.4453 229.689 85.6413 229.516 85.7907 229.292C85.9493 229.068 86.0613 228.811 86.1267 228.522C86.2013 228.223 86.2387 227.906 86.2387 227.57C86.2387 227.187 86.2013 226.842 86.1267 226.534C86.0613 226.226 85.9493 225.955 85.7907 225.722C85.6413 225.489 85.4453 225.311 85.2027 225.19C84.96 225.059 84.666 224.994 84.3207 224.994C83.9847 224.994 83.6953 225.059 83.4527 225.19C83.21 225.311 83.014 225.489 82.8647 225.722C82.7153 225.955 82.6033 226.226 82.5287 226.534C82.4633 226.842 82.4307 227.187 82.4307 227.57C82.4307 227.906 82.4633 228.223 82.5287 228.522C82.6033 228.811 82.7153 229.068 82.8647 229.292C83.014 229.516 83.21 229.689 83.4527 229.81C83.6953 229.931 83.9847 229.992 84.3207 229.992ZM90.284 231L92.16 224H93.14L91.362 231H90.284ZM89.78 231L87.932 224H89.22L90.928 231H89.78ZM94.344 231L96.066 224H97.368L95.52 231H94.344ZM93.938 231L92.174 224H93.14L95.016 231H93.938ZM97.9405 224H102.378V225.134H97.9405V224ZM99.2565 224.014V223.566C99.2565 223.09 99.3032 222.675 99.3965 222.32C99.4898 221.956 99.6532 221.681 99.8865 221.494C100.12 221.298 100.446 221.2 100.866 221.2H104.268V222.334H101.37C101.072 222.334 100.862 222.39 100.74 222.502C100.619 222.605 100.544 222.74 100.516 222.908C100.488 223.076 100.474 223.272 100.474 223.496V224.014H99.2565ZM99.2565 224.294H100.474V231H99.2565V224.294ZM103.61 221.2H104.842V231H103.61V221.2ZM108.818 231.126C108.36 231.126 107.95 231.051 107.586 230.902C107.231 230.743 106.951 230.505 106.746 230.188C106.55 229.861 106.452 229.46 106.452 228.984C106.452 228.256 106.755 227.696 107.362 227.304C107.968 226.912 108.799 226.716 109.854 226.716H111.24H112.472V231.014H111.324L111.24 229.978C110.988 230.333 110.666 230.613 110.274 230.818C109.882 231.023 109.396 231.126 108.818 231.126ZM108.986 230.048C109.331 230.048 109.676 229.983 110.022 229.852C110.367 229.721 110.656 229.502 110.89 229.194C111.123 228.886 111.24 228.466 111.24 227.934V227.696H109.896C109.14 227.696 108.58 227.808 108.216 228.032C107.852 228.256 107.67 228.569 107.67 228.97C107.67 229.334 107.786 229.605 108.02 229.782C108.262 229.959 108.584 230.048 108.986 230.048ZM111.24 226.716C111.24 226.091 111.104 225.638 110.834 225.358C110.572 225.078 110.157 224.938 109.588 224.938C109.224 224.938 108.93 224.994 108.706 225.106C108.482 225.209 108.309 225.353 108.188 225.54C108.076 225.717 107.996 225.918 107.95 226.142L106.732 226.1C106.788 225.699 106.923 225.33 107.138 224.994C107.352 224.649 107.656 224.373 108.048 224.168C108.44 223.953 108.925 223.846 109.504 223.846C110.148 223.846 110.689 223.963 111.128 224.196C111.566 224.429 111.898 224.761 112.122 225.19C112.355 225.61 112.472 226.119 112.472 226.716V226.926H111.24V226.716ZM114.487 221.2H115.719V226.968L118.519 224H120.045L117.245 226.968L120.451 231H118.939L116.293 227.71L115.719 228.284V231H114.487V221.2ZM125.785 228.914L126.947 229.082C126.825 229.502 126.639 229.871 126.387 230.188C126.135 230.496 125.813 230.734 125.421 230.902C125.038 231.07 124.585 231.149 124.063 231.14C123.493 231.14 122.985 231.005 122.537 230.734C122.089 230.463 121.739 230.057 121.487 229.516C121.244 228.975 121.123 228.312 121.123 227.528C121.123 226.716 121.244 226.039 121.487 225.498C121.739 224.947 122.089 224.537 122.537 224.266C122.985 223.995 123.493 223.86 124.063 223.86C124.445 223.86 124.814 223.925 125.169 224.056C125.523 224.177 125.845 224.383 126.135 224.672C126.424 224.961 126.648 225.358 126.807 225.862C126.975 226.357 127.049 226.977 127.031 227.724H125.855C125.873 227.005 125.803 226.445 125.645 226.044C125.486 225.643 125.267 225.358 124.987 225.19C124.716 225.022 124.408 224.938 124.063 224.938C123.717 224.938 123.428 225.017 123.195 225.176C122.971 225.325 122.789 225.526 122.649 225.778C122.518 226.03 122.42 226.31 122.355 226.618C122.299 226.926 122.271 227.229 122.271 227.528C122.271 227.808 122.299 228.097 122.355 228.396C122.42 228.695 122.518 228.97 122.649 229.222C122.779 229.465 122.957 229.665 123.181 229.824C123.414 229.973 123.708 230.048 124.063 230.048C124.427 230.048 124.721 229.997 124.945 229.894C125.169 229.791 125.346 229.651 125.477 229.474C125.607 229.297 125.71 229.11 125.785 228.914ZM121.417 226.744H126.625V227.724H121.417V226.744Z" fill={theme.on} />
				<rect x="23.5" y="205.5" width="113" height="41" rx="12.5" stroke={theme.border.light} />
			</g>
			<g filter="url(#filter7_b_522_11836)">
				<rect x="52" y="334" width="84" height="40" rx="12" fill={theme.glass} />
				<path d="M75.9066 355.185C75.0499 355.185 74.2818 355.565 73.7559 356.162L72.4081 355.208C72.5512 354.814 72.6333 354.391 72.6333 353.949C72.6333 353.514 72.554 353.098 72.4157 352.71L73.7604 351.766C74.2863 352.36 75.0524 352.738 75.9066 352.738C77.4879 352.738 78.7745 351.451 78.7745 349.87C78.7745 348.288 77.4879 347.002 75.9066 347.002C74.3253 347.002 73.0387 348.288 73.0387 349.87C73.0387 350.153 73.0814 350.426 73.1582 350.684L71.8126 351.629C71.2505 350.932 70.4411 350.445 69.519 350.296V348.674C70.8181 348.401 71.7969 347.247 71.7969 345.868C71.7969 344.286 70.5102 343 68.929 343C67.3477 343 66.0611 344.286 66.0611 345.868C66.0611 347.229 67.0145 348.369 68.2876 348.661V350.304C66.5502 350.609 65.2246 352.125 65.2246 353.949C65.2246 355.781 66.5633 357.303 68.3133 357.598V359.332C67.0272 359.615 66.0611 360.762 66.0611 362.132C66.0611 363.714 67.3477 365 68.929 365C70.5102 365 71.7969 363.714 71.7969 362.132C71.7969 360.762 70.8308 359.615 69.5446 359.332V357.598C70.4304 357.448 71.2318 356.982 71.7994 356.286L73.1562 357.247C73.0809 357.503 73.0387 357.773 73.0387 358.053C73.0387 359.635 74.3253 360.921 75.9066 360.921C77.4879 360.921 78.7745 359.635 78.7745 358.053C78.7745 356.472 77.4879 355.185 75.9066 355.185V355.185ZM75.9066 348.479C76.6734 348.479 77.297 349.103 77.297 349.87C77.297 350.636 76.6734 351.26 75.9066 351.26C75.1398 351.26 74.5161 350.636 74.5161 349.87C74.5161 349.103 75.1398 348.479 75.9066 348.479V348.479ZM67.5385 345.868C67.5385 345.101 68.1622 344.477 68.929 344.477C69.6958 344.477 70.3194 345.101 70.3194 345.868C70.3194 346.635 69.6958 347.258 68.929 347.258C68.1622 347.258 67.5385 346.635 67.5385 345.868ZM70.3194 362.132C70.3194 362.899 69.6958 363.523 68.929 363.523C68.1622 363.523 67.5385 362.899 67.5385 362.132C67.5385 361.365 68.1622 360.742 68.929 360.742C69.6958 360.742 70.3194 361.365 70.3194 362.132ZM68.9289 355.888C67.8594 355.888 66.9894 355.018 66.9894 353.949C66.9894 352.879 67.8594 352.009 68.9289 352.009C69.9983 352.009 70.8683 352.879 70.8683 353.949C70.8683 355.018 69.9983 355.888 68.9289 355.888ZM75.9066 359.444C75.1398 359.444 74.5161 358.82 74.5161 358.053C74.5161 357.287 75.1398 356.663 75.9066 356.663C76.6734 356.663 77.297 357.287 77.297 358.053C77.297 358.82 76.6734 359.444 75.9066 359.444Z" fill={theme.on} />
				<path d="M93.092 359V349.2H94.408V354.254L98.65 349.2H100.372L97.054 353.05L100.526 359H99.028L96.158 354.072L94.408 356.158V359H93.092ZM103.527 359.126C103.069 359.126 102.659 359.051 102.295 358.902C101.94 358.743 101.66 358.505 101.455 358.188C101.259 357.861 101.161 357.46 101.161 356.984C101.161 356.256 101.464 355.696 102.071 355.304C102.677 354.912 103.508 354.716 104.563 354.716H105.949H107.181V359.014H106.033L105.949 357.978C105.697 358.333 105.375 358.613 104.983 358.818C104.591 359.023 104.105 359.126 103.527 359.126ZM103.695 358.048C104.04 358.048 104.385 357.983 104.731 357.852C105.076 357.721 105.365 357.502 105.599 357.194C105.832 356.886 105.949 356.466 105.949 355.934V355.696H104.605C103.849 355.696 103.289 355.808 102.925 356.032C102.561 356.256 102.379 356.569 102.379 356.97C102.379 357.334 102.495 357.605 102.729 357.782C102.971 357.959 103.293 358.048 103.695 358.048ZM105.949 354.716C105.949 354.091 105.813 353.638 105.543 353.358C105.281 353.078 104.866 352.938 104.297 352.938C103.933 352.938 103.639 352.994 103.415 353.106C103.191 353.209 103.018 353.353 102.897 353.54C102.785 353.717 102.705 353.918 102.659 354.142L101.441 354.1C101.497 353.699 101.632 353.33 101.847 352.994C102.061 352.649 102.365 352.373 102.757 352.168C103.149 351.953 103.634 351.846 104.213 351.846C104.857 351.846 105.398 351.963 105.837 352.196C106.275 352.429 106.607 352.761 106.831 353.19C107.064 353.61 107.181 354.119 107.181 354.716V354.926H105.949V354.716ZM108.317 352H112.755V353.134H108.317V352ZM109.633 352.014V351.566C109.633 351.09 109.68 350.675 109.773 350.32C109.867 349.956 110.03 349.681 110.263 349.494C110.497 349.298 110.823 349.2 111.243 349.2H112.755V350.334H111.747C111.449 350.334 111.239 350.39 111.117 350.502C110.996 350.605 110.921 350.74 110.893 350.908C110.865 351.076 110.851 351.272 110.851 351.496V352.014H109.633ZM109.633 352.294H110.851V359H109.633V352.294ZM113.981 349.2H115.213V354.968L118.013 352H119.539L116.739 354.968L119.945 359H118.433L115.787 355.71L115.213 356.284V359H113.981V349.2ZM122.941 359.126C122.483 359.126 122.073 359.051 121.709 358.902C121.354 358.743 121.074 358.505 120.869 358.188C120.673 357.861 120.575 357.46 120.575 356.984C120.575 356.256 120.878 355.696 121.485 355.304C122.091 354.912 122.922 354.716 123.977 354.716H125.363H126.595V359.014H125.447L125.363 357.978C125.111 358.333 124.789 358.613 124.397 358.818C124.005 359.023 123.519 359.126 122.941 359.126ZM123.109 358.048C123.454 358.048 123.799 357.983 124.145 357.852C124.49 357.721 124.779 357.502 125.013 357.194C125.246 356.886 125.363 356.466 125.363 355.934V355.696H124.019C123.263 355.696 122.703 355.808 122.339 356.032C121.975 356.256 121.793 356.569 121.793 356.97C121.793 357.334 121.909 357.605 122.143 357.782C122.385 357.959 122.707 358.048 123.109 358.048ZM125.363 354.716C125.363 354.091 125.227 353.638 124.957 353.358C124.695 353.078 124.28 352.938 123.711 352.938C123.347 352.938 123.053 352.994 122.829 353.106C122.605 353.209 122.432 353.353 122.311 353.54C122.199 353.717 122.119 353.918 122.073 354.142L120.855 354.1C120.911 353.699 121.046 353.33 121.261 352.994C121.475 352.649 121.779 352.373 122.171 352.168C122.563 351.953 123.048 351.846 123.627 351.846C124.271 351.846 124.812 351.963 125.251 352.196C125.689 352.429 126.021 352.761 126.245 353.19C126.478 353.61 126.595 354.119 126.595 354.716V354.926H125.363V354.716Z" fill={theme.on} />
				<rect x="51.5" y="333.5" width="85" height="41" rx="12.5" stroke={theme.border.light} />
			</g>
		</motion.g>
	);
};

export default Sources;