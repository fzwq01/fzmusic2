<template>
  <div class="main">
      <!-- <loading v-show="isloading"/> -->
          <!-- <keep-alive> -->
            <router-view />
          <!-- </keep-alive> -->
       <!-- <login class="login" v-show="$store.getters.getShowLogin" /> -->
  </div>
</template>

<script>
// import Login from "./user/Login";
// import Loading from "components/common/Loading";

export default {
    name:'Main',
    components:{
    }
}
</script>

<style scoped>
.main {
  width: calc(100% - 15%);
  height: calc(100% - 54px - 59px);
  margin-left: 15%;
  position: relative;
}
.login {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>