<template>
<div style="padding:10px;">
     <v-progress-linear  v-if="loading" :indeterminate="true"></v-progress-linear>
    <div style="padding:10px;" class="col-sm-6" v-for="(item,i) in data" :key="i">
         <v-card>
            <v-img
            
            height="200px"
            src="https://raw.githubusercontent.com/Technoignitors/AssetTrading/branch-liyakat/car-data/car-pictures/car-placeholder.jpg"
            >
            <v-container fill-height fluid>
                <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline">{{item.Name}} {{item.SKU}}</span>
                </v-flex>
                </v-layout>
            </v-container>
            </v-img>
            <v-card-title>
            <div class="col-md-12" style="padding:0;">
                <span class="col-md-6" style="margin-bottom:10px"><b>Description</b> : {{item.Description}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Specification</b> : {{item.Specification}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Price</b>: Ç {{item.OwnerShipDetails.FinalPurchasePrice}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Seller</b>: {{item.UserDetails.FirstName}}  {{item.UserDetails.LastName}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Owner Address</b>: {{item.UserDetails.bAddress}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Category</b>: {{item.CategoryName}}</span>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="purple" v-if="role !== 'admin'" @click="exploreItem(item._id)">Buy Asset</v-btn>
            <v-btn flat color="purple" v-if="role === 'admin'" @click="viewItem(item._id)">View Asset</v-btn>
            </v-card-actions>
        </v-card>
    </div>
    <h1 v-if="data.length == 0 && loaded" class="text-center">No Assets Found</h1>
  </div>

</template>



<script>
import PostsService from "@/services/PostsService";
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      total: 0,
      data: [],
      loaded: false,
      loading: true,
      role:""
    };
  },
  methods: {
    exploreItem(id) {
      this.$router.push({ name: "ExploreAsset", params: { id: id } });
    },
    viewItem(id) {
      this.$router.push({ name: "ExploreAsset", params: { id: id } });
    }
  },
  mounted: async function() {
    this.role = sessionStorage.getItem("userRole");
    let response;
    if (this.role != "admin") {
      response = await PostsService.getDashboardAssets({
        id: sessionStorage.getItem("userID")
      });
    } else {
      response = await PostsService.getAllAssets();
    }
    this.loading = false;
    this.data = response.data.Assets;
    this.total = response.data.Assets.length;
    if (this.total == 0) {
      this.loaded = true;
    }
  }
};
</script>