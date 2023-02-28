import { useRouter } from "next/router";
import NextImage from "next/image";

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
	// return <NextImage {...props} loading="lazy" src={`${router.basePath}${src}`} />
	return <img {...props} src={`${router.basePath}${src}`} />
}