import type { BuilderElement } from '$lib/types/block';

export type FieldType =
	| 'text'
	| 'textarea'
	| 'number'
	| 'select'
	| 'color'
	| 'checkbox'
	| 'unit-value'
	| 'spacing';

export interface FieldOption {
	label: string;
	value: string | number;
}

export interface FieldConfig {
	key: string; // Property path like 'content.text' or 'design.typography.font_size.breakpoint_base.value'
	label: string;
	type: FieldType;
	placeholder?: string;
	description?: string;
	options?: FieldOption[]; // For select fields
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: unknown;
}

export interface FieldGroup {
	label: string;
	fields: FieldConfig[];
	defaultOpen?: boolean;
}

export interface BlockFieldConfig {
	content?: (FieldConfig | FieldGroup)[];
	design?: (FieldConfig | FieldGroup)[];
	advanced?: (FieldConfig | FieldGroup)[];
}

/**
 * Common advanced fields that apply to all blocks
 */
const COMMON_ADVANCED_FIELDS: FieldConfig[] = [
	{
		key: 'settings.advanced.html_id',
		label: 'HTML ID',
		type: 'text',
		placeholder: 'my-element-id',
		description: 'Unique ID attribute for this element'
	},
	{
		key: 'settings.advanced.css_classes',
		label: 'CSS Classes',
		type: 'text',
		placeholder: 'class-1 class-2',
		description: 'Custom CSS classes (space-separated)'
	}
];

/**
 * Get field configurations for a specific block type
 */
