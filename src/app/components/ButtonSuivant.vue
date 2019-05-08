<template>
<button class="button-suivant" style="vertical-align:middle" @click="onClick">
  <span>Suivant <b>&gt;&gt;</b></span>
</button>
</template>

<script>
export default {
  name: 'ButtonSuivant',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>

.button-suivant {
  display: inline-block;
  padding: 8px 8px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 10px;
  box-shadow: 0 9px #999;
  width: 120px;
  height: 40px;
}

.button-suivant:hover {background-color: #3e8e41}

.button-suivant:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>
