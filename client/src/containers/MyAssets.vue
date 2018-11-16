<template>
<div>
  <v-progress-linear  v-if="loading" :indeterminate="true"></v-progress-linear>
    <div style="padding:10px;" class="col-sm-6" v-for="(item,i) in data" :key="i">
        <v-card>
            <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            <v-container fill-height fluid>
                <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline">{{item.Name}}</span>
                </v-flex>
                </v-layout>
            </v-container>
            </v-img>
            <v-card-title>
            <div class="col-md-12">
                <span class="col-md-6" style="margin-bottom:10px"><b>Description</b> : {{item.Description}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Specification</b> : {{item.Specification}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>FinalPurchasePrice</b>: $ {{item.OwnerShipDetails.FinalPurchasePrice}}</span>
                <span class="col-md-6" style="margin-bottom:10px"><b>Category</b>: {{item.CategoryName}}</span>
                <!-- <span class="col-md-12">User: {{item.UserDetails.FirstName}}  {{item.UserDetails.LastName}}</span> -->
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="resell(item._id)">View Asset</v-btn>
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
      total:0,
      data:[],
      loaded:false,
      loading:true
    };
  },
  methods: {
    resell(id) {
      this.$router.push({ name: "ExploreAsset", params: { id: id } });
    },
    
  },
  mounted: async function() {
      let response = await PostsService.myAssets({id:sessionStorage.getItem("userID")});
      this.loading = false;
      this.data = response.data.Assets;
      this.total = response.data.Assets.length
      if(this.total == 0){
        this.loaded = true;
      }
      
    }
};
</script>