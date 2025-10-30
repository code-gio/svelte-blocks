# Page Builder JSON Schema Format

Here's a comprehensive format for your custom page builder with Breakdance-like functionality:

## 1. Core Schema Structure

```typescript
interface BuilderElement {
  id: string | number; // Unique identifier
  type: string; // Element type (e.g., "section", "heading")
  parentId?: string | number | null; // Reference to parent (null for root)
  properties: ElementProperties; // All element configurations
  children?: BuilderElement[]; // Nested elements
  metadata?: ElementMetadata; // Optional metadata
}

interface ElementProperties {
  content?: ContentProperties; // Element-specific content
  design?: DesignProperties; // Visual styling
  settings?: SettingsProperties; // Advanced configurations
}
```

## 2. Content Properties

```typescript
interface ContentProperties {
  // Text-based elements
  text?: string;
  html?: string;

  // Media elements
  image?: MediaObject;
  video?: MediaObject;
  icon?: IconObject;

  // Links
  link?: LinkObject;

  // Lists/Repeaters
  items?: Array<any>;

  // Element-specific content
  [key: string]: any;
}

interface MediaObject {
  id?: number;
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: ImageSize;
    medium?: ImageSize;
    large?: ImageSize;
    full?: ImageSize;
    [key: string]: ImageSize;
  };
  // Responsive images
  responsive?: {
    [breakpoint: string]: MediaObject;
  };
}

interface LinkObject {
  type: "url" | "page" | "post" | "custom" | "email" | "tel";
  url?: string;
  page_id?: number;
  post_id?: number;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  aria_label?: string;
}

interface IconObject {
  library: "fontawesome" | "lineicons" | "custom";
  icon: string;
  svg?: string;
}
```

## 3. Design Properties (Styling)

