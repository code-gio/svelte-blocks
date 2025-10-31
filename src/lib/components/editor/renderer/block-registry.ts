import type { Component } from 'svelte';
import type { BuilderElement } from '$lib/types/editor';
import SectionBlock from './blocks/section-block.svelte';
import HeadingBlock from './blocks/heading-block.svelte';
import TextBlock from './blocks/text-block.svelte';
import ButtonBlock from './blocks/button-block.svelte';

type BlockComponent = Component<{ element: BuilderElement }>;

import {
	type Icon as IconType,
	Activity,
	ArrowUp,
	BarChart,
	Bell,
	BookOpen,
	Box,
	Calendar,
	CheckSquare,
	Circle,
	Clock,
	Code,
	Columns,
	Crop,
	Move,
	DollarSign,
	Facebook,
	FileText,
	Film,
	FolderOpen,
	RectangleEllipsis,
	Globe,
	Grid,
	Grip,
	Hash,
	Heading,
	HelpCircle,
	Image,
	Images,
	Info,
	Instagram,
	Layers,
	Layout,
	Link,
	List,
	ListChecks,
	Loader,
	Map,
	Megaphone,
	MessageCircle,
	MessageSquare,
	Minus,
	MousePointer,
	MoveHorizontal,
	PanelLeft,
	PieChart,
	Quote,
	Repeat,
	Scroll,
	Settings,
	Share,
	Share2,
	Sparkles,
	Square,
	Star,
	Tag,
	Twitter,
	Type,
	Video,
	Zap,
	ZoomIn
} from '@lucide/svelte';

export interface Block {
	id: string;
	name: string;
	description: string;
	icon: typeof IconType;
	category: string;
	component?: string;
	defaultProps?: Record<string, unknown>;
	previewImage?: string;
	tags?: string[];
	isPro?: boolean;
}

export interface BlockCategory {
	id: string;
	name: string;
	icon: typeof IconType;
	description?: string;
	blocks: Block[];
}

