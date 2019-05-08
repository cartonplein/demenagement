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
  background: #ffd966ff;
  opacity: 0.95;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 550px;
  padding: 20px;
  margin-left: 20px;
  overflow: hidden;

  &:hover {
    background: darken(#f1c232ff,1%);
    cursor: pointer;
  }
  &:active {
    background-color: #f1c232ff;
    transform: translateY(4px);
  }
}
</style>
