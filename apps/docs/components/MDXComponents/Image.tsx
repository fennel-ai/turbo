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
	return <NextImage {...props} loading="lazy" src={src} />
}