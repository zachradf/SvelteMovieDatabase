<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let query = '';
  
    const handleSearch = () => {
      dispatch('search', query);
    };
  </script>
  
  <style>
    input {
      width: 30%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      transition: border-color 0.2s ease-in-out;
    }
  
    input:focus {
      outline: none;
      border-color: #007aff;
    }
  
    button {
      display: block;
      width: 30%;
      padding: 10px;
      background-color: #9707b7;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
  
    button:hover {
      background-color: #480357;
    }
  </style>
  
  <div>
    <input type="text" placeholder="Search by title or genre" bind:value={query} />
    <button on:click={handleSearch}>Search</button>
  </div>
  