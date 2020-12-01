<template>
    <div class="play_mv" v-if="id && detail">
        <scroll class="play_mv_scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
            <div class="layout_left">
                <div class="title" v-if="detail">
                    <div class="left_mv">MV</div>
                    <div class="name">{{detail.name}}</div>
                    <div class="artist">{{detail.artistName}}</div>
                </div>
                <div class="video" v-if="url!=null">
                    <video :src="url"  autoplay controls width="100%" class="video_play"></video>
                </div>
                <div class="recommend">
                    <p class="p">评论</p>
                    <!-- 评论组件 -->
                    <recommends class="rec" :recommends="recommends" />
                </div>
            </div>
            <div class="right">
                <div class="desc">
                    <div class="p">MV介绍</div>
                    <div class="base">
                        <div class="date">发布时间：{{detail.publishTime}}</div>
                        <div class="playCount">播放次数：{{detail.playCount}}次</div>
                        <div class="clear"></div>
                        <div class="description">
                            <span >简介：</span>
                            {{detail.desc}}
                        </div>
                    </div>
                    <!-- <div class="mv_desc" ref="mvDesc"></div> -->
                    <div class="alia">
                        <p class="p">相关推荐</p>
                        <simi-mv-item :mv-list="simiMv" />
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import Recommends from "views/musicListDetail/childComps/Recommends";
import SimiMvItem from "views/mv/childComps/SimiMvItem";

import {
    _getMvDetail,//获取mv的数据
    _getMVUrl,//获取mv
    _getMVComment,//mv评论
    _getSimiMv,//小视频
    MV
} from '../../network/mv'

export default {
    name:'PlayMV',
    data(){
        return{
            id:null,
            detail:'',//视频基本信息
            url:'',//视频地址
            recommends:null,//评论
            limit:20,
            offset:1,//偏移量
            simiMv:[],//相似mv
        }
    },
    components:{
        Scroll,
        Recommends,
        SimiMvItem
    },
    watch:{
       $route(){
           this.id = this.$route.params.id;
           if(this.id != null){
               this.getBaseInfo()
           }
       }
    },
    created(){
        this.id = this.$route.params.id;
        if(this.id != null){
            this.getBaseInfo()
        }
       
    },
    methods:{
        // 上拉加载更多
        pullingUp(){
            this.getMoreComment()
        },
        // 封装评论获取用于下拉加载更多
        getMoreComment(){
            _getMVComment(this.id,this.offset * this.limit).then(function(res){
                this.recommends = res.data.comments;
                this.offset++;
                this.$refs.scroll.finishPullUp();
            });
        },
        //在watch里监听id是否存在 在这这行次函数 获取对应的基本信息
        getBaseInfo(){
             // 获取mv数据
            _getMvDetail(this.id).then(res => {
                this.detail = res.data.data;
                return
            })
            // 获取mv
            _getMVUrl(this.id).then(res =>{
                this.url = res.data.data.url;
                return;
            })
            // mv评论
            _getMVComment(this.id,this.limit).then(res => {
                this.recommends = res.data.comments;
                return;
            })
            // 相似视频
            _getSimiMv(this.id).then(res => {
                console.log(res)
                for(let i  of res.data.mvs){
                    let mv = new MV(i.id,i.cover,i.name,i.artistName,i.playCount);
                    this.simiMv.push(mv);
                    // 避免重复加载
                     if (i == res.data.mvs.length - 1) {
                        return;
                    } 
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.play_mv{
    width: 100%;
    height: 100%;
    padding:0 10%;
    overflow: hidden;
    .play_mv_scroll{
        height: 100%;
        .layout_left{
            display: inline-block;
            width: 70%;
            .title{
                div{display: inline-block;}
                .left_mv{
                    padding:5px;
                    display: inline-block;
                    border:1px solid red;
                    color:red;
                }
                .name{
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow: hidden;
                    font-size: 18px;
                    margin-left: 5px;
                    position: relative;
                    top: 5px;
                }
                .artist{
                    color: var(--color-text-an);
                    margin-left: 5px;
                }
            }
        }
        .video-play{
            outline-style: none;
        }
        .recommend{
            margin-top:10px;
            .rec{
                margin-top:5px;
                padding: 5px 0px 10px 0px;
            }
        }
        .right{
            padding-left:20px;
            width: 30%;
            float: right;
            .base{
                font-size: 12px;
                color: var(--color-text-an);
                margin-bottom: 10px;
                .date{
                    float: left;
                }
                .playCount{
                    float: right;
                }
                .description{
                    margin-top:15px;
                    span{
                        color: var(--color-text-blue);
                        font-size: 14px;
                    }
                }
            }
        }
        .clear{clear: both;}
    }
    .p {
        font-size: 18px;
        color: var(--color-text-tint);
        margin-bottom: 10px;
    }
}
</style>