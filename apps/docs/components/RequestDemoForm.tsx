import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { useForm, ChangeHandler, SubmitHandler } from 'react-hook-form';
import styled from '@emotion/styled';
import { Button } from 'ui';

enum RoleEnum {
	data_scientist = 'Data Scientist',
	engineer = 'Engineer',
	data_analyst = 'Data Analyst',
	data_architect = 'Data Architect',
	manager = 'Manager',
	other = 'Other',
}

interface IFormData {
	name: string;
	email: string;
	role: RoleEnum;
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1rem;

	& button {
		width: 100%;
	}
`;

const InputRoot = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.5rem;

	& input, & select {
		height: 2.5rem;
		border: 1px solid ${({ theme }) => theme.border};
		border-radius: 0.5rem;
		outline: none;
		padding: 0 0.75rem;
		appearance: none;
		font-family: ${({ theme }) => theme.fontFamilies.text};
		font-size: 0.875rem;
		line-height: 1rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
	}

	& select:invalid {
		color: gray;
	}
	
	& label {
		font-size: 0.875rem;
		line-height: 1.5rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
		align-self: flex-start;
	}
`;

const Input = forwardRef((
	{ label, ...props }: { name: string, label: string, placeholder?: string, onBlur: ChangeHandler, onChange: ChangeHandler }, 
	ref: ForwardedRef<HTMLInputElement>
) => {
	return (
		<InputRoot>
			<label>{label}</label>
			<input ref={ref} {...props} />
		</InputRoot>
	);
});
Input.displayName = 'Input';

const SelectInput = forwardRef((
	{ children, label, ...props }: PropsWithChildren<{ name: string, label: string, placeholder?: string, onBlur: ChangeHandler, onChange: ChangeHandler }>, 
	ref: ForwardedRef<HTMLSelectElement>
) => {
	return (
		<InputRoot>
			<label>{label}</label>
			<select ref={ref} {...props}>
				{children}
			</select>
		</InputRoot>
	);
});
SelectInput.displayName = 'SelectInput';

const RequestDemoForm = () => {
	const { register, handleSubmit } = useForm<IFormData>();

	const onSubmit: SubmitHandler<IFormData> = data => console.log('FORM DATA:', data);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register('name', { required: true })} placeholder="Enter your name" label="Name" />
			<Input {...register('email', { required: true })} placeholder="Enter your work email" label="Email" />
			<SelectInput {...register('role', { required: true })} label="What role best describes you?">
				<option value="data_scientist">Data Scientist</option>
				<option value="engineer">Engineer</option>
				<option value="data_analyst">Data Analyst</option>
				<option value="data_architect">Data Architect</option>
				<option value="manager">Manager</option>
				<option value="other">Other</option>
			</SelectInput>
			<Button label="Submit" type="submit" variant='pill' />
		</Form>
	);
};

export default RequestDemoForm;
