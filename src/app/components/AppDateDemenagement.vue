<template>
    <div id="app-date-demenagement">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Choisissez la date de votre déménagement : </h1>
        <div id="panel-date-demenagement" class="container">
              <div class="columns" style="width: 1000px; max-width: 850px">
                <PanelDateDemenagement></PanelDateDemenagement>
              </div>
        </div>
        <div class="panel-info-commande">
          <PanelInfoCommande />
        </div>
        <ButtonSuivant id="button-suivant" :onClick="openPageOptions" v-bind:class="{ 'disableButton': getSelectedDay === '' }"></ButtonSuivant>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageBeforeDateDemenagement"></ButtonPrecedent>
    </div>
</template>

<script>
import { store } from '../store.js';
import PanelDateDemenagement from './PanelDateDemenagement.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonSuivant from './ButtonSuivant.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppDateDemenagement',
  data () {
    return {
      isPageDateDemenagement: true
    }
  },
  computed: {
    getSelectedDay() {
      return store.getSelectedDay().number;
    }
  },
  components: {
    PanelDateDemenagement,
    PanelInfoCommande,
    ButtonSuivant,
    ButtonPrecedent
  },
  methods: {
    openPageOptions() {
      this.$parent.$options.methods.openPageOptions();
    },
    returnPageBeforeDateDemenagement() {
      this.$parent.$options.methods.returnPageBeforeDateDemenagement();
    }
  }
}

</script>

<style lang="scss">
html, body {
  height: 100%;
}
</style>

<style lang="scss" scoped>

#app-date-demenagement {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;


  #app-date-demenagement .panel-info-commande {
    position: absolute;
    right: 0;
    bottom: 100px;
  }

  #button-suivant {
    position: absolute;
    right: 0;
    bottom: 30px;
  }

  #button-precedent {
    position: absolute;
    right: 130px;
    bottom: 30px;
  }

  h1 {
    margin-top: 70px;
  }

  .disableButton {
    opacity: 0.5;
    pointer-events: none;
  }

}


</style>
