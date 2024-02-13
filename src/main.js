import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'todo'
  },
  intro: true // проигрывать переходы на первый рендер в том числе, а не только на изменение состояний
});

export default app;