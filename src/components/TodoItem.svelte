<svelte:options immutable={true} accessors={true} />

<script context="module">
  console.log('this is module');

  let state = 5;
</script>

<script>
  import {
    createEventDispatcher,
    onMount,
    getContext,
    hasContext,
  } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicIn } from 'svelte/easing';
  import { interpolateLab } from 'd3-interpolate';
  import { draggable } from '../actions/draggable';

  const user = getContext('todo_user');
  console.log('todo_user =>', hasContext('todo_user'));
  console.log('todo_user123 =>', hasContext('todo_user123'));

  console.log('state: ', state);

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

  let coord = { x: 0, y: 0 };

  function handleDragStart() {}
  function handleDragMove(event) {
    coord = {
      x: coord.x + event.detail.dx,
      y: coord.y + event.detail.dy,
    };
  }
  function handleDragEnd() {
    coord = { x: 0, y: 0 };
  }

  // let offset = 100;
  let offset = 0;
  onMount(() => {
    setInterval(() => {
      // offset += 10;
      offset += 0;
    }, 1000);
  });
</script>

<div
  class="main-container"
  style="
    background-color: {$doneMotion};
    transform: translate({coord.x}px, {coord.y}px);
  "
  use:draggable={{ offset }}
  on:dragstart={handleDragStart}
  on:dragmove={handleDragMove}
  on:dragend={handleDragEnd}
>
  <input checked={done} type="checkbox" on:input={handleDoneChange} />
  <p>{user.name}</p>
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
    user-select: none;
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
