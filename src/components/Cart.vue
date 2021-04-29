<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <!--
            The below is a very simple example of what the cart logic does, each scan adds to the scanned items
            The total is worked out whenever an item is added and follows the rules specificed on the GitHub repo 
            You can do a lot more in terms of UI prettiness with this however the important part was more so the approach
            and what kind of code I can write so I kept this very simple just to demonstrate functionality. I hope you don't mind :)
          !-->
          <v-card-title>Checkout</v-card-title>
          <v-btn @click="scan('MUG')">Scan Mug</v-btn>
          <v-btn @click="scan('TSHIRT')">Scan T-Shirt</v-btn>
          <v-btn @click="scan('CAP')">Scan Cap</v-btn>
          <v-card-title>Total: ${{ this.co.total() }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Checkout } from "@/cart/logic/Checkout";
import { pricingRules } from "@/cart/interfaces/Products";

export default Vue.extend({
  name: "Cart",

  methods: {
    scan(id: string) {
      this.co.scan(id);
    },
  },
  data: () => ({
    pr: {
      products: [
        {
          id: "MUG",
          name: "Cabify Coffee Mug",
          price: 5,
        },
        {
          id: "TSHIRT",
          name: "Cabify T-Shirt",
          price: 20,
        },
        {
          id: "CAP",
          name: "Cabify Cap",
          price: 10,
        },
      ],
      rules: [
        {
          id: "MUG",
          amountNeeded: 2,
          strict: true, // if strict limit to amountNeeded
          discount: 0.5,
          applyTo: "total", // applies discount to total
        },
        {
          id: "TSHIRT",
          amountNeeded: 3,
          strict: false, // if not strict then to any number >=
          discount: 0.05,
          applyTo: "single", // applies discount to each item
        },
      ],
    } as pricingRules,
    co: null as any, // not the ideal solution for this but it does the job for this simple example
  }),
  created() {
    this.co = new Checkout(this.pr);
  },
});
</script>
