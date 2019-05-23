<template>
    <div id="panel-demenagement-forfait" @click="onClick">
      <h1 style="color:black; font-size: 20px"><b>Déménagement au forfait</b></h1>
      <h2 style="color:black; font-size: 15px">Vous choisissez la durée de la prestation, la surface du logement, et la date du déménagement.
</h2>
    </div>
</template>


<script>

export default {
    name: 'PanelDemenagementForfait',
    props: {
      onClick: {
        type: Function,
        required: true
      }
    }
}

</script>


<style lang="scss" scoped>

#panel-demenagement-forfait {
  background: #f6b26bff;
  opacity: 0.95;
  border: 1px solid black;
  border-radius: 10px;
  max-width: 550px;
  padding: 20px;
  margin-left: 20px;
  margin-top: 50px;
  overflow: hidden;
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
