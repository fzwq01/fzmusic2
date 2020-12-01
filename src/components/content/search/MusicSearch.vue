<template>
<div class="search" @mouseleave="leave()">
     <div class="search-item">
        <input type="text" class="mess" v-model="keywords" @focus="focus()" @keydown.enter="keyEnter()"/>
        <div class="search-icon" @click="keyEnter()">
            <img src="../../../assets/img/content/search.svg" alt />
        </div>
    </div>
    <!--  热搜 下拉框 -->
     <hot-search v-show="isShow" :searchlist="searchlist" @del="del" @recordClick="recordClick"></hot-search>
     <!-- 输入值显示建议下拉框 -->
     <div class="suggest" v-show="isSuggest">
       <div class="top">
         搜索
         <span>"{{keywords}}"</span>的相关结果
       </div>
       <dl>
          <dt>
            <div class="icon">
              <img src="../../../assets/img/leftmenu/music-line.svg" alt />
            </div>
            <div class="tit">单曲</div>
          </dt>
          <dd v-for="(item,index) in sugSongs" :key="index +'song'">
            {{item.name}}——{{item.artists[0].name}}
          </dd>
          <dt>
            <div class="icon">
              <img src="../../../assets/img/content/profile-o.svg" alt />
            </div>
            <div class="tit">歌手</div>
          </dt>
          <dd v-for="(item,index) in sugArtist" :key='index'>{{item.name}}</dd>
       </dl>
     </div>
</div>
</template>

<script>
import HotSearch from "./hotSearch";
import { _Suggest } from "../../../network/search";
export default {
    name:'search',
    data(){
        return{
            searchlist:['Burning','all of me'],
            isShow:false,
            keywords:'',
            isSuggest:false,
            keywords:'',
            sugSongs:[], //单曲
            sugArtist:[],//歌手
        }
    },
    components:{HotSearch},
    watch:{
      // 监听输入关键字
      keywords(){
        if(this.keywords != ''){
          this.isShow = false;
          this.isSuggest = true;
          this.suggest()
        }
      }
    },
    methods:{
        focus() {
            this.isShow = true;
        },
        leave(){
            this.isShow = false;
        },
        keyEnter(){
          if(this.keywords == '' || this.keywords == null) return;
          this.searchlist.unshift(this.keywords);
          this.isShow = false;
          this.isSuggest = false;
          this.keywords = '';
        },
        del(){
          this.searchlist = [];
        },
        recordClick(){

        },
        // 建议搜索
        suggest(){
          _Suggest(this.keywords).then(res =>{
            this.sugSongs = res.data.result.songs;
            this.sugArtist = res.data.result.artists;
          })
        }
    }
}
</script>

<style scoped>
.search {
  height: 100%;
  width: 230px;
  margin-left: 100px;
  display: inline-block;
  position: relative;
}
.search-item {
  line-height: 54px;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  border-radius: 10px;
}

.mess {
  outline-style: none;
  color: #333;
  line-height: 16px;
  background: transparent;
  position: absolute;
  width: 80%;
  height: 100%;
  padding: 0px 10px;
  border: #f6f6f6;
  border-radius: 10px;
}
.search-icon {
    cursor: pointer;
  position: absolute;
  right: 2px;
  top: -2px;
}
.suggest {
  width: 400px;
  background: #2d2f33;
  position: absolute;
  top: 54px;
  z-index: 4;
  padding: 10px;
  color: #828385;
}
.top {
  font-size: 13px;
}
.top span {
  color: #2e6bb0;
}
dl {
  width: 100%;
  font-size: 13px;
}
dl dt {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding: 5px 8px;
  background: #303236;
}
dl dd {
  padding: 5px 31px;
}
dd:hover {
  background: #2a2c30;
}
.icon {
  width: 16px;
  height: 16px;
}
.icon img {
  width: 100%;
}
.tit {
  margin-left: 8px;
  color: #dcdde4;
}
</style>