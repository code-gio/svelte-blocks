# Tab Visibility Behavior

## 🎯 Smart Tab Display

The edit panel now **intelligently shows only relevant tabs** based on what fields are available for each block type.

## ✨ Behavior

### Rule: Hide Empty Tabs (Except Advanced)
- If Content tab has no fields, it's **hidden**
- If Design tab has no fields, it's **hidden**
- **Advanced tab is ALWAYS shown** (handles custom settings, HTML ID, CSS classes, etc.)
- Provides cleaner, less cluttered UI

### Default Tab Selection
- First available tab is automatically selected
- Priority order: Content → Design → Advanced

## 📊 Examples by Block Type

### Heading Block
**Shows:**
- ✅ Content tab (text, tag)
- ✅ Design tab (font size, weight, color, align)
- ✅ Advanced tab (always visible)

**Result:** User sees 3 tabs

---

### Div Block (Container)
**Shows:**
- ✅ Design tab (uses common design properties)
- ✅ Advanced tab (always visible)

**Hides:**
- ❌ Content tab (no content fields)

**Result:** User sees 2 tabs (Design, Advanced), auto-opens to Design

---

### Button Block
**Shows:**
- ✅ Content tab (text, URL, target)
- ✅ Design tab (colors, border radius)
- ✅ Advanced tab (always visible)

**Result:** User sees 3 tabs

---

### Grid Block
**Shows:**
- ✅ Content tab (items per row)
- ✅ Design tab (gap)
- ✅ Advanced tab (always visible)

**Result:** User sees 3 tabs

---

## 🔄 Dynamic Behavior

### Scenario 1: Block with Content and Design
```
heading block → Shows: Content, Design, Advanced (3 tabs)
grid block → Shows: Content, Design, Advanced (3 tabs)
button block → Shows: Content, Design, Advanced (3 tabs)
```

### Scenario 2: Block with Design Only
```
div block → Shows: Design, Advanced (2 tabs, auto-selects Design)
section block → Shows: Design, Advanced (2 tabs, auto-selects Design)
column block → Shows: Design, Advanced (2 tabs, auto-selects Design)
```

### Scenario 3: Block with Only Advanced (Hypothetical)
```
[future block] → Shows: Advanced (1 tab, auto-selected)
```

## 💡 Benefits

1. **Cleaner Interface** - No unnecessary empty tabs (except Advanced)
2. **Less Confusion** - Users don't wonder why tabs are empty
3. **Faster Navigation** - Fewer irrelevant tabs to click through
4. **Better UX** - Auto-selects the first available tab
5. **Contextual** - Shows only what's relevant
6. **Always Accessible** - Advanced tab always available for custom settings

## 🔧 Implementation Details

### Check for Fields
```typescript
const fieldConfig = getBlockFieldConfig(selectedElement.type);
const hasContentFields = (fieldConfig?.content?.length ?? 0) > 0;
const hasDesignFields = (fieldConfig?.design?.length ?? 0) > 0;
// Note: Advanced is always shown, so no check needed
```

### Conditional Tab Rendering
```svelte
{#if hasContentFields}
  <Tabs.Trigger value="content">Content</Tabs.Trigger>
{/if}
{#if hasDesignFields}
  <Tabs.Trigger value="design">Design</Tabs.Trigger>
{/if}
<!-- Advanced is always shown -->
<Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
```

### Auto-Select First Tab
```typescript
const defaultTab = hasContentFields 
  ? 'content' 
  : hasDesignFields 
    ? 'design' 
    : 'advanced';
```

## 📝 Adding Fields to Show/Hide Tabs

To show a tab for a block, just add fields to `field-configs.ts`:

```typescript
// This will show the Content tab for 'my-block'
'my-block': {
  content: [
    { key: 'content.text', label: 'Text', type: 'text' }
  ]
}

// This will show the Advanced tab for 'my-block'
'my-block': {
  advanced: [
    { key: 'settings.advanced.html_id', label: 'HTML ID', type: 'text' }
  ]
}
```

## 🎯 Current Block Tab Visibility

| Block | Content | Design | Advanced | Total Tabs |
|-------|---------|--------|----------|------------|
| heading | ✅ | ✅ | ✅ | 3 |
| text | ✅ | ✅ | ✅ | 3 |
| button | ✅ | ✅ | ✅ | 3 |
| grid | ✅ | ✅ | ✅ | 3 |
| column | ❌ | ✅ | ✅ | 2 |
| columns | ✅ | ✅ | ✅ | 3 |
| section | ❌ | ✅ | ✅ | 2 |
| div | ❌ | ❌* | ✅ | 1-2 |

*Note: Add common design fields to `div` in field-configs.ts if needed

## 🚀 Future: Add Common Design Fields

You could add a "common design fields" configuration that applies to all blocks:

```typescript
const commonDesignFields: FieldConfig[] = [
  {
    key: 'design.spacing.padding.breakpoint_base.all.value',
    label: 'Padding',
    type: 'number',
    min: 0,
    max: 200
  },
  {
    key: 'design.background.color.breakpoint_base',
    label: 'Background',
    type: 'color'
  }
];

// Merge with block-specific fields
const getBlockFieldConfig = (blockType: string): BlockFieldConfig => {
  const specificConfig = configs[blockType] || {};
  return {
    content: specificConfig.content || [],
    design: [...commonDesignFields, ...(specificConfig.design || [])],
    advanced: specificConfig.advanced || []
  };
};
```

---

**Tab visibility now provides a much better user experience! 🎉**

