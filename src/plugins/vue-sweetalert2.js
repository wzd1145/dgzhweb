import swal from 'sweetalert2'
export default {
    install: (Vue) => {
        // sweetalert2 的设置默认配置的方法
        swal.setDefaults({
            type: '',
            showCancelButton: false,
            confirmButtonText: '确定',
            confirmButtonColor: '4286E0',
            cancelButtonColor: 'rgb(193,193,193)'
        })
        // 添加全局方法
        Vue.swal = swal
        // 添加实例方法
        //Vue.prototype.$swal = swal
        Vue.config.globalProperties.$swal = swal
    }
}