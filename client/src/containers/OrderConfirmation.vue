<template>
    <v-card  class="col-sm-12" style="padding:10px;">
            <v-card-title>
            <div>
                <span class="grey--text">Number 10</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="confirmOrder()">Confirm Order</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
export default {
  methods: {
    confirmOrder() {
      this.$router.push({ name: "Orders" });
    }
  }
};
</script>

