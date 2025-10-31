# Block Creation Guide

Complete guide for creating new blocks in the page builder system.

> **📌 IMPORTANT:** This guide uses the **block utilities** (`block-utils.ts`) to keep code DRY and maintainable. See [BLOCK-UTILS-GUIDE.md](./BLOCK-UTILS-GUIDE.md) for detailed utility documentation.

## Table of Contents

1. [Block Types & Hierarchy](#block-types--hierarchy)
2. [Component Structure](#component-structure)
3. [Registration Process](#registration-process)
4. [Data Structure & Properties](#data-structure--properties)
5. [Styling Guidelines](#styling-guidelines)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

---

## Block Types & Hierarchy

### Container Blocks

Blocks that **CAN** contain children. Must implement child rendering logic.

**Existing containers:**

- `section`, `columns`, `grid`, `div`
- `tabs`, `gallery`, `image-box`, `image-accordion`
- `basic-list`, `icon-list`, `checkmark-list`, `logo-list`
- `table-of-contents`, `image-hover-card`
- `icon-box`, `pricing-table`, `stats-grid`, `faq`

### Leaf Blocks

Blocks that **CANNOT** contain children. Self-contained elements.

**Existing leaf blocks:**

- `heading`, `text`, `rich-text`, `text-link`
- `button`, `image`, `video`, `icon`
- `dual-heading`, `animated-heading`
- `blockquote`, `badge`, `fancy-divider`

### Hierarchy Rules

1. **Automatic Section Wrapping**: Leaf blocks dropped at root level are automatically wrapped in a `section` container
2. **Validation**: Drop zones prevent adding children to leaf blocks
3. **Nesting**: Container blocks can be nested inside other containers

---

## Component Structure

### Leaf Block Template (Using Utilities - RECOMMENDED)

```svelte
<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import {
		createClickHandler,
		isElementSelected,
		extractAllStyles,
		getLeafBlockClasses,
		getTextContent,
		getHtmlId,
		getCssClasses
	} from './block-utils';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = createClickHandler(element.id);
	const isSelected = $derived(isElementSelected(element.id));
	const text = $derived(getTextContent(element, 'Default Text'));
	const styles = $derived(extractAllStyles(element.properties.design));
	const htmlId = $derived(getHtmlId(element));
	const customClasses = $derived(getCssClasses(element));
	const combinedClasses = $derived(
		[getLeafBlockClasses(isSelected), customClasses].filter(Boolean).join(' ')
	);
</script>

<div
	data-element-id={element.id}
	data-element-type={element.type}
	id={htmlId}
	class={combinedClasses}
	style={styles}
	onclick={handleClick}
	role="button"
	tabindex="0"
>
	{text}
</div>
```

### Leaf Block Template (Custom Styles)

For blocks needing specific styles (not all styles):

```svelte
<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import {
		createClickHandler,
		isElementSelected,
		extractTypographyStyles,
		extractBackgroundStyles,
		combineStyles,
		getLeafBlockClasses,
		getTextContent
	} from './block-utils';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = createClickHandler(element.id);
	const isSelected = $derived(isElementSelected(element.id));
	const text = $derived(getTextContent(element, 'Default'));

	// Only extract specific styles needed
	const styles = $derived(
		combineStyles(
			extractTypographyStyles(element.properties.design),
			extractBackgroundStyles(element.properties.design),
			['display: inline-block'] // Add custom styles
		)
	);
</script>

<div
	data-element-id={element.id}
	data-element-type={element.type}
	class={getLeafBlockClasses(isSelected)}
	style={styles}
	onclick={handleClick}
	role="button"
	tabindex="0"
>
	{text}
</div>
```

### Container Block Template (Using Utilities - RECOMMENDED)

```svelte
<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import BlockRenderer from '../block-renderer.svelte';
	import DropZone from '../drop-zone.svelte';
	import {
		createClickHandler,
		createKeyDownHandler,
		isElementSelected,
		extractAllStyles,
		getContainerBlockClasses,
		getHtmlId,
		getCssClasses
	} from './block-utils';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = createClickHandler(element.id);
	const handleKeyDown = createKeyDownHandler(element.id);
	const isSelected = $derived(isElementSelected(element.id));
	const styles = $derived(extractAllStyles(element.properties.design));
	const htmlId = $derived(getHtmlId(element));
	const customClasses = $derived(getCssClasses(element));
	const combinedClasses = $derived(
		[getContainerBlockClasses(isSelected), customClasses].filter(Boolean).join(' ')
	);
</script>

<div
	data-element-id={element.id}
	data-element-type={element.type}
	id={htmlId}
	class={combinedClasses}
	style={styles}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	{#if element.children.length > 0}
		<DropZone parentId={element.id} index={0} />
		{#each element.children as child, i (child.id)}
			<BlockRenderer element={child} />
			<DropZone parentId={element.id} index={i + 1} />
		{/each}
	{:else}
		<DropZone parentId={element.id} index={0} />
		<div class="pointer-events-none py-8 text-center text-gray-400">Drop blocks here</div>
	{/if}
</div>
```

---

## Registration Process

### Step 1: Add to Block Hierarchy

In `block-registry.ts`, add your block type to the appropriate set:

```typescript
// For container blocks
const CONTAINER_BLOCKS = new Set([
	// ... existing blocks
	'your-new-container-block'
]);

// For leaf blocks
const LEAF_BLOCKS = new Set([
	// ... existing blocks
	'your-new-leaf-block'
]);
```

### Step 2: Define Block Metadata

Add to `BLOCK_CATEGORIES` in `block-registry.ts`:

```typescript
{
  id: 'your-block-id',
  name: 'Your Block Name',
  description: 'Clear description of what this block does',
  icon: YourIcon, // From @lucide/svelte
  category: 'basic', // or 'content-media', 'interactive', etc.
  tags: ['descriptive', 'searchable', 'tags']
}
```

### Step 3: Add Default Properties

In `getDefaultProperties()` function in `block-registry.ts`:

```typescript
export const getDefaultProperties = (type: string): ElementProperties => {
	const defaults: Record<string, ElementProperties> = {
		// ... existing defaults
		'your-block-type': {
			content: {
				text: 'Default content'
				// ... other content properties
			},
			design: {
				typography: {
					font_size: {
						breakpoint_base: { value: 16, unit: 'px' }
					}
				},
				spacing: {
					padding: {
						breakpoint_base: {
							all: { value: 10, unit: 'px' }
						}
					}
				}
			}
		}
	};

	return defaults[type] || { design: {}, content: {}, settings: {} };
};
```

### Step 4: Register Component

```typescript
// Import your component
import YourBlock from './blocks/your-block.svelte';

// Add to registry
export const BLOCK_COMPONENT_REGISTRY: Record<string, BlockComponent> = {
	section: SectionBlock,
	heading: HeadingBlock,
	text: TextBlock,
	button: ButtonBlock,
	'your-block-type': YourBlock
};
```

---

## Data Structure & Properties

### Element Properties Interface

```typescript
interface ElementProperties {
	content?: ContentProperties;
	design?: DesignProperties;
	settings?: SettingsProperties;
}
```

### Content Properties

```typescript
interface ContentProperties {
	// Text content
	text?: string;
	html?: string;
	tag?: string; // For headings: h1, h2, h3, etc.

	// Media
	image?: MediaObject;
	video?: MediaObject;
	icon?: IconObject;

	// Links
	link?: LinkObject;

	// Lists/Arrays
	items?: Array<any>;

	// Custom properties specific to your block
	[key: string]: unknown;
}
```

### Design Properties

All design properties support responsive values:

```typescript
type ResponsiveValue<T> = {
	breakpoint_base?: T;
	breakpoint_tablet_landscape?: T;
	breakpoint_tablet_portrait?: T;
	breakpoint_phone_landscape?: T;
	breakpoint_phone_portrait?: T;
};

interface DesignProperties {
	layout?: LayoutProperties; // display, flex, grid
	spacing?: SpacingProperties; // margin, padding
	typography?: TypographyProperties; // font, size, color
	background?: BackgroundProperties; // color, gradient, image
	border?: BorderProperties; // border, radius, shadow
	effects?: EffectsProperties; // opacity, transform
	size?: SizeProperties; // width, height
	position?: PositionProperties; // position, z-index
}
```

### Common Design Property Patterns

```typescript
// Spacing (margin/padding)
spacing: {
  padding: {
    breakpoint_base: {
      all: { value: 20, unit: 'px' }
    }
  }
}

// Typography
typography: {
  font_size: {
    breakpoint_base: { value: 16, unit: 'px' }
  },
  font_weight: {
    breakpoint_base: 400
  },
  color: {
    breakpoint_base: '#000000'
  }
}

// Background
background: {
  type: 'color',
  color: {
    breakpoint_base: '#ffffff'
  }
}

// Border
border: {
  border_radius: {
    breakpoint_base: {
      all: { value: 4, unit: 'px' }
    }
  }
}
```

---

## Styling Guidelines

### Required Classes

**All blocks must include:**

```svelte
<element
  data-element-id={element.id}
  data-element-type={element.type}
  class="relative"
  onclick={handleClick}
  role="button"
  tabindex="0"
>
```

### Selection State (Leaf Blocks)

```svelte
class="relative cursor-pointer transition-all duration-150 rounded px-1" class:ring-2={isSelected}
class:ring-blue-500={isSelected}
class:hover:outline={!isSelected}
class:hover:outline-2={!isSelected}
class:hover:outline-dashed={!isSelected}
class:hover:outline-gray-400={!isSelected}
class:hover:outline-offset-2={!isSelected}
```

### Selection State (Container Blocks)

```svelte
class="relative min-h-[100px] transition-all duration-150 border-2 border-transparent" class:ring-2={isSelected}
class:ring-blue-500={isSelected}
class:!border-dashed={!isSelected}
class:hover:!border-blue-400={!isSelected}
```

### Style Extraction Pattern

```typescript
const getStyles = (): string => {
	const styles: string[] = [];
	const { design } = element.properties;

	// Always check for breakpoint_base first
	if (design?.typography?.font_size?.breakpoint_base) {
		const size = design.typography.font_size.breakpoint_base;
		styles.push(`font-size: ${size.value}${size.unit}`);
	}

	// Handle spacing with all/individual sides
	if (design?.spacing?.padding?.breakpoint_base) {
		const p = design.spacing.padding.breakpoint_base;
		if (p.all) {
			styles.push(`padding: ${p.all.value}${p.all.unit}`);
		} else {
			if (p.top) styles.push(`padding-top: ${p.top.value}${p.top.unit}`);
			if (p.right) styles.push(`padding-right: ${p.right.value}${p.right.unit}`);
			if (p.bottom) styles.push(`padding-bottom: ${p.bottom.value}${p.bottom.unit}`);
			if (p.left) styles.push(`padding-left: ${p.left.value}${p.left.unit}`);
		}
	}

	return styles.join('; ');
};
```

---

## Best Practices

### ✅ DO

1. **Use TypeScript types** for all props and data
2. **Stop event propagation** in click handlers (`e.stopPropagation()`)
3. **Provide default values** for all content properties
4. **Use $derived** for reactive computations
5. **Extract styles** into a `getStyles()` function
6. **Include data attributes** for debugging (`data-element-id`, `data-element-type`)
7. **Make containers accessible** with role and tabindex
8. **Handle keyboard navigation** for container blocks
9. **Use semantic HTML** (correct tags for headings, buttons, etc.)
10. **Provide visual feedback** on hover and selection

### ❌ DON'T

1. **Don't hardcode styles** - use properties from `element.properties.design`
2. **Don't forget event.stopPropagation()** - prevents parent selection
3. **Don't skip hover states** - users need visual guidance
4. **Don't use inline styles without getStyles()** - keep logic organized
5. **Don't forget responsive breakpoints** - always check `breakpoint_base`
6. **Don't add children to leaf blocks** - enforce hierarchy rules
7. **Don't skip accessibility** - include ARIA labels where needed
8. **Don't use `any` types** - use proper TypeScript types
9. **Don't forget to register** - add to all three places in block-registry
10. **Don't skip default properties** - blocks should work immediately

---

## Examples

### Example 1: Simple Leaf Block (Badge)

```svelte
<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		editorManager.selectElement(element.id);
	};

	const isSelected = $derived(editorManager.selectedElementId === element.id);
	const text = $derived(element.properties.content?.text || 'Badge');

	const getStyles = (): string => {
		const styles: string[] = [];
		const { design } = element.properties;

		if (design?.typography?.font_size?.breakpoint_base) {
			const size = design.typography.font_size.breakpoint_base;
			styles.push(`font-size: ${size.value}${size.unit}`);
		}

		if (design?.typography?.color?.breakpoint_base) {
			styles.push(`color: ${design.typography.color.breakpoint_base}`);
		}

		if (design?.background?.color?.breakpoint_base) {
			styles.push(`background-color: ${design.background.color.breakpoint_base}`);
		}

		if (design?.spacing?.padding?.breakpoint_base?.all) {
			const p = design.spacing.padding.breakpoint_base.all;
			styles.push(`padding: ${p.value}${p.unit}`);
		}

		if (design?.border?.border_radius?.breakpoint_base?.all) {
			const r = design.border.border_radius.breakpoint_base.all;
			styles.push(`border-radius: ${r.value}${r.unit}`);
		}

		return styles.join('; ');
	};
</script>

<span
	data-element-id={element.id}
	data-element-type={element.type}
	class="inline-block cursor-pointer transition-all duration-150"
	class:ring-2={isSelected}
	class:ring-blue-500={isSelected}
	class:hover:outline={!isSelected}
	class:hover:outline-2={!isSelected}
	class:hover:outline-dashed={!isSelected}
	class:hover:outline-gray-400={!isSelected}
	class:hover:outline-offset-2={!isSelected}
	style={getStyles()}
	onclick={handleClick}
	role="button"
	tabindex="0"
>
	{text}
</span>
```

**Registration in block-registry.ts:**

```typescript
// 1. Add to LEAF_BLOCKS
const LEAF_BLOCKS = new Set([
  // ... existing
  'badge'
]);

// 2. Add to BLOCK_CATEGORIES
{
  id: 'badge',
  name: 'Badge',
  description: 'Small label or tag',
  icon: Tag,
  category: 'typography',
  tags: ['label', 'tag']
}

// 3. Add default properties
'badge': {
  content: {
    text: 'Badge'
  },
  design: {
    typography: {
      font_size: {
        breakpoint_base: { value: 12, unit: 'px' }
      },
      font_weight: {
        breakpoint_base: 600
      },
      color: {
        breakpoint_base: '#ffffff'
      }
    },
    spacing: {
      padding: {
        breakpoint_base: {
          top: { value: 4, unit: 'px' },
          bottom: { value: 4, unit: 'px' },
          left: { value: 8, unit: 'px' },
          right: { value: 8, unit: 'px' }
        }
      }
    },
    background: {
      type: 'color',
      color: {
        breakpoint_base: '#007bff'
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

// 4. Register component
import BadgeBlock from './blocks/badge-block.svelte';

export const BLOCK_COMPONENT_REGISTRY: Record<string, BlockComponent> = {
  // ... existing
  badge: BadgeBlock
};
```

### Example 2: Container Block (Columns)

```svelte
<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import BlockRenderer from '../block-renderer.svelte';
	import DropZone from '../drop-zone.svelte';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		editorManager.selectElement(element.id);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();
			editorManager.selectElement(element.id);
		}
	};

	const isSelected = $derived(editorManager.selectedElementId === element.id);
	const columnCount = $derived(element.properties.content?.columns || 2);

	const getStyles = (): string => {
		const styles: string[] = [];
		const { design } = element.properties;

		// Grid layout
		styles.push(`display: grid`);
		styles.push(`grid-template-columns: repeat(${columnCount}, 1fr)`);

		if (design?.layout?.gap?.breakpoint_base) {
			const gap = design.layout.gap.breakpoint_base;
			styles.push(`gap: ${gap.value}${gap.unit}`);
		}

		if (design?.spacing?.padding?.breakpoint_base) {
			const p = design.spacing.padding.breakpoint_base;
			if (p.all) {
				styles.push(`padding: ${p.all.value}${p.all.unit}`);
			}
		}

		return styles.join('; ');
	};
</script>

<div
	data-element-id={element.id}
	data-element-type={element.type}
	class="relative min-h-[100px] border-2 border-transparent transition-all duration-150"
	class:ring-2={isSelected}
	class:ring-blue-500={isSelected}
	class:!border-dashed={!isSelected}
	class:hover:!border-blue-400={!isSelected}
	style={getStyles()}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	{#if element.children.length > 0}
		<DropZone parentId={element.id} index={0} />
		{#each element.children as child, i (child.id)}
			<div class="column-item">
				<BlockRenderer element={child} />
			</div>
			<DropZone parentId={element.id} index={i + 1} />
		{/each}
	{:else}
		<DropZone parentId={element.id} index={0} />
		<div class="pointer-events-none py-8 text-center text-gray-400">Drop blocks into columns</div>
	{/if}
</div>
```

---

## Checklist for New Blocks

### Before You Start

- [ ] Determine if block is a container or leaf block
- [ ] Design the default properties structure
- [ ] Choose appropriate icon from Lucide

### Implementation

- [ ] Create component file in `blocks/` directory
- [ ] Implement selection handling
- [ ] Add hover/selection visual states
- [ ] Extract and apply design properties
- [ ] Handle responsive values (breakpoint_base)
- [ ] Add data attributes (element-id, element-type)
- [ ] For containers: Implement children rendering with DropZones

### Registration

- [ ] Add to CONTAINER_BLOCKS or LEAF_BLOCKS set
- [ ] Add to BLOCK_CATEGORIES with metadata
- [ ] Add default properties in getDefaultProperties()
- [ ] Import component in block-registry.ts
- [ ] Add to BLOCK_COMPONENT_REGISTRY

### Testing

- [ ] Block appears in add sidebar
- [ ] Block can be dragged and dropped
- [ ] Block can be selected
- [ ] Hover states work correctly
- [ ] Default properties are applied
- [ ] For containers: Children can be added
- [ ] For leaf: Cannot accept children

### Documentation

- [ ] Update this guide if adding new patterns
- [ ] Comment complex logic in component
- [ ] Update BLOCK-HIERARCHY.md if needed

---

## Common Patterns

### Pattern: Optional Content with Fallback

```typescript
const text = $derived(element.properties.content?.text || 'Default Text');
const imageUrl = $derived(element.properties.content?.image?.url || '/placeholder.jpg');
```

### Pattern: Conditional Styling

```typescript
const getStyles = (): string => {
	const styles: string[] = [];
	const { design } = element.properties;

	// Always provide base styles
	styles.push('display: block');

	// Conditionally add user styles
	if (design?.background?.color?.breakpoint_base) {
		styles.push(`background-color: ${design.background.color.breakpoint_base}`);
	}

	return styles.join('; ');
};
```

### Pattern: Multi-breakpoint Support (Future)

```typescript
// Current: Only use breakpoint_base
const fontSize = design?.typography?.font_size?.breakpoint_base;

// Future: Support multiple breakpoints
const getFontSize = (breakpoint: string) => {
	return (
		design?.typography?.font_size?.[breakpoint] || design?.typography?.font_size?.breakpoint_base
	);
};
```

---

## Quick Reference

### File Locations

- **Components**: `/src/lib/components/editor/renderer/blocks/`
- **Registry**: `/src/lib/components/editor/renderer/block-registry.ts`
- **Types**: `/src/lib/types/editor.ts`

### Key Functions

- `getDefaultProperties(type)` - Get default props for block type
- `canBlockHaveChildren(type)` - Check if block accepts children
- `isLeafBlock(type)` - Check if block is a leaf
- `getBlockComponent(type)` - Get component for block type
- `getBlockById(id)` - Get block metadata by ID

### Naming Conventions

- Block IDs: `kebab-case` (e.g., `text-link`, `icon-box`)
- Component files: `kebab-case-block.svelte` (e.g., `text-block.svelte`)
- TypeScript types: `PascalCase` (e.g., `BuilderElement`)

---

**Remember**: When in doubt, look at existing blocks (`section-block.svelte`, `text-block.svelte`, `button-block.svelte`) as reference implementations!
