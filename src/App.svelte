<script>
  import AddTodoItem from './components/AddTodoItem.svelte';
  import TodoItem from './components/TodoItem.svelte';
  import { todoItems } from './store/customStore';
  import { todoStats } from './store/todoStats';

  function handleAddClick(event) {
    todoItems.add(event.detail);
  }

  function handleDoneChange(id, done) {
    todoItems.setDone(id, done);
  }

  function handleRemove(id) {
    todoItems.remove(id);
  }
</script>

<div class="todo-item-container">
  <AddTodoItem on:add={handleAddClick} />

  {$todoStats.doneCount} / {$todoStats.totalCount}

  {#each $todoItems as { id, text, done }, index (id)}
    <TodoItem
      title={`${index + 1}. ${text}`}
      {done}
      on:doneChange={(event) => handleDoneChange(id, event.detail)}
      on:remove={() => handleRemove(id)}
    />
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
