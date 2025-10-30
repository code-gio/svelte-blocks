<script lang="ts">
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
  import BlockRenderer from "./block-renderer.svelte";
  import DropZone from "./drop-zone.svelte";

  const page = $derived(editorManager.page);

  let isDragOver = $state(false);

  const handleDragOver = (e: DragEvent) => {
    if (page.elements.length === 0) {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
      isDragOver = true;
    }
  };

  const handleDragLeave = () => {
    isDragOver = false;
  };

  const handleDrop = (e: DragEvent) => {
    if (page.elements.length === 0) {
      e.preventDefault();
      e.stopPropagation();
      isDragOver = false;

      const blockType = editorManager.dragState.blockType;
      if (blockType) {
        editorManager.createElement(blockType, null, 0);
        editorManager.endDrag();
      }
    }
  };
</script>

<div class="page-renderer min-h-screen bg-white p-8">
  {#if page.elements.length > 0}
    <DropZone parentId={null} index={0} />
    {#each page.elements as element, i (element.id)}
      <BlockRenderer {element} />
      <DropZone parentId={null} index={i + 1} />
    {/each}
  {:else}
    <div 
      class="flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg transition-colors"
      class:border-blue-500={isDragOver}
      class:bg-blue-50={isDragOver}
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
      role="region"
      aria-label="Drop zone"
    >
      <div class="text-center pointer-events-none">
        <p class="text-gray-500 text-lg mb-2">Your page is empty</p>
        <p class="text-gray-400 text-sm">Drag and drop blocks from the left sidebar to get started</p>
      </div>
    </div>
  {/if}
</div>