<template>
  <div class="col-md-12">
    <v-tabs
      v-model="active"
      color="blue"
      dark
      slider-color="black"
    >
      <v-tab
        v-for="n in tabs"
        :key="n"
        ripple
      >
        {{ n }}

      </v-tab>
      <v-tab-item
        v-for="(n,i) in tabs"
        :key="n"
      >
        <v-card flat v-if="i==0">
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
        <v-card flat v-if="i==1">
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click="next">next tab</v-btn>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tabs:['BUY', 'SELL']
      }
    },
    methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      }
    }
  }
</script>