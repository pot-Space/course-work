<script>
  import { fly, fade } from 'svelte/transition';

  export let card;
</script>

<a
  href="/bestiary/{card.name}"
  class="card"
  in:fly={{ x: 100, duration: 500 }}
  out:fade={{ duration: 300 }}
>
  <div class="name">
    <div>[{card.lvl}]</div>
    <div>{card.name}</div>
  </div>
</a>

<style>
  .card {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    width: calc(25% - 12px);

    border-radius: 12px;
    background-color: #e5e5e5;
    color: #2e2e2e;
    text-decoration: none;

    transition: 0.2s;
  }

  .card:hover {
    box-shadow: 0px 2px 6px 1px rgba(51, 51, 51, 40%);
  }

  .name {
    display: flex;
    column-gap: 20px;
    align-self: flex-start;
  }
</style>
