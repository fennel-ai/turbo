import NextImage from "next/image";
import { useRouter } from "next/router";

type Props = {
	alt: string;
	src: string;
	width: number;
	height: number;
}

export const Image = ({
	src,
	...props
}: Props) => {
	const router = useRouter();

	return <NextImage {...props} loading="lazy" src={router.basePath ? `${router.basePath}${src}` : src} />
}