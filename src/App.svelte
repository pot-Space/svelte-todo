<script>
  import AddTodoItem from './components/AddTodoItem.svelte';
  import TodoItem from './components/TodoItem.svelte';
  import BaseLayout from './layouts/BaseLayout.svelte';
  import { todoItems } from './store/customStore';
  import { todoStats } from './store/todoStats';
  import { crossfade } from 'svelte/transition';
  import { cubicIn } from 'svelte/easing';
  import { flip } from 'svelte/animate';
  import { setContext } from 'svelte';

  setContext('todo_user', {
    name: 'Name',
  });

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

<BaseLayout>
  <div slot="header" let:greeting>
    {greeting} and Welcome!
  </div>
  <div slot="footer">
    <p class="footer-item">Some text for footer</p>
  </div>
  <AddTodoItem on:add={handleAddClick} />

  {$todoStats.doneCount} / {$todoStats.totalCount}

  <div class="todos-container">
    <div class="todo-items-container">
      {#each $todoItems.filter((item) => !item.done) as { id, text, done }, index (id)}
        <div
          class="todo-item-container"
          in:receive={{ key: id }}
          out:send={{ key: id }}
          animate:flip={{ duration: 250 }}
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
          animate:flip={{ duration: 250 }}
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
</BaseLayout>

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

  .footer-item {
    color: #b30000;
    font-size: 28px;
  }
</style>
