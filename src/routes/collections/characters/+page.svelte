<script>
  import CharCardMini from '$lib/components/CharCardMini.svelte';
  import { fly } from 'svelte/transition';

  export let data;
  const abcArr = ['a', 'b', 'c', 's'];

  console.log(data);
  // let lvl = 1;
  let name = '';

  // $: searchedCards = data.cards.filter((elem) => elem.lvl >= lvl);
  $: searchedCards = data.cards.filter((elem) => {
    return (
      elem.name.toLowerCase().includes(name.toLowerCase()) ||
      elem.name_ru.toLowerCase().includes(name.toLowerCase())
    );
  });
</script>

<!-- <input
    type="number"
    bind:value={lvl}
    min="0"
    max="20"
    on:input={(e) => {
      if (+e.target.value < 1) e.target.value = 1;
      if (+e.target.value > 10) e.target.value = 20;
    }}
  /> -->
<div class="wrapper">
  <div class="search-container">
    <input type="text" placeholder="Search" bind:value={name} />
  </div>

  <div class="cards-container">
    {#if searchedCards.length}
      {#each searchedCards as card (card.id)}
        <CharCardMini {card}></CharCardMini>
      {/each}
    {:else}
      <h2 transition:fly={{ y: -100, duration: 800 }}>Совпадений не найдено</h2>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .search-container {
    padding: 8px 40px;
    width: 100%;
    background-color: #2e2e2e;
  }

  .search-container input {
    padding-left: 36px;
    height: 34px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 60px;
    background:
      8px 50%/24px 20px no-repeat
        url("data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23ccc'%20d='M9.5,3A6.5,6.5%200%200,1%2016,9.5C16,11.11%2015.41,12.59%2014.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41%2011.11,16%209.5,16A6.5,6.5%200%200,1%203,9.5A6.5,6.5%200%200,1%209.5,3M9.5,5C7,5%205,7%205,9.5C5,12%207,14%209.5,14C12,14%2014,12%2014,9.5C14,7%2012,5%209.5,5Z'%20/%3e%3c/svg%3e"),
      #242424;
  }

  .cards-container {
    padding: 16px 44px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    overflow: hidden;
  }

  h2 {
    color: #2e2e2e;
  }
</style>
