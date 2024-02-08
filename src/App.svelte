<script>
   import AddTodoItem from "./components/AddTodoItem.svelte";
   export let name;

   let title = "What to do";
</script>

<AddTodoItem />

<style>
   main {
      text-align: center;
      padding: 1em;
      max-width: 240px;
      margin: 0 auto;
   }

   h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
   }

   @media (min-width: 640px) {
      main {
         max-width: none;
      }
   }
</style>
