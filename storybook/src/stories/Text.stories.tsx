import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';

import { Text } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Shared/Text',
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Text>;

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

const variants: Record<string, Partial<any>[]> = {
    'Display': [
        {
            variant: 'display',
            size: 'l',
        },
        {
            variant: 'display',
            size: 'm',
        },
    ],
    'Title': [
        {
            variant: 'title',
            size: 'l',
        },
        {
            variant: 'title',
            size: 'm',
        },
        {
            variant: 'title',
            size: 's',
        },
    ],
    'Subtitle': [
        {
            variant: 'subtitle',
            size: 'l',
        },
        {
            variant: 'subtitle',
            size: 'm',
        },
        {
            variant: 'subtitle',
            size: 's',
        },
    ],
    'Label': [
        {
            variant: 'label',
            size: 'l',
        },
        {
            variant: 'label',
            size: 'm',
        },
        {
            variant: 'label',
            size: 's',
        },
    ],
    'Body': [
        {
            variant: 'body',
            size: 'l',
        },
        {
            variant: 'body',
            size: 'm',
        },
        {
            variant: 'body',
            size: 's',
        },
    ],
    'Code': [
        {
            variant: 'code',
            size: 'm',
        },
        {
            variant: 'code',
            size: 's',
        },
    ],
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = (args) => (
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
                                <Text {...args} {...props}>Hello My Name is Rahul</Text>
                            </VariantItem>
                        ))
                    }
                </>
            ))
        }
    </VariantGrid>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args