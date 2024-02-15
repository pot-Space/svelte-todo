<script>
  import { createEventDispatcher } from 'svelte';
  import { typewriter } from '../transitions/typewriter';

  export let title = 'Enter what do you want to do:'; // дефолтное значение пропса, если не проброшено другое
  export let btnTitle = 'Add todo'; // дефолтное значение пропса, если не проброшено другое

  const dispatch = createEventDispatcher();

  let clicked = false;

  let text = '';
  function handleAddClick() {
    clicked = !clicked;
    dispatch('add', text);
  }
</script>

<div class="main-container">
  <label for="todo-text" in:typewriter>{title}</label>
  <input class="todo-input" id="todo-text" bind:value={text} />
  <button class:clicked-style={clicked} on:click={handleAddClick}
    >{btnTitle}</button
  >
</div>

<style>
  .main-container {
    margin: 0 auto 4px;
    padding: 10px;
    max-width: 640px;
    border-radius: 4px;
    background-color: oklch(55% 0.1 174);
    box-shadow: 0px 4px 4px 2px oklch(60% 0.1 174 / 30%);
  }

  label[for='todo-text'] {
    margin-bottom: 8px;
    color: #f5f5f5;
    font-weight: bold;
  }

  .todo-input {
    width: 100%;
  }

  button {
    border-radius: 4px;
    border: none;
  }

  button:active {
    background-color: #97d5f1;
  }
  .clicked-style {
    background-color: #30a4d9;
    box-shadow: inset 0px 2px 1px rgb(24 108 147);
  }
</style>
