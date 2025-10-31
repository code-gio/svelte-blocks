<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
  import BlockRenderer from "../block-renderer.svelte";
  import DropZone from "../drop-zone.svelte";

  let { element }: { element: BuilderElement } = $props();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    editorManager.selectElement(element.id);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      editorManager.selectElement(element.id);
    }
  };

  const isSelected = $derived(editorManager.selectedElementId === element.id);

  // Convert properties to inline styles
  const getStyles = () => {
    const styles: string[] = [];
    const { design } = element.properties;

    if (design?.spacing?.padding?.breakpoint_base) {
      const p = design.spacing.padding.breakpoint_base;
      if (p.all) {
        styles.push(`padding: ${p.all.value}${p.all.unit}`);
      } else {
        if (p.top) styles.push(`padding-top: ${p.top.value}${p.top.unit}`);
        if (p.right) styles.push(`padding-right: ${p.right.value}${p.right.unit}`);
        if (p.bottom) styles.push(`padding-bottom: ${p.bottom.value}${p.bottom.unit}`);
        if (p.left) styles.push(`padding-left: ${p.left.value}${p.left.unit}`);
      }
    }

    if (design?.background?.color?.breakpoint_base) {
      styles.push(`background-color: ${design.background.color.breakpoint_base}`);
    }

    return styles.join("; ");
  };
</script>

<section
  data-element-id={element.id}
  data-element-type={element.type}
  class="relative min-h-[100px] transition-all duration-150 border-2 border-transparent"
  class:ring-2={isSelected}
  class:ring-blue-500={isSelected}
  class:!border-dashed={!isSelected}
  class:hover:!border-blue-400={!isSelected}
  style={getStyles()}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  role="button"
  tabindex="0"
>
  {#if element.children.length > 0}
    <DropZone parentId={element.id} index={0} />
    {#each element.children as child, i (child.id)}
      <BlockRenderer element={child} />
      <DropZone parentId={element.id} index={i + 1} />
    {/each}
  {:else}
    <DropZone parentId={element.id} index={0} />
    <div class="text-gray-400 text-center py-8 pointer-events-none">
      Drop blocks here
    </div>
  {/if}
</section>

