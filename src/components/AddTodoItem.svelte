<script>
   import Form from "./Form.svelte";

   export let title;
   export let btnTitle;
</script>

<Form {title} {btnTitle} on:add />
