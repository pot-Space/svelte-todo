<script>
  import Tab_01 from './Tab_01.svelte';
  import Tab_02 from './Tab_02.svelte';

  const tabs = [
    {
      id: 'tab_01',
      title: 'Tab one',
      drillName: 'tab`s one name',
      component: Tab_01,
    },
    {
      id: 'tab_01',
      title: 'Tab two',
      drillName: 'tab`s two name',
      component: Tab_02,
    },
  ];

  let selected = tabs[0];
</script>

<select bind:value={selected}>
  {#each tabs as tab}
    <option value={tab}>{tab.title}</option>
  {/each}
</select>

<svelte:component this={selected.component} name={selected.drillName} />
