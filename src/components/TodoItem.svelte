<script>
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicIn } from 'svelte/easing';
  import { interpolateLab } from 'd3-interpolate';

  export let title;
  export let done;
  const dispatch = createEventDispatcher();

  const doneMotion = tweened(done ? '#7ee4d0' : '#ebebeb', {
    delay: 0,
    duration: 300,
    easing: cubicIn,
    interpolate: interpolateLab,
  });

  function handleRemoveClick() {
    dispatch('remove');
  }

  function handleDoneChange(event) {
    doneMotion.set(event.target.checked ? '#7ee4d0' : '#ebebeb');
    dispatch('doneChange', event.target.checked);
  }
</script>

<div class="main-container" style="background-color: {$doneMotion}">
  <input checked={done} type="checkbox" on:input={handleDoneChange} />
  <p class="title">{title}</p>
  <button class="remove-btn" on:click={handleRemoveClick}>Remove</button>
</div>

<style>
  .main-container {
    margin-top: 4px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    height: 48px;
    background-color: #ebebeb;
    border-radius: 4px;
  }

  input {
    margin: 0 20px 0 0;
  }

  p {
    margin: 0;
  }

  .title {
    flex: 1;
  }

  .remove-btn {
    margin: 0;
    padding: 4px 8px;
    color: #333;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    background-color: oklch(75% 0.1 174);
    transition: 0.3s;

    user-select: none;
    cursor: pointer;
  }

  .remove-btn:hover {
    background-color: oklch(65% 0.1 174);
  }
</style>