export const BLOCK_CATEGORIES: BlockCategory[] = [
	{
		id: 'basic',
		name: 'Basic',
		icon: Layout,
		description: 'Essential building blocks for your website',
		blocks: [
			{
				id: 'section',
				name: 'Section',
				description: 'Container section for organizing content',
				icon: Square,
				category: 'basic',
				tags: ['container', 'layout']
			},
			{
				id: 'columns',
				name: 'Columns',
				description: 'Multi-column layout container',
				icon: Columns,
				category: 'basic',
				tags: ['layout', 'grid']
			},
			{
				id: 'grid',
				name: 'Grid',
				description: 'Responsive grid layout',
				icon: Grid,
				category: 'basic',
				tags: ['layout']
			},
			{
				id: 'div',
				name: 'Div',
				description: 'Generic container block',
				icon: Box,
				category: 'basic',
				tags: ['container']
			},
			{
				id: 'heading',
				name: 'Heading',
				description: 'Text heading (H1-H6)',
				icon: Heading,
				category: 'basic',
				tags: ['text', 'typography']
			},
			{
				id: 'text',
				name: 'Text',
				description: 'Simple text paragraph',
				icon: Type,
				category: 'basic',
				tags: ['text', 'typography']
			},
			{
				id: 'rich-text',
				name: 'Rich Text',
				description: 'Formatted rich text editor',
				icon: FileText,
				category: 'basic',
				tags: ['text', 'typography', 'editor']
			},
			{
				id: 'text-link',
				name: 'Text Link',
				description: 'Clickable text link',
				icon: Link,
				category: 'basic',
				tags: ['text', 'navigation']
			},
			{
				id: 'button',
				name: 'Button',
				description: 'Interactive button element',
				icon: MousePointer,
				category: 'basic',
				tags: ['interactive', 'cta']
			},
			{
				id: 'image',
				name: 'Image',
				description: 'Single image block',
				icon: Image,
				category: 'basic',
				tags: ['media']
			},
			{
				id: 'video',
				name: 'Video',
				description: 'Video embed or upload',
				icon: Video,
				category: 'basic',
				tags: ['media']
			},
			{
				id: 'icon',
				name: 'Icon',
				description: 'Single icon element',
				icon: Star,
				category: 'basic',
				tags: ['visual']
			}
		]
	},
	{
		id: 'content-media',
		name: 'Content & Media',
		icon: Image,
		description: 'Advanced media and content blocks',
		blocks: [
			{
				id: 'gallery',
				name: 'Gallery',
				description: 'Image gallery with lightbox',
				icon: Images,
				category: 'content-media',
				tags: ['media', 'images']
			},
			{
				id: 'image-box',
				name: 'Image Box',
				description: 'Image with overlay content',
				icon: Image,
				category: 'content-media',
				tags: ['media', 'card']
			},
			{
				id: 'overlapped-images',
				name: 'Overlapped Images',
				description: 'Stacked overlapping images',
				icon: Layers,
				category: 'content-media',
				tags: ['media', 'images', 'creative']
			},
			{
				id: 'image-accordion',
				name: 'Image Accordion',
				description: 'Expandable image panels',
				icon: PanelLeft,
				category: 'content-media',
				tags: ['media', 'images', 'interactive']
			},
			{
				id: 'image-hover-card',
				name: 'Image Hover Card',
				description: 'Image card with hover effects',
				icon: Image,
				category: 'content-media',
				tags: ['media', 'card', 'interactive']
			},
			{
				id: 'image-with-zoom',
				name: 'Image With Zoom',
				description: 'Zoomable image on hover',
				icon: ZoomIn,
				category: 'content-media',
				tags: ['media', 'interactive']
			},
			{
				id: 'image-comparison',
				name: 'Image Comparison',
				description: 'Before/after image slider',
				icon: Columns,
				category: 'content-media',
				tags: ['media', 'interactive']
			},
			{
				id: 'scrolling-image',
				name: 'Scrolling Image',
				description: 'Scroll-triggered image reveal',
				icon: Scroll,
				category: 'content-media',
				tags: ['media', 'animation']
			},
			{
				id: 'lottie-animation',
				name: 'Lottie Animation',
				description: 'Lottie animation player',
				icon: Film,
				category: 'content-media',
				tags: ['animation', 'media']
			},
			{
				id: 'masker',
				name: 'Masker',
				description: 'Image masking effects',
				icon: Crop,
				category: 'content-media',
				tags: ['media', 'creative']
			}
		]
	},
	{
		id: 'lists-navigation',
		name: 'Lists & Navigation',
		icon: List,
		description: 'Lists, navigation, and organizational elements',
		blocks: [
			{
				id: 'basic-list',
				name: 'Basic List',
				description: 'Simple unordered or ordered list',
				icon: List,
				category: 'lists-navigation',
				tags: ['list', 'content']
			},
			{
				id: 'icon-list',
				name: 'Icon List',
				description: 'List items with icons',
				icon: ListChecks,
				category: 'lists-navigation',
				tags: ['list', 'icons']
			},
			{
				id: 'checkmark-list',
				name: 'Checkmark List',
				description: 'List with checkmark icons',
				icon: CheckSquare,
				category: 'lists-navigation',
				tags: ['list', 'features']
			},
			{
				id: 'logo-list',
				name: 'Logo List',
				description: 'Grid or list of logos',
				icon: Grip,
				category: 'lists-navigation',
				tags: ['list', 'logos', 'brands']
			},
			{
				id: 'table-of-contents',
				name: 'Table Of Contents',
				description: 'Auto-generated table of contents',
				icon: BookOpen,
				category: 'lists-navigation',
				tags: ['navigation', 'content']
			},
			{
				id: 'tabs',
				name: 'Tabs',
				description: 'Tabbed content sections',
				icon: FolderOpen,
				category: 'lists-navigation',
				tags: ['navigation', 'interactive']
			},
			{
				id: 'back-to-top',
				name: 'Back To Top',
				description: 'Scroll to top button',
				icon: ArrowUp,
				category: 'lists-navigation',
				tags: ['navigation', 'scroll']
			},
			{
				id: 'scroll-progress',
				name: 'Scroll Progress',
				description: 'Page scroll progress indicator',
				icon: Activity,
				category: 'lists-navigation',
				tags: ['navigation', 'scroll']
			}
		]
	},
	{
		id: 'interactive',
		name: 'Interactive Elements',
		icon: Move,
		description: 'Interactive and animated components',
		blocks: [
			{
				id: 'tooltip',
				name: 'Tooltip',
				description: 'Hoverable tooltip element',
				icon: Info,
				category: 'interactive',
				tags: ['interactive', 'help']
			},
			{
				id: 'hover-swapper',
				name: 'Hover Swapper',
				description: 'Swap content on hover',
				icon: Repeat,
				category: 'interactive',
				tags: ['interactive', 'animation']
			},
			{
				id: 'pulse-dot',
				name: 'Pulse Dot',
				description: 'Animated pulsing dot indicator',
				icon: Circle,
				category: 'interactive',
				tags: ['animation', 'indicator']
			},
			{
				id: 'progress-bar',
				name: 'Progress Bar',
				description: 'Horizontal progress indicator',
				icon: Loader,
				category: 'interactive',
				tags: ['indicator', 'progress']
			},
			{
				id: 'circle-counter',
				name: 'Circle Counter',
				description: 'Circular progress counter',
				icon: PieChart,
				category: 'interactive',
				tags: ['counter', 'progress']
			},
			{
				id: 'simple-counter',
				name: 'Simple Counter',
				description: 'Animated number counter',
				icon: Hash,
				category: 'interactive',
				tags: ['counter', 'animation']
			},
			{
				id: 'countdown-timer',
				name: 'Countdown Timer',
				description: 'Countdown timer display',
				icon: Clock,
				category: 'interactive',
				tags: ['timer', 'countdown']
			},
			{
				id: 'star-rating',
				name: 'Star Rating',
				description: 'Star rating display or input',
				icon: Star,
				category: 'interactive',
				tags: ['rating', 'review']
			},
			{
				id: 'notification-bar',
				name: 'Notification Bar',
				description: 'Top or bottom notification banner',
				icon: Bell,
				category: 'interactive',
				tags: ['notification', 'alert']
			},
			{
				id: 'basic-slider',
				name: 'Basic Slider',
				description: 'Content carousel slider',
				icon: MoveHorizontal,
				category: 'interactive',
				tags: ['slider', 'carousel']
			}
		]
	},
	{
		id: 'typography',
		name: 'Text & Typography',
		icon: Type,
		description: 'Advanced text and typography elements',
		blocks: [
			{
				id: 'dual-heading',
				name: 'Dual Heading',
				description: 'Two-part styled heading',
				icon: Heading,
				category: 'typography',
				tags: ['text', 'heading']
			},
			{
				id: 'animated-heading',
				name: 'Animated Heading',
				description: 'Heading with text animations',
				icon: Sparkles,
				category: 'typography',
				tags: ['text', 'heading', 'animation']
			},
			{
				id: 'blockquote',
				name: 'Blockquote',
				description: 'Styled quote block',
				icon: Quote,
				category: 'typography',
				tags: ['text', 'quote']
			},
			{
				id: 'badge',
				name: 'Badge',
				description: 'Small label or tag',
				icon: Tag,
				category: 'typography',
				tags: ['label', 'tag']
			},
			{
				id: 'fancy-divider',
				name: 'Fancy Divider',
				description: 'Decorative section divider',
				icon: Minus,
				category: 'typography',
				tags: ['divider', 'decoration']
			}
		]
	},
	{
		id: 'marketing',
		name: 'Marketing & Social',
		icon: Megaphone,
		description: 'Marketing and social media integration blocks',
		blocks: [
			{
				id: 'icon-box',
				name: 'Icon Box',
				description: 'Icon with title and description',
				icon: Box,
				category: 'marketing',
				tags: ['feature', 'content']
			},
			{
				id: 'pricing-table',
				name: 'Pricing Table',
				description: 'Pricing plans comparison',
				icon: DollarSign,
				category: 'marketing',
				tags: ['pricing', 'table']
			},
			{
				id: 'stats-grid',
				name: 'Stats Grid',
				description: 'Statistics or metrics display',
				icon: BarChart,
				category: 'marketing',
				tags: ['stats', 'numbers']
			},
			{
				id: 'business-hours',
				name: 'Business Hours',
				description: 'Opening hours schedule',
				icon: Calendar,
				category: 'marketing',
				tags: ['schedule', 'hours']
			},
			{
				id: 'simple-testimonial',
				name: 'Simple Testimonial',
				description: 'Basic testimonial block',
				icon: MessageCircle,
				category: 'marketing',
				tags: ['testimonial', 'review']
			},
			{
				id: 'fancy-testimonial',
				name: 'Fancy Testimonial',
				description: 'Styled testimonial with avatar',
				icon: MessageSquare,
				category: 'marketing',
				tags: ['testimonial', 'review']
			},
			{
				id: 'social-icons',
				name: 'Social Icons',
				description: 'Social media icon links',
				icon: Share2,
				category: 'marketing',
				tags: ['social', 'icons']
			},
			{
				id: 'social-share-buttons',
				name: 'Social Share Buttons',
				description: 'Share buttons for social platforms',
				icon: Share,
				category: 'marketing',
				tags: ['social', 'share']
			},
			{
				id: 'facebook-comments',
				name: 'Facebook Comments',
				description: 'Facebook comments plugin',
				icon: Facebook,
				category: 'marketing',
				tags: ['social', 'facebook', 'comments']
			},
			{
				id: 'facebook-like-button',
				name: 'Facebook Like Button',
				description: 'Facebook like button widget',
				icon: Facebook,
				category: 'marketing',
				tags: ['social', 'facebook']
			},
			{
				id: 'facebook-page-plugin',
				name: 'Facebook Page Plugin',
				description: 'Facebook page embed widget',
				icon: Facebook,
				category: 'marketing',
				tags: ['social', 'facebook']
			},
			{
				id: 'facebook-post',
				name: 'Facebook Post',
				description: 'Embed Facebook post',
				icon: Facebook,
				category: 'marketing',
				tags: ['social', 'facebook']
			},
			{
				id: 'facebook-share-button',
				name: 'Facebook Share Button',
				description: 'Facebook share button',
				icon: Facebook,
				category: 'marketing',
				tags: ['social', 'facebook', 'share']
			},
			{
				id: 'facebook-video',
				name: 'Facebook Video',
				description: 'Embed Facebook video',
				icon: Facebook,
				category: 'marketing',
				tags: ['social', 'facebook', 'video']
			},
			{
				id: 'twitter-button',
				name: 'Twitter Button',
				description: 'Twitter follow/share button',
				icon: Twitter,
				category: 'marketing',
				tags: ['social', 'twitter']
			},
			{
				id: 'twitter-embed-tweet',
				name: 'Twitter Embed Tweet',
				description: 'Embed single tweet',
				icon: Twitter,
				category: 'marketing',
				tags: ['social', 'twitter']
			},
			{
				id: 'twitter-timeline',
				name: 'Twitter Timeline',
				description: 'Embedded Twitter timeline',
				icon: Twitter,
				category: 'marketing',
				tags: ['social', 'twitter']
			},
			{
				id: 'instagram-post',
				name: 'Instagram Post',
				description: 'Embed Instagram post',
				icon: Instagram,
				category: 'marketing',
				tags: ['social', 'instagram']
			}
		]
	},
	{
		id: 'utilities',
		name: 'Utilities & Integration',
		icon: Settings,
		description: 'Utility blocks and third-party integrations',
		blocks: [
			{
				id: 'google-map',
				name: 'Google Map',
				description: 'Embedded Google Maps',
				icon: Map,
				category: 'utilities',
				tags: ['map', 'location']
			},
			{
				id: 'faq',
				name: 'Frequently Asked Questions',
				description: 'Collapsible FAQ accordion',
				icon: HelpCircle,
				category: 'utilities',
				tags: ['faq', 'accordion', 'help']
			}
		]
	},
	{
		id: 'forms',
		name: 'Forms',
		icon: RectangleEllipsis,
		description: 'Form elements and inputs',
		blocks: []
	},
	{
		id: 'site',
		name: 'Site',
		icon: Globe,
		description: 'Site-wide elements like headers and footers',
		blocks: []
	},
	{
		id: 'advanced',
		name: 'Advanced',
		icon: Code,
		description: 'Advanced custom blocks',
		blocks: []
	},
	{
		id: 'dynamic',
		name: 'Dynamic',
		icon: Zap,
		description: 'Dynamic data-driven blocks',
		blocks: []
	}
];

