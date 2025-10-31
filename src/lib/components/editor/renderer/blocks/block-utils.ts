import type { BuilderElement, DesignProperties, UnitValue, BoxSpacing } from '$lib/types/block';
import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Creates a click handler that stops propagation and selects the element
 */
export const createClickHandler = (elementId: string) => {
	return (e: MouseEvent) => {
		e.stopPropagation();
		editorManager.selectElement(elementId);
	};
};

/**
 * Creates a keyboard handler for container blocks
 */
export const createKeyDownHandler = (elementId: string) => {
	return (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();
			editorManager.selectElement(elementId);
		}
	};
};

// ============================================================================
// SELECTION STATE
// ============================================================================

/**
 * Checks if an element is currently selected
 */
export const isElementSelected = (elementId: string): boolean => {
	return editorManager.selectedElementId === elementId;
};

// ============================================================================
// STYLE EXTRACTION UTILITIES
// ============================================================================

type Breakpoint = 'breakpoint_base'; // Can extend later for responsive

/**
 * Extract typography styles from design properties
 */
export const extractTypographyStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.typography) return styles;

	const typo = design.typography;

	// Font size
	if (typo.font_size?.[breakpoint]) {
		const size = typo.font_size[breakpoint];
		styles.push(`font-size: ${size.value}${size.unit}`);
	}

	// Font weight
	if (typo.font_weight?.[breakpoint]) {
		styles.push(`font-weight: ${typo.font_weight[breakpoint]}`);
	}

	// Font family
	if (typo.font_family?.[breakpoint]) {
		styles.push(`font-family: ${typo.font_family[breakpoint]}`);
	}

	// Text color
	if (typo.color?.[breakpoint]) {
		styles.push(`color: ${typo.color[breakpoint]}`);
	}

	// Text align
	if (typo.text_align?.[breakpoint]) {
		styles.push(`text-align: ${typo.text_align[breakpoint]}`);
	}

	// Text decoration
	if (typo.text_decoration?.[breakpoint]) {
		styles.push(`text-decoration: ${typo.text_decoration[breakpoint]}`);
	}

	// Text transform
	if (typo.text_transform?.[breakpoint]) {
		styles.push(`text-transform: ${typo.text_transform[breakpoint]}`);
	}

	// Line height (can be unitless or with unit)
	if (typo.line_height?.[breakpoint]) {
		const lh = typo.line_height[breakpoint];
		// Line height is typically unitless (e.g., 1.5) or with em/rem
		const unit = lh.unit && lh.unit !== 'px' ? lh.unit : '';
		styles.push(`line-height: ${lh.value}${unit}`);
	}

	// Letter spacing (defaults to px if no unit)
	if (typo.letter_spacing?.[breakpoint]) {
		const ls = typo.letter_spacing[breakpoint];
		const unit = ls.unit || 'px';
		styles.push(`letter-spacing: ${ls.value}${unit}`);
	}

	return styles;
};

/**
 * Extract spacing styles (padding or margin)
 */
export const extractSpacingStyles = (
	design?: DesignProperties,
	property: 'padding' | 'margin' = 'padding',
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.spacing?.[property]?.[breakpoint]) return styles;

	const spacing = design.spacing[property][breakpoint] as BoxSpacing;

	if (spacing.all) {
		styles.push(`${property}: ${spacing.all.value}${spacing.all.unit}`);
	} else {
		if (spacing.top) {
			styles.push(`${property}-top: ${spacing.top.value}${spacing.top.unit}`);
		}
		if (spacing.right) {
			styles.push(`${property}-right: ${spacing.right.value}${spacing.right.unit}`);
		}
		if (spacing.bottom) {
			styles.push(`${property}-bottom: ${spacing.bottom.value}${spacing.bottom.unit}`);
		}
		if (spacing.left) {
			styles.push(`${property}-left: ${spacing.left.value}${spacing.left.unit}`);
		}
	}

	return styles;
};

/**
 * Extract background styles
 */
