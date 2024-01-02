import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';

import { Button, ButtonProps } from 'ui';

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

const VariantSection = styled.div`
    grid-column: span 3;
    & h4 {
        margin: 0;
        margin-top: 1rem;
    }
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

const variants: Record<string, Partial<ButtonProps>[]> = {
    'Rounded / Small': [
        {
            shape: 'rounded',
            size: 'small',
        },
        {
            icon: <ArrowUpRightIcon />,
            shape: 'rounded',
            size: 'small',
        },
        {
            direction: 'row-reverse',
            icon: <ArrowUpRightIcon />,
            shape: 'rounded',
            size: 'small',
        }
    ],
    'Rounded / Large': [
        {
            shape: 'rounded',
            size: 'large'
        },
        {
            icon: <ArrowUpRightIcon />,
            shape: 'rounded',
            size: 'large'
        },
        {
            direction: 'row-reverse',
            icon: <ArrowUpRightIcon />,
            shape: 'rounded',
            size: 'large'
        }
    ],
    'Pill / Small': [
        {
            shape: 'pill',
            size: 'small',
        },
        {
            icon: <ArrowUpRightIcon />,
            shape: 'pill',
            size: 'small',
        },
        {
            direction: 'row-reverse',
            icon: <ArrowUpRightIcon />,
            shape: 'pill',
            size: 'small',
        }
    ],
    'Pill / Large': [
        {
            shape: 'pill',
            size: 'large'
        },
        {
            icon: <ArrowUpRightIcon />,
            shape: 'pill',
            size: 'large'
        },
        {
            direction: 'row-reverse',
            icon: <ArrowUpRightIcon />,
            shape: 'pill',
            size: 'large'
        }
    ],
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
    <VariantGrid>
        {
            Object.entries(variants).map(([title, components]) => (
                <>
                    <VariantSection>
                        <h4>{title}</h4>
                    </VariantSection>
                    {
                        components.map((props, i) => (
                            <VariantItem key={i}>
                                <Button {...args} {...props} />
                            </VariantItem>
                        ))
                    }
                </>
            ))
        }
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
