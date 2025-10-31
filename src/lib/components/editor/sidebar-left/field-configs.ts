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

export interface BlockFieldConfig {
	content?: FieldConfig[];
	design?: FieldConfig[];
	advanced?: FieldConfig[];
}

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
					key: 'design.spacing.padding.breakpoint_base.all.value',
					label: 'Padding',
					type: 'number',
					min: 0,
					max: 200,
					step: 1,
					defaultValue: 40
				},
				{
					key: 'design.background.color.breakpoint_base',
					label: 'Background Color',
					type: 'color',
					defaultValue: 'transparent'
				}
			]
		}
	};

	return configs[blockType] || { content: [], design: [], advanced: [] };
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
export const setNestedValue = (obj: Record<string, unknown>, path: string, value: unknown): void => {
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

