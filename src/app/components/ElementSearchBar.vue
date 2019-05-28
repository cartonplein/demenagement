<template>
    <div id="element-search-bar" @click="addElementInInventaire(element)">
      <div class="element-name has-text-justified has-text-black"><b>{{ element.name }} ({{ element.volume }}m³)</b></div>
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
          this.$store.state.choicesUser.inventaire.map((elementObj) => {
            if(elementObj.number === element.number) {
              elementObj.quantity++;
            }
          });
        }
        this.$store.commit('setTarif', this.$store.state.tarif + element.tarif);
      },
      isElementAdded(element) {
        var found = false;
        for(var i = 0; i < this.$store.state.choicesUser.inventaire.length; i++) {
          if (this.$store.state.choicesUser.inventaire[i].number == element.number) {
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
