import Head from "next/head";
import { Calendly, Hero } from "sections/DemoRequestConfirmation";

export default function DemoRequestConfirmation() {
	return (
		<>
			<Head>
				<title>Thanks for your interest! · Fennel</title>
				<meta name="description" content="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features." />
				<link rel="canonical" href="https://fennel.ai/demo-request-confirmation-page" />
			</Head>
			<main>
				<Hero />
				<Calendly />
			</main>
		</>
	)
}
