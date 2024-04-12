<script>
  import { fly } from 'svelte/transition';

  export let result;
</script>

<div class="result" transition:fly={{ x: 100, duration: 400 }}>
  roll = [{result}]
</div>

<style>
  .result {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #2e2e2e;
    color: var(--light-shades);
    border-radius: 4px;
  }

  .result:last-child {
    margin-bottom: 4px;
  }
</style>
