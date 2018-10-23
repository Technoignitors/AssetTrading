<template>
  <div id="app">
    <div class="wrapper" v-if="showHeaderFooterLeftPanel">
      <app-left-panel ></app-left-panel>
       <div class="main-panel">
          <app-header></app-header>
          <router-view />
          <app-footer></app-footer>
       </div>
    </div>
    <div v-if="!showHeaderFooterLeftPanel">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LeftPanel from './components/LeftPanel.vue'
export default {
  name: 'App',
  components:{
    appHeader:Header,
    appFooter:Footer,
    appLeftPanel:LeftPanel
  },
  computed:{
    showHeaderFooterLeftPanel(){
      if(this.$route.name == "Login"){
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>

<style>
@import '../static/css/animate.min.css';
@import '../static/css/demo.css';
@import '../static/css/light-bootstrap-dashboard.css';
@import '../static/css/pe-icon-7-stroke.css';
@import '../node_modules/font-awesome/css/font-awesome.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

</style>
