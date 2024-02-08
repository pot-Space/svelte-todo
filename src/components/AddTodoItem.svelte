<script>
   import { onMount, tick } from "svelte";
   import { getTodos } from "../utils/getTodos";
   import { format } from "../utils/format";
   import TodoItem from "./TodoItem.svelte";
   import { v4 as uuid } from "uuid";
   export let title = "Enter what do you want to do:"; // дефолтное значение пропса, если не проброшено другое
   export let btnTitle = "Add todo"; // дефолтное значение пропса, если не проброшено другое

   // let items = [];
   let items = getTodos();

   onMount(() => {
      // getTodos().then((value) => {items = value});
      // const get = async () => {
      //    items = await getTodos();
      // };
      // get();
   });

   function handleAddClick() {
      items = [
         ...items,
         {
            id: uuid(),
            text: "Item text",
         },
      ];
   }

   let text = "";
   async function handleTextChange(event) {
      const { selectionStart, selectionEnd, value } = this;
      text = format(event.target.value);

      await tick();
      this.selectionStart = selectionStart;
      this.selectionEnd = selectionEnd;
   }
</script>

<div class="main-container">
   <label for="todo-text">{title}</label>
   <input
      class="todo-input"
      id="todo-text"
      on:input={handleTextChange}
      value={text}
   />
   <button on:click={handleAddClick}>{btnTitle}</button>
</div>

{#await items}
   <p>progress...</p>
{:then _items}
   {#each _items as { id, text }, index (id)}
      <TodoItem title={`${index + 1}. ${text}`} />
   {:else}
      No items yet
   {/each}
{:catch error}
   Error: {error.message}
{/await}

{#key items}
   <!-- при изменении items блок пересобирается -->
{/key}

<style>
   :global(label) {
      color: #f0fff0;
   }

   .main-container {
      padding: 10px;
      border-radius: 4px;
      background-color: #036c56;
   }

   .todo-input {
      width: 100%;
   }
</style>
