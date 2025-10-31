# Smart Unit Handling System

## 🎯 Overview

The property editor now **automatically handles CSS units** when users edit values, providing sensible defaults based on the property type.

## ✨ Auto-Unit Assignment

### How It Works

When a user edits a numeric field (like font size, width, gap), the system:
1. Detects which property is being edited
2. Automatically assigns the appropriate CSS unit
3. Stores as `UnitValue: { value: number, unit: string }`

### Unit Defaults by Property

| Property | Default Unit | Example | Reason |
|----------|--------------|---------|--------|
| **line_height** | `''` (unitless) | `1.5` | CSS best practice for line-height |
| **letter_spacing** | `px` | `2px` | Spacing uses pixels |
| **gap** | `px` | `20px` | Spacing uses pixels |
| **width** | `%` | `50%` | Widths typically percentage |
| **height** | `px` | `400px` | Heights typically pixels |
| **min_width** | `%` | `30%` | Width-related |
| **max_width** | `%` | `100%` | Width-related |
| **min_height** | `px` | `100px` | Height-related |
| **max_height** | `px` | `500px` | Height-related |
| **padding/margin** | `px` | `20px` | Spacing uses pixels |
| **font_size** | `px` | `16px` | Typography uses pixels |
| **border_radius** | `px` | `4px` | Borders use pixels |
| **border_width** | `px` | `2px` | Borders use pixels |

## 🔧 Implementation

### In `field-configs.ts`

**setNestedValue() Enhancement:**
```typescript
export const setNestedValue = (obj, path, value) => {
  // ... set the value
  
  // Auto-set unit if editing a UnitValue.value
  if (lastKey === 'value' && keys.length > 0) {
    const parentKey = keys[keys.length - 1];
    
    if (parentKey === 'line_height' && !current.unit) {
      current.unit = '';  // Unitless
    }
    else if (parentKey === 'letter_spacing' && !current.unit) {
      current.unit = 'px';
    }
    // ... more smart defaults
  }
};
```

### In `block-utils.ts`

**extractTypographyStyles() Enhancement:**
```typescript
// Line height (can be unitless or with unit)
if (typo.line_height?.[breakpoint]) {
  const lh = typo.line_height[breakpoint];
  const unit = lh.unit && lh.unit !== 'px' ? lh.unit : '';
  styles.push(`line-height: ${lh.value}${unit}`);
}

// Letter spacing (defaults to px if no unit)
if (typo.letter_spacing?.[breakpoint]) {
  const ls = typo.letter_spacing[breakpoint];
  const unit = ls.unit || 'px';
  styles.push(`letter-spacing: ${ls.value}${unit}`);
}
```

## 💡 User Experience

### Example: User edits Line Height

**User Action:**
```
Typography group
├─ Line Height: [1.5]  ← User types 1.5
```

**What Happens:**
1. Field config path: `design.typography.line_height.breakpoint_base.value`
2. setNestedValue sets `value: 1.5`
3. Detects parent is `line_height`
4. Auto-sets `unit: ''` (unitless)
5. Result stored: `{ value: 1.5, unit: '' }`
6. CSS output: `line-height: 1.5` ✓

### Example: User edits Letter Spacing

**User Action:**
```
Typography group
├─ Letter Spacing: [2]  ← User types 2
```

**What Happens:**
1. Field config path: `design.typography.letter_spacing.breakpoint_base.value`
2. setNestedValue sets `value: 2`
3. Detects parent is `letter_spacing`
4. Auto-sets `unit: 'px'`
5. Result stored: `{ value: 2, unit: 'px' }`
6. CSS output: `letter-spacing: 2px` ✓

### Example: User edits Width

**User Action:**
```
Size group
├─ Width: [50]  ← User types 50
```

**What Happens:**
1. Field config path: `design.size.width.breakpoint_base.value`
2. setNestedValue sets `value: 50`
3. Detects parent is `width`
4. Auto-sets `unit: '%'`
5. Result stored: `{ value: 50, unit: '%' }`
6. CSS output: `width: 50%` ✓

## 📊 Field Config Examples

### Simple Number Field
```typescript
{
  key: 'design.typography.line_height.breakpoint_base.value',
  label: 'Line Height',
  type: 'number',
  min: 0.5,
  max: 5,
  step: 0.1
}
```
**Result:** User enters `1.5` → Stored as `{ value: 1.5, unit: '' }` → Renders as `line-height: 1.5`

### Width Field
```typescript
{
  key: 'design.size.width.breakpoint_base.value',
  label: 'Width',
  type: 'number',
  min: 0,
  max: 100,
  step: 1
}
```
**Result:** User enters `50` → Stored as `{ value: 50, unit: '%' }` → Renders as `width: 50%`

### Gap Field
```typescript
{
  key: 'design.layout.gap.breakpoint_base.value',
  label: 'Gap',
  type: 'number',
  min: 0,
  max: 200,
  step: 1
}
```
**Result:** User enters `20` → Stored as `{ value: 20, unit: 'px' }` → Renders as `gap: 20px`

## 🎯 Benefits

1. **User-Friendly** - Users just enter numbers, units handled automatically
2. **Smart Defaults** - Each property gets the right unit
3. **CSS Best Practices** - Line height unitless, spacing in px
4. **No Breaking** - Existing data with units remains unchanged
5. **Type-Safe** - Full UnitValue interface compliance
6. **Flexible** - Can override unit if already set

## 🚀 Future: Unit Selector Fields

For advanced users who need custom units:

```typescript
{
  key: 'design.typography.font_size.breakpoint_base',
  label: 'Font Size',
  type: 'unit-value',  // New field type
  units: ['px', 'em', 'rem', '%'],
  defaultUnit: 'px'
}
```

Would render as:
```
Font Size: [16] [px ▼]
```

## 📝 Adding New Property Types

To add smart unit handling for a new property:

```typescript
// In setNestedValue function
else if (parentKey === 'your_property' && !current.unit) {
  current.unit = 'your-default-unit';
}
```

## ✅ Current Smart Units

Properties with auto-unit assignment:
- ✅ `line_height` → unitless
- ✅ `letter_spacing` → px
- ✅ `gap` → px
- ✅ `width`, `min_width`, `max_width` → %
- ✅ `height`, `min_height`, `max_height` → px
- ✅ All other numeric values → px (fallback)

## 🔍 How Units are Applied

### Storage (in element.properties):
```json
{
  "design": {
    "typography": {
      "line_height": {
        "breakpoint_base": {
          "value": 1.5,
          "unit": ""
        }
      },
      "letter_spacing": {
        "breakpoint_base": {
          "value": 2,
          "unit": "px"
        }
      }
    }
  }
}
```

### CSS Output:
```css
line-height: 1.5;
letter-spacing: 2px;
```

---

**The system now intelligently handles CSS units, making editing easier while maintaining proper CSS standards! 🎉**

