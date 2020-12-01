<template>
    <div class="private" v-if="pri != null">
        <p class="top">{{pri.name}}</p>
        <div class="content">
            <div class="item" v-for="(item,index) in pri.result" :key="index" @click="playMV(item.id)">
                <div class="loco">
                    <img src="../../../assets/img/leftmenu/shiping.svg" @load="priImgLoad" alt="">
                </div>
                <img :src="item.picUrl" alt />
                <div class="bottom">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { imgLoadMixin } from "assets/common/mixin";
export default {
    name:'private',
    props:{
        pri:{
            type:Object,
            default(){
                return {}
            }
        }
    },
     mixins: [imgLoadMixin],
    data(){
        return{

        }
    },
    methods:{
        priImgLoad(){
             /**类似于防抖函数功能*/
            if (this.imgCount == this.pri.result.length) this.$emit("priImgLoad");
            this.imgCount++;
        },
        // 播放mv
        playMV(id){
           this.$router.push('/playmv/'+ id);
        }
    }
}
</script>

<style scoped>
.private {
  width: 100%;
  padding: 20px 0;
}
.content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 300px;
  overflow: hidden;
}
.item img {
  width: 300px;
  height: 120px;
}
.bottom {
  font-size: 13px;
}
.loco {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loco img {
  width: 20px;
  border: 50%;
}
</style>
