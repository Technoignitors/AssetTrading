<template>
    <v-card  class="col-sm-7 col-md-offset-2" style="padding:10px;">
           <v-img
            
            height="200px"
            src="https://raw.githubusercontent.com/Technoignitors/AssetTrading/branch-liyakat/car-data/car-pictures/car-placeholder.jpg"
            >
            <v-container fill-height fluid>
                <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline">{{data.Name}}</span>
                </v-flex>
                </v-layout>
            </v-container>
            </v-img>
            <v-card-title>
            <div class="col-md-12" style="padding:0;">
                <span class="col-md-6" style="margin-bottom:10px"><b>Description</b> : {{data.Description}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Specification</b> : {{data.Specification}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Price</b>: Ç {{data.OwnerShipDetails.FinalPurchasePrice}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Seller</b>: {{data.UserDetails.FirstName}}  {{data.UserDetails.LastName}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Owner Address</b>: {{data.UserDetails.bAddress}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Category</b>: {{data.CategoryName}}</span>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <!-- <v-btn flat color="purple" v-if="showBtn" @click="buyItem(data._id)">Confirm</v-btn> -->
            </v-card-actions>
             <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn  v-if="showBtn"
        slot="activator"
        color="red lighten-2"
        dark
      >
        Confirm
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Are you sure?
        </v-card-title>

        <v-card-text>
           <span>Are you sure want to proceed further? <b> {{data.OwnerShipDetails.FinalPurchasePrice}} </b> Token From your wallet will be deducted once transaction complets ?</span><br>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false;confirmOrder()"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-card>
        
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  data: function() {
    return {
      assetDetails: {},
      data: {},
      showBtn: true,
      dialog: false
    };
  },
  methods: {
    buyItem() {
      this.$router.push({
        name: "OrderConfirmation",
        params: { assetId: this.$route.params.id }
      });
    },
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
  created: async function() {
    let response = await PostsService.getAssetDetails({
      id: this.$route.params.id
    });
    if (sessionStorage.getItem("userID") === response.data.Assets.CurrentOwner || sessionStorage.getItem("userRole") == 'admin') {
      this.showBtn = false;
    }
    this.data = response.data.Assets;
    this.total = response.data.Assets.length;
  }
};
</script>

