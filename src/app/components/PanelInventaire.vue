<template>
    <div id="panel-inventaire">
      <input id="input-search-bar" type="text" v-model="searchElement" placeholder="Cherchez un objet pour l'ajouter" v-on:click="showList=true" v-click-outside="hideList">
      <div id="list-elements-search-bar" v-show="showList">
        <ElementSearchBar id="element-search-bar" v-for="element in filteredList"
          :key="element.id"
          :element="element" />
      </div>
      <div class="panel-inventaire-list">
        <div class="columns is-multiline">
          <PanelElementInventaire id="panel-element-inventaire" v-for="element in sharedState.choicesUser.inventaire"
            :key="element.id"
            :element="element" />
        </div>
      </div>
    </div>
</template>

<script>
import { store } from '../store.js';
import ElementSearchBar from './ElementSearchBar.vue';
import PanelElementInventaire from './PanelElementInventaire.vue'
import ClickOutside from 'vue-click-outside';

export default {
    name: 'PanelInventaire',
    data () {
      return {
        searchElement: '',
        showList: false,
        sharedState: store.state
      }
    },
    firebase: {
      elementsInventaire: store.state.seedElementsInventaire
    },
    components: {
      ElementSearchBar,
      PanelElementInventaire
    },
    computed: {
      filteredList() {
        return this.elementsInventaire.filter(element => {
          return element.name.toLowerCase().includes(this.searchElement.toLowerCase())
        });
      }
    },
    methods: {
      hideList () {
        this.showList = false;
      }
    },
    directives: {
      ClickOutside
    }
}

</script>

<style lang="scss" scoped>

#panel-inventaire {
    width: 700px;
    max-width: 700px;
    height: 450px;
    max-height: 450px;
    align-self: stretch;
    overflow: hidden;
    position: relative;

    #list-elements-search-bar {
      z-index: 2;
      position: absolute;
      overflow-y: scroll;
      scroll-behavior: smooth;
      -webkit-transition: height 0.4s ease-in-out;
      transition: height 0.4s ease-in-out;
      max-height: 250px;
      max-width: 500px;
    }

    .panel-inventaire-list {
      opacity: 0.95;
      background: #E85029;
      margin-top: 10px;
      padding: 15px;
      border: 2px solid black;
      height: 380px;
      max-height: 380px;
      width: 100%;
      overflow-y: scroll;
      scroll-behavior: smooth;
    }

    input[type=text] {
      width: 270px;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 13px;
      background-color: white;
      background-image: url('../../../public/images/search-icon.png');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      padding: 10px 20px 10px 40px;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
    }
    input[type=text]:focus {
      width: 500px;
    }


}

</style>
