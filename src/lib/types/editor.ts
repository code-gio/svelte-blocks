export type EditorLeftSidebarMode = "add" | "edit";
export type EditorViewMode = "desktop" | "tablet" | "mobile";

// Page Builder Types
export interface UnitValue {
  value: number;
  unit: "px" | "em" | "rem" | "%" | "vh" | "vw" | "auto";
}

export interface BoxSpacing {
  top?: UnitValue;
  right?: UnitValue;
  bottom?: UnitValue;
  left?: UnitValue;
  all?: UnitValue;
}

export type ResponsiveValue<T> = {
  breakpoint_base?: T;
  breakpoint_tablet_landscape?: T;
  breakpoint_tablet_portrait?: T;
  breakpoint_phone_landscape?: T;
  breakpoint_phone_portrait?: T;
  [customBreakpoint: string]: T | undefined;
};

export interface SpacingProperties {
  margin?: ResponsiveValue<BoxSpacing>;
  padding?: ResponsiveValue<BoxSpacing>;
}

export interface TypographyProperties {
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
}

export interface BackgroundProperties {
  type?: "color" | "gradient" | "image" | "video";
  color?: ResponsiveValue<string>;
}

export interface BorderRadius {
  top_left?: UnitValue;
  top_right?: UnitValue;
  bottom_right?: UnitValue;
  bottom_left?: UnitValue;
  all?: UnitValue;
}

export interface BorderProperties {
  border_radius?: ResponsiveValue<BorderRadius>;
}

export interface LayoutProperties {
  display?: ResponsiveValue<
    "block" | "flex" | "grid" | "inline" | "inline-block" | "none"
  >;
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
  gap?: ResponsiveValue<UnitValue>;
}

export interface DesignProperties {
  layout?: LayoutProperties;
  spacing?: SpacingProperties;
  typography?: TypographyProperties;
  background?: BackgroundProperties;
  border?: BorderProperties;
}

export interface ContentProperties {
  text?: string;
  html?: string;
  tag?: string;
  [key: string]: unknown;
}

export interface AdvancedSettings {
  html_id?: string;
  css_classes?: string[];
}

export interface SettingsProperties {
  advanced?: AdvancedSettings;
}

export interface ElementProperties {
  content?: ContentProperties;
  design?: DesignProperties;
  settings?: SettingsProperties;
}

export interface BuilderElement {
  id: string;
  type: string;
  parentId: string | null;
  properties: ElementProperties;
  children: BuilderElement[];
}

export interface PageStructure {
  id: string;
  elements: BuilderElement[];
}

// Drag and Drop Types
export interface DragState {
  blockType: string | null;
  blockName: string | null;
}
