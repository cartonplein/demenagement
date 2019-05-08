<template>
<button class="button-precedent" style="vertical-align:middle" @click="onClick">
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

<style>

.button-precedent {
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
  border-radius: 10px;
  box-shadow: 0 9px #999;
  width: 120px;
  height: 40px;
}

.button-precedent:hover {background-color: #980000ff}

.button-precedent:active {
  background-color: #980000ff;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>
