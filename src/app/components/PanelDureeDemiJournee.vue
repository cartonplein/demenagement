<template>
    <div id="panel-duree-demi-journee" @click="onClick">
      <h1 style="color:black; font-size: 20px"><b>Formule demi-journée</b></h1>
      <p style="color:black; font-size: 15px">
        <b>4 heures</b> </br>
        Convient aux studios et petits appartements.
      </p>
    </div>
</template>


<script>

export default {
    name: 'PanelDureeDemiJournee',
    props: {
      onClick: {
        type: Function,
        required: true
      }
    }
}

</script>


<style lang="scss" scoped>

#panel-duree-demi-journee {
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
