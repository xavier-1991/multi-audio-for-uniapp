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

![image][link1] 

[link1]:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAACOCAYAAADzTfnAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAApzSURBVHhe7d3dbxzVGcfx/cdog0R70XYbtTegIkTaSr2gReoLqrBc1PYKqRdVIQTKGhqCTFtKcRsoho0cmzTQxoIEFLnEvCR4vetd75v/hafzzO7MjjdnH48365zj3e9P+ii7M2eOZMbzm/HsCwUhhBASbChpQggJOJQ0IYQEHEqaEEICDiVNCCEBJ1dJ7+3tAQCOiBVKGgA8s0JJA4BnVihpAPDMCiUNAJ5ZoaQBwDMrlDQAeGaFkgYAz6xQ0gDgmRVKGgA8s0JJA4BnVihpAPDMCiUNAJ5ZoaQBwDMrlDQAeGaFkgYAz6xQ0gDgmZWgSvqxpR354Iu2c92s6Xa7Tq6xAI43K0GV9D1PV2JPvlOXW/XZLCQt4k6nI+12W1qt1j66TNdR1sB0sRJkSav7zlSkdHnXOW5aaflqETebTWk0GlKr1aRarcb0sS7TdTqGogamh5VgSzpx/9mqLF1tOsdPk6SgtYi1lM+sbMlD57bk3mcqMX2sy3SdjqGogelhJfiSTjzyak0u3ZjO+9XZgv7wxnZcyK7/BkrX6RiKGpgeVo5NSSeeeLMuG5WOc/v8yjJfKEhBnSzJZrJ8oyTFZPlceWibnvJcf32hKKWNZPmI+XLS+8x6G0Ovkq2CTugYHavb6LauOYHpN+njuC/efl7K2WVHzMqxK+nEUxcb0mi75zmI7qDiwubQ400pnSzI/AUdk32ccWF+8MuQeeyeb2jbEbJX0Xo7w/WzuuhYrqYxyyZ9HPfW6zZFKZ6kpJ1cZWQplrZl8cph71fr2TezA/SsqTsp+TdZrjtv6CysvwiDHd7bmaWNEfMlzw+gBavv3NAXBvNcRSd0rG6j21LSmD2TPo57zzcXooJeKEfLKGknVxnlcWqxJm9fbznnvF20c/eVaP+57tzszkye67/9P4nKc/v/NOo9HzFf+tyWlLTevtAXCF0/n8uJ01uyvLwsKysrsrq6Kmtra0Dw1tfXncfB4U36OO6PjefU4qaknVxllMeRlnQ6jpIG7pS3kk7HGcdxemVOSY/kKiPLxG536E7Uf7M7Pfozafje8u1/Juk8I+ZLnh+A2x3AOCZ7HP91odh/ITFrf5kfJSsz+8JhspP08eAFh2Sn6OPsjuzL3t/Sx/1fBvd8me0MWrC8cAgc3qSP48GYXnFzJe3gKqNhE38LXvaqV8/C/eVp0cbLBmdU/WXonWWzO3HEfDnxFjxgHJM+jhOU9EiuQkrwYZYeXceHWYDpYiX4kuZj4RU+Fg5MOSvBljRfsMQXLAGzwkqQJc1XlfJVpcAssRJUSfOl/wNaxC6usQCONytBlTQAzCIrlDQAeGaFkgYAz6xQ0gDgmRVKGgA8s0JJA4BnVihpAPDMCiUNAJ5ZoaQBwDMrlDQAeGaFkgYAz6xQ0gDgmRVKGgA8s0JJA4BnVihpAPDMCiUNAJ5ZoaQBwDMruUqaEEKIn1DShBAScChpQggJOJQ0IYQEHEqaEEICDiVNCCEBh5ImhJCAQ0kTQkjAoaQJISTgUNKEEBJwKGlCCAk4lDQhhAQcSpoQQgIOJU0IIQGHkiaEkIBDSRNCSMChpAkhJOBQ0oQQEnAoaUIICTiUNCGEBBxKmhBCAg4lTQghAYeSJoSQgENJE0JIwKGkCSEk4FDShBAScHKV9N7eHgDgiFihpAHAMyuUNAB4ZoWSBgDPrFDSAOCZFUoaADyzQkkDgGdWKGkA8MwKJQ0AnlmhpAHAMyuUNAB4ZoWSBgDPrFDSAOCZFUoaADyzQkkDgGdWKGkA8MwKJQ0AkW6k3dmTVt9GpSO/X2nI15+rytee3U498FJN3r7eSsfpNrqta868rBxpST+2tCMffNF2rps13W7XyTUWgH/bu105f60lj5+vyy//OfC7Cw25erPj3GZcVo60pO95uhJ78p263KrPZiFpEXc6HWm329JqRWffDF2m6yhrwK83Pm7J2feb8sLl3VTp37ty5t3d6GpaNVJ/uLgrz10ajIu915Sz/2k6587Dyl0paXXfmYqUoh/GNW5aaflqETebTWk0GlKr1aRarcb0sS7TdTqGogb8eXixJt9e2JZvPD++b5W2nXPnYeWulXTi/rNVWbo6/hnnuEgKWotYS/nMypY8dG5L7n2mEtPHukzX6RiKGvDnv5+15bsvVuXUYjW+gtbbHHn8Mbqifjja5nvnqrL2Scs5dx5W7npJJx55tSaXbkzn/epsQX94YzsuZNd/A6XrdAxFDfjT7e7JAy9V5Wev78j7n0bHbmsvl8ubbfnp33fkB6/UpB3N4Zo7DyveSjrxxJv1+FVU1/aHsblQlEKhEJu/MFhenustKxSKUtrYv01soyTF/naFuXK6fNR8eeh9Zr2NoVfJVkEndIyO1W10W9ecwCzweRxrSf8ifrND7xhstvfk02p335sfKo2uXLvZkS/7r7Fd+bwtP4+2+eGfa+mYcVjxXtKJpy42pBH9R3HNc6B4B81LefjxhXkpnCzJ5vDj1KaUTiY7L/N41Hw5ZK+i9XaG62d10bFcTWOmTfo43itLaWGzN0bnu227/YZLerPaiV8g/FV0Ibnb7h2TeqtW3+2x9kmvuGeqpFWxtC2LVw5/v1rPlsVkZ0T0rKs7Kfm3t1x33tBZeHjH6S9AdBYeNV+6nUELVt+5oS8M5rmKTuhY3Ua3paQxiyZ9HKfrRy0bMlzS1251ZO78Tny/udbsxu+F1tL+zotV+Uf/dbWZK+nEqcXem8Vdc7rozs2WaPK8PLd/ZybPdafHO0x3bnbH9Z+Pmi8dZ0hKWm9f6AuErp/P5cTpLVleXpaVlRVZXV2VtbU1IHjr6+vO42Ackz6OkzmGb4GM4irpx4dK+tl3o5J+YTt98wMl7ZjT5bA7N3lOSQN3xmdJJ8+tkk45b5PsR0nnMLnbHYMz7WCn659JQ/eWdWcO/Zmk84yaL93OwO0OYDyTPo7T9THHdkMo6QPc8QuHyU7Sx9kXHJIzqvNMmr2/pY/7vwyj5stBC5YXDoExTPo4jsam5Z6de4Thkr7+ZUd++1Zdvv9KTeqt3jH5p/d25cGXa/LGR72/9GeipCf/Frz9V73xfat4+aBo03tZ+jz+ZeiNyZ59R82XB2/BA8Yz2eO4V9h5j+Phktavsli62oqvnvVLlHSZfrZDPyq+/nlvzFSXNB9m6dF1fJgF8G+4pPOYypLmY+EVPhYOBGiskv4sKunXp6Sk+YIlvmAJCNmDL1fl0ddq8QdV9JOFeVz8X0t+Em3zo78c85Lmq0r5qlIgdPpJQv2SpUdf25Ff/6uey4//thNv85u36s4587JypCXNl/4PaBG7uMYCuPs+uqlvuavLN5/fTm9LfvX04G5A4iuRE/31+vWk+uaHj2/d2Qv+Vo60pAHguND3Qc/c/z4LAHAwK5Q0AHhmhZIGAM+sUNIA4JkVShoAPLNCSQOAZ1YoaQDwzAolDQCeWaGkAcAzK5Q0AHhmhZIGAM+sUNIA4JkVShoAPLNCSQOAZ1YoaQDwzAolDQCeWclV0oQQQvyEkiaEkIBDSRNCSMChpAkhJOBQ0oQQEnAoaUIICTiUNCGEBBuR/wMM1DZmti6pxwAAAABJRU5ErkJggg==