```typescript
interface DesignProperties {
  layout?: LayoutProperties;
  spacing?: SpacingProperties;
  typography?: TypographyProperties;
  background?: BackgroundProperties;
  border?: BorderProperties;
  effects?: EffectsProperties;
  size?: SizeProperties;
  position?: PositionProperties;
}

// Responsive value system
type ResponsiveValue<T> = {
  breakpoint_base?: T;
  breakpoint_tablet_landscape?: T;
  breakpoint_tablet_portrait?: T;
  breakpoint_phone_landscape?: T;
  breakpoint_phone_portrait?: T;
  [customBreakpoint: string]: T;
};

interface LayoutProperties {
  display?: ResponsiveValue<
    "block" | "flex" | "grid" | "inline" | "inline-block" | "none"
  >;

  // Flexbox
  flex_direction?: ResponsiveValue<
    "row" | "column" | "row-reverse" | "column-reverse"
  >;
  justify_content?: ResponsiveValue<
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
  >;
  align_items?: ResponsiveValue<
    "flex-start" | "center" | "flex-end" | "stretch" | "baseline"
  >;
  flex_wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">;
  gap?: ResponsiveValue<UnitValue>;

  // Grid
  grid_template_columns?: ResponsiveValue<string>;
  grid_template_rows?: ResponsiveValue<string>;
  grid_gap?: ResponsiveValue<UnitValue>;

  // Columns (for column layouts)
  columns?: ResponsiveValue<number>;
  column_gap?: ResponsiveValue<UnitValue>;
}

interface SpacingProperties {
  margin?: ResponsiveValue<BoxSpacing>;
  padding?: ResponsiveValue<BoxSpacing>;
}

interface BoxSpacing {
  top?: UnitValue;
  right?: UnitValue;
  bottom?: UnitValue;
  left?: UnitValue;
  // Shorthand
  all?: UnitValue;
}

interface UnitValue {
  value: number;
  unit: "px" | "em" | "rem" | "%" | "vh" | "vw" | "auto";
}

interface TypographyProperties {
  font_family?: ResponsiveValue<string>;
  font_size?: ResponsiveValue<UnitValue>;
  font_weight?: ResponsiveValue<
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  >;
  font_style?: ResponsiveValue<"normal" | "italic" | "oblique">;
  line_height?: ResponsiveValue<UnitValue>;
  letter_spacing?: ResponsiveValue<UnitValue>;
  text_align?: ResponsiveValue<"left" | "center" | "right" | "justify">;
  text_transform?: ResponsiveValue<
    "none" | "uppercase" | "lowercase" | "capitalize"
  >;
  text_decoration?: ResponsiveValue<
    "none" | "underline" | "overline" | "line-through"
  >;
  color?: ResponsiveValue<string>;

  // Advanced
  word_spacing?: ResponsiveValue<UnitValue>;
  text_shadow?: ResponsiveValue<ShadowValue>;
}

interface BackgroundProperties {
  type?: "color" | "gradient" | "image" | "video";
  color?: ResponsiveValue<string>;
  gradient?: ResponsiveValue<GradientValue>;
  image?: ResponsiveValue<BackgroundImage>;
  video?: ResponsiveValue<BackgroundVideo>;
  overlay?: OverlayProperties;
}

interface BackgroundImage {
  image: MediaObject;
  size?: "auto" | "cover" | "contain" | "custom";
  position?:
    | "center center"
    | "top left"
    | "top center"
    | "top right"
    | "center left"
    | "center right"
    | "bottom left"
    | "bottom center"
    | "bottom right"
    | "custom";
  custom_position?: { x: number; y: number };
  repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  attachment?: "scroll" | "fixed" | "local";
  custom_size?: { width?: UnitValue; height?: UnitValue };
}

interface BorderProperties {
  border?: ResponsiveValue<BorderSide>;
  border_radius?: ResponsiveValue<BorderRadius>;
  box_shadow?: ResponsiveValue<ShadowValue[]>;
}

interface BorderSide {
  width?: UnitValue;
  style?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none";
  color?: string;
}

interface BorderRadius {
  top_left?: UnitValue;
  top_right?: UnitValue;
  bottom_right?: UnitValue;
  bottom_left?: UnitValue;
  all?: UnitValue;
}

interface ShadowValue {
  x: UnitValue;
  y: UnitValue;
  blur: UnitValue;
  spread?: UnitValue;
  color: string;
  inset?: boolean;
}

interface EffectsProperties {
  opacity?: ResponsiveValue<number>;
  transform?: ResponsiveValue<TransformValue>;
  transition?: TransitionValue;
  filter?: ResponsiveValue<FilterValue>;
  blend_mode?: ResponsiveValue<string>;
  cursor?: ResponsiveValue<string>;
}

interface TransformValue {
  rotate?: number;
  scale?: number;
  translate_x?: UnitValue;
  translate_y?: UnitValue;
  skew_x?: number;
  skew_y?: number;
}

interface SizeProperties {
  width?: ResponsiveValue<UnitValue | "auto" | "full">;
  height?: ResponsiveValue<UnitValue | "auto" | "fit-content">;
  min_width?: ResponsiveValue<UnitValue>;
  max_width?: ResponsiveValue<UnitValue>;
  min_height?: ResponsiveValue<UnitValue>;
  max_height?: ResponsiveValue<UnitValue>;
}

interface PositionProperties {
  position?: ResponsiveValue<
    "static" | "relative" | "absolute" | "fixed" | "sticky"
  >;
  top?: ResponsiveValue<UnitValue>;
  right?: ResponsiveValue<UnitValue>;
  bottom?: ResponsiveValue<UnitValue>;
  left?: ResponsiveValue<UnitValue>;
  z_index?: ResponsiveValue<number>;
  overflow?: ResponsiveValue<"visible" | "hidden" | "scroll" | "auto">;
}
```

## 4. Settings Properties (Advanced)

```typescript
interface SettingsProperties {
  advanced?: AdvancedSettings;
  responsive?: ResponsiveSettings;
  conditions?: ConditionalSettings;
  animations?: AnimationSettings;
  interactions?: InteractionSettings;
}

interface AdvancedSettings {
  // Custom CSS
  custom_css?: {
    [breakpoint: string]: string;
  };

  // Custom Classes & IDs
  html_id?: string;
  css_classes?: string[];

  // HTML Attributes
  attributes?: Array<{
    name: string;
    value: string;
  }>;

  // Accessibility
  aria_label?: string;
  role?: string;

  // Wrapper settings
  wrapper?: {
    tag?: string;
    layout?: LayoutProperties;
    spacing?: SpacingProperties;
    size?: SizeProperties;
    position?: PositionProperties;
  };
}

interface ResponsiveSettings {
  hide_on?: string[]; // Array of breakpoints to hide on
  duplicate_on?: string[]; // Create duplicates for specific breakpoints
}

interface ConditionalSettings {
  display_conditions?: Array<{
    type: "user_role" | "logged_in" | "date_range" | "custom";
    operator: "is" | "is_not" | "contains" | "greater_than" | "less_than";
    value: any;
    logic?: "and" | "or";
  }>;
}

interface AnimationSettings {
  entrance?: {
    animation: string;
    duration?: number;
    delay?: number;
    easing?: string;
  };
  hover?: {
    animation: string;
    duration?: number;
  };
  scroll?: {
    animation: string;
    start?: number;
    end?: number;
  };
}

interface InteractionSettings {
  on_click?: ActionObject;
  on_hover?: ActionObject;
  on_scroll?: ActionObject;
}

interface ActionObject {
  action: "popup" | "scroll_to" | "toggle" | "custom_js";
  target?: string;
  custom_code?: string;
}
```

