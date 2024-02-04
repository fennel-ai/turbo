import { SubmittableInput} from '../Inputs/SubmittableInput';
import styled from '@emotion/styled';
import { useRef } from 'react';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';

const validation = yup.object({
	email: yup.string().email().required('This is required.'),
}).required();

const SubmittableInputSubText = styled.p`
        margin-top: 0.25rem !important;
        margin-left: 0.25rem !important;
        font-size: 0.8125rem !important;
        line-height: 1rem;
        color: ${({ theme }) => theme.on};
        opacity: 0.64;
`

function hubspotCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

export const SubscribeToNewsletter = ({ onSubscribe, fill }: { onSubscribe?: () => void, fill?: boolean }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        const email = inputRef.current ? inputRef.current.value : ''
        validation.validate({email}).then(async () => {
            try {
                const response = await fetch('/api/subscribe-to-newsletter', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        pageUri: window.location.href,
                        hutk: hubspotCookie()
                    })
                });
                if(response.status!==200) {
                    throw new Error()
                }
                toast.success(`Thank you for your interest! You are now subscribed to Fennel AI's newsletter`);
                onSubscribe?.()
            } catch (error) {
                toast.error('Something went wrong! Please try again.')
            }
        }).catch((e) => {
            toast.error('Not a valid email id')
        });
    }

	return (
    <div onClick={(e)=>e.stopPropagation()}>
        <SubmittableInput variant={fill ? 'flat': 'ghost'} size="large" placeholder={"Enter your email"} ref={inputRef} onButtonClick={onButtonClick} fill={fill}/>
        <SubmittableInputSubText>You can unsubscribe at any time.</SubmittableInputSubText>
     </div>
	);
};

