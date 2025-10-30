<script lang="ts">
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
    import SearchForm from "$lib/components/editor/sidebar-left/search-form.svelte";
    import { BLOCK_CATEGORIES } from "$lib/components/editor/blocks/index.js";
    import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";

    const handleDragStart = (blockId: string, blockName: string) => (e: DragEvent) => {
      editorManager.startDrag(blockId, blockName);
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("text/plain", blockId);
      }
    };

    const handleDragEnd = () => {
      editorManager.endDrag();
    };
  </script>
  <Sidebar.Group>
    <Sidebar.GroupLabel>Add Block</Sidebar.GroupLabel>
    <SearchForm />
    <Sidebar.Separator class="my-4" />
    <Sidebar.Menu>
      {#each BLOCK_CATEGORIES as category (category.id)}
        {#if category.blocks.length > 0}
          <Collapsible.Root class="group/collapsible" open={true}>
            {#snippet child({ props })}
              <Sidebar.MenuItem {...props}>
                <Collapsible.Trigger>
                  {#snippet child({ props })}
                    <Sidebar.MenuButton {...props} tooltipContent={category.name}>
                      <category.icon class="size-4" />
                      <span>{category.name}</span>
                      <ChevronRightIcon
                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </Sidebar.MenuButton>
                  {/snippet}
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <Sidebar.MenuSub>
                    <div class="grid grid-cols-2 gap-2 my-2">
                    {#each category.blocks as block (block.id)}
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton>
                          {#snippet child({ props })}
                            <button 
                              {...props} 
                              class="w-full flex flex-col items-center justify-center border p-2 py-4 rounded-md h-full bg-background cursor-grab active:cursor-grabbing" 
                              draggable="true"
                              ondragstart={handleDragStart(block.id, block.name)}
                              ondragend={handleDragEnd}
                            >
                              <block.icon class="size-4 mb-2" />
                              <span class="text-xs">{block.name}</span>
                            </button>
                          {/snippet}
                        </Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                    {/each}
                  </div>
                  </Sidebar.MenuSub>
                </Collapsible.Content>
              </Sidebar.MenuItem>
            {/snippet}
          </Collapsible.Root>
        {/if}
      {/each}
    </Sidebar.Menu>
  </Sidebar.Group>