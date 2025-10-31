// Block and Element Type Definitions

export interface UnitValue {
	value: number;
	unit: 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw' | 'auto';
}

export interface BoxSpacing {
	top?: UnitValue;
	right?: UnitValue;
	bottom?: UnitValue;
	left?: UnitValue;
	all?: UnitValue;
}

export type ResponsiveValue<T> = {
	breakpoint_base?: T;
	breakpoint_tablet_landscape?: T;
	breakpoint_tablet_portrait?: T;
	breakpoint_phone_landscape?: T;
	breakpoint_phone_portrait?: T;
	[customBreakpoint: string]: T | undefined;
};

export interface SpacingProperties {
	margin?: ResponsiveValue<BoxSpacing>;
	padding?: ResponsiveValue<BoxSpacing>;
}

export interface TypographyProperties {
	font_family?: ResponsiveValue<string>;
	font_size?: ResponsiveValue<UnitValue>;
	font_weight?: ResponsiveValue<100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900>;
	font_style?: ResponsiveValue<'normal' | 'italic' | 'oblique'>;
	line_height?: ResponsiveValue<UnitValue>;
	letter_spacing?: ResponsiveValue<UnitValue>;
	text_align?: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>;
	text_transform?: ResponsiveValue<'none' | 'uppercase' | 'lowercase' | 'capitalize'>;
	text_decoration?: ResponsiveValue<'none' | 'underline' | 'overline' | 'line-through'>;
	color?: ResponsiveValue<string>;
}

export interface BackgroundProperties {
	type?: 'color' | 'gradient' | 'image' | 'video';
	color?: ResponsiveValue<string>;
	image?: ResponsiveValue<string>;
	size?: ResponsiveValue<string>;
	position?: ResponsiveValue<string>;
	repeat?: ResponsiveValue<string>;
	attachment?: ResponsiveValue<string>;
}

export interface BorderRadius {
	top_left?: UnitValue;
	top_right?: UnitValue;
	bottom_right?: UnitValue;
	bottom_left?: UnitValue;
	all?: UnitValue;
}

export interface BorderWidth {
	top?: UnitValue;
	right?: UnitValue;
	bottom?: UnitValue;
	left?: UnitValue;
	all?: UnitValue;
}

export interface BorderProperties {
	border_radius?: ResponsiveValue<BorderRadius>;
	border_width?: ResponsiveValue<BorderWidth>;
	border_color?: ResponsiveValue<string>;
	border_style?: ResponsiveValue<'none' | 'solid' | 'dashed' | 'dotted' | 'double'>;
}

export interface SizeProperties {
	width?: ResponsiveValue<UnitValue>;
	height?: ResponsiveValue<UnitValue>;
	min_width?: ResponsiveValue<UnitValue>;
	max_width?: ResponsiveValue<UnitValue>;
	min_height?: ResponsiveValue<UnitValue>;
	max_height?: ResponsiveValue<UnitValue>;
}

export interface PositionProperties {
	position?: ResponsiveValue<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
	top?: ResponsiveValue<UnitValue>;
	right?: ResponsiveValue<UnitValue>;
	bottom?: ResponsiveValue<UnitValue>;
	left?: ResponsiveValue<UnitValue>;
	z_index?: ResponsiveValue<number>;
}

export interface EffectsProperties {
	opacity?: ResponsiveValue<number>;
	box_shadow?: ResponsiveValue<string>;
	text_shadow?: ResponsiveValue<string>;
	transform?: ResponsiveValue<string>;
	filter?: ResponsiveValue<string>;
}

export interface LayoutProperties {
	display?: ResponsiveValue<
		'block' | 'flex' | 'grid' | 'inline' | 'inline-block' | 'inline-flex' | 'none'
	>;
	flex_direction?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
	justify_content?: ResponsiveValue<
		'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
	>;
	align_items?: ResponsiveValue<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>;
	gap?: ResponsiveValue<UnitValue>;
	grid_template_columns?: ResponsiveValue<string>;
	grid_template_rows?: ResponsiveValue<string>;
}

export interface GridProperties {
	items_per_row?: ResponsiveValue<number>;
	gap?: ResponsiveValue<UnitValue>;
}

export interface DesignProperties {
	layout?: LayoutProperties;
	spacing?: SpacingProperties;
	typography?: TypographyProperties;
	background?: BackgroundProperties;
	border?: BorderProperties;
	size?: SizeProperties;
	position?: PositionProperties;
	effects?: EffectsProperties;
	grid?: GridProperties;
}

export interface ContentProperties {
	text?: string;
	html?: string;
	tag?: string;
	url?: string;
	href?: string;
	target?: string;
	alt?: string;
	image?: {
		url?: string;
		alt?: string;
	};
	link?: {
		href?: string;
		target?: string;
	};
	items_per_row?: number;
	preset?: string;
	[key: string]: unknown;
}

export interface AdvancedSettings {
	html_id?: string;
	css_classes?: string[];
}

export interface SettingsProperties {
	advanced?: AdvancedSettings;
}

export interface ElementProperties {
	content?: ContentProperties;
	design?: DesignProperties;
	settings?: SettingsProperties;
}

export interface BuilderElement {
	id: string;
	type: string;
	parentId: string | null;
	properties: ElementProperties;
	children: BuilderElement[];
}

export interface PageStructure {
	id: string;
	elements: BuilderElement[];
}
