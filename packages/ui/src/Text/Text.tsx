import { Size, TEXT_COMPONENTS } from './variants';

interface Props {
    variant?: keyof typeof TEXT_COMPONENTS;
    size?: Size;
	children: string;
}


export const Text = ({ variant='body', size='m', children}: Props) => {
	const VariantText = TEXT_COMPONENTS[variant](size);
	return <VariantText>{children}</VariantText>
};