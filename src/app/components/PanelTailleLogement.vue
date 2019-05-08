<template>
    <div id="panel-taille-logement" @click="selectSize">
      <div class="size-banner has-text-centered has-text-black"><b>{{ size.title }}</b></div>
      <h2 style="color:black; font-size: 12px">{{ size.details }}</h2>
    </div>
</template>


<script>
import { store } from '../store.js';

export default {
    name: 'PanelTailleLogement',
    data () {
      return {
        sizeId: this.size.id
      };
    },
    props: {
      size: Object
    },
    methods: {
      selectSize() {
        store.setSelectedSizeLogement(this.sizeId);
        store.selectTailleLogement(this.size.title);
        this.$parent.$parent.$options.methods.openPageDateDemenagement();
      }
    },
}

</script>


<style lang="scss" scoped>

#panel-taille-logement {
  background: #f6b26bff;
  opacity: 0.95;
  border: 1px solid black;
  border-radius: 10px;

  padding: 10px;
  margin-left: 20px;
  overflow: hidden;
  margin-top: 18px;

  height: 180px;
  max-height: 200px;
  width: 150px;
  max-width: 150px;

  &:hover {
    background: darken(#e69138ff,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #e69138ff;
    transform: translateY(4px);
  }
}
</style>
