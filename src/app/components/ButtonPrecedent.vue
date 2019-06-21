<template>
  <button id="button-precedent" @click="onClick">
    <span><b>&lt;&lt;</b> Précédent</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonPrecedent',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

#button-precedent {
  vertical-align: middle;
  display: inline-block;
  padding: 8px 8px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #ff0000ff;
  border: none;
  box-shadow: 0 9px #999;
  width: 120px;
  height: 40px;

  &:hover {background-color: #980000ff}

  &:active {
    background-color: #980000ff;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
}

</style>
