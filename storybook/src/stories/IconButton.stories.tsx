import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconButton, type IconButtonProps } from 'ui';
import DefaultIcon from 'ui/icons/help-circle.svg';
import { VariantGrid, VariantItem, VariantSection } from './shared/VariantPresentation';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Buttons/IconButton',
	component: IconButton,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof IconButton>;

const variants: Record<string, Partial<IconButtonProps>[]> = {
    'Sizes': [
        {
            size: 'small',
        },
        {
            size: 'default',
        },
        {
            size: 'large',
        }
    ],
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconButton> = (args) => (
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
                                <IconButton {...args} {...props} />
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
Default.args = {
	icon: DefaultIcon,
};
