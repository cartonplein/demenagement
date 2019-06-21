<template>
    <div id="panel-demenagement-aide-dem" @click="onClick">
      <h1>Aide au déménagement</h1>
      <h2>Vous avez le camion, nous avons les bras ! <br></br></h2>
    </div>
</template>


<script>

export default {
    name: 'PanelDemenagementAideDem',
    props: {
      onClick: {
        type: Function,
        required: true
      }
    }
}

</script>


<style lang="scss" scoped>

#panel-demenagement-aide-dem {
  background: #FFF;
  //opacity: 0.95;
  border: 1px solid #E85029;
  box-shadow: 0 2px 2px 0 #E85029;
  border-radius: 10px;
  max-width: 550px;
  padding: 20px;
  margin-left: 20px;
  overflow: hidden;
  &:hover {
    transform: translateX(5px);
    cursor: pointer;
  }

  h1 {
    color: #E85029;
    font-size: 20px;
    font-weight: bold;
  }

  h2 {
    color: #E85029;
    font-size: 15px;
  }
}
</style>
