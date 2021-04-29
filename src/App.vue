<template>
  <v-app>
    <v-main>
      <Cart/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Cart from './components/Cart.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Cart,
  },

  data: () => ({
    //
  }),
});
</script>
