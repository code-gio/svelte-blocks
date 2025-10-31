# Block Hierarchy System

## Overview

The editor implements a hierarchical block system that enforces structural rules to maintain a clean and valid page structure.

## Block Types

### Container Blocks
Blocks that **CAN** contain child elements:
- `section` - Main container for content
- `columns` - Multi-column layouts
- `grid` - Grid layouts  
- `div` - Generic container
- `tabs` - Tabbed content
- `gallery` - Image galleries
- `image-box` - Image with overlay content
- `image-accordion` - Expandable image panels
- `basic-list`, `icon-list`, `checkmark-list`, `logo-list` - List containers
- `table-of-contents` - TOC container
- `image-hover-card` - Image cards
- `icon-box` - Icon with content
- `pricing-table` - Pricing plans
- `stats-grid` - Statistics display
- `faq` - FAQ accordion

### Leaf Blocks
Blocks that **CANNOT** contain children:
- `heading` - Text headings (H1-H6)
- `text` - Paragraph text
- `rich-text` - Formatted text
- `text-link` - Clickable links
- `button` - Interactive buttons
- `image` - Single images
- `video` - Video embeds
- `icon` - Icon elements
- `dual-heading` - Two-part headings
- `animated-heading` - Animated text
- `blockquote` - Quotes
- `badge` - Labels/tags
- `fancy-divider` - Decorative dividers

## Hierarchy Rules

### Rule 1: Section Wrapper
**All leaf blocks dropped at root level must be wrapped in a section block.**

When you drag a leaf block (like text, heading, button) to the root level of the page, the system automatically:
1. Creates a `section` block
2. Places the dropped block inside that section
3. Adds the section to the page

This ensures the page structure always has proper containers.

**Example:**
```
Dropping "text" block at root:
❌ Before:   Page > Text
✅ After:    Page > Section > Text
```

### Rule 2: Container Validation
**Leaf blocks cannot accept children.**

When trying to drop a block inside another block, the system validates:
- If the parent is a leaf block → Drop is rejected
- If the parent is a container block → Drop is allowed

**Example:**
```
✅ Allowed:  Section > Text (section can have children)
✅ Allowed:  Section > Heading (section can have children)
❌ Blocked:  Text > Button (text cannot have children)
❌ Blocked:  Heading > Image (heading cannot have children)
```

### Rule 3: Nested Containers
**Container blocks can be nested inside other container blocks.**

**Example:**
```
✅ Page > Section > Columns > Section > Text
✅ Page > Section > Grid > Div > Button
```

## Implementation

### EditorManager Methods

#### `canBlockHaveChildren(blockType: string): boolean`
Returns whether a block type can contain children.

```typescript
editorManager.canBlockHaveChildren('section')  // true
editorManager.canBlockHaveChildren('text')     // false
```

#### `isLeafBlock(blockType: string): boolean`
Returns whether a block is a leaf block (cannot have children).

```typescript
editorManager.isLeafBlock('button')   // true
editorManager.isLeafBlock('section')  // false
```

#### `getBlockHierarchyInfo(blockType: string)`
Returns detailed information about a block's hierarchy capabilities.

```typescript
editorManager.getBlockHierarchyInfo('text')
// {
//   type: 'text',
//   canHaveChildren: false,
//   isLeafBlock: true,
//   isContainer: false
// }
```

### Automatic Section Wrapping

The `createElement` method automatically handles section wrapping:

```typescript
// User drops a "text" block at root
editorManager.createElement('text', null, 0)

// System automatically:
// 1. Creates section: { id: 'section_1', type: 'section', ... }
// 2. Creates text as child: { id: 'text_1', type: 'text', parentId: 'section_1', ... }
// 3. Adds section to page
```

### Drop Zone Validation

Drop zones validate parent capabilities before accepting drops:

```typescript
// In drop-zone.svelte
const parent = editorManager.findElementById(parentId);
if (parent && !editorManager.canBlockHaveChildren(parent.type)) {
  console.warn(`Cannot add children to block type "${parent.type}"`);
  return; // Reject the drop
}
```

## Adding New Blocks

When adding new block types, update the appropriate set in `editor-manager.svelte.ts`:

### For Container Blocks:
```typescript
private readonly CONTAINER_BLOCKS = new Set([
  // ... existing blocks
  "your-new-container-block",
]);
```

### For Leaf Blocks:
```typescript
private readonly LEAF_BLOCKS = new Set([
  // ... existing blocks
  "your-new-leaf-block",
]);
```

### Implementation Checklist

When implementing a new container block component:
1. ✅ Add block type to `CONTAINER_BLOCKS` set
2. ✅ Create component file in `renderer/blocks/`
3. ✅ Implement children rendering (see `section-block.svelte` as example)
4. ✅ Include `DropZone` components for child placement
5. ✅ Register component in `block-registry.ts`

Example container block structure:
```svelte
<div>
  {#if element.children.length > 0}
    <DropZone parentId={element.id} index={0} />
    {#each element.children as child, i (child.id)}
      <BlockRenderer element={child} />
      <DropZone parentId={element.id} index={i + 1} />
    {/each}
  {:else}
    <DropZone parentId={element.id} index={0} />
    <div>Drop blocks here</div>
  {/if}
</div>
```

## Benefits

1. **Consistent Structure** - Pages always have proper container hierarchy
2. **Prevents Invalid Nesting** - Cannot create impossible structures
3. **Better UX** - Users don't need to manually create sections
4. **Cleaner Code** - Rendering logic can assume valid structure
5. **Future-Proof** - Easy to add new blocks with proper rules

