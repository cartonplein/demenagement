<template>
    <div id="app-taille-logement">
        <h1 style="color:white; font-size: 200%; padding-bottom: 20px ">Choisissez la taille de votre logement : </h1>
        <div id="panel-taille-logement" class="container">
            <div class="columns is-mobile">
              <div class="columns is-multiline" style="width: 1000px; max-width: 850px">
                <PanelTailleLogement ref="panelTailleLogement" v-for="size in sizes"
                  :key="size.title"
                  :size="size"/>
              </div>
            </div>
        </div>
        <div class="panel-info-commande">
          <PanelInfoCommande />
        </div>
        <ButtonPrecedent id="button-precedent" :onClick="returnPageDureePrestation"></ButtonPrecedent>
    </div>
</template>

<script>
import { store } from '../store.js';

import PanelTailleLogement from './PanelTailleLogement.vue';
import PanelInfoCommande from './PanelInfoCommande.vue';
import ButtonPrecedent from './ButtonPrecedent.vue';

export default {
  name: 'AppTailleLogement',
  data () {
    return {
      isPageTailleLogement: true
    }
  },
  firebase: {
    sizes: store.state.seedSize
  },
  components: {
    PanelTailleLogement,
    PanelInfoCommande,
    ButtonPrecedent
  },
  methods: {
    returnPageDureePrestation() {
      this.$parent.$options.methods.returnPageDureePrestation();
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

#app-taille-logement {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;

  #app-taille-logement .panel-info-commande {
    position: absolute;
    right: 0;
    bottom: 90px;
  }

  #button-precedent {
    position: absolute;
    right: 0;
    bottom: 30px;
  }

  h1 {
    margin-top: 70px;
  }
}


</style>
