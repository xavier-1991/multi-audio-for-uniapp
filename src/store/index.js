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
