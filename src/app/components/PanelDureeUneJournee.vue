<template>
    <div id="panel-duree-une-journee" @click="onClick">
      <h1>Formule une journée</h1>
      <h2><b>7 heures</b> </h2>
      <h2>Pour les deux pièces et les appartements jusqu'à 40m².</h2>
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
  //opacity: 0.95;
  border: 1px solid #E85029;
  box-shadow: 0 2px 2px 0 #E85029;
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

  h1 {
    color: #E85029;
    font-weight: bold;
    font-size: 20px;
  }

  h2 {
    color: #E85029;
    font-size: 15px;
  }
}
</style>
