# Advanced Tab Guide

## 🎯 Overview

The **Advanced tab is always visible** for all blocks, providing access to custom settings like HTML ID and CSS classes.

## ✨ Why Always Visible?

Unlike Content and Design tabs which are conditionally shown based on available fields, the Advanced tab is **always accessible** because:

1. **Universal Settings** - HTML ID and CSS classes apply to all blocks
2. **Custom Styling** - Users can add their own CSS classes
3. **Accessibility** - IDs needed for ARIA labels, anchors, etc.
4. **Developer Flexibility** - Power users need these options
5. **Future Extensibility** - More advanced settings can be added

## 📋 Common Advanced Fields (All Blocks)

### 1. HTML ID
- **Key:** `settings.advanced.html_id`
- **Type:** Text input
- **Purpose:** Set unique ID attribute on the element
- **Example:** `hero-section`, `main-cta-button`
- **Use Cases:**
  - Anchor links (`<a href="#hero-section">`)
  - JavaScript targeting
  - CSS targeting with `#id`
  - Accessibility (ARIA labels)

### 2. CSS Classes
- **Key:** `settings.advanced.css_classes`
- **Type:** Text input (space-separated)
- **Storage:** Array of strings
- **Purpose:** Add custom CSS classes
- **Example:** `custom-animation hover-effect`
- **Use Cases:**
  - Custom Tailwind classes
  - Animation classes
  - Third-party library classes
  - Custom CSS targeting

## 🔧 Implementation in Blocks

### Required Utilities
```typescript
import {
  getHtmlId,
  getCssClasses
} from './block-utils';
```

### Extract Values
```typescript
const htmlId = $derived(getHtmlId(element));
const customClasses = $derived(getCssClasses(element));
```

### Combine with Block Classes
```typescript
// For leaf blocks
const combinedClasses = $derived(
  [getLeafBlockClasses(isSelected), customClasses].filter(Boolean).join(' ')
);

// For container blocks
const combinedClasses = $derived(
  [getContainerBlockClasses(isSelected), customClasses].filter(Boolean).join(' ')
);
```

### Apply to Element
```svelte
<div
  id={htmlId}
  class={combinedClasses}
  ...
>
```

## 📊 Complete Example

### In Field Config:
```typescript
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
```

### In Block Component:
```svelte
<script lang="ts">
  import type { BuilderElement } from "$lib/types/block";
  import {
    // ... other utilities
    getHtmlId,
    getCssClasses
  } from './block-utils';

  let { element }: { element: BuilderElement } = $props();

  // ... other derived values
  const htmlId = $derived(getHtmlId(element));
  const customClasses = $derived(getCssClasses(element));
  const combinedClasses = $derived(
    [getLeafBlockClasses(isSelected), customClasses].filter(Boolean).join(' ')
  );
</script>

<p
  id={htmlId}
  class={combinedClasses}
  ...
>
  {text}
</p>
```

### User Experience:
1. User selects a heading block
2. Clicks "Advanced" tab
3. Enters `hero-title` in HTML ID field
4. Enters `text-gradient animate-fade-in` in CSS Classes
5. Result:
```html
<h2 
  id="hero-title" 
  class="relative cursor-pointer ... text-gradient animate-fade-in"
>
  My Heading
</h2>
```

## 🎨 Use Cases

### 1. Custom Animations
```
CSS Classes: animate-slide-in-left duration-1000
```

### 2. Tailwind Utilities
```
CSS Classes: shadow-2xl dark:bg-gray-800 md:col-span-2
```

### 3. Anchor Links
```
HTML ID: pricing-section
```
Then link to it: `<a href="#pricing-section">Go to Pricing</a>`

### 4. JavaScript Targeting
```
HTML ID: contact-form
CSS Classes: js-validate
```

### 5. Third-Party Libraries
```
CSS Classes: aos-fade-up swiper-slide
```

## 🔒 Data Structure

### Storage Format:
```typescript
{
  settings: {
    advanced: {
      html_id: "my-element",           // string
      css_classes: ["class1", "class2"] // array of strings
    }
  }
}
```

### Display Format:
```
HTML ID: my-element
CSS Classes: class1 class2  (space-separated string)
```

### Conversion:
- **Input → Storage:** `"class1 class2"` → `["class1", "class2"]`
- **Storage → Display:** `["class1", "class2"]` → `"class1 class2"`

## ⚙️ Helper Functions

### getHtmlId(element)
```typescript
export const getHtmlId = (element: BuilderElement): string | undefined => {
  return element.properties.settings?.advanced?.html_id;
};
```

### getCssClasses(element)
```typescript
export const getCssClasses = (element: BuilderElement): string => {
  const classes = element.properties.settings?.advanced?.css_classes;
  return Array.isArray(classes) ? classes.join(' ') : '';
};
```

## ✅ Benefits

1. **Always Accessible** - No hunting for where to set ID/classes
2. **Consistent Location** - Always in Advanced tab
3. **Universal** - Works for all block types
4. **Flexible** - Supports any custom classes
5. **Safe** - Properly merged with block's default classes
6. **Type-Safe** - Full TypeScript support

## 🚀 Future Advanced Fields

Potential additions to Advanced tab:

- **Data Attributes** - Custom `data-*` attributes
- **ARIA Labels** - Accessibility attributes
- **Animations** - Animation presets
- **Visibility** - Hide on mobile/tablet/desktop
- **Conditions** - Show/hide based on logic
- **Custom Attributes** - Any HTML attribute
- **SEO** - Schema.org microdata
- **Performance** - Lazy loading options

## 📝 Adding Block-Specific Advanced Fields

To add custom advanced fields for specific blocks:

```typescript
// In field-configs.ts
button: {
  content: [...],
  design: [...],
  advanced: [
    // Block-specific advanced fields (added to common fields)
    {
      key: 'settings.advanced.tracking_id',
      label: 'Analytics Tracking ID',
      type: 'text',
      description: 'Google Analytics event ID'
    }
  ]
}
```

Result: Button block shows:
- HTML ID (common)
- CSS Classes (common)
- Analytics Tracking ID (button-specific)

---

**The Advanced tab provides powerful customization options while maintaining a clean, consistent interface! 🎉**