export const getAllBlocks = (): Block[] => {
	return BLOCK_CATEGORIES.flatMap((category) => category.blocks);
};

export const getBlockById = (id: string): Block | undefined => {
	return getAllBlocks().find((block) => block.id === id);
};

export const searchBlocks = (query: string): Block[] => {
	const lowerQuery = query.toLowerCase();
	return getAllBlocks().filter(
		(block) =>
			block.name.toLowerCase().includes(lowerQuery) ||
			block.description?.toLowerCase().includes(lowerQuery) ||
			block.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
	);
};

export const getBlocksByCategory = (categoryId: string): Block[] => {
	const category = BLOCK_CATEGORIES.find((cat) => cat.id === categoryId);
	return category?.blocks ?? [];
};

export const BLOCK_COMPONENT_REGISTRY: Record<string, BlockComponent> = {
	section: SectionBlock,
	heading: HeadingBlock,
	text: TextBlock,
	button: ButtonBlock
};

export const getBlockComponent = (type: string): BlockComponent | null => {
	return BLOCK_COMPONENT_REGISTRY[type] || null;
};

// Block hierarchy rules - defines which blocks can contain children
const CONTAINER_BLOCKS = new Set([
	'section',
	'columns',
	'grid',
	'div',
	'tabs',
	'gallery',
	'image-box',
	'image-accordion',
	'basic-list',
	'icon-list',
	'checkmark-list',
	'logo-list',
	'table-of-contents',
	'image-hover-card',
	'icon-box',
	'pricing-table',
	'stats-grid',
	'faq'
]);

