<template>
  <div class="" style="padding:10px">
   <v-form ref="form" v-model="valid" lazy-validation>
    <v-expansion-panel
      v-model="panel"
      expand>
      <v-expansion-panel-content
        v-for="(item, i) in panels"
        :key="i">
        <div slot="header">{{item}}</div>
        <v-card v-if="item=='Basic'">
          <v-card-text class="grey lighten-3">
              <div class="row">
                

                    <v-text-field
                    v-model="formData.Name"
                    ref="name"
                    :rules="nameRules"
                    :error-messages="errorMessages"
                    :counter="10"
                    label="Name"
                    class="col-md-6"
                    required
                    ></v-text-field>
                    <v-select
                      class="col-md-6"
                      :items="categories"
                      item-text="Name"
                      label="Categories"
                      v-model="formData.Category"
                      item-value="_id"
                    ></v-select>

                    <v-textarea
                    v-model="formData.Description"
                    ref="description"
                    label="Description"
                    class="col-md-6"
                    ></v-textarea>

                    <v-textarea
                    v-model="formData.Specification"
                    ref="specification"
                    :rules="nameRules"
                    label="Specification"
                    class="col-md-6"
                    required
                    ></v-textarea>

                    

            </div>
          </v-card-text>
        </v-card>

        <v-card v-if="item=='Documents'">
          <v-card-text class="grey lighten-3">
                <div class="row">
                    <!-- <v-text-field
                    v-model="formData.CorrospondenceAddressStreet1"
                    label="CorrospondenceAddressStreet1"
                    class="col-md-6"
                    required
                    ></v-text-field> -->

                    <b-form-file v-model="file" :state="Boolean(file)" multiple class="col-md-6" placeholder="Choose a file..."></b-form-file>

                    <b-form-file v-model="file" :state="Boolean(file)" multiple class="col-md-6" placeholder="Choose a file..."></b-form-file>
                    <!-- <b-form-file v-model="file" class="mt-3" plain></b-form-file> -->

                    <!-- <v-text-field
                    v-model="formData.CorrospondenceAddressStreet2"
                    :rules="nameRules"
                    label="CorrospondenceAddressStreet2"
                    class="col-md-6"
                    required
                    ></v-text-field> -->

                </div>
          </v-card-text>
        </v-card>

        <v-card v-if="item=='Offers And Discounts'">
          <v-card-text class="grey lighten-3">
                <div class="row">

                  <v-checkbox
                    :label="`AvailDiscount`" class="col-md-12"
                    v-model="formData.AvailDiscount"
                    ></v-checkbox>

                    <v-text-field
                    v-model="formData.DiscountPercentage"
                    :rules="numericRules"
                    label="Discount Percentage"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.DiscounedAmount"
                    :rules="numericRules"
                    label="Discouned Amount"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.AssetPrice"
                    :rules="numericRules"
                    label="Asset Price"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.FinalPurchasePrice"
                    :rules="numericRules"
                    label="Final Purchase Price"
                    class="col-md-6"
                    required
                    ></v-text-field>
                </div>
          </v-card-text>
        </v-card>
       
      </v-expansion-panel-content>
    </v-expansion-panel>
   </v-form>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
    <app-Notifications :show="showNotification" :messege="notificationMessage" ></app-Notifications>
   
  </div>
</template>
<script>
import PostsService from "@/services/PostsService";
import bFormFile from "bootstrap-vue/es/components/form-file/form-file";
import Notifications from "@/components/Notifications";
export default {
  components: {
    "b-form-file": bFormFile,
    "app-Notifications": Notifications
  },
  data: function() {
    return {
      panels: ["Basic", "Offers And Discounts", "Documents"],
      panel: [],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [v => !!v || "Field is required"],
      numericRules: [
        v => !!v || "Field is required",
        v => /^[0-9]*$/.test(v) || "Field must be valid number"
      ],
      items: [],
      valid: false,
      errorMessages: "",
      file: null,
      categories: [],
      showNotification: false,
      notificationMessage: "",
      formData: {
        SKU: "Test",
        Category: "test",
        Name: "test",
        Description: "12-12-1989",
        Specification: "test",
        AvailDiscount: true,
        DiscountPercentage: 10,
        DiscounedAmount: 1234,
        AssetPrice: 1254,
        FinalPurchasePrice: 1452,
        Category: "5bd94c5aabef9e4d544ffc11"
      }
    };
  },
  computed: {
    Form() {
      return this.formData;
    }
  },
  methods: {
    async submit() {
      this.showNotification = false;
      if (this.$refs.form.validate()) {
        let response = await PostsService.uploadAsset(this.Form);
        if (response.data.error) {
          this.showNotification = true;
          this.notificationMessage = response.data.error;
        }else{
          this.showNotification = true;
          this.notificationMessage = "Asset Listed Successfully";
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  created: async function() {
    let categories = await PostsService.getCategories();
    if (categories.data.errors) {
      this.showNotification = true;
      this.notificationMessage = categories.data.errors.error;
    } else {
      this.categories = categories.data.Categories;
    }
  }
};
</script>

<style scoped>
.mar-10 {
  padding: 10px !important;
}
</style>

