import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';

import { Button } from 'ui';

import ArrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Buttons/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

const VariantGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`;

const VariantItem = styled.div`
    background-color: ${({ theme }) => theme.glass};
    border: 0.5px solid rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    min-height: 10rem;
`;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
    <VariantGrid>
        <VariantItem>
            <Button {...args} shape="rounded" size="small" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} shape="rounded" size="small" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} direction="row-reverse" shape="rounded" size="small" />
        </VariantItem>
        <VariantItem>
            <Button {...args} shape="rounded" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} shape="rounded" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} direction="row-reverse" shape="rounded" />
        </VariantItem>
        <VariantItem>
            <Button {...args} shape="pill" size="small" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} shape="pill" size="small" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} direction="row-reverse" shape="pill" size="small" />
        </VariantItem>
        <VariantItem>
            <Button {...args} shape="pill" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} shape="pill" />
        </VariantItem>
        <VariantItem>
            <Button {...args} icon={<ArrowUpRightIcon />} direction="row-reverse" shape="pill" />
        </VariantItem>
    </VariantGrid>
);

export const FlatButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlatButton.args = {
  label: 'Button',
  color: 'neutral',
  variant: 'flat',
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  label: 'Button',
  color: 'neutral',
  variant: 'outline',
};

export const GhostButton = Template.bind({});
GhostButton.args = {
  label: 'Button',
  color: 'neutral',
  variant: 'ghost',
};

export const GlassButton = Template.bind({});
GlassButton.args = {
  label: 'Button',
  color: 'neutral',
  variant: 'glass',
};
