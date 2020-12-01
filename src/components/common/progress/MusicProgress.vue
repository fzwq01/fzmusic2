<template>
  <div class="MusicProgress" @click="setProClick($event)">
      <div class="pro_line" :style="{width:proLine + 'px'}"></div>
      <!-- 进度条加载中 -->
      <div 
        class="pro_load"
        ref="load"
        :style="{transform:'translateX(' + proLoad +'px)'}"
      >

      </div>
  </div>
</template>

<script>
export default {
    name:'MusicProgress',
    data(){
        return{
            proLine:0,//进度条初始为0
            proLoad:0,//加载
            scale:0,
        }
    },
    methods:{
        setProClick(e){
            // 鼠标点击进度条长度
            let distance = e.clientX - this.$el.offsetLeft;
            this.setPro(distance);
            this.scale = (this.proLine/this.$el.offsetWidth).toFixed(2)
            // console.log((this.proLine/this.$el.offsetWidth).toFixed(2))
            this.$emit('childclick',this.scale);
        },
        setPro(changeX){
            this.proLine = changeX;
            this.proLoad = changeX;
            console.log(this.proLoad)
            // console.log(changeX)
        },
        // 通过比例设置进度条进度
        setProgress(scale){
            this.proLine = scale * this.$el.offsetWidth;
            this.proLoad = scale * this.$el.offsetWidth;
        }
    }
}
</script>

<style lang="scss" scoped>
.MusicProgress{
    width: 100%;
    height: 3px;
    border-radius: 2px;
    cursor: pointer;
    background: #454546;
    position: relative;
    .pro_line{
        width: 50px;
        height: 100%;
        background: #b82525;
    }
    .pro_load{
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        transform: translateX(50px);
        top: 0px;
        bottom: 0px;
        margin: auto;
    }
}
</style>