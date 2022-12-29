import store from '../store'
import { getShareConfig } from "@/api/statistics"
import swal from 'sweetalert2'
import {event_views,event_share,event_like,event_ulike} from '@/libs/myevent'

export const clickCount = (...args) => {
	return function (target, key, descriptor) {
		descriptor.value = descriptor.value.before((...arg) => {
            //console.log(...args)
			//console.log(store.state.id)
			//console.log(arg.length)
			if(parseInt(store.state.data.content.status)!=1) return

			event_views(function(){
				let data = store.state.data
				if(data.info.readCount==''||data.info.readCount==null)
				{
					data.info.readCount = 1
				}
				else
				{
					data.info.readCount = parseInt(data.info.readCount)+1
				}
				store.commit('setData',data)
			})
        })
	};
}

export const share = (...args) => {
	return function (target, key, descriptor) {
		descriptor.value = descriptor.value.before((...arg) => {
            //console.log(...args)
			//console.log(store.state.id)
			//console.log(arg.length)
			
			let agentId = store.state.data.content.agentId
			getShareConfig({
				agentId: agentId,
				url: location.href
			})
			.then((res) => {
				wx.agentConfig({
					corpid: res.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
					agentid: res.agentid, // 必填，企业微信的应用id （e.g. 1000247）
					timestamp: res.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.nonceStr, // 必填，生成签名的随机串
					signature: res.signature,// 必填，签名，见附录-JS-SDK使用权限签名算法
					jsApiList: ['onMenuShareAppMessage','hideMenuItems','hideAllNonBaseMenuItem','showMenuItems'], //必填，传入需要使用的接口名称
					success: function(res) {
						
						wx.onMenuShareAppMessage({
							title: store.state.data.content.shareTitle,
							desc: store.state.data.content.shareSummary,
							link: store.state.data.content.shareUrl,
							imgUrl: store.state.data.content.sharePic,
							success: function () {
								swal({text: '分享成功'})
								if(parseInt(store.state.data.content.status)!=1) return
								event_share(()=>{
									store.state.data.info.shareCount = parseInt(store.state.data.info.shareCount)+1
								})
							},
							cancel: function () {
							}
						});

						/* wx.hideMenuItems({
							menuList: ['menuItem:share:wechat','menuItem:copyUrl','menuItem:openWithSafari','menuItem:share:email','menultem:share:timeline'] // 要隐藏的菜单项
						}); */

						wx.hideAllNonBaseMenuItem();

						if(parseInt(store.state.data.content.safe)==0) {
							//表示可对外分享
							wx.showMenuItems({
								menuList: ['menuItem:setFont','menuItem:refresh','menuItem:share:appMessage','menuItem:favorite','menuItem:share:wechat','menuItem:copyUrl'] // 要显示的菜单项
							});
						}
						else if(parseInt(store.state.data.content.safe)==1) {
							//表示不能分享且内容显示水印
							wx.showMenuItems({
								menuList: ['menuItem:setFont','menuItem:refresh','menuItem:favorite'] // 要显示的菜单项
							});
						}
						else if(parseInt(store.state.data.content.safe)==2) {
							//仅在企业内部分享
							wx.showMenuItems({
								menuList: ['menuItem:setFont','menuItem:refresh','menuItem:share:appMessage','menuItem:favorite'] // 要显示的菜单项
							});
						}

						/* history.pushState(null, null, document.URL);
						window.addEventListener('popstate', function () {
							
							if(window.history.state.position<=1)
							{
								wx.closeWindow()
							}
						}); */
					},
					fail: function(res) {
						if(res.errMsg.indexOf('function not exist') > -1){
							swal({text: '版本过低请升级'})
						}
					}
				});
			})
			.catch((res) => {
				//swal({text: res.msg})
			})
        });
	};
}









export const anno = (...args) => {
	return function (target, key, descriptor) {
		let method = descriptor.value;console.log(descriptor);return;
		descriptor.value = function () {
			console.log('before ...', args);
			method.apply(target, arguments);
			console.log('after ...', args);
		}
		return descriptor;
	}
}

export const before = (...args) => {
	return function (target, key, descriptor) {
		descriptor.value = descriptor.value.before((...arg) => {
			console.log(arg[0])
            //console.log(...args)
			//console.log(store.state.id)
        });
	};
}
 
export const after = (...args) => {
	return function (target, key, descriptor) {
		descriptor.value = descriptor.value.after(() => console.log(...args));
	};
}
 
export const around = (...args) => {
	return function (target, key, descriptor) {
		descriptor.value = descriptor.value.around(() => console.log(...args), () => console.log(...args));
	};
}