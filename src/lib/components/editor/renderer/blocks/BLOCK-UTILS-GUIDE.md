# Block Utilities Guide

Shared utilities for creating blocks to keep code DRY and maintainable.

## Import

```typescript
import {
  // Event handlers
  createClickHandler,
  createKeyDownHandler,
  
  // Selection state
  isElementSelected,
  
  // Style extraction
  extractTypographyStyles,
  extractSpacingStyles,
  extractBackgroundStyles,
  extractBorderStyles,
  extractSizeStyles,
  extractLayoutStyles,
  extractPositionStyles,
  extractEffectsStyles,
  extractAllStyles,
  combineStyles,
  
  // CSS classes
  getLeafBlockClasses,
  getContainerBlockClasses,
  
  // Content extraction
  getTextContent,
  getTag,
  getUrl,
  getImageUrl,
  getAltText,
  getHref,
  getTarget
} from './block-utils';
```

## Event Handlers

### createClickHandler(elementId)

Creates a click handler that stops propagation and selects the element.

**Before:**
```typescript
const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  editorManager.selectElement(element.id);
};
```

**After:**
```typescript
const handleClick = createClickHandler(element.id);
```

### createKeyDownHandler(elementId)

Creates a keyboard handler for Enter/Space keys (used in container blocks).

**Before:**
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.stopPropagation();
    editorManager.selectElement(element.id);
  }
};
```

**After:**
```typescript
const handleKeyDown = createKeyDownHandler(element.id);
```

## Selection State

### isElementSelected(elementId)

Returns whether an element is currently selected.

**Usage:**
```typescript
const isSelected = $derived(isElementSelected(element.id));
```

## Style Extraction

All style extraction functions return an array of CSS style strings.

### extractTypographyStyles(design?, breakpoint?)

Extracts typography styles: font-size, font-weight, font-family, color, text-align, etc.

**Usage:**
```typescript
const typographyStyles = extractTypographyStyles(element.properties.design);
// Returns: ["font-size: 16px", "font-weight: 700", "color: #000000"]
```

### extractSpacingStyles(design?, property, breakpoint?)

Extracts spacing (padding or margin) styles.

**Usage:**
```typescript
// Extract padding
const paddingStyles = extractSpacingStyles(element.properties.design, 'padding');

// Extract margin
const marginStyles = extractSpacingStyles(element.properties.design, 'margin');
```

### extractBackgroundStyles(design?, breakpoint?)

Extracts background styles: color, image, size, position, repeat, attachment.

### extractBorderStyles(design?, breakpoint?)

Extracts border styles: radius, width, color, style.

### extractSizeStyles(design?, breakpoint?)

Extracts size styles: width, height, min/max width/height.

### extractLayoutStyles(design?, breakpoint?)

Extracts layout styles: display, flex properties, grid properties, gap.

### extractPositionStyles(design?, breakpoint?)

Extracts position styles: position, top/right/bottom/left, z-index.

### extractEffectsStyles(design?, breakpoint?)

Extracts effect styles: opacity, box-shadow, text-shadow, transform, filter.

### combineStyles(...styleArrays)

Combines multiple style arrays into a single inline style string.

**Usage:**
```typescript
const styles = combineStyles(
  extractTypographyStyles(design),
  extractSpacingStyles(design, 'padding'),
  extractBackgroundStyles(design)
);
// Returns: "font-size: 16px; padding: 20px; background-color: #ffffff"
```

### extractAllStyles(design?, breakpoint?)

Extracts ALL styles (layout, typography, spacing, background, border, size, position, effects).

**Before (manual extraction):**
```typescript
const getStyles = () => {
  const styles: string[] = [];
  const { design } = element.properties;

  if (design?.typography?.font_size?.breakpoint_base) {
    const size = design.typography.font_size.breakpoint_base;
    styles.push(`font-size: ${size.value}${size.unit}`);
  }

  if (design?.typography?.color?.breakpoint_base) {
    styles.push(`color: ${design.typography.color.breakpoint_base}`);
  }

  // ... many more lines
  
  return styles.join("; ");
};
```

**After (using extractAllStyles):**
```typescript
const styles = $derived(extractAllStyles(element.properties.design));
```

## CSS Class Utilities

### getLeafBlockClasses(isSelected)

Returns the complete CSS class string for leaf blocks (includes selection and hover states).

**Before:**
```svelte
<div
  class="relative cursor-pointer transition-all duration-150 rounded px-1"
  class:ring-2={isSelected}
  class:ring-blue-500={isSelected}
  class:hover:outline={!isSelected}
  class:hover:outline-2={!isSelected}
  class:hover:outline-dashed={!isSelected}
  class:hover:outline-gray-400={!isSelected}
  class:hover:outline-offset-2={!isSelected}
