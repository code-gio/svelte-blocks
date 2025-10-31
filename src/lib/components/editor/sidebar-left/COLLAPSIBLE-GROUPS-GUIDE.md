# Collapsible Field Groups Guide

## 🎯 Overview

Design controls are now organized into **collapsible groups** for better organization and cleaner UX, following the [Breakdance pattern](https://breakdance.com/documentation/reference/elements/basics/section/section/).

## ✨ Features

### Collapsible Sections
- Click to expand/collapse each group
- Chevron icon rotates to indicate state
- Smooth animations
- Remembers open/closed state

### Group Configuration
- Define groups with labels and fields
- Set default open/closed state
- Mix groups with standalone fields

## 📋 Section Design Controls (Following Breakdance)

Based on Breakdance's Section element, we have 5 main design groups:

### 1. **Layout** (Default: Open)
Controls overall layout, alignment, spacing, and positioning:
- Display (block, flex, grid, inline-block, none)
- Flex Direction (row, column, etc.)
- Justify Content (flex-start, center, space-between, etc.)
- Align Items (flex-start, center, stretch, etc.)
- Gap (spacing between child elements)

### 2. **Background**
Background customization options:
- Background Type (color, gradient, image, video)
- Background Color

*Future: gradient, image, video backgrounds*

### 3. **Size**
Height and width controls:
- Width (percentage)
- Height (custom height in pixels)
- Min Height (minimum height in pixels)

### 4. **Spacing**
Padding and margin controls:
- Padding (All Sides)
- Margin Top
- Margin Bottom

*Future: Individual padding sides, margin left/right*

### 5. **Borders**
Border styling and effects:
- Border Radius (rounded corners)
- Border Width
- Border Color
- Border Style (none, solid, dashed, dotted, double)

*Future: Individual corner radius, box shadow*

## 🔧 Implementation

### Creating a Field Group

```typescript
{
  label: 'Layout',
  defaultOpen: true,  // Optional: opens by default
  fields: [
    {
      key: 'design.layout.display.breakpoint_base',
      label: 'Display',
      type: 'select',
      options: [/* ... */],
      defaultValue: 'block'
    },
    // ... more fields
  ]
}
```

### Mixing Groups and Standalone Fields

```typescript
section: {
  design: [
    // Group 1
    {
      label: 'Layout',
      defaultOpen: true,
      fields: [/* ... */]
    },
    // Group 2
    {
      label: 'Background',
      fields: [/* ... */]
    },
    // Standalone field
    {
      key: 'design.custom_property',
      label: 'Custom Property',
      type: 'text'
    }
  ]
}
```

### Type Definition

```typescript
export interface FieldGroup {
  label: string;
  fields: FieldConfig[];
  defaultOpen?: boolean;  // Default: false
}

export interface BlockFieldConfig {
  content?: (FieldConfig | FieldGroup)[];
  design?: (FieldConfig | FieldGroup)[];
  advanced?: (FieldConfig | FieldGroup)[];
}
```

## 🎨 UI Components

### FieldGroupRenderer Component

**Props:**
- `group: FieldGroup` - The field group configuration
- `getFieldValue: (key: string) => unknown` - Function to get field values
- `handleFieldChange: (key: string, value: unknown) => void` - Change handler

**Features:**
- Uses shadcn-svelte `Collapsible` component
- Chevron icon with rotate animation
- Renders all fields in the group
- Smooth expand/collapse transition

**Code:**
```svelte
<Collapsible.Root bind:open={isOpen}>
  <Collapsible.Trigger>
    <span>{group.label}</span>
    <ChevronDown class="h-4 w-4" />
  </Collapsible.Trigger>
  <Collapsible.Content>
    {#each group.fields as field}
      <FieldRenderer {...} />
    {/each}
  </Collapsible.Content>
</Collapsible.Root>
```

### EditBlockTabs Component (Updated)

Now handles both individual fields and groups:

```svelte
{#each items as item}
  {#if isFieldGroup(item)}
    <FieldGroupRenderer group={item} {...} />
  {:else}
    <FieldRenderer config={item} {...} />
  {/if}
{/each}
```

## 🔍 Helper Functions

### isFieldGroup(item)
Type guard to check if an item is a FieldGroup:

```typescript
export const isFieldGroup = (
  item: FieldConfig | FieldGroup
): item is FieldGroup => {
  return 'fields' in item && Array.isArray(item.fields);
};
```

### countFields(items)
Counts total fields including those inside groups:

```typescript
export const countFields = (
  items: (FieldConfig | FieldGroup)[]
): number => {
  return items.reduce((count, item) => {
    if (isFieldGroup(item)) {
      return count + item.fields.length;
    }
    return count + 1;
  }, 0);
};
```

## 📊 Example: Section Block Configuration

```typescript
section: {
  design: [
    {
      label: 'Layout',
      defaultOpen: true,  // Opens by default
      fields: [
        { key: 'design.layout.display.breakpoint_base', ... },
        { key: 'design.layout.flex_direction.breakpoint_base', ... },
        { key: 'design.layout.justify_content.breakpoint_base', ... },
        { key: 'design.layout.align_items.breakpoint_base', ... },
        { key: 'design.layout.gap.breakpoint_base.value', ... }
      ]
    },
    {
      label: 'Background',
      fields: [
        { key: 'design.background.type', ... },
        { key: 'design.background.color.breakpoint_base', ... }
      ]
    },
    {
      label: 'Size',
      fields: [
        { key: 'design.size.width.breakpoint_base.value', ... },
        { key: 'design.size.height.breakpoint_base.value', ... },
        { key: 'design.size.min_height.breakpoint_base.value', ... }
      ]
    },
    {
      label: 'Spacing',
      fields: [
        { key: 'design.spacing.padding.breakpoint_base.all.value', ... },
        { key: 'design.spacing.margin.breakpoint_base.top.value', ... },
        { key: 'design.spacing.margin.breakpoint_base.bottom.value', ... }
      ]
    },
    {
      label: 'Borders',
      fields: [
        { key: 'design.border.border_radius.breakpoint_base.all.value', ... },
        { key: 'design.border.border_width.breakpoint_base.all.value', ... },
        { key: 'design.border.border_color.breakpoint_base', ... },
        { key: 'design.border.border_style.breakpoint_base', ... }
      ]
    }
  ]
}
```

## 🎯 Visual Result

When user selects a Section block:

```
Design Tab
├─ ▼ Layout (expanded by default)
│  ├─ Display: [Block ▼]
│  ├─ Flex Direction: [Row ▼]
│  ├─ Justify Content: [Select... ▼]
│  ├─ Align Items: [Select... ▼]
│  └─ Gap: [0]
│
├─ ▶ Background (collapsed)
│
├─ ▶ Size (collapsed)
│
├─ ▶ Spacing (collapsed)
│
└─ ▶ Borders (collapsed)
```

User clicks "Background" →

```
├─ ▼ Background (expanded)
│  ├─ Background Type: [Color ▼]
│  └─ Background Color: [■ #ffffff]
```

## 💡 Benefits

1. **Organized** - Related controls grouped together
2. **Scannable** - Easy to find specific controls
3. **Clean** - Not overwhelming with all fields visible
4. **Familiar** - Follows Breakdance/Elementor pattern
5. **Flexible** - Mix groups and standalone fields
6. **Performant** - Only render visible fields

## 🚀 Future Enhancements

### More Design Groups:
- **Typography** - Font controls for containers
- **Effects** - Opacity, shadows, transforms
- **Position** - Positioning controls
- **Dividers** - Shape dividers (like Breakdance)

### Advanced Features:
- **Search** - Filter fields by name
- **Favorites** - Pin commonly used controls
- **Presets** - Save/load design presets
- **Copy/Paste** - Copy design settings between blocks

## 📝 Adding Groups to Other Blocks

### Example: Adding to Heading Block

```typescript
heading: {
  content: [
    // Standalone fields (no groups for simple content)
    { key: 'content.text', label: 'Text', type: 'text' }
  ],
  design: [
    {
      label: 'Typography',
      defaultOpen: true,
      fields: [
        { key: 'design.typography.font_size...', ... },
        { key: 'design.typography.font_weight...', ... },
        { key: 'design.typography.color...', ... }
      ]
    },
    {
      label: 'Spacing',
      fields: [
        { key: 'design.spacing.margin...', ... }
      ]
    }
  ]
}
```

### When to Use Groups vs. Standalone:

**Use Groups:**
- 5+ related fields
- Complex design sections
- Container blocks
- Need organization

**Use Standalone:**
- 1-4 simple fields
- Content settings
- Quick settings
- Less visual clutter

## ✅ Current Implementation

**Components:**
- ✅ `field-group-renderer.svelte` - Collapsible group component
- ✅ `edit-block-tabs.svelte` - Handles both fields and groups
- ✅ `edit-block.svelte` - Proper field counting with groups

**Configured Blocks:**
- ✅ Section - 5 design groups (Layout, Background, Size, Spacing, Borders)

**Utilities:**
- ✅ `isFieldGroup()` - Type guard
- ✅ `countFields()` - Counts fields in groups

**UI:**
- ✅ Collapsible with chevron icon
- ✅ Smooth animations
- ✅ Proper spacing
- ✅ Accessible

---

**Design controls are now beautifully organized with collapsible groups! 🎉**

