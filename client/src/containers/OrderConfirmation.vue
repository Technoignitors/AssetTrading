<template>
  <div>        
    <v-progress-linear  v-if="loading" :indeterminate="true"></v-progress-linear>
    <v-card  class="col-sm-12" style="padding:10px;">
            <v-card-title>
            <div class="text-center">
                <span>Are you sure want to proceed further? <b> {{data.OwnerShipDetails.FinalPurchasePrice}} </b> Token From your wallet will be deducted once transaction complets ?</span><br>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="confirmOrder()">Confirm Order</v-btn>
            </v-card-actions>
        </v-card>
       
        </div>
        
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  data: function() {
    return {
      data: {},
      loading:false
    };
  },
  methods: {
    async confirmOrder() {
      //this.$router.push({ name: "Orders" });
      var request = {
        userID: sessionStorage.getItem("userID"),
        AssetID: this.$route.params.id,
        Status: "Pending",
        FinalPurchasePrice: this.data.OwnerShipDetails.FinalPurchasePrice,
        DiscountPercentage: 0,
        DiscounedAmount: 0
      };
      let response = await PostsService.setOrder(request);
      this.loading = true;
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

