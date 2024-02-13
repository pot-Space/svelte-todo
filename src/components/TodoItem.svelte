<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { tweened, spring } from 'svelte/motion';
  import { cubicIn } from 'svelte/easing';
  import { interpolateLab } from 'd3-interpolate';

  export let done;
  export let title;
  const dispatch = createEventDispatcher();

  const doneMotion = tweened('#f5f5f5', {
    delay: 0,
    duration: 300,
    easing: cubicIn,
    interpolate: interpolateLab,
  });

  const containerPosition = spring(
    {
      left: -100,
      top: -100,
    },
    {
      stiffness: 0.1,
      damping: 0.25,
    },
  );

  let container;
  onMount(() => {
    containerPosition.set({
      left: container.offsetLeft + 100,
      top: container.offsetTop + 100,
    });
  });

  function handleRemoveClick() {
    dispatch('remove');
  }

  function handleDoneChange(event) {
    doneMotion.set(event.target.checked ? '#7ee4d0' : '#f5f5f5');
    dispatch('doneChange', event.target.checked);
  }
</script>

<div class="main-container">
  <label
    class="inner-container"
    style="
      background-color: {$doneMotion};
      left: {$containerPosition.left}px;
      top: {$containerPosition.top}px;
    "
    bind:this={container}
  >
    <input checked={done} type="checkbox" on:input={handleDoneChange} />
    <p class="title">{title}</p>
    <button class="remove-btn" on:click={handleRemoveClick}>Remove</button>
  </label>
</div>

<style>
  .main-container {
    position: relative;
    margin-top: 4px;
    width: 100%;
    height: 48px;
  }
  .inner-container {
    position: absolute;
    padding: 0 16px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(225 225 225 / 50%);
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
