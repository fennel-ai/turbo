import { FormEventHandler, ForwardedRef, forwardRef, KeyboardEvent, useCallback } from 'react';
import { useForm, ChangeHandler, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { toast } from 'react-hot-toast';
import { haskoyVariable } from 'pages/_app';

import { media, rgba } from 'styles/utils';

import { Button } from 'ui';
import CalendarIcon from 'ui/icons/calendar.svg';

function hubspotCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

interface IFormData {
	name: string;
	email: string;
    company: string;
    jobtitle: string;
    webinarId: string;
}

const RegistrationForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	position: relative;

	& button {
		margin-top: 1rem;
		width: 100%;
	}
`;

const InputRoot = styled.div<{ required?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.25rem;
    color: ${({ theme }) => theme.on};

	& input, & select {
		background: none;
        border: none;
		height: 2.5rem;
        background-color: ${({ theme }) => theme.surface};
        box-shadow: 0 2px 4px -2px ${({ theme }) => rgba(theme.shadow, 0.16)}, 0 0 0 0.5px ${({ theme }) => theme.border};
		border-radius: 0.5rem;
		outline: none;
		padding: 0 0.75rem;
		appearance: none;
		font-family: ${haskoyVariable.style.fontFamily};
		font-size: 0.875rem;
		line-height: 1rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.primary.semibold};
	}

	& select:invalid {
		color: gray;
	}
	
	& label {
        position: relative;
		font-size: 0.875rem;
		line-height: 1.5rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.primary.semibold};
		align-self: flex-start;

        &::after {
            /* content: ${({ required }) => required ? "*" : ''}; */
            content: "*";
            font-size: 1rem;
            line-height: 1rem;
            position: absolute;
            right: -0.75rem;
            top: 50%;
            display: ${({ required }) => required ? 'block' : 'none' };
            transform: translateY(-30%);
        }
	}
`;

const HelperRow = styled.div`
	min-height: 1rem;
	p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.primary.semibold};
		color: ${({ theme }) => theme.error.accent};
	}
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    & h3 {
        font-size: 1.25rem;
        line-height: 1.5rem;
        margin: 0;
        font-weight: 700;
        font-variation-settings: "wght" 700;
        color: ${({ theme }) => theme.on};

        ${media('md')} {
            font-size: 1.5rem;
        }
    }

   ${media('md')} {
        align-items: flex-start;
        text-align: left;
    }  
`;

const DateLockup = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
    opacity: 0.64;

    & svg {
        width: 1rem;
        height: 1rem;

        ${media('md')} {
            width: 1rem;
            height: 1rem;
        }
    }

    & p {
        margin: 0;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 500;
        
        ${media('md')} {
            line-height: 1.5rem;
        }
    }
`;

const Input = forwardRef((
	{ 
		error,
		label,
		name,
		onBlur,
		onChange,
		placeholder,
        required,
	}: { 
		error?: FieldError 
		label: string, 
		name: string, 
		onBlur: ChangeHandler, 
		onChange: ChangeHandler,
		placeholder?: string, 
        required?: boolean,
	}, 
	ref: ForwardedRef<HTMLInputElement>
) => {
	return (
		<InputRoot required={required}>
			<label>{label}</label>
			<input ref={ref} name={name} onBlur={onBlur} onChange={onChange} placeholder={placeholder} />
			<HelperRow>{error ? <p>{error.message}</p> : null}</HelperRow>
		</InputRoot>
	);
});
Input.displayName = 'Input';

const validation = yup.object({
	name: yup.string().required('This is required.'),
	email: yup.string().email().required('This is required.'),
	jobtitle: yup.string().required('This is required.'),
	company: yup.string().required('This is required.'),
	webinarId: yup.string().required('This is required.'),
}).required();

const OpenDemoRegistrationForm = ({ onSubmit }: { onSubmit?: () => void }) => {
	const { formState: { errors }, register, handleSubmit, reset } = useForm<IFormData>({
		resolver: yupResolver(validation),
        defaultValues: {
            webinarId: '835 6721 6260'
        }
	});

    const submitForm: SubmitHandler<IFormData> = useCallback(async data => {
        try {
            await fetch('/api/open-demo-registration', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    pageUri: window.location.href,
                    hutk: hubspotCookie()
                })
            });

            reset();

            toast.success("Thanks for registering, See you in August!")
            onSubmit?.();
        } catch (error) {
            toast.error('Something went wrong! Please try again.')
        }
    }, [onSubmit, reset]);

	return (
        <RegistrationForm id='open_demo_registration' onSubmit={handleSubmit(submitForm)}>
            <Title>
                <h3>Register for Live Open Demo</h3>
                <DateLockup>
                    <CalendarIcon />
                    <p>Aug 6th 2024 · 9AM PST</p>
                </DateLockup>
            </Title>
			<Input {...register('name')} error={errors['name']} placeholder="Enter your name" label="Name" required />
			<Input {...register('email')} error={errors['email']} placeholder="Enter your work email" label="Email" required />
			<Input {...register('company')} error={errors['company']} placeholder="Which company do you work for?" label="Company" required />
			<Input {...register('jobtitle')} error={errors['jobtitle']} placeholder="What is your role?" label="Job Title" required />
            <Button color="primary" shape="pill" ariaLabel="Register for our Open Demo on August 6th" label="Register" type="submit" />
		</RegistrationForm>
	);
};

export default OpenDemoRegistrationForm;
