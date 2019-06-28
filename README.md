## multi-audio-for-uniapp
基于uni-app开发的多音频播放组件，适用于微信小程序。<br /><br />
使用技术:
- uni-app
- vuex

#### 安装
```
npm install
```
#### 运行
```
npm run serve
```

#### 项目介绍
基于uni-app开发的多音频播放组件，适用于微信小程序，使用vuex管理当前播放音频组件的id，可实现开始、暂停、拖动播放、录音预览及删除。可支持组件样式自定义。但也有不足之处，其中删除按钮无法更改颜色需自己替换，因小程序音频播放跳转方法innerAudioContext.seek()在安卓上问题，建议将音频格式统一成wav格式。


#### 配置项
属性 | 类型  | 默认值
---|---|---|---
audioId | String | 无（不能重复）
audioData | Object | {}
deleteBtn | Boolean | false
activeColor | String | #3d92e1
blockColor | String | #3d92e1
buttonColor | String | 3d92e1
paddingValue | String | '26upx 0 26upx'
@deleteAudio | String | 无

##### 页面引入
```
<template>
    <view v-for="(item,index) in audioList" :key="index">
            <multi-audio :audioId="'a'+index"
                   :audioData="item" 
                   deleteBtn="true" @deleteAudio="delAudio"></multi-audio>
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
  }
    
}
```
注意： ==audioId不能重复==

##### vuex配置

```
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        currAudioId: 'none'
	},
	mutations: {
        setCurrAudioId(state,payload){
            state.currAudioId=payload;
		}
	}
})

export default store

```

#### 预览样式

![image]['https://github.com/xavier-1991/multi-audio-for-uniapp/raw/master/src/static/image.png'] 

