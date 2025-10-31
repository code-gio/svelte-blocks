# Dynamic Property Editor System

## 🎯 Overview

A dynamic, block-type-aware property editing system that automatically generates appropriate form fields based on the selected block.

## 📁 Files Created

### 1. **field-configs.ts** - Configuration System
Defines what fields each block type needs for editing.

**Key Features:**
- Block-specific field configurations
- Support for multiple field types
- Nested property path handling
- Helper functions for getting/setting nested values

**Field Types Supported:**
- `text` - Single-line text input
- `textarea` - Multi-line text input
- `number` - Numeric input with min/max/step
- `select` - Dropdown selection
- `color` - Color picker with hex input
- `checkbox` - Boolean toggle
- `unit-value` - Value with unit (future)
- `spacing` - Box spacing editor (future)

### 2. **field-renderer.svelte** - Field Component
Renders individual form fields based on configuration.

**Props:**
- `config: FieldConfig` - Field configuration
- `value: unknown` - Current value
- `onchange: (value: unknown) => void` - Change handler

**Features:**
- Automatic field type detection
- Label and description support
- Default value handling
- Type-safe value conversion

### 3. **edit-block-tabs.svelte** - Tab Content Component
Renders the appropriate fields for a tab (Content/Design/Advanced).

**Props:**
- `element: BuilderElement` - The element being edited
- `tab: 'content' | 'design' | 'advanced'` - Which tab to render

**Features:**
- Dynamic field loading based on block type
- Real-time property updates
- Empty state handling
- Nested property path support

### 4. **edit-block.svelte** (Updated)
Main edit panel with tabbed interface.

**Changes:**
- Integrated EditBlockTabs component
- Added tab navigation
- Shows message when no block selected

## 🔧 Block Field Configurations

### Heading Block
**Content:**
- Heading Text (text)
- HTML Tag (select: h1-h6)

**Design:**
- Font Size (number: 8-200)
- Font Weight (select: 100-900)
- Text Color (color)
- Text Align (select: left/center/right/justify)

### Text Block
**Content:**
- Text Content (textarea)

**Design:**
- Font Size (number: 8-200)
- Text Color (color)
- Text Align (select)

### Button Block
**Content:**
- Button Text (text)
- Link URL (text)
- Link Target (select: _self/_blank)

**Design:**
- Background Color (color)
- Text Color (color)
- Border Radius (number: 0-100)

### Grid Block
**Content:**
- Items Per Row (number: 1-12)

**Design:**
- Gap (number: 0-200)

### Column Block
**Design:**
- Width (number: 0-100%)

### Columns Block
**Content:**
- Column Layout (select: 50-50, 33-33-33, etc.)

**Design:**
- Gap (number: 0-200)

### Section Block
**Design:**
- Padding (number: 0-200)
- Background Color (color)

## 🔌 Integration with Editor Manager

### New Method Added:
```typescript
updateElementProperties(id: string, properties: ElementProperties): void
```

Updates an element's properties by ID and triggers reactivity.

## 💡 How It Works

### 1. User Selects a Block
```typescript
editorManager.selectElement(elementId);
```

### 2. Edit Panel Shows Block Info
```typescript
const selectedElement = editorManager.findElementById(elementId);
const blockInfo = getBlockById(selectedElement.type);
```

### 3. Field Config Loaded
```typescript
const config = getBlockFieldConfig('heading');
// Returns content, design, and advanced field configs
```

### 4. Fields Rendered Dynamically
```svelte
{#each fields as field}
  <FieldRenderer 
    config={field}
    value={getNestedValue(element.properties, field.key)}
    onchange={(value) => handleFieldChange(field.key, value)}
  />
{/each}
```

### 5. Changes Update Element
```typescript
handleFieldChange('content.text', 'New Heading');
// Updates: element.properties.content.text = 'New Heading'
editorManager.updateElementProperties(elementId, updatedProperties);
```

## 🎨 UI Components Used

From shadcn-svelte:
- `Field` - Form field wrapper with label/description
- `Input` - Text and number inputs
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Boolean toggle
- `Tabs` - Tab navigation

