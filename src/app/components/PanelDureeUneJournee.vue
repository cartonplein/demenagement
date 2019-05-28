<template>
    <div id="panel-duree-une-journee" @click="onClick">
      <h1 style="color:black; font-size: 20px"><b>Formule une journée</b></h1>
      <h2 style="color:black; font-size: 15px">Détails...</h2>


    </div>
</template>


<script>

export default {
    name: 'PanelDureeUneJournee',
    props: {
      onClick: {
        type: Function,
        required: true
      }
    }
}

</script>


<style lang="scss" scoped>

#panel-duree-une-journee {
  background: #FFF;
  opacity: 0.95;
  border: 1px solid black;
  border-radius: 10px;

  max-width: 250px;
  max-height: 250px;
  width: 250px;
  height: 250px;

  padding: 20px;
  margin-left: 7px;
  overflow: hidden;

  &:hover {
    transform: translateY(5px);
    cursor: pointer;
  }
}
</style>
