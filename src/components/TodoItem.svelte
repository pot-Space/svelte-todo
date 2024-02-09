<script>
   export let title;

   function handleDoneChange() {
      console.log("handleDoneChange");
   }
   function handleRemoveClick() {
      console.log("handleRemoveClick");
   }
</script>

<div class="main-container">
   <input type="checkbox" on:input={handleDoneChange} />
   <p class="title">{title}</p>
   <button class="remove-btn" on:click={handleRemoveClick}>Remove</button>
</div>

<style>
   .main-container {
      padding: 0 16px;
      display: flex;
      align-items: center;
      height: 48px;
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
      padding: 4px 8px;
      color: #333;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      background-color: #53c3a8;
      transition: 0.3s;

      user-select: none;
      cursor: pointer;
   }

   .remove-btn:hover {
      background-color: #3f9580;
   }
</style>