## 5. Complete Example

```json
{
  "page": {
    "id": "page_1",
    "meta": {
      "version": "1.0.0",
      "created_at": "2025-01-30T00:00:00Z",
      "updated_at": "2025-01-30T00:00:00Z"
    },
    "breakpoints": {
      "breakpoint_base": 1920,
      "breakpoint_tablet_landscape": 1024,
      "breakpoint_tablet_portrait": 768,
      "breakpoint_phone_landscape": 480,
      "breakpoint_phone_portrait": 320
    },
    "elements": [
      {
        "id": "section_1",
        "type": "section",
        "parentId": null,
        "properties": {
          "design": {
            "layout": {
              "display": {
                "breakpoint_base": "flex"
              },
              "flex_direction": {
                "breakpoint_base": "column"
              },
              "align_items": {
                "breakpoint_base": "center"
              }
            },
            "spacing": {
              "padding": {
                "breakpoint_base": {
                  "top": { "value": 100, "unit": "px" },
                  "bottom": { "value": 100, "unit": "px" },
                  "left": { "value": 20, "unit": "px" },
                  "right": { "value": 20, "unit": "px" }
                },
                "breakpoint_phone_portrait": {
                  "top": { "value": 50, "unit": "px" },
                  "bottom": { "value": 50, "unit": "px" }
                }
              }
            },
            "background": {
              "type": "image",
              "image": {
                "breakpoint_base": {
                  "image": {
                    "id": 123,
                    "url": "https://example.com/hero.jpg",
                    "alt": "Hero Background"
                  },
                  "size": "cover",
                  "position": "center center"
                }
              },
              "overlay": {
                "type": "color",
                "color": "rgba(0,0,0,0.5)"
              }
            }
          },
          "settings": {
            "advanced": {
              "html_id": "hero-section",
              "css_classes": ["hero", "main-section"]
            }
          }
        },
        "children": [
          {
            "id": "heading_1",
            "type": "heading",
            "parentId": "section_1",
            "properties": {
              "content": {
                "text": "Welcome to Our Page Builder",
                "tag": "h1"
              },
              "design": {
                "typography": {
                  "font_family": {
                    "breakpoint_base": "Roboto"
                  },
                  "font_size": {
                    "breakpoint_base": { "value": 48, "unit": "px" },
                    "breakpoint_phone_portrait": { "value": 32, "unit": "px" }
                  },
                  "font_weight": {
                    "breakpoint_base": 700
                  },
                  "color": {
                    "breakpoint_base": "#ffffff"
                  },
                  "text_align": {
                    "breakpoint_base": "center"
                  }
                },
                "spacing": {
                  "margin": {
                    "breakpoint_base": {
                      "bottom": { "value": 20, "unit": "px" }
                    }
                  }
                }
              }
            },
            "children": []
          },
          {
            "id": "button_1",
            "type": "button",
            "parentId": "section_1",
            "properties": {
              "content": {
                "text": "Get Started",
                "link": {
                  "type": "url",
                  "url": "/contact",
                  "target": "_self"
                }
              },
              "design": {
                "spacing": {
                  "padding": {
                    "breakpoint_base": {
                      "top": { "value": 15, "unit": "px" },
                      "bottom": { "value": 15, "unit": "px" },
                      "left": { "value": 30, "unit": "px" },
                      "right": { "value": 30, "unit": "px" }
                    }
                  }
                },
                "background": {
                  "type": "color",
                  "color": {
                    "breakpoint_base": "#007bff"
                  }
                },
                "typography": {
                  "color": {
                    "breakpoint_base": "#ffffff"
                  },
                  "font_size": {
                    "breakpoint_base": { "value": 16, "unit": "px" }
                  },
                  "font_weight": {
                    "breakpoint_base": 600
                  }
                },
                "border": {
                  "border_radius": {
                    "breakpoint_base": {
                      "all": { "value": 5, "unit": "px" }
                    }
                  }
                }
              },
              "settings": {
                "animations": {
                  "hover": {
                    "animation": "scale",
                    "duration": 300
                  }
                }
              }
            },
            "children": []
          }
        ]
      }
    ]
  }
}
```

