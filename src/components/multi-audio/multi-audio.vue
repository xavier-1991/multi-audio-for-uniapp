<template>
 
<view class="index">
    <view class="audio_wrap" :audioId="audioId">
        <view class="player" :style="{padding:paddingValue}">
            <view class="df ai-center jcc  audio">
                <view class="button pause" :style="'{color:'+buttonColor+'}'" v-if="isPlaying" @click="pause"></view>
                <view class="button play" :style="'{border-color:'+'transparent transparent transparent '+ buttonColor+'}'" v-else @click="play"></view>
                <view class="ml20 fs24 w26">{{curTimeVal}}</view>
                <slider :id="index"
                        :disabled="!isPlaying"
                        :activeColor="activeColor" 
                        backgroundColor="#bfbfbf" 
                        :block-color="blockColor" 
                        block-size="12" 
                        style="width: 360upx;" 
                        step="0.1"
                        @change="bindchange"
                        @changing="bindchanging"
                        :value="curValue" 
                        :max="maxValue"></slider>
                <view class="fs24 w26">{{timeFormat(audioData.duration)}}</view>
                <image v-if="deleteBtn" :id="index" @click="onDelete" class="icon"></image>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import {mapState} from 'vuex';

export default {
     props: {
        audioId: {
            type: String,
            default: ''
        },
        audioData: {
            type: Object,
            default: function () {
                return {}
            }
        },
        deleteBtn: {
            type: Boolean,
            default: false
        },
        activeColor: {
            type: String,
            default: '#3d92e1'
        },
        blockColor: {
            type: String,
            default: '#3d92e1'
        },
        buttonColor: {
            type: String,
            default: '#3d92e1'
        },
        paddingValue: {
            type: String,
            default: '26upx 0 26upx'
        },
        amount: {
            type: Number,
            default: 1
        }
     
    },
    data(){
        return{
            curValue:0,
            maxValue:0,
            isPlaying:false,
            curTimeVal:"00:00",
            audioDuration:0,  //实际音频长度
            innerAudioContext:uni.createInnerAudioContext(),
            timer:null
        }
    },
    computed: {
		...mapState(['currAudioId'])
	},
    created(){      
        this.maxValue=this.audioData.duration; 
        this.innerAudioContext.src=this.audioData.asrc;
        this.innerAudioContext.onError((err)=>{
            console.log(err)
        });      
    },
    destroyed(){
        this.innerAudioContext.stop();
        this.innerAudioContext.destroy();

    },
    watch:{     
        curValue(){
            this.curTimeVal=this.timeFormat(this.curValue);
        },
        currAudioId(newVal,oldVal){//监控当前播放音频组件改变
             if(oldVal===this.audioId){//如果上次正在的播放的音频组件，就是这个组件，则停止播放，并初始化； 
                this.innerAudioContext.stop();
                this.innerAudioContext.offPlay();
                this.innerAudioContext.offEnded();
                this.innerAudioContext.offSeeked();
                clearInterval(this.timer);
                this.isPlaying=false;
                this.curValue=0
            }
            if(newVal!=='none'&&newVal===this.audioId){//如果切换的播放的音频组件就是这个组件，则开始播放该音频
                this.toPlay();
            }
            

        }
    },
    methods: {       
        timeFormat: function (time) {
            if (!time) return '00:00'
            let min = parseInt(time / 60);
            let sec = parseInt(time) % 60;
            if (min < 10) min = '0' + min
            if (sec < 10) sec = '0' + sec
            return (min + ':' + sec)
        },
        play(){
            if(this.currAudioId===this.audioId){
                //如果当前播放的和当前点击播放是一个音频组件，则当前点击的是暂停的录音，故继续播放
                this.toPlay()
            }else{
                //如果当前播放的和当前点击播放是不是一个音频组件，则更新当前播放音频组件id，并触发监控其改变的函数；
                this.$store.commit('setCurrAudioId', this.audioId);
            }
        },
        toPlay(){ 
            this.innerAudioContext.play();
            this.isPlaying=true;
            clearInterval(this.timer);
            this.innerAudioContext.onPlay(()=>{
                console.log('开始播放')
                this.watchCurrentTime();
            })
            this.innerAudioContext.onEnded(()=>{
                console.log('自然播放结束');
                this.innerAudioContext.stop();
                this.innerAudioContext.offPlay();
                this.innerAudioContext.offEnded();
                clearInterval(this.timer);
                this.isPlaying=false;
                this.curValue=0;                  
                this.$store.commit('setCurrAudioId', 'none');              
            })                
        },
        pause(){
            clearInterval(this.timer);
            this.innerAudioContext.offPlay(); 
            this.innerAudioContext.offEnded();
            this.innerAudioContext.offSeeked();          
            this.isPlaying=false;
            this.innerAudioContext.pause();   
        },
        bindchange(e) {
            this.innerAudioContext.offSeeked();
            const stemp = e.detail.value.toFixed(1)*1;   
            this.innerAudioContext.seek(stemp);
            this.innerAudioContext.onSeeked(()=>{               
                console.log('跳转了')
                this.curValue=stemp.toFixed(1)*1;
                this.watchCurrentTime();
                this.innerAudioContext.offSeeked();
            })
        },
        bindchanging(e){
            clearInterval(this.timer);
            this.curValue=e.detail.value.toFixed(1)*1;            
        },
        watchCurrentTime(){
            clearInterval(this.timer);
            console.log('定时器开始');
            this.timer=setInterval(() => {
                //监控当前音频的播放位置，更新滑块位置

                //innerAudioContext.currentTime 此方法不稳定 不能使用
                // this.curValue=this.innerAudioContext.currentTime.toFixed(1);
                this.curValue=(this.curValue+0.1).toFixed(1)*1;
            }, 100);
        },
        onDelete(){
            this.$emit('deleteAudio',this.audioData.asrc);
        }
    }
}
</script>
<style > 
    @import "./multi-audio.css"
</style>
      