## 📝 Adding New Block Fields

### Example: Adding Image Block Fields

```typescript
// In field-configs.ts
const configs: Record<string, BlockFieldConfig> = {
  // ... existing configs
  image: {
    content: [
      {
        key: 'content.image.url',
        label: 'Image URL',
        type: 'text',
        placeholder: 'https://example.com/image.jpg',
        defaultValue: ''
      },
      {
        key: 'content.image.alt',
        label: 'Alt Text',
        type: 'text',
        placeholder: 'Describe the image',
        defaultValue: ''
      }
    ],
    design: [
      {
        key: 'design.size.width.breakpoint_base.value',
        label: 'Width',
        type: 'number',
        min: 0,
        max: 100,
        defaultValue: 100,
        description: 'Width as percentage'
      }
    ]
  }
};
```

## 🚀 Future Enhancements

### Phase 1 (Completed):
- ✅ Basic field types (text, number, select, color, textarea, checkbox)
- ✅ Dynamic field rendering
- ✅ Nested property path handling
- ✅ Real-time updates
- ✅ Tab navigation

### Phase 2 (Next):
- [ ] Unit-value field (value + unit selector)
- [ ] Spacing field (box model editor)
- [ ] Responsive field (per-breakpoint values)
- [ ] File upload for images
- [ ] Rich text editor for HTML content
- [ ] Icon picker for icon blocks

### Phase 3 (Advanced):
- [ ] Visual color palette picker
- [ ] Gradient editor
- [ ] Border style editor with preview
- [ ] Shadow editor with preview
- [ ] Typography preset selector
- [ ] Undo/redo for property changes

## 🔍 Property Path Examples

The system uses dot notation to access nested properties:

```typescript
// Simple property
'content.text' → element.properties.content.text

// Nested design property
'design.typography.font_size.breakpoint_base.value'
→ element.properties.design.typography.font_size.breakpoint_base.value

// Nested object
'content.link.href'
→ element.properties.content.link.href
```

## ⚙️ Helper Functions

### getNestedValue(obj, path)
```typescript
getNestedValue(element.properties, 'design.typography.color.breakpoint_base')
// Returns: '#000000'
```

### setNestedValue(obj, path, value)
```typescript
setNestedValue(properties, 'content.text', 'Hello World')
// Sets: properties.content.text = 'Hello World'
// Creates intermediate objects if needed
```

## 🎯 Benefits

1. **Dynamic** - Automatically shows relevant fields for each block type
2. **Type-Safe** - TypeScript support throughout
3. **Extensible** - Easy to add new field types and block configs
4. **DRY** - Reusable field renderer component
5. **Reactive** - Real-time updates with Svelte runes
6. **User-Friendly** - Clean UI with labels and descriptions
7. **Maintainable** - Centralized field configurations

## 📊 Current Status

**Supported Blocks:**
- ✅ heading
- ✅ text
- ✅ button
- ✅ grid
- ✅ column
- ✅ columns
- ✅ section
- ✅ div (no specific fields, uses design properties)

**To Add:**
- ⏳ rich-text
- ⏳ text-link
- ⏳ image
- ⏳ video
- ⏳ icon

## 🧪 Testing

To test the property editor:
1. Open the editor
2. Add a block (e.g., heading)
3. Click to select it
4. Edit panel should show on left sidebar
5. Switch between Content/Design/Advanced tabs
6. Change field values
7. Block should update in real-time

## 💡 Usage Example

```svelte
<!-- User clicks a heading block -->
<!-- Edit panel loads -->
<EditBlockTabs element={headingElement} tab="content" />

<!-- Renders: -->
<FieldRenderer 
  config={{ 
    key: 'content.text', 
    label: 'Heading Text', 
    type: 'text' 
  }}
  value="My Heading"
  onchange={(value) => updateProperty('content.text', value)}
/>

<!-- User types new text -->
<!-- onChange fires -->
<!-- updateElementProperties called -->
<!-- Block re-renders with new text -->
```

---

**The property editor system is now complete and ready to use! 🎉**