export const extractBackgroundStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.background) return styles;

	const bg = design.background;

	// Background color
	if (bg.color?.[breakpoint]) {
		styles.push(`background-color: ${bg.color[breakpoint]}`);
	}

	// Background image
	if (bg.image?.[breakpoint]) {
		styles.push(`background-image: url(${bg.image[breakpoint]})`);
	}

	// Background size
	if (bg.size?.[breakpoint]) {
		styles.push(`background-size: ${bg.size[breakpoint]}`);
	}

	// Background position
	if (bg.position?.[breakpoint]) {
		styles.push(`background-position: ${bg.position[breakpoint]}`);
	}

	// Background repeat
	if (bg.repeat?.[breakpoint]) {
		styles.push(`background-repeat: ${bg.repeat[breakpoint]}`);
	}

	// Background attachment
	if (bg.attachment?.[breakpoint]) {
		styles.push(`background-attachment: ${bg.attachment[breakpoint]}`);
	}

	return styles;
};

/**
 * Extract border styles
 */
export const extractBorderStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.border) return styles;

	const border = design.border;

	// Border radius
	if (border.border_radius?.[breakpoint]) {
		const radius = border.border_radius[breakpoint];
		if (radius.all) {
			styles.push(`border-radius: ${radius.all.value}${radius.all.unit}`);
		} else {
			if (radius.top_left) {
				styles.push(`border-top-left-radius: ${radius.top_left.value}${radius.top_left.unit}`);
			}
			if (radius.top_right) {
				styles.push(`border-top-right-radius: ${radius.top_right.value}${radius.top_right.unit}`);
			}
			if (radius.bottom_right) {
				styles.push(
					`border-bottom-right-radius: ${radius.bottom_right.value}${radius.bottom_right.unit}`
				);
			}
			if (radius.bottom_left) {
				styles.push(
					`border-bottom-left-radius: ${radius.bottom_left.value}${radius.bottom_left.unit}`
				);
			}
		}
	}

	// Border width
	if (border.border_width?.[breakpoint]) {
		const width = border.border_width[breakpoint];
		if (width.all) {
			styles.push(`border-width: ${width.all.value}${width.all.unit}`);
		}
	}

	// Border color
	if (border.border_color?.[breakpoint]) {
		styles.push(`border-color: ${border.border_color[breakpoint]}`);
	}

	// Border style
	if (border.border_style?.[breakpoint]) {
		styles.push(`border-style: ${border.border_style[breakpoint]}`);
	}

	return styles;
};

/**
 * Extract size styles (width, height)
 */
export const extractSizeStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.size) return styles;

	const size = design.size;

	// Width
	if (size.width?.[breakpoint]) {
		const w = size.width[breakpoint];
		styles.push(`width: ${w.value}${w.unit}`);
	}

	// Min width
	if (size.min_width?.[breakpoint]) {
		const mw = size.min_width[breakpoint];
		styles.push(`min-width: ${mw.value}${mw.unit}`);
	}

	// Max width
	if (size.max_width?.[breakpoint]) {
		const mxw = size.max_width[breakpoint];
		styles.push(`max-width: ${mxw.value}${mxw.unit}`);
	}

	// Height
	if (size.height?.[breakpoint]) {
		const h = size.height[breakpoint];
		styles.push(`height: ${h.value}${h.unit}`);
	}

	// Min height
	if (size.min_height?.[breakpoint]) {
		const mh = size.min_height[breakpoint];
		styles.push(`min-height: ${mh.value}${mh.unit}`);
	}

	// Max height
	if (size.max_height?.[breakpoint]) {
		const mxh = size.max_height[breakpoint];
		styles.push(`max-height: ${mxh.value}${mxh.unit}`);
	}

	return styles;
};

/**
 * Extract layout styles
 */
