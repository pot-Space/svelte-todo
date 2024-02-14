<div>
  <div class="header-container">
    <slot name="header" greeting="Hello stranger" />
  </div>

  <div class="content-container">
    <slot />
  </div>

  <div class="footer-container">
    <slot name="footer">Thank you a lot!</slot>
  </div>
</div>

<style>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
  .content-container {
    padding: 12px;
  }
  .footer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
</style>
