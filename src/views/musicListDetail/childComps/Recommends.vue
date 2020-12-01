<template>
    <div class="recommend" v-if="recommends">
        <div class="desc">
            <div class="language">
                <textarea name v-model="content" @keydown.enter="pushCommend()" cols="30" rows="10"></textarea>
            </div>
            <div class="sub" @click="pushCommend()">评论</div>
        </div>

        <!-- 评论列表 -->
        <div class="content">
            <p style="padding-left:10px;">精彩评论</p>
            <div class='item'
                 v-for="(item,index) in recommends" 
                 :key="index">
                <div class="icon">
                    <img :src="item.user.avatarUrl" alt>
                </div>
                <div class="mess">
                    <div class="top">
                        <span>{{item.user.nickname}}:</span>
                        {{item.content}}
                    </div>
                    <div class="bottom">
                        {{_formatDate(item.time)}}
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from '../../../assets/common/tool'
import { _pushCommend } from "network/detail";//歌单发表评论
export default {
    name:'recommend',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        },
        id:{
            type:String,
            default(){
                return ""
            }
        }
    },
    created(){
       
    },
    data(){
        return{
            content:'', //评论内容
        }
    },
    methods:{
        _formatDate(data){
            return formatDate(new Date(data),"yyyy年MM月dd日 hh:mm:ss")
        },
        // 提交评论
        pushCommend(){
            let cookie = this.$store.state.cookie;
            if(cookie !== '' && cookie !== null){
                _pushCommend(cookie,this.id,this.content).then(function(res){
                   if (res.data.code == 200) {
                        this.$Message.success("评论成功");
                    } else {
                        this.$Message.error("评论失败");
                    }
                })
            }else{
               this.$Message.warning("请先登陆"); 
            }
            this.content=''
        }
    }
}
</script>

<style lang="scss" scoped>
    .recommend{
        width: 100%;
        padding: 20px 0 10px 0;
        .desc{
            padding:10px;
            height: 105px;
            background:#1c1e23;
            .language{
                height: 60px;
                textarea{
                    width: 100%;
                    height: 100%;
                    padding-left:10px;
                    outline-style: none;
                    background: #2b2c31;
                    color:#fff;
                    border:none;
                }
            }
            .sub{
                float: right;
                margin-top:5px;
                cursor: pointer;
            }
        }
        .content{
            width: 100%;
            font-size: 13px;
            color:var(--color-text-tint);
            p{
                padding-top:30px;
                border:1px solid #23262c;
            }
            .item{
                padding:10px 0 10px 30px;
                border: 1px solid #23262c;
                display: flex;
                position: relative;
                .icon{
                    margin-right: 15px;
                    width: 40px;
                    height: 40px;
                    img{
                        border-radius: 50%;
                        width: 100%;
                    }
                }
                .mess{
                    flex:1;
                    .top{
                        margin-bottom: 20px;
                        span{
                            color:#2e6bb0;
                        }
                    }
                    .bottom{
                        position: absolute;
                        bottom:0;
                    }
                }
            }
        }
    }
</style>