// Leaf blocks - cannot contain children
const LEAF_BLOCKS = new Set([
	'heading',
	'text',
	'rich-text',
	'text-link',
	'button',
	'image',
	'video',
	'icon',
	'dual-heading',
	'animated-heading',
	'blockquote',
	'badge',
	'fancy-divider'
]);

/**
 * Check if a block type can have children
 */
export const canBlockHaveChildren = (blockType: string): boolean => {
	return CONTAINER_BLOCKS.has(blockType);
};

/**
 * Check if a block type is a leaf block (cannot have children)
 */
export const isLeafBlock = (blockType: string): boolean => {
	return LEAF_BLOCKS.has(blockType);
};

/**
 * Get hierarchy information for a block type
 */
export const getBlockHierarchyInfo = (blockType: string) => {
	return {
		type: blockType,
		canHaveChildren: canBlockHaveChildren(blockType),
		isLeafBlock: isLeafBlock(blockType),
		isContainer: CONTAINER_BLOCKS.has(blockType)
	};
};

/**
 * Get default properties for a block type
 */
export const getDefaultProperties = (
	type: string
): import('$lib/types/editor').ElementProperties => {
	// Basic defaults for common block types
	const defaults: Record<string, import('$lib/types/editor').ElementProperties> = {
		section: {
			design: {
				spacing: {
					padding: {
						breakpoint_base: {
							all: { value: 40, unit: 'px' }
						}
					}
				},
				layout: {
					display: { breakpoint_base: 'block' }
				}
			}
		},
		heading: {
			content: {
				text: 'Heading',
				tag: 'h2'
			},
			design: {
				typography: {
					font_size: {
						breakpoint_base: { value: 32, unit: 'px' }
					},
					font_weight: {
						breakpoint_base: 700
					}
				}
			}
		},
		text: {
			content: {
				text: 'This is a text block. Click to edit.'
			},
			design: {
				typography: {
					font_size: {
						breakpoint_base: { value: 16, unit: 'px' }
					}
				}
			}
		},
		button: {
			content: {
				text: 'Click me'
			},
			design: {
				spacing: {
					padding: {
						breakpoint_base: {
							top: { value: 12, unit: 'px' },
							bottom: { value: 12, unit: 'px' },
							left: { value: 24, unit: 'px' },
							right: { value: 24, unit: 'px' }
						}
					}
				},
				background: {
					type: 'color',
					color: {
						breakpoint_base: '#007bff'
					}
				},
				typography: {
					color: {
						breakpoint_base: '#ffffff'
					}
				},
				border: {
					border_radius: {
						breakpoint_base: {
							all: { value: 4, unit: 'px' }
						}
					}
				}
			}
		}
	};

	return defaults[type] || { design: {}, content: {}, settings: {} };
};
