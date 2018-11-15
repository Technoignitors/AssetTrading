<template>
<div style="padding:10px;">
  <!-- <v-carousel
    delimiter-icon="stop"
    prev-icon="mdi-arrow-left"
    next-icon="mdi-arrow-right"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel> -->
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
            <div>
                <span class="col-md-12" style="margin-bottom:10px">Description : {{item.Description}}</span><br>
                <span class="col-md-12" style="margin-bottom:10px">Specification : {{item.Specification}}</span><br>
                <span class="col-md-12" style="margin-bottom:10px">Price: $ {{item.OwnerShipDetails.FinalPurchasePrice}}</span>
                <span class="col-md-12" style="margin-bottom:10px">Seller: {{item.UserDetails.FirstName}}  {{item.UserDetails.LastName}}</span>
            </div>
            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="exploreItem(item._id)">Buy Asset</v-btn>
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
  methods:{
    exploreItem(id){
      this.$router.push({ name: "ExploreAsset",  params: { id: id } });
    }
  },
  mounted: async function() {
      let response = await PostsService.getDashboardAssets({id:localStorage.getItem("userID")});
      this.data = response.data.Assets;
      this.total = response.data.Assets.length
    }
};
</script>