<template>
<button class="button-finaliser" style="vertical-align:middle" @click="onClick">
  <span style="font-size: 12px">Finaliser votre commande</span>
</button>
</template>

<script>
export default {
  name: 'ButtonFinaliser',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>

.button-finaliser {
  display: inline-block;
  padding: 3px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: purple;
  border: none;
  border-radius: 10px;
  box-shadow: 0 9px #999;
  width: 120px;
  height: 40px;
}

.button-finaliser:hover {background-color: #3E0863}

.button-finaliser:active {
  background-color: #3E0863;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>
