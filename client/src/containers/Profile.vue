<template>
  <div class="" style="padding:10px">
     <v-progress-linear  v-if="loading" :indeterminate="true"></v-progress-linear>
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
                    v-model="formData.FirstName"
                    ref="firstName"
                    :rules="nameRules"
                    :error-messages="errorMessages"
                    :counter="10"
                    label="First Name"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.MaidenName"
                    ref="maidenName"
                    label="Maiden Name"
                    class="col-md-6"
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.LastName"
                    ref="lastName"
                    :rules="nameRules"
                    label="Last Name"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.FatherName"
                    ref="fatherName"
                    label="Father Name"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.DOB"
                    ref="dob"
                    label="DOB"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.Mobile"
                    ref="mobile"
                    :rules="numericRules"
                    label="Mobile"
                    type="email"
                    class="col-md-6"
                    required
                    ></v-text-field>
                    
                    <v-text-field
                    v-model="formData.LandLine"
                    ref="landline"
                    :rules="numericRules"
                    label="LandLine"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.Email"
                    ref="email"
                     :rules="emailRules"
                    label="Email"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.SecondaryEmail"
                    ref="secondaryEmail"
                    :rules="emailRules"
                    label="Secondary Email"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.bAddress"
                    ref="bAddress"
                    :rules="nameRules"
                    label="BlockChain Address"
                    class="col-md-6"
                    required
                    ></v-text-field>
            </div>
          </v-card-text>
        </v-card>

        <v-card v-if="item=='Address'">
          <v-card-text class="grey lighten-3">
                <div class="row">
                    <!-- <v-checkbox
                    :label="`Indian`" class="col-md-12"
                    v-model="formData.ResidentStatus"
                    ></v-checkbox> -->

                    <v-text-field
                    v-model="formData.CorrospondenceAddressStreet1"
                    label="Street1"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressStreet2"
                    label="Street2"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressCity"
                    label="City"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressState"
                    label="State"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressCountry"
                    label="Country"
                    class="col-md-6"
                    
                    ></v-text-field>
                    
                    <v-text-field
                    v-model="formData.CorrospondenceAddressZipCode"
                    label="ZipCode"
                    class="col-md-6"
                    
                    ></v-text-field>

                     <!-- <v-checkbox
                    :label="`Same as Corrospondence Address`" class="col-md-12"
                    v-model="formData.SameAsCorrospondence"
                    ></v-checkbox> -->

                    <div v-if="false">
                        <v-text-field
                        v-model="formData.PermanentAddressStreet1"
                        :rules="nameRules"
                        label="Street1"
                        class="col-md-6"
                        
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressStreet2"
                        :rules="nameRules"
                        label="Street2"
                        class="col-md-6"
                        
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressCity"
                        :rules="nameRules"
                        label="City"
                        class="col-md-6"
                        
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressState"
                        :rules="nameRules"
                        label="State"
                        class="col-md-6"
                        
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressCountry"
                        :rules="nameRules"
                        label="Country"
                        class="col-md-6"
                        
                        ></v-text-field>

                        
                        <v-text-field
                        v-model="formData.PermanentAddressZipCode"
                        :rules="nameRules"
                        label="ZipCode"
                        class="col-md-6"
                        
                        ></v-text-field>
                    </div>
                </div>
          </v-card-text>
        </v-card>


        <v-card v-if="item=='Occupation'">
          <v-card-text class="grey lighten-3">
                <div class="row">
                    <!-- <v-checkbox
                    :label="`If Employed`" class="col-md-12"
                    v-model="formData.IfEmployed"
                    ></v-checkbox> -->

                    <v-text-field
                    v-model="formData.PAN"
                    :counter="10"
                    label="PAN"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.Occupation"
                    :counter="10"
                    label="Occupation"
                    class="col-md-6"
                    
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.GrossIncome"
                    label="Total Income"
                    class="col-md-6"
                    
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
    <!-- <v-btn @click="clear">clear</v-btn> -->
    <app-Notifications :show="showNotification" :messege="notificationMessage" ></app-Notifications>
   
  </div>
</template>
<script>
import PostsService from "@/services/PostsService";
import Notifications from "@/components/Notifications";
export default {
  components: {
    "app-Notifications": Notifications
  },
  data: function() {
    return {
      panels: ["Basic", "Address", "Occupation"],
      panel: [true, true, true],
      emailRules: [
        v => !!v || "E-mail is ",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [v => !!v || "Field is "],
      numericRules: [
        v => !!v || "Field is ",
        v => /^[0-9]*$/.test(v) || "Field must be valid number"
      ],
      valid: false,
      errorMessages: "",
      formData: {
        FirstName: "",
        LastName: "",
        MaidenName: "",
        DOB: "",
        FatherName: "",
        Mobile: "",
        LandLine: "",
        Email: "",
        SecondaryEmail: "",
        ResidentStatus: "",
        CorrospondenceAddressStreet1: "",
        CorrospondenceAddressStreet2: "",
        CorrospondenceAddressCity: "",
        CorrospondenceAddressState: "",
        CorrospondenceAddressCountry: "",
        CorrospondenceAddressZipCode: "",
        PermanentAddressStreet1: "",
        PermanentAddressStreet2: "",
        PermanentAddressCity: "",
        PermanentAddressState: "",
        PermanentAddressCountry: "",
        PermanentAddressZipCode: "",
        IfEmployed: true,
        PAN: "",
        Occupation: "",
        GrossIncome: "",
        NetWorth: "",
        GSTRegistered: true,
        GST: "",
        Mtoken: "",
        SameAsCorrospondence: true
      },
      loading:true,
      showNotification: false,
      notificationMessage: ""
    };
  },
  computed: {
    Form() {
      return this.formData;
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        await PostsService.setUserProfile(this.Form);
        let response = await PostsService.getUserProfile({
          id: sessionStorage.getItem("userID")
        });
        if (!response.data.errors) {
          this.formData = response.data.userProfile;
           this.showNotification = true;
          this.notificationMessage = "Profile Updated Successfully";
        } else {
          console.log(response);
          this.showNotification = true;
          this.notificationMessage = response.data.errors.error;
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  mounted: async function() {
    let response = await PostsService.getUserProfile({
      id: sessionStorage.getItem("userID")
    });
    this.loading = false;
    if (!response.data.errors) {
      this.formData = response.data.userProfile;
     
    } else {
      console.log(response);
      
      //alert(response.data.errors.error);
    }
  }
};
</script>

<style scoped>
.mar-10 {
  padding: 10px !important;
}
</style>

