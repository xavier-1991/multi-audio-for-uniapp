<template>
  <view style="padding:0 30upx;">
    <view v-for="(item,index) in audioList"
          :key="index">
      <multi-audio :audioId="'a'+index"
                   :audioData="item"></multi-audio>
    </view>
    <view v-for="(item,index) in audioList"
          :key="index">
      <multi-audio :audioId="'a'+index"
                   :audioData="item" deleteBtn="true" @deleteAudio="delAudio"></multi-audio>
    </view>
  </view>

</template>

<script>
import multiAudio from "../../components/multi-audio/multi-audio";
export default {
  data() {
    return {
      audioList: [
        {
          duration: 3,
          asrc:
            "https://fapptest.chinayzyx.com/upload/20190627/4898aeac-76e9-4bfe-adf1-98334fabdd97.aac"
        },
        {
          duration: 4,
          asrc:
            "https://fapptest.chinayzyx.com/upload/20190627/a0e4afbf-0d25-4f7b-ba2a-a94d8be86966.aac"
        }
      ]
    };
  },
    components: {
    "multi-audio":multiAudio
  },
  onLoad() {},
  methods: {
      delAudio(e){
          //删除音频
          console.log(e)
      }
  }
};
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
