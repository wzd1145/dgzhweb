import { createStore } from 'vuex'

export default createStore({
	state: {
		id: '',
		data: '',
		userinfo: ''
	},
	mutations: {
		setId(state, _id) {
			state.id = _id
		},
		setData(state, _data) {
			state.data = _data
		},
		setUserinfo(state, _userinfo) {
			state.userinfo = _userinfo
		}
	},
	getters: {
		//messageUnreadCount: state => state.messageUnreadList.length,
		//messageReadedCount: state => state.messageReadedList.length,
		//messageTrashCount: state => state.messageTrashList.length
	},
	actions: {
		// 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
		getUnreadMessageCount({ state, commit }) {
			// getUnreadCount().then(res => {
			//   const { data } = res
			//   commit('setMessageCount', data)
			// })
		}
	}
})