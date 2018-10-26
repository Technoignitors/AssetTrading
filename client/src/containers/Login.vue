<template>
    <div>
        <div class="container">
            <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                    <h2>Login</h2>
                    <p>Please enter your Email and Password</p>
                    <v-alert v-if="displayError"
                          :value="true"
                          type="error"
                        >
                          {{displayError}}
                        </v-alert>
                    </div>
                     <v-form>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :rules="nameRules"
                        type="password"
                        label="Password"
                        required
                      ></v-text-field>
                    </v-form>
                    <v-btn :disabled="isFormEnable" @click.prevent="submit()"  color="success">submit</v-btn>
                    </div>
                       
                </div>
        </div>
    </div>
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  data: function() {
    return {
      email: "",
      password: "",
      error: "",
      valid: false,
      name: "",
      nameRules: [
        v => !!v || "Password is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    isFormEnable() {
      if (this.email === "" || this.password === "") return true;
      return false;
    },
    displayError() {
      if (this.error) {
        return thi.error;
      }
    }
  },
  methods: {
    async submit() {
      let response = await PostsService.login({
        user: {
          email: this.email,
          password: this.password
        }
      });
      if (!response.data.errors) {
        this.$router.push({ name: "Profile" });
      } else {
        this.error = response.data.errors.error;
      }
    }
  }
};
</script>




<style scoped>
.form-heading {
  color: #fff;
  font-size: 23px;
}
.panel h2 {
  color: #444444;
  font-size: 18px;
  margin: 0 0 8px 0;
}
.panel p {
  color: #777777;
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 24px;
}
.login-form .form-control {
  background: #f7f7f7 none repeat scroll 0 0;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.main-div {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 100px auto 30px;
  max-width: 38%;
  padding: 50px 70px 70px 71px;
}

.login-form .form-group {
  margin-bottom: 10px;
}
.login-form {
  text-align: center;
}
.forgot a {
  color: #777777;
  font-size: 14px;
  text-decoration: underline;
}
.login-form .btn.btn-primary {
  background: #f0ad4e none repeat scroll 0 0;
  border-color: #f0ad4e;
  color: #ffffff;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.forgot {
  text-align: left;
  margin-bottom: 30px;
}
.botto-text {
  color: #ffffff;
  font-size: 14px;
  margin: auto;
}
.login-form .btn.btn-primary.reset {
  background: #ff9900 none repeat scroll 0 0;
}
.back {
  text-align: left;
  margin-top: 10px;
}
.back a {
  color: #444444;
  font-size: 13px;
  text-decoration: none;
}
.error {
  background-color: red !important;
}
</style>

