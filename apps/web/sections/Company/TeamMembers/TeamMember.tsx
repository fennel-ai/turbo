import Image from 'next/image';
import styled from '@emotion/styled';

type Props = {
	additional?: string;
	name: string;
	role: string;
	src: string;
};

const Root = styled.div`
	color: ${({ theme }) => theme.on};
	cursor: pointer;
	user-select: none;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
`;

const Avatar = styled(Image)`
	background-color: rgba(235, 235, 250, 1);
	width: 100%;
	height: 224px;
	object-fit: cover;
	object-position: bottom center;
	border-radius: 0.25rem;
	filter: grayscale(1);
	transition: all 0.4s ease-in-out;

	&:hover {
		filter: grayscale(0.2);
	}
`;

const Text = styled.div`
	padding: 1rem 0;

	h3 {
		margin: 0;
		font-variation-settings: "wght" 500;
		font-size: 1.125rem;
		line-height: 1.5rem;
	}

	p {
		margin: 0;
		opacity: 0.8;
		color: theme.get(text-low);
		font-variation-settings: "wght" 400;
		font-size: 1rem;
		line-height: 1.5rem;
	}
`;

const Additional = styled.p`
	font-size: 0.875rem !important;
	line-height: 2rem !important;
`;

export const TeamMember = ({ additional, name, role, src }: Props) => {
	return (
		<Root>
			<Wrapper>
				<Avatar src={src} alt={`Headshot of ${name}`} width={298} height={224} />
				<Text>
					<h3>{name}</h3>
					<p>{role}</p>
					{additional ? <Additional>{additional}</Additional> : null}
				</Text>
			</Wrapper>
		</Root>
	);
};