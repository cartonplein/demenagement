<template>
    <div id="element-search-bar" @click="addElementInInventaire(element)">
      <div class="element-name has-text-justified"><b>{{ element.name }}</b></div>
    </div>
</template>

<script>

export default {
    name: 'ElementSearchBar',
    props: ['element'],
    methods: {
      addElementInInventaire(element) {
        if(!this.isElementAdded(element)) {
          this.$store.commit('addElementInInventaire', element);
        }
        else {
          this.$store.getters.getInventaire.map((elementObj) => {
            if(elementObj.number === element.number) {
              elementObj.quantity++;
            }
          });
        }
        this.$store.commit('setVrTotalInventaire', Math.round((this.$store.state.vrTotalInventaire+element.vr)*100)/100);
        this.$store.dispatch('calculateNumberMovers');
        console.log(this.$store.state.vrTotalInventaire);
        //this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
      },
      isElementAdded(element) {
        var found = false;
        for(var i = 0; i < this.$store.getters.getInventaire.length; i++) {
          if (this.$store.getters.getInventaire[i].number == element.number) {
            found = true;
            break;
          }
        }
        return found;
      }
    }
}

</script>

<style lang="scss" scoped>

#element-search-bar {
    border: 1px solid #B43F21;
    margin-top: -1px;
    background-color: #E85029;
    color: #FFF;
    padding: 12px;
    text-decoration: none;
    font-size: 15px;
    height: 50px;
    max-height: 50px;
    width: 630px;

    &:hover {
      background: darken(#B43F21,1%);
      cursor: pointer;
    }
}

</style>
