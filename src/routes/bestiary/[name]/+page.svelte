<script>
  // Кастомные
  // ** Функции
  import { rollDice } from '$lib/utils/rollDice';
  // ** Компоненты
  import RollDice from '$lib/components/sidebarRoll/RollDice.svelte';
  import { rollStore } from '$lib/components/sidebarRoll/stores.js';

  // Внутренние
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';

  // Внешние
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';
  import 'tippy.js/themes/translucent.css';

  export let data;
  data = data.npc[0];

  const stats = data.stats;
  let hp = data.lvl * 4;
  let attack;
  let maxCount = 0;
  let open = false;
  let content = 'click to roll!';

  onMount(() => {
    rollStore.reset([]);
  });

  function tooltip(node, options) {
    const tooltip = tippy(node, options);

    return {
      update(options) {
        tooltip.setProps(options);
      },
      destroy() {
        tooltip.destroy();
      },
    };
  }

  function handlerHP(max, times) {
    hp = rollDice(max, times);
  }

  function handlerAttack(max, times) {
    attack = rollDice(max, times);
  }

  function handlerClearBtn() {
    rollStore.reset([]);
    maxCount = 0;
    open = false;
  }

  function addRoll() {
    open = true;

    if (maxCount >= 5) {
      rollStore.reset([]);
      maxCount = 0;
    }
    maxCount++;

    rollStore.addNewRoll(attack);
  }
</script>

<div class="card-container">
  <div class="card" in:fly={{ y: -100, duration: 500 }}>
    <div class="description">
      <h1 class="name">
        {data.name_ru} <span>[{data.name}]</span>
      </h1>

      <div class="stats">
        <div>
          СИЛ:<br />
          {stats.str ? stats.str : 0}
        </div>
        <div>
          ЛОВ:<br />
          {stats.dex ? stats.dex : 0}
        </div>
        <div>
          ТЕЛ:<br />
          {stats.con ? stats.con : 0}
        </div>
        <div>
          ИНТ:<br />
          {stats.int ? stats.int : 0}
        </div>
        <div>
          МДР:<br />
          {stats.wis ? stats.wis : 0}
        </div>
        <div>
          ХАР:<br />
          {stats.cha ? stats.cha : 0}
        </div>
      </div>

      <div>
        <b>Уровень:</b>
        {data.lvl}
      </div>

      <div>
        <b>Класс доспеха:</b>
        {data.ac}
      </div>

      <div>
        <b>Очки здоровья:</b>
        <span transition:fly={{ y: -100, duration: 500 }}>{hp}</span>
        (<span
          class="hint-dice"
          use:tooltip={{
            content,
            theme: 'translucent',
            placement: 'bottom',
            delay: [1000],
          }}
          on:click={handlerHP(
            +`${data.lvl}d8`.match(/\d+/g)[1],
            +`${data.lvl}d8`.match(/\d+/g)[0],
          )}
        >
          {data.lvl}d8
        </span>)
      </div>

      <div>
        <b>Скорость:</b>
        {data.move}'
      </div>

      <div>
        <b>Атаки:</b>
        {#each data.attacks.split(/[\s()]/gi) as item}
          {#if item.match(/\d+[a-zа-я]\d+/gi)}
            (<span
              class="hint-dice"
              use:tooltip={{
                content,
                theme: 'translucent',
                placement: 'bottom',
                delay: [1000],
              }}
              on:click={handlerAttack(
                +item.match(/\d+/g)[1],
                +item.match(/\d+/g)[0],
              )}
              on:click={addRoll}
            >
              {item}
            </span>)
          {:else}
            {` ${item} `}
          {/if}
        {/each}
      </div>

      <div>
        <b>Описание:</b>
        {data.description}
      </div>
    </div>

    <div class="image">
      <img
        src="../src/lib/assets/bestiary/{data.name}.png"
        alt="{data.name}-img"
      />
    </div>

    {#if open}
      <div
        class="roll-field"
        class:open
        transition:fly={{ y: -100, duration: 500 }}
      >
        <div class="rolls" transition:fly={{ y: -100, duration: 500 }}>
          {#each $rollStore as roll}
            <RollDice result={roll} />
          {/each}
        </div>
        <button on:click={handlerClearBtn} transition:fade={{ duration: 600 }}>
          clear the field
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .roll-field {
    position: absolute;
    display: none;
    padding: 8px;
    width: 160px;
    right: 100px;
    bottom: 0;

    border-radius: 8px;
    background-color: rgb(149 149 149 / 75%);
  }

  .rolls {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    max-height: 400px;

    overflow: hidden;
    overflow-y: auto;
  }

  .roll-field.open {
    display: block;
  }

  .card-container {
    position: relative;
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    width: 100%;

    overflow: hidden;
  }

  .card {
    position: relative;
    padding: 8px 12px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    height: fit-content;

    border-top: 3px solid var(--main-red);
    border-radius: 0 0 8px 8px;
    background-color: #fff;
    box-shadow: 0px 4px 12px 0px rgba(249, 103, 67, 40%);
    color: #2e2e2e;

    transition: 0.2s;
  }

  .card:hover {
    box-shadow: 0px 2px 12px 1px rgba(51, 51, 51, 40%);
  }

  .description {
    margin-top: 20px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    row-gap: 4px;
    width: 70%;
    border-radius: 4px;
    background-color: #e5e5e5;
    box-shadow: inset 4px 0px 0px rgba(51, 51, 51, 50%);
  }

  .name {
    margin-bottom: 16px;
    font-family: MrsEavesSmallCaps;
    font-weight: 600;
    font-size: 26px;
  }

  .name span {
    font-weight: 400;
  }

  .stats {
    display: flex;
    justify-content: flex-start;
    column-gap: 8px;
    width: 100%;
  }

  .stats div {
    text-align: center;
    min-width: 44px;
  }

  .image {
    width: 30%;
  }

  .image img {
    width: 100%;
  }

  button {
    width: 100%;
    background-color: var(--main-red);
  }

  @media (width <= 720px) {
    .card {
      flex-direction: column;
    }
    .description,
    .image {
      width: 100%;
    }

    .image {
      order: -1;
    }
  }
</style>