## 6. Element Type Definitions

```typescript
// Map of all available element types
const ELEMENT_TYPES = {
  // Basic
  section: "section",
  columns: "columns",
  column: "column",
  div: "div",
  heading: "heading",
  text: "text",
  rich_text: "rich_text",
  button: "button",
  image: "image",
  video: "video",
  icon: "icon",

  // Content & Media
  gallery: "gallery",
  image_box: "image_box",

  // Interactive
  tabs: "tabs",
  accordion: "accordion",
  slider: "slider",

  // Forms
  form: "form",
  input: "input",
  textarea: "textarea",
  select: "select",

  // ... etc
};
```

## 7. Best Practices & Guidelines

### **7.1 ID Generation**

```typescript
// Use unique, sequential IDs
let elementCounter = 1;
function generateId(type: string): string {
  return `${type}_${elementCounter++}`;
}
```

### **7.2 Breakpoint System**

```typescript
const BREAKPOINTS = {
  breakpoint_base: { min: 1920, label: "Desktop" },
  breakpoint_tablet_landscape: {
    min: 1024,
    max: 1919,
    label: "Tablet Landscape",
  },
  breakpoint_tablet_portrait: { min: 768, max: 1023, label: "Tablet Portrait" },
  breakpoint_phone_landscape: { min: 480, max: 767, label: "Phone Landscape" },
  breakpoint_phone_portrait: { min: 0, max: 479, label: "Phone Portrait" },
};
```

### **7.3 Default Values**

```typescript
const DEFAULT_PROPERTIES = {
  section: {
    design: {
      layout: {
        display: { breakpoint_base: "block" },
      },
      spacing: {
        padding: {
          breakpoint_base: {
            all: { value: 0, unit: "px" },
          },
        },
      },
    },
  },
  // ... defaults for each element type
};
```

### **7.4 Validation Schema**

Use a validation library like Zod or Joi:

```typescript
import { z } from "zod";

const UnitValueSchema = z.object({
  value: z.number(),
  unit: z.enum(["px", "em", "rem", "%", "vh", "vw", "auto"]),
});

const ElementSchema = z.object({
  id: z.string(),
  type: z.string(),
  parentId: z.string().nullable(),
  properties: z.object({
    content: z.record(z.any()).optional(),
    design: z.record(z.any()).optional(),
    settings: z.record(z.any()).optional(),
  }),
  children: z.array(z.lazy(() => ElementSchema)).optional(),
});
```

## 8. State Management Structure

```typescript
interface BuilderState {
  page: {
    id: string;
    meta: PageMeta;
    breakpoints: Breakpoints;
    elements: BuilderElement[];
  };
  ui: {
    selectedElement: string | null;
    hoveredElement: string | null;
    activeBreakpoint: string;
    viewMode: "edit" | "preview";
  };
  history: {
    past: BuilderElement[][];
    future: BuilderElement[][];
  };
}
```

## 9. API Structure

```typescript
// CRUD operations
interface BuilderAPI {
  // Elements
  createElement(type: string, parentId: string): BuilderElement;
  updateElement(id: string, properties: Partial<ElementProperties>): void;
  deleteElement(id: string): void;
  duplicateElement(id: string): BuilderElement;
  moveElement(id: string, newParentId: string, position: number): void;

  // Properties
  updateProperty(elementId: string, path: string, value: any): void;
  getProperty(elementId: string, path: string): any;

  // History
  undo(): void;
  redo(): void;

  // Export/Import
  exportJSON(): string;
  importJSON(json: string): void;
  exportHTML(): string;
}
```

This format gives you:

- ✅ Full responsive control
- ✅ Advanced CSS capabilities
- ✅ Nested element support
- ✅ Type safety (with TypeScript)
- ✅ Extensibility
- ✅ Easy serialization/deserialization
- ✅ Performance optimization (can be flattened for rendering)
