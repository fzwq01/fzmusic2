<template>
    <div class="detail">
        <scroll class="detail-scroll" ref="scroll" pull-up-load="true" @pullingUp="pullingUp">
            <detail-base-info :baseInfo='baseInfo'></detail-base-info>
            <!-- 导航 -->
            <detail-bar :list="list" @detailBarClick="detailBarClick"></detail-bar>
            <!-- 歌曲列表 -->
            <music-item v-show="isShow == 'music'" :musiclist="musiclist"></music-item>
            <!--评论 -->
            <recommends v-show="isShow == 'recommend'" :id="id" :recommends="recommends"></recommends>
            <!-- 收藏着 -->
            <music-list-live v-show="isShow =='sub'" :subs="subs" />
        </scroll>
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailBaseInfo from './childComps/DetailBanseInfo' //歌单基本信息
import DetailBar from './childComps/DetailBar' // 导航
import MusicItem from './childComps/MusicItem'//歌单列表
import Recommends from './childComps/Recommends'//评论
import MusicListLive from './childComps/MusicListLive' //收藏着



import {
    _getMusicListDetail,
    _getSongsDetail,
    songDetail,//歌曲类封装
    _getRecommends,//歌单评论
    _getSub,//歌单收藏者
    } from '../../network/detail'
export default {
    name:'detail',
    components:{
        Scroll,
        DetailBaseInfo,
        DetailBar,
        MusicItem,
        Recommends,
        MusicListLive
    },
    data(){
        return{
            id:'',//歌单id
            baseInfo:null,//基本信息
            list:[],//导航
            isShow: "music",//导航默认显示
            musiclist:[],//歌单列表
            recommends:[],//评论
            limit:20,//限制条数
            subs:[],//收藏着
            page:1,
        }
    },
    created(){
        this.id = this.$route.params.id;
        _getMusicListDetail(this.$route.params.id).then(res => {
            // console.log(res)
            this.baseInfo = res.data.playlist; //基本信息
            this.list= ["歌曲列表", "评论("+ res.data.playlist.commentCount +")", "收藏者"];

            // 遍历拿到歌单所有歌曲
            for(let i of res.data.playlist.trackIds){
                _getSongsDetail(i.id).then(res => {
                    let songs = new songDetail(res.data.songs);
                    this.musiclist.push(songs);
                })
            }

            // 获取歌单评论信息
            _getRecommends(this.id,this.limit).then(res => {
                this.recommends = res.data.comments;
            })
            // 歌单收藏者
            _getSub(this.id,this.limit).then(res => {
                this.subs = res.data.subscribers;
            })
        })
    },
    methods:{
        // 点击导航切换
        detailBarClick(str){
            this.isShow = str;
        },
        // 歌单评论上拉加载更多
        getMusicRecommends(){
             _getRecommends(this.id,this.limit *this.page).then(res => {
                this.recommends = res.data.comments;
                this.page++;
                this.$refs.scroll.finishPullUp()
            })
        },

        // 上拉加载更多评论
        pullingUp(){
            console.log('哈哈')
            this.getMusicRecommends();
        },
          // 封装评论获取用于下拉加载更多
        // getMoreComment(){
        //     _getMVComment(this.id,this.offset * this.limit).then(function(res){
        //         this.recommends = res.data.comments;
        //         this.offset++;
        //         this.$refs.scroll.finishPullUp();
        //     });
        // },
    }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 35px 35px 0px 35px;
  background: #16181c;
  color: #dcdde4;
  overflow: hidden;
}
.detail-scroll{
    height: 100%;
}
</style>