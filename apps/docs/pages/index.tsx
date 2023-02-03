import { Button } from "ui";
import { getNavigation, Navigation } from "../lib/getNavigation";

type Props = {
	navigation: Navigation,
}

export default function Docs({ navigation }: Props) {
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

type StaticProps = {
	props: Props,
}

export function getStaticProps(): StaticProps {
	const navigation = getNavigation();

	return {
		props: {
			navigation,
		}
	}
}