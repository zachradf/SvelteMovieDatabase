<!-- <script lang='ts'>
  import { createEventDispatcher } from 'svelte';
//   import '@popperjs/core';
//   import 'bootstrap/dist/css/bootstrap.min.css';
//   import 'bootstrap';
  
  export let options: string[];
  export let selectedOption: string;
  
  const dispatch = createEventDispatcher();
  
  function selectOption(option: string) {
    selectedOption += option;
    dispatch("select", { option });
  }
</script>

<div class="dropdown">
  <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {selectedOption}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    {#each options as option}
      <button class="dropdown-item" on:click={() => selectOption(option)}>{option}</button>
    {/each}
  </div>
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
    min-width: 20rem;
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

    .dropdown-menu button {
    background-color: transparent;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    cursor: pointer;
    }

    .dropdown-menu button:hover {
    background-color: #4b445e;
    }

</style> -->
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
  