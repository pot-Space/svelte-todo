<script>
   import { createEventDispatcher } from "svelte";

   export let title = "Enter what do you want to do:"; // дефолтное значение пропса, если не проброшено другое
   export let btnTitle = "Add todo"; // дефолтное значение пропса, если не проброшено другое

   const dispatch = createEventDispatcher();

   let text = "";

   function handleAddClick() {
      dispatch("add", text);
   }
</script>

<div class="main-container">
   <label for="todo-text">{title}</label>
   <input class="todo-input" id="todo-text" bind:value={text} />
   <button on:click={handleAddClick}>{btnTitle}</button>
</div>

<style>
   .main-container {
      margin: 0 auto;
      padding: 10px;
      max-width: 480px;
      border-radius: 4px;
      background-color: #036c56;
   }

   label[for="todo-text"] {
      margin-bottom: 8px;
      color: #f4f4f4;
      font-weight: bold;
   }

   .todo-input {
      width: 100%;
   }
</style>
