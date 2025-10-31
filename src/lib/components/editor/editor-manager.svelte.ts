import type {
	EditorLeftSidebarMode,
	EditorViewMode,
	PageStructure,
	BuilderElement,
	DragState
} from '$lib/types/editor';
import {
	canBlockHaveChildren,
	isLeafBlock,
	getDefaultProperties
} from '$lib/components/editor/renderer/block-registry';

class EditorManager {
	private static instance: EditorManager;

	// Sidebar state
	rightSidebarOpen = $state(true);
	leftSidebarMode = $state<EditorLeftSidebarMode>('add');

	// View mode state
	viewMode = $state<EditorViewMode>('desktop');

	// Page structure state
	page = $state<PageStructure>({
		id: 'page_1',
		elements: []
	});

	// Drag and drop state
	dragState = $state<DragState>({
		blockType: null,
		blockName: null
	});

	// Selected element
	selectedElementId = $state<string | null>(null);

	// Element ID counter for unique IDs
	private elementCounter = 1;

	private constructor() {}

	public static getInstance(): EditorManager {
		if (!EditorManager.instance) {
			EditorManager.instance = new EditorManager();
		}
		return EditorManager.instance;
	}

	// Right sidebar methods
	toggleRightSidebar = () => {
		this.rightSidebarOpen = !this.rightSidebarOpen;
	};

	setRightSidebarOpen = (open: boolean) => {
		this.rightSidebarOpen = open;
	};

	// Left sidebar methods
	setLeftSidebarMode = (mode: EditorLeftSidebarMode) => {
		this.leftSidebarMode = mode;
	};

	handleAddContentClick = (leftSidebar: { open: boolean; setOpen: (open: boolean) => void }) => {
		// If sidebar is closed: open it and set mode to "add"
		if (!leftSidebar.open) {
			leftSidebar.setOpen(true);
			this.leftSidebarMode = 'add';
		}
		// If sidebar is open and already in "add" mode: close the sidebar
		else if (this.leftSidebarMode === 'add') {
			leftSidebar.setOpen(false);
		}
		// If sidebar is open but NOT in "add" mode: switch to "add" mode
		else {
			this.leftSidebarMode = 'add';
		}
	};

	// View mode methods
	setViewMode = (mode: EditorViewMode) => {
		this.viewMode = mode;
	};

	// Drag and drop methods
	startDrag = (blockType: string, blockName: string) => {
		this.dragState.blockType = blockType;
		this.dragState.blockName = blockName;
	};

	endDrag = () => {
		this.dragState.blockType = null;
		this.dragState.blockName = null;
	};

	// Element management methods
	generateElementId = (type: string): string => {
		return `${type}_${this.elementCounter++}`;
	};

	createElement = (
		type: string,
		parentId: string | null = null,
		index?: number
	): BuilderElement => {
		// Check if this is a leaf block being dropped at root level (outside any section)
		const needsSectionWrapper = isLeafBlock(type) && parentId === null;

		// If leaf block needs section wrapper, create section first
		if (needsSectionWrapper) {
			// Create the section container
			const section: BuilderElement = {
				id: this.generateElementId('section'),
				type: 'section',
				parentId: null,
				properties: getDefaultProperties('section'),
				children: []
			};

			// Create the actual element as child of section
			const element: BuilderElement = {
				id: this.generateElementId(type),
				type,
				parentId: section.id,
				properties: getDefaultProperties(type),
				children: []
			};

			// Add element to section's children
			section.children.push(element);

			// Add section to page at specified index
			if (index !== undefined) {
				this.page.elements.splice(index, 0, section);
			} else {
				this.page.elements.push(section);
			}

			return element;
		}

		// Normal creation for container blocks or blocks inside sections
		const element: BuilderElement = {
			id: this.generateElementId(type),
			type,
			parentId,
			properties: getDefaultProperties(type),
			children: []
		};

		if (parentId === null) {
			// Add to root level
			if (index !== undefined) {
				this.page.elements.splice(index, 0, element);
			} else {
				this.page.elements.push(element);
			}
		} else {
			// Add to parent's children
			const parent = this.findElementById(parentId);
			if (parent) {
				// Validate that parent can have children
				if (!canBlockHaveChildren(parent.type)) {
					console.warn(`Block type "${parent.type}" cannot have children. Element not added.`);
					return element;
				}

				if (index !== undefined) {
					parent.children.splice(index, 0, element);
				} else {
					parent.children.push(element);
				}
			}
		}

		return element;
	};

	findElementById = (id: string): BuilderElement | null => {
		const search = (elements: BuilderElement[]): BuilderElement | null => {
			for (const element of elements) {
				if (element.id === id) return element;
				const found = search(element.children);
				if (found) return found;
			}
			return null;
		};
		return search(this.page.elements);
	};

	selectElement = (id: string | null) => {
		this.selectedElementId = id;
		if (id !== null) {
			this.leftSidebarMode = 'edit';
		}
	};

	updateElementProperties = (id: string, properties: ElementProperties) => {
		const element = this.findElementById(id);
		if (element) {
			element.properties = properties;
		}
	};
}

export const editorManager = EditorManager.getInstance();
