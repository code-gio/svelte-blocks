// Re-export block types for convenience
export type {
	UnitValue,
	BoxSpacing,
	ResponsiveValue,
	SpacingProperties,
	TypographyProperties,
	BackgroundProperties,
	BorderRadius,
	BorderWidth,
	BorderProperties,
	SizeProperties,
	PositionProperties,
	EffectsProperties,
	LayoutProperties,
	DesignProperties,
	ContentProperties,
	AdvancedSettings,
	SettingsProperties,
	ElementProperties,
	BuilderElement,
	PageStructure
} from './block';

// Editor-specific types
export type EditorLeftSidebarMode = 'add' | 'edit';
export type EditorViewMode = 'desktop' | 'tablet' | 'mobile';

// Drag and Drop Types
export interface DragState {
	blockType: string | null;
	blockName: string | null;
}
