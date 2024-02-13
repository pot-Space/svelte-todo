<script>
  import AddTodoItem from './components/AddTodoItem.svelte';
  import TodoItem from './components/TodoItem.svelte';
  import { todoItems } from './store/customStore';
  import { todoStats } from './store/todoStats';
  import { crossfade } from 'svelte/transition';
  import { cubicIn } from 'svelte/easing';

  const [send, receive] = crossfade({
    duration: 500,
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: cubicIn,
        css: (t) => {
          `
          transform: ${transform} scale(${t});
          opacity: ${t};
          `;
        },
      };
    },
  });

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

<AddTodoItem on:add={handleAddClick} />

{$todoStats.doneCount} / {$todoStats.totalCount}

<div class="todos-container">
  <div class="todo-items-container">
    {#each $todoItems.filter((item) => !item.done) as { id, text, done }, index (id)}
      <div
        class="todo-item-container"
        in:receive={{ key: id }}
        out:send={{ key: id }}
      >
        <TodoItem
          title={`${index + 1}. ${text}`}
          {done}
          on:doneChange={(event) => handleDoneChange(id, event.detail)}
          on:remove={() => handleRemove(id)}
        />
      </div>
    {:else}
      No items yet
    {/each}
  </div>

  <div class="todo-items-container">
    {#each $todoItems.filter((item) => item.done) as { id, text, done }, index (id)}
      <div
        class="todo-item-container"
        in:receive={{ key: id }}
        out:send={{ key: id }}
      >
        <TodoItem
          title={`${index + 1}. ${text}`}
          {done}
          on:doneChange={(event) => handleDoneChange(id, event.detail)}
          on:remove={() => handleRemove(id)}
        />
      </div>
    {:else}
      No items yet
    {/each}
  </div>
</div>

<style>
  .todos-container {
    margin: 0px auto;
    max-width: 640px;
    display: flex;
    width: 100%;
    column-gap: 8px;
  }
  .todo-items-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
