<template>
    <v-card  class="col-sm-12" style="padding:10px;">
            <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            <v-container fill-height fluid>
                <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline">{{assetDetails.Name}} - {{assetDetails.SKU}}</span>
                </v-flex>
                </v-layout>
            </v-container>
            </v-img>
            <v-card-title>
            <div class="col-md-12">
                <span class="grey--text">Description</span><br>
                <span>{{assetDetails.Description}}</span><br>
            </div>
            <hr>
            <div class="col-md-12">
                <span class="grey--text">Specification</span><br>
                <span>{{assetDetails.Specification}}</span><br>
            </div>
            <hr>
            <div class="col-md-12">
                <span class="grey--text">Reviews</span><br>
                <span>{{assetDetails.Specification}}</span><br>
            </div>

             <hr>
            <div class="col-md-12">
                <span class="grey--text">Queries</span><br>
                <span>{{assetDetails.Specification}}</span><br>
            </div>

             <hr>
            <div class="col-md-12">
                <span class="grey--text">Documents</span><br>
                <span>{{assetDetails.Specification}}</span><br>
            </div>

             <hr>
            <div class="col-md-12">
                <span class="grey--text">Images</span><br>
                <span>{{assetDetails.Specification}}</span><br>
            </div>

            </v-card-title>
            <v-card-actions>
            <!-- <v-btn flat color="orange">Buy</v-btn> -->
            <v-btn flat color="orange" @click="buyItem()">Buy Now</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      assetDetails: {
        _id: {
          $oid: "5bd95da75c0694198c047b66"
        },
        CreatedOn: {
          $date: "2018-10-31T07:45:22.080Z"
        },
        UpdatedOn: {
          $date: "2018-10-31T07:45:22.080Z"
        },
        SKU: "Test",
        Category: {
          $oid: "5bd94c5aabef9e4d544ffc11"
        },
        Name: "test",
        Description: "12-12-1989",
        Specification: "test",
        UploadedBy: {
          $oid: "5bd2ad37cf8c475c686409b1"
        },
        CurrentOwner: {
          $oid: "5bd2ad37cf8c475c686409b1"
        },
        CreatedBy: {
          $oid: "5bd2ad37cf8c475c686409b1"
        },
        UpdatedBy: {
          $oid: "5bd2ad37cf8c475c686409b1"
        },
        Reviews: [],
        Rating: [],
        Queries: [],
        Documents: [],
        Images: [],
        __v: 0
      }
    };
  },
  methods: {
    buyItem() {
      this.$router.push({
        name: "OrderConfirmation",
        params: { assetId: this.$route.params.id }
      });
    }
  }
};
</script>