export const getBlockFieldConfig = (blockType: string): BlockFieldConfig => {
	const configs: Record<string, BlockFieldConfig> = {
		heading: {
			content: [
				{
					key: 'content.text',
					label: 'Heading Text',
					type: 'text',
					placeholder: 'Enter heading text',
					defaultValue: 'Heading'
				},
				{
					key: 'content.tag',
					label: 'HTML Tag',
					type: 'select',
					options: [
						{ label: 'H1', value: 'h1' },
						{ label: 'H2', value: 'h2' },
						{ label: 'H3', value: 'h3' },
						{ label: 'H4', value: 'h4' },
						{ label: 'H5', value: 'h5' },
						{ label: 'H6', value: 'h6' }
					],
					defaultValue: 'h2'
				}
			],
			design: [
				{
					key: 'design.typography.font_size.breakpoint_base.value',
					label: 'Font Size',
					type: 'number',
					min: 8,
					max: 200,
					step: 1,
					defaultValue: 32
				},
				{
					key: 'design.typography.font_weight.breakpoint_base',
					label: 'Font Weight',
					type: 'select',
					options: [
						{ label: 'Thin (100)', value: 100 },
						{ label: 'Extra Light (200)', value: 200 },
						{ label: 'Light (300)', value: 300 },
						{ label: 'Normal (400)', value: 400 },
						{ label: 'Medium (500)', value: 500 },
						{ label: 'Semi Bold (600)', value: 600 },
						{ label: 'Bold (700)', value: 700 },
						{ label: 'Extra Bold (800)', value: 800 },
						{ label: 'Black (900)', value: 900 }
					],
					defaultValue: 700
				},
				{
					key: 'design.typography.color.breakpoint_base',
					label: 'Text Color',
					type: 'color',
					defaultValue: '#000000'
				},
				{
					key: 'design.typography.text_align.breakpoint_base',
					label: 'Text Align',
					type: 'select',
					options: [
						{ label: 'Left', value: 'left' },
						{ label: 'Center', value: 'center' },
						{ label: 'Right', value: 'right' },
						{ label: 'Justify', value: 'justify' }
					],
					defaultValue: 'left'
				}
			]
		},
		text: {
			content: [
				{
					key: 'content.text',
					label: 'Text Content',
					type: 'textarea',
					placeholder: 'Enter text content',
					defaultValue: 'Text'
				}
			],
			design: [
				{
					key: 'design.typography.font_size.breakpoint_base.value',
					label: 'Font Size',
					type: 'number',
					min: 8,
					max: 200,
					step: 1,
					defaultValue: 16
				},
				{
					key: 'design.typography.color.breakpoint_base',
					label: 'Text Color',
					type: 'color',
					defaultValue: '#000000'
				},
				{
					key: 'design.typography.text_align.breakpoint_base',
					label: 'Text Align',
					type: 'select',
					options: [
						{ label: 'Left', value: 'left' },
						{ label: 'Center', value: 'center' },
						{ label: 'Right', value: 'right' },
						{ label: 'Justify', value: 'justify' }
					],
					defaultValue: 'left'
				}
			]
		},
		button: {
			content: [
				{
					key: 'content.text',
					label: 'Button Text',
					type: 'text',
					placeholder: 'Enter button text',
					defaultValue: 'Click me'
				},
				{
					key: 'content.link.href',
					label: 'Link URL',
					type: 'text',
					placeholder: 'https://example.com',
					defaultValue: '#'
				},
				{
					key: 'content.link.target',
					label: 'Link Target',
					type: 'select',
					options: [
						{ label: 'Same Tab', value: '_self' },
						{ label: 'New Tab', value: '_blank' }
					],
					defaultValue: '_self'
				}
			],
			design: [
				{
					key: 'design.background.color.breakpoint_base',
					label: 'Background Color',
					type: 'color',
					defaultValue: '#007bff'
				},
				{
					key: 'design.typography.color.breakpoint_base',
					label: 'Text Color',
					type: 'color',
					defaultValue: '#ffffff'
				},
				{
					key: 'design.border.border_radius.breakpoint_base.all.value',
					label: 'Border Radius',
					type: 'number',
					min: 0,
					max: 100,
					step: 1,
					defaultValue: 4
				}
			]
		},
		grid: {
			content: [
				{
					key: 'content.items_per_row',
					label: 'Items Per Row',
					type: 'number',
					min: 1,
					max: 12,
					step: 1,
					defaultValue: 4,
					description: 'Number of items to display in each row'
				}
			],
			design: [
				{
					key: 'design.layout.gap.breakpoint_base.value',
					label: 'Gap',
					type: 'number',
					min: 0,
					max: 200,
					step: 1,
					defaultValue: 20,
					description: 'Space between grid items'
				}
			]
		},
		column: {
			design: [
				{
					key: 'design.size.width.breakpoint_base.value',
					label: 'Width',
					type: 'number',
					min: 0,
					max: 100,
					step: 1,
					defaultValue: 100,
					description: 'Column width percentage'
				}
			]
		},
		div: {
			design: []
		},
		columns: {
			content: [
				{
					key: 'content.preset',
					label: 'Column Layout',
					type: 'select',
					options: [
						{ label: '50% / 50%', value: '50-50' },
						{ label: '33% / 33% / 33%', value: '33-33-33' },
						{ label: '25% / 25% / 25% / 25%', value: '25-25-25-25' },
						{ label: '33% / 66%', value: '33-66' },
						{ label: '66% / 33%', value: '66-33' },
						{ label: '25% / 75%', value: '25-75' },
						{ label: '75% / 25%', value: '75-25' }
					],
					defaultValue: '50-50'
				}
			],
			design: [
				{
					key: 'design.layout.gap.breakpoint_base.value',
					label: 'Gap',
					type: 'number',
					min: 0,
					max: 200,
					step: 1,
					defaultValue: 20,
					description: 'Space between columns'
				}
			]
		},
		section: {
			design: [
				{
					label: 'Layout',
					defaultOpen: true,
					fields: [
						{
							key: 'design.layout.display.breakpoint_base',
							label: 'Display',
							type: 'select',
							options: [
								{ label: 'Block', value: 'block' },
								{ label: 'Flex', value: 'flex' },
								{ label: 'Grid', value: 'grid' },
								{ label: 'Inline Block', value: 'inline-block' },
								{ label: 'None', value: 'none' }
							],
							defaultValue: 'block'
						},
						{
							key: 'design.layout.flex_direction.breakpoint_base',
							label: 'Flex Direction',
							type: 'select',
							options: [
								{ label: 'Row', value: 'row' },
								{ label: 'Column', value: 'column' },
								{ label: 'Row Reverse', value: 'row-reverse' },
								{ label: 'Column Reverse', value: 'column-reverse' }
							],
							defaultValue: 'row',
							description: 'Only applies when Display is set to Flex'
						},
						{
							key: 'design.layout.justify_content.breakpoint_base',
							label: 'Justify Content',
							type: 'select',
							options: [
								{ label: 'Flex Start', value: 'flex-start' },
								{ label: 'Center', value: 'center' },
								{ label: 'Flex End', value: 'flex-end' },
								{ label: 'Space Between', value: 'space-between' },
								{ label: 'Space Around', value: 'space-around' },
								{ label: 'Space Evenly', value: 'space-evenly' }
							],
							description: 'Only applies when Display is set to Flex'
						},
						{
							key: 'design.layout.align_items.breakpoint_base',
							label: 'Align Items',
							type: 'select',
							options: [
								{ label: 'Flex Start', value: 'flex-start' },
								{ label: 'Center', value: 'center' },
								{ label: 'Flex End', value: 'flex-end' },
								{ label: 'Stretch', value: 'stretch' },
								{ label: 'Baseline', value: 'baseline' }
							],
							description: 'Only applies when Display is set to Flex'
						},
						{
							key: 'design.layout.gap.breakpoint_base.value',
							label: 'Gap',
							type: 'number',
							min: 0,
							max: 200,
							step: 1,
							description: 'Space between child elements'
						}
					]
				},
				{
					label: 'Background',
					fields: [
						{
							key: 'design.background.type',
							label: 'Background Type',
							type: 'select',
							options: [
								{ label: 'Color', value: 'color' },
								{ label: 'Gradient', value: 'gradient' },
								{ label: 'Image', value: 'image' },
								{ label: 'Video', value: 'video' }
							],
							defaultValue: 'color'
						},
						{
							key: 'design.background.color.breakpoint_base',
							label: 'Background Color',
							type: 'color',
							defaultValue: 'transparent'
						}
					]
				},
				{
					label: 'Size',
					fields: [
						{
							key: 'design.size.width.breakpoint_base.value',
							label: 'Width',
							type: 'number',
							min: 0,
							max: 100,
							step: 1,
							description: 'Width as percentage'
						},
						{
							key: 'design.size.height.breakpoint_base.value',
							label: 'Height',
							type: 'number',
							min: 0,
							max: 2000,
							step: 1,
							description: 'Custom height in pixels'
						},
						{
							key: 'design.size.min_height.breakpoint_base.value',
							label: 'Min Height',
							type: 'number',
							min: 0,
							max: 2000,
							step: 1,
							description: 'Minimum height in pixels'
						}
					]
				},
				{
					label: 'Spacing',
					fields: [
						{
							key: 'design.spacing.padding.breakpoint_base.all.value',
							label: 'Padding (All Sides)',
							type: 'number',
							min: 0,
							max: 200,
							step: 1,
							defaultValue: 40
						},
						{
							key: 'design.spacing.margin.breakpoint_base.top.value',
							label: 'Margin Top',
							type: 'number',
							min: -200,
							max: 200,
							step: 1,
							defaultValue: 0
						},
						{
							key: 'design.spacing.margin.breakpoint_base.bottom.value',
							label: 'Margin Bottom',
							type: 'number',
							min: -200,
							max: 200,
							step: 1,
							defaultValue: 0
						}
					]
				},
				{
					label: 'Borders',
					fields: [
						{
							key: 'design.border.border_radius.breakpoint_base.all.value',
							label: 'Border Radius',
							type: 'number',
							min: 0,
							max: 200,
							step: 1,
							defaultValue: 0,
							description: 'Rounded corners'
						},
						{
							key: 'design.border.border_width.breakpoint_base.all.value',
							label: 'Border Width',
							type: 'number',
							min: 0,
							max: 20,
							step: 1,
							defaultValue: 0
						},
						{
							key: 'design.border.border_color.breakpoint_base',
							label: 'Border Color',
							type: 'color',
							defaultValue: '#000000'
						},
						{
							key: 'design.border.border_style.breakpoint_base',
							label: 'Border Style',
							type: 'select',
							options: [
								{ label: 'None', value: 'none' },
								{ label: 'Solid', value: 'solid' },
								{ label: 'Dashed', value: 'dashed' },
								{ label: 'Dotted', value: 'dotted' },
								{ label: 'Double', value: 'double' }
							],
							defaultValue: 'solid'
						}
					]
				}
			]
		}
	};

	const blockConfig = configs[blockType] || { content: [], design: [] };

	// Always include common advanced fields
	return {
		content: blockConfig.content || [],
		design: blockConfig.design || [],
		advanced: [...COMMON_ADVANCED_FIELDS, ...(blockConfig.advanced || [])]
	};
};

