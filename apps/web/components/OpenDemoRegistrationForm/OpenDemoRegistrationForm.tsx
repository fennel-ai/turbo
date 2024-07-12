import { ForwardedRef, forwardRef } from 'react';
import { useForm, ChangeHandler, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { toast } from 'react-hot-toast';
import { Button } from 'ui';
import { haskoyVariable } from 'pages/_app';
import { rgba } from 'styles/utils';

function hubspotCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

interface IFormData {
	name: string;
	email: string;
    company: string;
    jobtitle: string;
}

const Form = styled.form`
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
}).required();

const OpenDemoRegistrationForm = ({ onSubmit }: { onSubmit?: () => void }) => {
	const { formState: { errors }, register, handleSubmit, reset } = useForm<IFormData>({
		resolver: yupResolver(validation),
	});

	const submitForm: SubmitHandler<IFormData> = async data => {
		try {
			fetch('/api/open-demo-registration', {
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
	};

	return (
		<Form onSubmit={handleSubmit(submitForm)}>
			<Input {...register('name')} error={errors['name']} placeholder="Enter your name" label="Name" required />
			<Input {...register('email')} error={errors['email']} placeholder="Enter your work email" label="Email" required />
			<Input {...register('company')} error={errors['company']} placeholder="Which company do you work for?" label="Company" />
			<Input {...register('jobtitle')} error={errors['jobtitle']} placeholder="What is your role?" label="Job Title" />
			<Button color="primary" shape="pill" ariaLabel="Register for our Open Demo on August 6th" label="Register" type="submit" />
		</Form>
	);
};

export default OpenDemoRegistrationForm;
