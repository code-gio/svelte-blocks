<script lang="ts">
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
  import { canBlockHaveChildren } from "$lib/components/editor/renderer/block-registry";

  let {
    parentId = null,
    index = 0,
  }: {
    parentId?: string | null;
    index?: number;
  } = $props();

  let isDragOver = $state(false);
  const isDragging = $derived(editorManager.dragState.blockType !== null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
    isDragOver = true;
  };

  const handleDragLeave = (e: DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    
    if (!target.contains(relatedTarget)) {
      isDragOver = false;
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragOver = false;

    const blockType = editorManager.dragState.blockType;
    if (blockType) {
      // Check if we're trying to drop into a leaf block (not allowed)
      if (parentId !== null) {
        const parent = editorManager.findElementById(parentId);
        if (parent && !canBlockHaveChildren(parent.type)) {
          console.warn(`Cannot add children to block type "${parent.type}"`);
          editorManager.endDrag();
          return;
        }
      }
      
      editorManager.createElement(blockType, parentId, index);
      editorManager.endDrag();
    }
  };
</script>

<div
  class="drop-zone transition-all duration-200"
  class:is-dragging={isDragging}
  class:is-drag-over={isDragOver}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  role="region"
  aria-label="Drop zone"
>
  {#if isDragOver}
    <div class="h-8 bg-blue-500 rounded opacity-50 border-2 border-blue-600"></div>
  {:else if isDragging}
    <div class="h-4 bg-blue-200 rounded opacity-30"></div>
  {:else}
    <div class="h-1 bg-transparent"></div>
  {/if}
</div>

<style>
  .drop-zone {
    position: relative;
    min-height: 4px;
  }

  .is-dragging {
    min-height: 16px;
  }

  .is-drag-over {
    min-height: 32px;
  }
</style>

