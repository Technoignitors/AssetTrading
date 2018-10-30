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
                    v-model="formData.FirstName"
                    ref="firstName"
                    :rules="nameRules"
                    :error-messages="errorMessages"
                    :counter="10"
                    label="FirstName"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.MaidenName"
                    ref="maidenName"
                    label="MaidenName"
                    class="col-md-6"
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.LastName"
                    ref="lastName"
                    :rules="nameRules"
                    label="LastName"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.FatherName"
                    ref="fatherName"
                    :rules="nameRules"
                    label="FatherName"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.DOB"
                    ref="dob"
                    :rules="nameRules"
                    label="DOB"
                    class="col-md-6"
                    required
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
                    required
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
                    label="SecondaryEmail"
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
                    :rules="nameRules"
                    label="CorrospondenceAddressStreet1"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressStreet2"
                    :rules="nameRules"
                    label="CorrospondenceAddressStreet2"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressCity"
                    :rules="nameRules"
                    label="CorrospondenceAddressCity"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressState"
                    :rules="nameRules"
                    label="CorrospondenceAddressState"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.CorrospondenceAddressCountry"
                    :rules="nameRules"
                    label="CorrospondenceAddressCountry"
                    class="col-md-6"
                    required
                    ></v-text-field>
                    
                    <v-text-field
                    v-model="formData.CorrospondenceAddressZipCode"
                    :rules="nameRules"
                    label="CorrospondenceAddressZipCode"
                    class="col-md-6"
                    required
                    ></v-text-field>

                     <v-checkbox
                    :label="`Same as Corrospondence Address`" class="col-md-12"
                    v-model="formData.SameAsCorrospondence"
                    ></v-checkbox>

                    <div v-if="!formData.SameAsCorrospondence">
                        <v-text-field
                        v-model="formData.PermanentAddressStreet1"
                        :rules="nameRules"
                        label="PermanentAddressStreet1"
                        class="col-md-6"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressStreet2"
                        :rules="nameRules"
                        label="PermanentAddressStreet2"
                        class="col-md-6"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressCity"
                        :rules="nameRules"
                        label="PermanentAddressCity"
                        class="col-md-6"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressState"
                        :rules="nameRules"
                        label="PermanentAddressState"
                        class="col-md-6"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="formData.PermanentAddressCountry"
                        :rules="nameRules"
                        label="PermanentAddressCountry"
                        class="col-md-6"
                        required
                        ></v-text-field>

                        
                        <v-text-field
                        v-model="formData.PermanentAddressZipCode"
                        :rules="nameRules"
                        label="PermanentAddressZipCode"
                        class="col-md-6"
                        required
                        ></v-text-field>
                    </div>
                </div>
          </v-card-text>
        </v-card>


        <v-card v-if="item=='Occupation'">
          <v-card-text class="grey lighten-3">
                <div class="row">
                    <v-checkbox
                    :label="`If Employed`" class="col-md-12"
                    v-model="formData.IfEmployed"
                    ></v-checkbox>

                    <v-text-field
                    v-model="formData.PAN"
                    :rules="numericRules"
                    :counter="10"
                    label="PAN"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.Occupation"
                    :rules="nameRules"
                    :counter="10"
                    label="Occupation"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.GrossIncome"
                    :rules="numericRules"
                    label="GrossIncome"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="formData.NetWorth"
                    :rules="numericRules"
                    label="NetWorth"
                    class="col-md-6"
                    required
                    ></v-text-field>

                    <v-checkbox
                    :label="`GST Registered ?`" class="col-md-12"
                    v-model="formData.GSTRegistered"
                    ></v-checkbox>

                    <v-text-field
                    v-model="formData.GST"
                    :rules="nameRules"
                    label="GST"
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
  </div>
</template>
<script>
import PostsService from "@/services/PostsService";
export default {
  data: function() {
    return {
      panels: ["Basic", "Address", "Occupation"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [v => !!v || "Field is required"],
      numericRules:[
        v => !!v || "Field is required",
        v => /^[0-9]*$/.test(v) || "Field must be valid number"
      ],
      valid:false,
      errorMessages:"",
      formData: {
        FirstName: "Test",
        LastName: "test",
        MaidenName: "test",
        DOB: "12-12-1989",
        FatherName: "test",
        Mobile: "123457895",
        LandLine: "123457895",
        Email: "test@test.com",
        SecondaryEmail: "test@test.com",
        ResidentStatus: "Indian",
        CorrospondenceAddressStreet1: "test",
        CorrospondenceAddressStreet2: "test",
        CorrospondenceAddressCity: "test",
        CorrospondenceAddressState: "test",
        CorrospondenceAddressCountry: "test",
        CorrospondenceAddressZipCode: "test",
        PermanentAddressStreet1: "test",
        PermanentAddressStreet2: "test",
        PermanentAddressCity: "test",
        PermanentAddressState: "test",
        PermanentAddressCountry: "test",
        PermanentAddressZipCode: "test",
        IfEmployed: true,
        PAN: "test",
        Occupation: "test",
        GrossIncome: "123456",
        NetWorth: "123456",
        GSTRegistered: true,
        GST: "test",
        Mtoken: "50000",
        SameAsCorrospondence: true,
      }
    };
  },
  computed: {
    Form() {
      return this.formData
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        let response = await PostsService.setUserProfile(this.Form);
        console.log(response);
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  created: async function() {
    let response = await PostsService.getUserProfile();
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

