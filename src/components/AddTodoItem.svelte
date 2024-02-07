<script>
   export let title = "Enter what do you want to do:"; // дефолтное значение пропса, если не проброшено другое
   export let btnTitle = "Add todo"; // дефолтное значение пропса, если не проброшено другое

   let items = [];

   function handleAddClick() {
      items = [...items, "item"];
   }

   $: console.log(items);
</script>

<div class="main-container">
   <label for="todo-text">{title}</label>
   <input class="todo-input" id="todo-text" />
   <button on:click={handleAddClick}>{btnTitle}</button>
</div>

<style>
   :global(label) {
      color: #f0fff0;
      font-weight: bold;
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
