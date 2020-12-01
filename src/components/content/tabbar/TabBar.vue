<template>
<div class="tabbar">
    <div class="logo">
        <div class="logoName"  @click="backHome()">樊</div>
        <div class="title" @click="backHome()">FZ音乐</div>
        <div class="back" @click="back()">
            <img src="../../../assets/img/content/back.svg" alt />
        </div>
    </div>
        
    <music-search />
    <div class="content">
        <div class="login" @click="showLogin()">
            <div class="profile">
                <img :src="getImage" alt />
            </div>
        <div>{{getUserName}}</div>

        <div class="right">
            <div>
                <a href="#" title="最小化">
                    <img src="../../../assets/img/content/min.svg" alt="最小化" />
                </a>
            </div>
            <div>
                <a href="#" title="还原">
                    <img src="../../../assets/img/content/reset.svg" alt="还原" />
                </a>
            </div>
            <div>
                <a href="#" title="退出">
                    <img src="../../../assets/img/content/x.svg" alt="退出" />
                </a>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import MusicSearch from "../search/MusicSearch";
export default {
    name:'TabBar',
    components:{
        MusicSearch
    },
    computed:{
        getImage(){

        },
        getUserName(){

        }
    },
    methods:{
        showLogin(){

        },
        backHome(){
          if (this.$route.path == "/discover") return;
          this.$router.push("/discover");
        },
        back(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.tabbar {
  height: 54px;
  width: 100%;
  background-color: #202023;
}
.title{
    color:#fff;
}
.logoName{
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align:center;
  border-radius: 50%;
  background:rgba(20, 86, 161, 0.514);
  color:#fff;
  display: inline-block;
  margin-right: 10px;
}
.logo {
  cursor: pointer;
  height: 100%;
  width: 15%;
  line-height: 100%;
  display: flex;
  float: left;
  align-items: center;
  position: relative;
}
.back {
  display: inline-block;
  height: 26px;
  position: absolute;
  right: 5px;
  opacity: 0.6;
}
.back:hover {
  opacity: 1;
}
.back img {
  height: 100% !important;
}
.content {
  float: right;
  height: 100%;
}
.login {
  cursor: pointer;
  height: 100%;
  float: right;
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.profile {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
}
.profile img {
  width: 100%;
  border-radius: 50%;
}
.logo img {
  margin: 0px 10px 0px 10px;
  height: 60%;
}
.right {
  height: 100%;
  display: flex;
  align-items: center;
}
.right div {
  flex: 1;
  margin-right: 15px;
  opacity: 0.6;
}
.right div:hover {
  opacity: 1;
}
.right div img {
  width: 22px;
}
</style>