<template>
    <div id="element-search-bar" @click="addElementInInventaire(element)">
      <div class="element-name has-text-justified has-text-black"><b>{{ element.name }}</b></div>
    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    name: 'ElementSearchBar',
    props: ['element'],
    methods: {
      addElementInInventaire(element) {
        store.addElementInInventaire(element);
      }
    }
}

</script>

<style lang="scss" scoped>

#element-search-bar {
    border: 1px solid #ddd;
    margin-top: -1px;
    background-color: #f6f6f6;
    padding: 12px;
    text-decoration: none;
    font-size: 15px;
    height: 50px;
    max-height: 50px;
    width: 500px;

    &:hover {
      background: darken(#b1b1b1,1%);
      cursor: pointer;
    }
    &:active {
      background-color: #b1b1b1;
    }
}

</style>
