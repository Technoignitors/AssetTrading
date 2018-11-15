<template>
<div>
    <div style="padding:10px;" class="col-sm-4" v-for="(item,i) in data" :key="i">
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
            <div>
                <span class="grey--text col-md-12">Description : {{item.Description}}</span><br>
                <span class="col-md-12">Specification : {{item.Specification}}</span><br>
                <span class="col-md-12">FinalPurchasePrice: $ {{item.OwnerShipDetails.FinalPurchasePrice}}</span>
                <span class="col-md-12">User: {{item.UserDetails.FirstName}}  {{item.UserDetails.LastName}}</span>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="resell(i)">Sell</v-btn>
            </v-card-actions>
        </v-card>
    </div>
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
      data:[]
    };
  },
  methods: {
    resell(id) {
      this.$router.push({ name: "ReSellAsset", params: { id: id } });
    },
    
  },
  mounted: async function() {
      let response = await PostsService.myAssets({id:localStorage.getItem("userID")});
      console.log(response)
      this.data = response.data.Assets;
      this.total = response.data.Assets.length
      
    }
};
</script>