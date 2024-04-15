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
  <div>[{card.lvl}]</div>
  <div>{card.name}</div>
</a>

<style>
  .card {
    padding: 4px 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 16px;
    width: calc(100% / 4 - 12px);
    border-radius: 4px;
    background-color: #e5e5e5;
    color: #2e2e2e;
    text-decoration: none;
    transition: 0.3s ease-in-out;
    box-shadow: inset 4px 0px 0px rgb(249 103 67);
  }

  .card:hover,
  .card:focus {
    outline: none;
    transition: 0.08s ease-in-out;

    box-shadow:
      inset 44px 0px 0px rgb(249 103 67),
      1px 3px 4px rgba(51, 51, 51, 40%);
  }

  @media (width <= 1280px) {
    .card {
      width: calc(100% / 3 - 12px);
    }
  }

  @media (width <= 720px) {
    .card {
      width: calc(100% / 2 - 12px);
    }
  }

  @media (width <= 480px) {
    .card {
      width: 100%;
    }
  }
</style>