export const extractLayoutStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.layout) return styles;

	const layout = design.layout;

	// Display
	if (layout.display?.[breakpoint]) {
		styles.push(`display: ${layout.display[breakpoint]}`);
	}

	// Flexbox
	if (layout.flex_direction?.[breakpoint]) {
		styles.push(`flex-direction: ${layout.flex_direction[breakpoint]}`);
	}

	if (layout.justify_content?.[breakpoint]) {
		styles.push(`justify-content: ${layout.justify_content[breakpoint]}`);
	}

	if (layout.align_items?.[breakpoint]) {
		styles.push(`align-items: ${layout.align_items[breakpoint]}`);
	}

	if (layout.gap?.[breakpoint]) {
		const gap = layout.gap[breakpoint];
		styles.push(`gap: ${gap.value}${gap.unit}`);
	}

	// Grid
	if (layout.grid_template_columns?.[breakpoint]) {
		styles.push(`grid-template-columns: ${layout.grid_template_columns[breakpoint]}`);
	}

	if (layout.grid_template_rows?.[breakpoint]) {
		styles.push(`grid-template-rows: ${layout.grid_template_rows[breakpoint]}`);
	}

	return styles;
};

/**
 * Extract grid styles (for grid block with items_per_row)
 */
export const extractGridStyles = (
	design?: DesignProperties,
	itemsPerRow: number = 4,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	styles.push('display: grid');

	// Grid items per row
	const gridItemsPerRow = design?.grid?.items_per_row?.[breakpoint] || itemsPerRow;
	styles.push(`grid-template-columns: repeat(${gridItemsPerRow}, 1fr)`);

	// Gap (check both grid.gap and layout.gap)
	const gridGap = design?.grid?.gap?.[breakpoint];
	const layoutGap = design?.layout?.gap?.[breakpoint];
	const gap = gridGap || layoutGap;

	if (gap) {
		styles.push(`gap: ${gap.value}${gap.unit}`);
	}

	return styles;
};

/**
 * Extract position styles
 */
export const extractPositionStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.position) return styles;

	const pos = design.position;

	// Position
	if (pos.position?.[breakpoint]) {
		styles.push(`position: ${pos.position[breakpoint]}`);
	}

	// Top, Right, Bottom, Left
	if (pos.top?.[breakpoint]) {
		const t = pos.top[breakpoint];
		styles.push(`top: ${t.value}${t.unit}`);
	}

	if (pos.right?.[breakpoint]) {
		const r = pos.right[breakpoint];
		styles.push(`right: ${r.value}${r.unit}`);
	}

	if (pos.bottom?.[breakpoint]) {
		const b = pos.bottom[breakpoint];
		styles.push(`bottom: ${b.value}${b.unit}`);
	}

	if (pos.left?.[breakpoint]) {
		const l = pos.left[breakpoint];
		styles.push(`left: ${l.value}${l.unit}`);
	}

	// Z-index
	if (pos.z_index?.[breakpoint]) {
		styles.push(`z-index: ${pos.z_index[breakpoint]}`);
	}

	return styles;
};

/**
 * Extract effects styles
 */
export const extractEffectsStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string[] => {
	const styles: string[] = [];

	if (!design?.effects) return styles;

	const effects = design.effects;

	// Opacity
	if (effects.opacity?.[breakpoint]) {
		styles.push(`opacity: ${effects.opacity[breakpoint]}`);
	}

	// Box shadow
	if (effects.box_shadow?.[breakpoint]) {
		styles.push(`box-shadow: ${effects.box_shadow[breakpoint]}`);
	}

	// Text shadow
	if (effects.text_shadow?.[breakpoint]) {
		styles.push(`text-shadow: ${effects.text_shadow[breakpoint]}`);
	}

	// Transform
	if (effects.transform?.[breakpoint]) {
		styles.push(`transform: ${effects.transform[breakpoint]}`);
	}

	// Filter
	if (effects.filter?.[breakpoint]) {
		styles.push(`filter: ${effects.filter[breakpoint]}`);
	}

	return styles;
};

/**
 * Combines multiple style arrays into a single inline style string
 */
export const combineStyles = (...styleArrays: string[][]): string => {
	return styleArrays.flat().filter(Boolean).join('; ');
};

/**
 * Extract all common styles from design properties
 */
