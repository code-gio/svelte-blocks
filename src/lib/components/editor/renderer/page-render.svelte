<script lang="ts">
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
  import BlockRenderer from "./block-renderer.svelte";
  import DropZone from "./drop-zone.svelte";

  const page = $derived(editorManager.page);
</script>

<div class="page-renderer min-h-screen bg-white p-8">
  {#if page.elements.length > 0}
    <DropZone parentId={null} index={0} />
    {#each page.elements as element, i (element.id)}
      <BlockRenderer {element} />
      <DropZone parentId={null} index={i + 1} />
    {/each}
  {:else}
    <div class="flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg">
      <div class="text-center">
        <p class="text-gray-500 text-lg mb-2">Your page is empty</p>
        <p class="text-gray-400 text-sm">Drag and drop blocks from the left sidebar to get started</p>
      </div>
    </div>
    <DropZone parentId={null} index={0} />
  {/if}
</div>