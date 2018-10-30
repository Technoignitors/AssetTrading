<template>
<div>
    <div style="padding:10px;" class="col-sm-4" v-for="(item,i) in items" :key="i">
        <v-card>
            <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            <v-container fill-height fluid>
                <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
                </v-layout>
            </v-container>
            </v-img>
            <v-card-title>
            <div>
                <span class="grey--text">Number 10</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
            </v-card-title>
            <v-card-actions>
            <v-btn flat color="orange">Buy</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
        </v-card>
    </div>
  </div>
</template>

<script>
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
      ]
    };
  }
};
</script>