>
```

**After:**
```svelte
<div class={getLeafBlockClasses(isSelected)}>
```

### getContainerBlockClasses(isSelected)

Returns the complete CSS class string for container blocks.

**Before:**
```svelte
<div
  class="relative min-h-[100px] transition-all duration-150 border-2 border-transparent"
  class:ring-2={isSelected}
  class:ring-blue-500={isSelected}
  class:!border-dashed={!isSelected}
  class:hover:!border-blue-400={!isSelected}
>
```

**After:**
```svelte
<div class={getContainerBlockClasses(isSelected)}>
```

## Content Extraction Utilities

### getTextContent(element, fallback?)

Extracts text content with a fallback value.

**Usage:**
```typescript
const text = $derived(getTextContent(element, 'Default Text'));
```

### getTag(element, fallback?)

Extracts HTML tag (for headings, etc.).

**Usage:**
```typescript
const tag = $derived(getTag(element, 'h2'));
```

### getUrl(element, fallback?)

Extracts URL from content properties.

### getImageUrl(element, fallback?)

Extracts image URL from content properties.

### getAltText(element, fallback?)

Extracts image alt text.

### getHref(element, fallback?)

Extracts link href.

### getTarget(element, fallback?)

Extracts link target (_self, _blank, etc.).

## Complete Example: Leaf Block

**Before (without utilities):**
```svelte
<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";

  let { element }: { element: BuilderElement } = $props();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    editorManager.selectElement(element.id);
  };

  const isSelected = $derived(editorManager.selectedElementId === element.id);
  const text = $derived(element.properties.content?.text || "Text");

  const getStyles = () => {
    const styles: string[] = [];
    const { design } = element.properties;

    if (design?.typography?.font_size?.breakpoint_base) {
      const size = design.typography.font_size.breakpoint_base;
      styles.push(`font-size: ${size.value}${size.unit}`);
    }

    if (design?.typography?.color?.breakpoint_base) {
      styles.push(`color: ${design.typography.color.breakpoint_base}`);
    }

    return styles.join("; ");
  };
</script>

<p
  data-element-id={element.id}
  data-element-type={element.type}
  class="relative cursor-pointer transition-all duration-150 rounded px-1"
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
</p>
```

**After (with utilities):**
```svelte
<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import {
    createClickHandler,
    isElementSelected,
    extractAllStyles,
    getLeafBlockClasses,
    getTextContent
  } from './block-utils';

  let { element }: { element: BuilderElement } = $props();

  const handleClick = createClickHandler(element.id);
  const isSelected = $derived(isElementSelected(element.id));
  const text = $derived(getTextContent(element, "Text"));
  const styles = $derived(extractAllStyles(element.properties.design));
</script>

<p
  data-element-id={element.id}
  data-element-type={element.type}
  class={getLeafBlockClasses(isSelected)}
  style={styles}
  onclick={handleClick}
  role="button"
  tabindex="0"
>
  {text}
</p>
```

## Complete Example: Container Block

**After (with utilities):**
```svelte
<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import BlockRenderer from "../block-renderer.svelte";
  import DropZone from "../drop-zone.svelte";
  import {
    createClickHandler,
    createKeyDownHandler,
    isElementSelected,
    extractAllStyles,
    getContainerBlockClasses
  } from './block-utils';

  let { element }: { element: BuilderElement } = $props();

  const handleClick = createClickHandler(element.id);
  const handleKeyDown = createKeyDownHandler(element.id);
  const isSelected = $derived(isElementSelected(element.id));
  const styles = $derived(extractAllStyles(element.properties.design));
</script>

<section
  data-element-id={element.id}
  data-element-type={element.type}
  class={getContainerBlockClasses(isSelected)}
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
    <div class="text-gray-400 text-center py-8 pointer-events-none">
      Drop blocks here
    </div>
  {/if}
</section>
```

## Custom Style Extraction

If you need specific styles (not all), combine only what you need:

```typescript
const getStyles = $derived(
  combineStyles(
    extractTypographyStyles(element.properties.design),
    extractBackgroundStyles(element.properties.design),
    ['display: inline-block'] // Add custom styles
  )
);
```

## Benefits

1. **DRY**: No repeated code across blocks
2. **Maintainable**: Change behavior in one place
3. **Consistent**: All blocks behave the same way
4. **Type-safe**: Full TypeScript support
5. **Flexible**: Use all utilities or just what you need
6. **Readable**: Blocks are much shorter and clearer

## When to Use Utilities vs Custom Code

**Use utilities when:**
- Extracting standard design properties (typography, spacing, etc.)
- Handling selection/click events
- Applying standard CSS classes
- Extracting common content properties

**Write custom code when:**
- Block has unique behavior not shared with others
- Needs special calculations or transformations
- Has complex conditional logic specific to that block
- Requires custom styling beyond design properties

