<template>
    <div id="panel-taille-logement" @click="selectSize">
      <div class="size-banner has-text-centered">{{ size.title }}</div>
      <h2>{{ size.details }}</h2>
      <h2>{{ size.tarif }}€</h2>
      <!--<div class="size-banner has-text-centered has-text-black"><b>{{ size.tarif }}</b></div>-->
    </div>
</template>


<script>

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
        this.$parent.selectSizeLogement(this.sizeId);
        this.$store.commit('setTailleLogement', this.size.title);
        this.$store.commit('setTarif', this.$store.state.tarif + this.size.tarif);
        this.$parent.$parent.$options.methods.openPageDureePrestation();
      }
    },
}

</script>


<style lang="scss" scoped>

#panel-taille-logement {
  background: #FFF;
  //opacity: 0.95;
  border: 1px solid #E85029;
  box-shadow: 0 2px 2px 0 #E85029;
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
    transform: translateY(5px);
    cursor: pointer;
  }

  .size-banner {
    color: #E85029;
    font-weight: bold;
  }

  h2 {
    color: #E85029;
    font-size: 12px;
  }
}
</style>
