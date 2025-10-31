import type {
	EditorLeftSidebarMode,
	EditorViewMode,
	PageStructure,
	BuilderElement,
	DragState,
	ElementProperties
} from '$lib/types/editor';

class EditorManager {
	private static instance: EditorManager;

	// Block hierarchy rules - defines which blocks can contain children
	private readonly CONTAINER_BLOCKS = new Set([
		'section',
		'columns',
		'grid',
		'div',
		'tabs',
		'gallery',
		'image-box',
		'image-accordion',
		'basic-list',
		'icon-list',
		'checkmark-list',
		'logo-list',
		'table-of-contents',
		'image-hover-card',
		'icon-box',
		'pricing-table',
		'stats-grid',
		'faq'
	]);

	// Leaf blocks - cannot contain children
	private readonly LEAF_BLOCKS = new Set([
		'heading',
		'text',
		'rich-text',
		'text-link',
		'button',
		'image',
		'video',
		'icon',
		'dual-heading',
		'animated-heading',
		'blockquote',
		'badge',
		'fancy-divider'
	]);

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

	// Block hierarchy methods
	canBlockHaveChildren = (blockType: string): boolean => {
		return this.CONTAINER_BLOCKS.has(blockType);
	};

	isLeafBlock = (blockType: string): boolean => {
		return this.LEAF_BLOCKS.has(blockType);
	};

	getBlockHierarchyInfo = (blockType: string) => {
		return {
			type: blockType,
			canHaveChildren: this.canBlockHaveChildren(blockType),
			isLeafBlock: this.isLeafBlock(blockType),
			isContainer: this.CONTAINER_BLOCKS.has(blockType)
		};
	};

	isInsideSection = (parentId: string | null): boolean => {
		if (parentId === null) return false;

		const parent = this.findElementById(parentId);
		if (!parent) return false;

		// Check if parent is a section
		if (parent.type === 'section') return true;

		// Check if any ancestor is a section
		let currentParent = parent;
		while (currentParent.parentId !== null) {
			const ancestor = this.findElementById(currentParent.parentId);
			if (!ancestor) break;
			if (ancestor.type === 'section') return true;
			currentParent = ancestor;
		}

		return false;
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
		const needsSectionWrapper = this.isLeafBlock(type) && parentId === null;

		// If leaf block needs section wrapper, create section first
		if (needsSectionWrapper) {
			// Create the section container
			const section: BuilderElement = {
				id: this.generateElementId('section'),
				type: 'section',
				parentId: null,
				properties: this.getDefaultProperties('section'),
				children: []
			};

			// Create the actual element as child of section
			const element: BuilderElement = {
				id: this.generateElementId(type),
				type,
				parentId: section.id,
				properties: this.getDefaultProperties(type),
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
			properties: this.getDefaultProperties(type),
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
				if (!this.canBlockHaveChildren(parent.type)) {
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

	getDefaultProperties = (type: string): ElementProperties => {
		// Basic defaults for common block types
		const defaults: Record<string, ElementProperties> = {
			section: {
				design: {
					spacing: {
						padding: {
							breakpoint_base: {
								all: { value: 40, unit: 'px' }
							}
						}
					},
					layout: {
						display: { breakpoint_base: 'block' }
					}
				}
			},
			heading: {
				content: {
					text: 'Heading',
					tag: 'h2'
				},
				design: {
					typography: {
						font_size: {
							breakpoint_base: { value: 32, unit: 'px' }
						},
						font_weight: {
							breakpoint_base: 700
						}
					}
				}
			},
			text: {
				content: {
					text: 'This is a text block. Click to edit.'
				},
				design: {
					typography: {
						font_size: {
							breakpoint_base: { value: 16, unit: 'px' }
						}
					}
				}
			},
			button: {
				content: {
					text: 'Click me'
				},
				design: {
					spacing: {
						padding: {
							breakpoint_base: {
								top: { value: 12, unit: 'px' },
								bottom: { value: 12, unit: 'px' },
								left: { value: 24, unit: 'px' },
								right: { value: 24, unit: 'px' }
							}
						}
					},
					background: {
						type: 'color',
						color: {
							breakpoint_base: '#007bff'
						}
					},
					typography: {
						color: {
							breakpoint_base: '#ffffff'
						}
					},
					border: {
						border_radius: {
							breakpoint_base: {
								all: { value: 4, unit: 'px' }
							}
						}
					}
				}
			}
		};

		return defaults[type] || { design: {}, content: {}, settings: {} };
	};
}

export const editorManager = EditorManager.getInstance();
