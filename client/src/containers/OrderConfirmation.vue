<template>
    <v-card  class="col-sm-12" style="padding:10px;">
            <v-card-title>
            <div class="text-center">
                <span class="grey--text">Are you sure want to proceed further?</span><br>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="confirmOrder()">Confirm Order</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  data: function() {
    return {
      data: {}
    };
  },
  methods: {
    async confirmOrder() {
      //this.$router.push({ name: "Orders" });
      var request = {
        userID: localStorage.getItem("userID"),
        AssetID: this.$route.params.id,
        Status: "Pending",
        FinalPurchasePrice:this.data.OwnerShipDetails.FinalPurchasePrice,
        DiscountPercentage:0,
        DiscounedAmount:0
      };
      let response = await PostsService.setOrder(request);
      if (!response.data.errors) {
         console.log(response);
         this.$router.push({ name: "Orders" });
      } else {
        console.log(response);
        this.$router.push({ name: "Orders" });
      }
    }
  },
  mounted: async function() {
    let response = await PostsService.getAssetDetails({
      id: this.$route.params.id
    });
    this.data = response.data.Assets;
    this.total = response.data.Assets.length;
  }
};
</script>