/**
 * Get value from nested object using dot notation path
 */
export const getNestedValue = (obj: unknown, path: string): unknown => {
	const keys = path.split('.');
	let current: unknown = obj;

	for (const key of keys) {
		if (current && typeof current === 'object' && key in current) {
			current = (current as Record<string, unknown>)[key];
		} else {
			return undefined;
		}
	}

	return current;
};

/**
 * Set value in nested object using dot notation path
 */
export const setNestedValue = (
	obj: Record<string, unknown>,
	path: string,
	value: unknown
): void => {
	const keys = path.split('.');
	const lastKey = keys.pop();

	if (!lastKey) return;

	let current: Record<string, unknown> = obj;

	for (const key of keys) {
		if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
			current[key] = {};
		}
		current = current[key] as Record<string, unknown>;
	}

	current[lastKey] = value;
};

/**
 * Check if item is a FieldGroup
 */
export const isFieldGroup = (item: FieldConfig | FieldGroup): item is FieldGroup => {
	return 'fields' in item && Array.isArray((item as FieldGroup).fields);
};

/**
 * Count total fields in an array (including fields inside groups)
 */
export const countFields = (items: (FieldConfig | FieldGroup)[]): number => {
	return items.reduce((count, item) => {
		if (isFieldGroup(item)) {
			return count + item.fields.length;
		}
		return count + 1;
	}, 0);
};
