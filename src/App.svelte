<script>
   import { onMount } from "svelte";
   import { v4 as uuid } from "uuid";
   import AddTodoItem from "./components/AddTodoItem.svelte";
   import TodoItem from "./components/TodoItem.svelte";
   import { getTodos } from "./utils/getTodos";
   import Examples from "./components/Examples.svelte";

   let title = "What to do";
   let items = [];

   onMount(() => {
      const get = async () => {
         items = await getTodos();
      };
      get();
   });

   function handleAddClick(event) {
      items = [
         ...items,
         {
            id: uuid(),
            text: event.detail,
            done: false,
         },
      ];
   }
</script>

<Examples />

<div class="todo-item-container">
   <AddTodoItem on:add={handleAddClick} />

   {items.filter((item) => item.done).length} / {items.length}

   {#each items as { id, text, done }, index (id)}
      <TodoItem title={`${index + 1}. ${text}`} bind:done />
   {:else}
      No items yet
   {/each}
</div>

<style>
   .todo-item-container {
      margin: 4px auto;
      max-width: 480px;
   }
</style>