export const extractAllStyles = (
	design?: DesignProperties,
	breakpoint: Breakpoint = 'breakpoint_base'
): string => {
	return combineStyles(
		extractLayoutStyles(design, breakpoint),
		extractTypographyStyles(design, breakpoint),
		extractSpacingStyles(design, 'padding', breakpoint),
		extractSpacingStyles(design, 'margin', breakpoint),
		extractBackgroundStyles(design, breakpoint),
		extractBorderStyles(design, breakpoint),
		extractSizeStyles(design, breakpoint),
		extractPositionStyles(design, breakpoint),
		extractEffectsStyles(design, breakpoint)
	);
};

// ============================================================================
// CSS CLASS UTILITIES
// ============================================================================

/**
 * Base editor classes for all blocks
 */
const BASE_CLASSES = 'relative transition-all duration-150';

/**
 * Selection state classes
 */
const SELECTED_CLASSES = 'ring-2 ring-blue-500';

/**
 * Hover state classes for non-selected leaf blocks
 */
const LEAF_HOVER_CLASSES =
	'hover:outline hover:outline-2 hover:outline-dashed hover:outline-gray-400 hover:outline-offset-2';

/**
 * Hover state classes for non-selected container blocks
 */
const CONTAINER_HOVER_CLASSES = '!border-dashed hover:!border-blue-400';

/**
 * Get CSS classes for leaf blocks
 */
export const getLeafBlockClasses = (isSelected: boolean): string => {
	const classes = [BASE_CLASSES, 'cursor-pointer rounded px-1'];

	if (isSelected) {
		classes.push(SELECTED_CLASSES);
	} else {
		classes.push(LEAF_HOVER_CLASSES);
	}

	return classes.join(' ');
};

/**
 * Get CSS classes for container blocks
 */
export const getContainerBlockClasses = (isSelected: boolean): string => {
	const classes = [BASE_CLASSES, 'min-h-[100px] border-2 border-transparent'];

	if (isSelected) {
		classes.push(SELECTED_CLASSES);
	} else {
		classes.push(CONTAINER_HOVER_CLASSES);
	}

	return classes.join(' ');
};

// ============================================================================
// CONTENT EXTRACTION UTILITIES
// ============================================================================

/**
 * Extract text content with fallback
 */
export const getTextContent = (element: BuilderElement, fallback = 'Text'): string => {
	return element.properties.content?.text || fallback;
};

/**
 * Extract tag from content properties
 */
export const getTag = (element: BuilderElement, fallback = 'div'): string => {
	return element.properties.content?.tag || fallback;
};

/**
 * Extract URL from content properties
 */
export const getUrl = (element: BuilderElement, fallback = '#'): string => {
	return element.properties.content?.url || fallback;
};

/**
 * Extract image URL from content properties
 */
export const getImageUrl = (element: BuilderElement, fallback = ''): string => {
	return element.properties.content?.image?.url || fallback;
};

/**
 * Extract alt text from content properties
 */
export const getAltText = (element: BuilderElement, fallback = ''): string => {
	return element.properties.content?.image?.alt || element.properties.content?.alt || fallback;
};

/**
 * Extract href from content properties
 */
export const getHref = (element: BuilderElement, fallback = '#'): string => {
	return element.properties.content?.link?.href || element.properties.content?.href || fallback;
};

/**
 * Extract target from content properties
 */
export const getTarget = (element: BuilderElement, fallback = '_self'): string => {
	return element.properties.content?.link?.target || element.properties.content?.target || fallback;
};

/**
 * Extract items per row from content properties
 */
export const getItemsPerRow = (element: BuilderElement, fallback = 4): number => {
	return element.properties.content?.items_per_row || fallback;
};

/**
 * Extract preset from content properties
 */
export const getPreset = (element: BuilderElement, fallback = '50-50'): string => {
	return element.properties.content?.preset || fallback;
};

// ============================================================================
// ADVANCED SETTINGS UTILITIES
// ============================================================================

/**
 * Get HTML ID from advanced settings
 */
export const getHtmlId = (element: BuilderElement): string | undefined => {
	return element.properties.settings?.advanced?.html_id;
};

/**
 * Get CSS classes from advanced settings
 */
export const getCssClasses = (element: BuilderElement): string => {
	const classes = element.properties.settings?.advanced?.css_classes;
	return Array.isArray(classes) ? classes.join(' ') : '';
};
