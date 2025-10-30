import type {
  EditorLeftSidebarMode,
  EditorViewMode,
  PageStructure,
  BuilderElement,
  DragState,
  ElementProperties,
} from "$lib/types/editor";

class EditorManager {
  private static instance: EditorManager;

  // Sidebar state
  rightSidebarOpen = $state(true);
  leftSidebarMode = $state<EditorLeftSidebarMode>("add");

  // View mode state
  viewMode = $state<EditorViewMode>("desktop");

  // Page structure state
  page = $state<PageStructure>({
    id: "page_1",
    elements: [],
  });

  // Drag and drop state
  dragState = $state<DragState>({
    blockType: null,
    blockName: null,
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

  handleAddContentClick = (leftSidebar: {
    open: boolean;
    setOpen: (open: boolean) => void;
  }) => {
    // If sidebar is closed: open it and set mode to "add"
    if (!leftSidebar.open) {
      leftSidebar.setOpen(true);
      this.leftSidebarMode = "add";
    }
    // If sidebar is open and already in "add" mode: close the sidebar
    else if (this.leftSidebarMode === "add") {
      leftSidebar.setOpen(false);
    }
    // If sidebar is open but NOT in "add" mode: switch to "add" mode
    else {
      this.leftSidebarMode = "add";
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
    const element: BuilderElement = {
      id: this.generateElementId(type),
      type,
      parentId,
      properties: this.getDefaultProperties(type),
      children: [],
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
      this.leftSidebarMode = "edit";
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
                all: { value: 40, unit: "px" },
              },
            },
          },
          layout: {
            display: { breakpoint_base: "block" },
          },
        },
      },
      heading: {
        content: {
          text: "Heading",
          tag: "h2",
        },
        design: {
          typography: {
            font_size: {
              breakpoint_base: { value: 32, unit: "px" },
            },
            font_weight: {
              breakpoint_base: 700,
            },
          },
        },
      },
      text: {
        content: {
          text: "This is a text block. Click to edit.",
        },
        design: {
          typography: {
            font_size: {
              breakpoint_base: { value: 16, unit: "px" },
            },
          },
        },
      },
      button: {
        content: {
          text: "Click me",
        },
        design: {
          spacing: {
            padding: {
              breakpoint_base: {
                top: { value: 12, unit: "px" },
                bottom: { value: 12, unit: "px" },
                left: { value: 24, unit: "px" },
                right: { value: 24, unit: "px" },
              },
            },
          },
          background: {
            type: "color",
            color: {
              breakpoint_base: "#007bff",
            },
          },
          typography: {
            color: {
              breakpoint_base: "#ffffff",
            },
          },
          border: {
            border_radius: {
              breakpoint_base: {
                all: { value: 4, unit: "px" },
              },
            },
          },
        },
      },
    };

    return defaults[type] || { design: {}, content: {}, settings: {} };
  };
}

export const editorManager = EditorManager.getInstance();
