<template>
    <div id="panel-demenagement-inventaire" @click="onClick">
      <h1 style="color:black; font-size: 20px"><b>Déménagement sur inventaire</b></h1>
      <h2 style="color:black; font-size: 15px">Vous listez ce que vous avez à déménager et vous aurez le tarif.<br></br> </h2>


    </div>
</template>


<script>

export default {
    name: 'PanelDemenagementInventaire',
    props: {
      onClick: {
        type: Function,
        required: true
      }
    }
}

</script>


<style lang="scss" scoped>

#panel-demenagement-inventaire {
  background: #FFF;
  opacity: 0.95;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 550px;
  padding: 20px;
  margin-left: 20px;
  overflow: hidden;

  &:hover {
    transform: translateX(5px);
    cursor: pointer;
  }
}
</style>
