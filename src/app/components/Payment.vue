<template>
  <div id="payment">
    <div style="background: #FFF; margin: auto; padding: 20px;">
      <h1>Ici, on effectue le paiement...</h1>
      <button @click="cancelOrder()">Annuler</button>
      <button @click="finaliseOrder()">Payer</button>
    </div>
  </div>
</template>


<script>

import { config } from '../../db/index.js'
const fb = require('../../db/index.js');

export default {
  name: 'Payment',
  data() {
    return {
      image: 'https://i.imgur.com/HhqxVCW.jpg',
      name: 'Shut up and take my money!',
      description: 'Cats are the best dog!',
      currency: 'PHP',
      amount: 99999
    }
  },
  methods: {
    cancelOrder() {

    },
    finaliseOrder() {
      console.log(this.$store.state.choicesUser);

      this.$store.commit('setOrderDateTime', this.getCurrentDateTime());
      let ordersRef = fb.rootRef.child('orders');
      ordersRef.push(this.$store.state.choicesUser);
    },

    getCurrentDateTime() {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date+' '+time;
    },
  }
}

</script>

<style lang="scss">
html, body {
  height: 100%;
}
</style>

<style lang="scss" scoped>

#payment {
  height: 690px;
  background: rgba(0, 0, 0, 0);
  grid-row: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  position: relative;
  //
}

</style>
