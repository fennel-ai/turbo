import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { useForm, ChangeHandler, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { toast } from 'react-hot-toast';
import { Button } from 'ui';
import { haskoyVariable } from 'pages/_app';

enum RoleEnum {
	'Data Scientist' = 'Data Scientist',
	'Engineer' = 'Engineer',
	'Data Analyst' = 'Data Analyst',
	'Data Archictect' = 'Data Architect',
	'Manager' = 'Manager',
	'Other' = 'Other',
}

interface IFormData {
	name: string;
	email: string;
	role: RoleEnum;
    referred_from: string;
    company: string;
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

	& input, & select {
		background: none;
		height: 2.5rem;
		border: 1px solid ${({ theme }) => theme.border};
		border-radius: 0.5rem;
		outline: none;
		padding: 0 0.75rem;
		appearance: none;
		font-family: ${haskoyVariable.style.fontFamily};
		font-size: 0.875rem;
		line-height: 1rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
	}

	& select:invalid {
		color: gray;
	}
	
	& label {
        position: relative;
		font-size: 0.875rem;
		line-height: 1.5rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
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
	min-height: 1.5rem;
	p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
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

const SelectInput = forwardRef((
	{ children, error, label, required, ...props }: PropsWithChildren<{ error?: FieldError, name: string, label: string, placeholder?: string, onBlur: ChangeHandler, onChange: ChangeHandler; required?: boolean; }>, 
	ref: ForwardedRef<HTMLSelectElement>
) => {
	return (
		<InputRoot required={required}>
			<label>{label}</label>
			<select ref={ref} {...props}>
				{children}
			</select>
			<HelperRow>{error ? <p>{error.message}</p> : null}</HelperRow>
		</InputRoot>
	);
});
SelectInput.displayName = 'SelectInput';

const validation = yup.object({
	name: yup.string().required('This is required.'),
	email: yup.string().email().required('This is required.'),
	role: yup.string().oneOf(Object.keys(RoleEnum)).required('This is required.'),
	company: yup.string(),
	referred_from: yup.string(),
}).required();

const RequestDemoForm = ({ onSubmit }: { onSubmit?: () => void }) => {
	const { formState: { errors }, register, handleSubmit, reset } = useForm<IFormData>({
		resolver: yupResolver(validation),
	});

	const submitForm: SubmitHandler<IFormData> = async data => {
		// console.log('FORM DATA:', data);
		try {
			fetch('/api/request-a-demo', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			reset();

			toast.success('Thank you for your interest! We will be in touch shortly.');
			onSubmit?.();
		} catch (error) {
			toast.error('Something went wrong! Please try again.')
		}
	};

	return (
		<Form onSubmit={handleSubmit(submitForm)}>
			<Input {...register('name')} error={errors['name']} placeholder="Enter your name" label="Name" required />
			<Input {...register('email')} error={errors['email']} placeholder="Enter your work email" label="Email" required />
			<SelectInput {...register('role')} error={errors['role']} label="What role best describes you?" required>
				<option value="Data Scientist">Data Scientist</option>
				<option value="Engineer">Engineer</option>
				<option value="Data Analyst">Data Analyst</option>
				<option value="Data Architect">Data Architect</option>
				<option value="Manager">Manager</option>
				<option value="Other">Other</option>
			</SelectInput>
			<Input {...register('company')} error={errors['company']} placeholder="Enter your company name" label="Company" />
			<Input {...register('referred_from')} error={errors['referred_from']} placeholder="e.g. a blog post" label="How did you hear about us?" />
			<Button ariaLabel="Submit the Demo Request" label="Submit" type="submit" />
		</Form>
	);
};

export default RequestDemoForm;
