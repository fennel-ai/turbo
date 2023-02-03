import { Button } from "ui";
import { getNavigation } from "../lib/getNavigation";

export default function Docs({ navigation }) {
  return (
    <div>
      <h1>Docs</h1>
	  {
		navigation.map(({ title, slug, pages }) => (
			<ul key={slug}>
				<li>{title}</li>
				<ul>
					{pages.map(({ title, slug }) => (
						<li key={slug}>{title}</li>
					))}
				</ul>
			</ul>
		))
	  }
      <Button />
    </div>
  );
}

export function getStaticProps() {
	const navigation = getNavigation();

	return {
		props: {
			navigation,
		}
	}
}