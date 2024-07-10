import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styled from '@emotion/styled';
import { useLocalStorage, useIsClient } from "@uidotdev/usehooks";

import { Button, Spinner, TitleBlock } from "ui";
import ArrowNarrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg'
import { media } from 'styles/utils';

type CachedPlayground = {
    id: string;
    name: string;
    url: string;
    createdAt: string;
}

const Main = styled.main`
    padding-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    background-color: ${({ theme }) => theme.surface};
`;

const LoadingSpinner = styled(Spinner)`
    stroke: ${({ theme }) => theme.primary.accent};
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 2.5rem;
`;

const IntroText = styled.p`
	padding: 0;
	color: ${({ theme }) => theme.on_alt};
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    max-width: 53.5rem;
	
	${media('md')} {
        padding-left: 7.5rem;
        padding-right: 7.5rem;
	}
`;

function ProvisionButton() {
    const [loading, setLoading] = useState<boolean>(false);
    let checked = useRef<boolean>(false);
    const [cached, setCached] = useLocalStorage<CachedPlayground | null>("playground", null);

    const checkPlayground = useCallback(async () => {
        if (!cached) {
            return;
        }
        try {
            const response = await fetch(`/api/playground/apps/check/${cached.name}`);
            const { expired }: { expired: boolean } = await response.json();

            if (expired) {
                toast("Your playground has expired.");
                setCached(null);
            }
        } catch (error) {
            console.error(error);
        }
    }, [setCached, cached]);

    useEffect(() => {
        if (checked.current) {
            return;
        }
        checked.current = true;
        checkPlayground();
    }, [checked, checkPlayground]);

    const handleRequestPlayground = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/playground/provision", { method: 'POST', headers: { "Content-Type": "application/json" } });
            const data = await response.json();

            if (data.error) {
                setLoading(false);
                toast.error("Failed to provision playground. Please try again.");
                return;
            }

            await new Promise<void>(res => setTimeout(() => res(), 6000));

            setCached({
                id: data.id,
                name: data.name,
                url: `https://${data.name}.fly.dev`,
                createdAt: data.createdAt,
            });
            window.open(`https://${data.name}.fly.dev`, "_blank");
            setLoading(false);

        } catch (_) {
            setLoading(false);
            toast.error("Failed to provision playground. Please try again.");
        }
    }, [setCached]);

    return (
        <ButtonWrapper>
            {
                cached?.url ? (
                    <Button icon={<ArrowNarrowUpRightIcon />} color="primary" shape='pill' onClick={() => window.open(cached.url, "_blank")} label="Go to Playground" />
                ) : loading ? (
                    <LoadingSpinner  background />
                ) : (
                    <Button shape='pill' disabled={loading} onClick={handleRequestPlayground} label="Request a Playground" />
                )
            }
        </ButtonWrapper>
    )
}

export default function Playground() {
    const isClient = useIsClient();
    
    return (
        <Main>
            <TitleBlock
                actions={[isClient ? <ProvisionButton /> : <Spinner />]}
                center
            >
                <h1>Playground</h1>
                <IntroText>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error et numquam assumenda voluptate nostrum quos possimus, neque quia, modi iure eius voluptas illum, enim quis tempora nihil.
                </IntroText>
            </TitleBlock>
        </Main>
    );
}
