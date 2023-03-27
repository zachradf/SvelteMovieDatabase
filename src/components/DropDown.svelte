<script lang='ts'>
    import { createEventDispatcher } from 'svelte';

    export let options: string[] = [];
    export let selectedOption: string = '';

    const dispatch = createEventDispatcher();
    let isDropdownOpen: boolean = false;

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

    function selectOption(option: string) {
        selectedOption = option;
        dispatch('select', { option });
        isDropdownOpen = false;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="dropdown">
    <div class="dropdown-toggle" on:click={() => toggleDropdown()} aria-expanded={isDropdownOpen}>
      {selectedOption}
    </div>
    
    {#if isDropdownOpen}
      <div class="dropdown-menu">
        {#each options as option}
          <div class="dropdown-item" on:click={() => selectOption(option)}>{option}</div>
        {/each}
      </div>
    {/if}
  </div>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-toggle {
        color: #fff;
        background-color: #6c5b7b;
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        line-height: 1.5;
        cursor: pointer;
    }

    .dropdown-toggle:hover {
        background-color: #302b3d;
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: block;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #fff;
        text-align: left;
        list-style: none;
        background-color: #302b3d;
        border: none;
        border-radius: 0.25rem;
    }

    .dropdown-item {
        background-color: transparent;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: #fff;
        cursor: pointer;
    }

    .dropdown-item:hover {
        background-color: #4b445e;
    }
</style>
  