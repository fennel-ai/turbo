import styled from '@emotion/styled';
import Image from 'next/image';

import { media } from 'styles/utils';

type AuthorBlockProps = {
    image: string;
    name: string;
    subtext: string;
}

const Root = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
`;

const Meta = styled.div`
    display: flex;
    flex-direction: column;

    & > h6 {
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 500;
        font-variation-settings: 'wght' 500;
        margin: 0;
    }

    & > p {
        font-size: 0.8125rem;
        line-height: 1rem;
        font-weight: 500;
        font-variation-settings: 'wght' 500;
        opacity: 0.64;
        margin: 0;
    }
`;

const Avatar = styled.div`
	background-color: ${({ theme }) => theme.primary.on};
    border: 0.5px solid ${({ theme }) => theme.color.purple['20']};
	height: 3rem;
    width: 3rem;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    & img {
        object-fit: cover;
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        height: 3.5rem;
        width: 3.5rem;
    }
`;

const AuthorBlock = ({
    image,
    name,
    subtext,
}: AuthorBlockProps) => {
    return (
        <Root>
            <Avatar>
                <Image src={image} alt={name} width={80} height={80} />
            </Avatar>
            <Meta>
                <h6>{name}</h6>
                <p>{subtext}</p>
            </Meta>
        </Root>
    )
};

export default AuthorBlock;