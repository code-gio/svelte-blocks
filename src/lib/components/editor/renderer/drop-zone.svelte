<script lang="ts">
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";

  let {
    parentId = null,
    index = 0,
  }: {
    parentId?: string | null;
    index?: number;
  } = $props();

  let isDragOver = $state(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
    isDragOver = true;
  };

  const handleDragLeave = () => {
    isDragOver = false;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragOver = false;

    const blockType = editorManager.dragState.blockType;
    if (blockType) {
      editorManager.createElement(blockType, parentId, index);
      editorManager.endDrag();
    }
  };
</script>

<div
  class="drop-zone transition-all duration-200"
  class:is-drag-over={isDragOver}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  role="region"
  aria-label="Drop zone"
>
  {#if isDragOver}
    <div class="h-2 bg-blue-500 rounded"></div>
  {:else}
    <div class="h-1 bg-transparent"></div>
  {/if}
</div>

<style>
  .drop-zone {
    position: relative;
    min-height: 4px;
  }

  .is-drag-over {
    min-height: 8px;
  }
</style>

