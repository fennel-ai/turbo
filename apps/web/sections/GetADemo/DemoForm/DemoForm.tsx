import Image from 'next/image';
import { Container } from 'ui';
import { useRouter } from 'next/router';
import styles from './DemoForm.module.scss';
import RequestDemoForm from 'components/RequestDemoModal/RequestDemoForm';

export default function DemoForm() {
	const router = useRouter();
	return (
		<div className={styles.root}>
			<Container className={styles.container}>
				<div className={styles.formCard}>
					<h3>Get a demo</h3>
					<RequestDemoForm onSubmit={() => router.push("/demo-request-confirmation-page")} />
				</div>
				<div className={styles.logos}>
					<p>Backed by Top VCs and Unicorn Founders</p>
					<div className={styles.logo_row}>
						<span>
							<Image src="/images/foundation-dark.svg" alt="Foundation Capital Logo" width={152} height={48} />
						</span>
						<span>
							<Image src="/images/scribble-dark.svg" alt="Scribble Ventures Logo" width={136} height={48} />
						</span>
						<span>
							<Image src="/images/essence-dark.svg" alt="Essence Logo" width={152} height={28} />
						</span>
					</div>
					<div className={styles.logo_row}>
						<span>
							<Image src="/images/confluent.svg" alt="Confluent Logo" width={165} height={32} />
						</span>
						<span>
							<Image src="/images/quora.svg" alt="Quora Logo" width={144} height={40} />
						</span>
					</div>
				</div>
			</Container>
		</div>
	);
}