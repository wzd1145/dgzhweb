<template>
    <div class="app">
        <mytab class="tab" :lists="tablist" @changeTab="changeTab"></mytab>

        <div class="searchk">
            <img src="../../assets/assign/img/search.png" />
            <input
                type="text"
                placeholder="输入公司名称搜索"
                ref="searchinput"
                @blur="search"
            />
        </div>

        <screenlist
            class="list"
            :moretxt="moretxt"
            :isload="isload"
            @scrolledEnd="scrolledEnd"
        >
            <item
                v-for="item in list"
                type="2"
                :key="item.id"
                :data="item"
                @clicklistener="clickitem"
                @goFenpei="goFenpei"
                @goFenpei1="goFenpei1"
                @goFuyong="goFuyong"
                @goOutline="goOutline"
            ></item>
        </screenlist>
    </div>

    <div class="assignk" v-show="goAssign">
        <div class="kk">
            <div class="title">
                <div class="line"></div>
                指定本网点尽调人员
            </div>

            <div
                class="item"
                :class="{ itema: ckuaap == item.userId }"
                v-for="item in staffPotList"
                :key="item.uaap"
                @click="ckpot(item.userId)"
            >
                <img
                    class="head"
                    src="../../assets/assign/img/nan.png"
                    align="absmiddle"
                />
                {{ item.userName }}<span>({{ item.djdTotal }})</span>
                <img class="gou" src="../../assets/assign/img/gou.png" />
            </div>
            <div class="nomore" v-if="staffPotList.length == 0">暂无员工</div>

            <div class="title">
                <div class="line"></div>
                指定二级行尽调人员
            </div>

            <div
                class="item"
                :class="{ itema: ckuaap == item.userId }"
                v-for="item in staffBranchList"
                :key="item.uaap"
                @click="ckpot(item.userId)"
            >
                <img
                    class="head"
                    src="../../assets/assign/img/nan.png"
                    align="absmiddle"
                />
                {{ item.userName }}<span>({{ item.djdTotal }})</span>
                <img class="gou" src="../../assets/assign/img/gou.png" />
            </div>
            <div class="nomore" v-if="staffBranchList.length == 0">
                暂无员工
            </div>
        </div>
        <div class="btn btn1" @click="submit1">下一步</div>
        <div class="btn btn2" @click="cancel">取消</div>
    </div>

    <div class="assignk" v-show="goVerify">
        <div class="kk">
            <div class="title">
                <div class="line"></div>
                指定本网点审核人员
            </div>

            <div
                class="item"
                :class="{ itema: ckVerifyuaap == item.userId }"
                v-for="item in staffVerifyList"
                :key="item.uaap"
                @click="ckVerify(item.userId)"
            >
                <img
                    class="head"
                    src="../../assets/assign/img/nan.png"
                    align="absmiddle"
                />
                {{ item.userName }}<span>({{ item.dshTotal }})</span>
                <img class="gou" src="../../assets/assign/img/gou.png" />
            </div>
            
        </div>
        <div class="btn btn1" @click="submit2">提交</div>
        <div class="btn btn2" @click="cancel1">取消</div>
    </div>

    <div class="jujuepop" v-show="show_refenpei" @click="()=>{show_refenpei=false}">
        <div class="jujuek" @click.stop="">
            <div class="jujueh">
                <img src="../../assets/details/img/xie.png" align="absmiddle">
                重新分配原因
            </div>
            <img class="cc" src="../../assets/details/img/cc.png" @click="()=>{show_refenpei=false}">
            <div class="jujuec">
                <textarea class="sm" v-model="proxyName" name="" id="" placeholder="请填写重新分配的原因（200字）" maxlength="200"></textarea>
                <div class="txt"><span>*</span> 重新分配将会清空尽调数据，请谨慎操作！</div>

                <div class="btn1" @click="reFenpei">确定</div>
            </div>
        </div>
    </div>

    <loading v-show="showloading"></loading>
</template>
<script>
import mytab from "../../components/mytab.vue";
import screenlist from "../../components/screenlist.vue";
import loading from "../../components/loading.vue";
import item from "../../components/item.vue";
import router from '../../router/router.js'
import Setting from "@/setting";
import swal from "sweetalert2";
import watermark from "../../libs/watermark.js";
import { 
    getListsFp,
    getJdUser,
    allocate,
    getShUser,
    allocatesh,
    save,
    getTotalFp,
    jdcopy,
    offline } from "@/api/content";
import {getDateTime} from "../../libs/utils.js";

export default {
    data() {
        return {
            proxyName: '',
            refenpeiid: '',
            data: this.$store.state.data,
            //tab相关
            tablist: [],
            //滚动框相关
            moretxt: "加载中...",
            isload: true,
            page: 1,
            pagesize: 10,
            status: 0,
            keyword: '',
            //项相关
            list: [],
            //加载动画相关
            showloading: false,
            //分配相关
            staffPotList: [],
            staffBranchList: [],
            ckuaap: "",
            goAssign: false,
            assign_id: 0,
            //审核相关
            goVerify:false,
            staffVerifyList: [],
            ckVerifyuaap: "",
            show_refenpei: false
        };
    },
    components: {
        mytab,
        screenlist,
        loading,
        item,
    },
    computed: {},
    //@clickCount()
    mounted() {
        //设置title
        document.title = "分配";
        //初始化tab数据
        this.tablist = [
            { status: Setting.Status.status0, name: "待分配", count: 0 },
            { status: Setting.Status.status5, name: "全部", count: 0 },
            { status: Setting.Status.status1, name: "待尽调", count: 0 },
            { status: Setting.Status.status2, name: "待审核", count: 0 },
            { status: Setting.Status.status8, name: "完成", count: 0 },
        ];
        //初始化列表
        this.status = this.tablist[0].status
        this.getData()
        this.getTotalFp()

        /* //初始化网点尽调员
        this.getStaffByPot();
        //初始化二级行尽调员
        this.getStaffByBranch(); */

        if(Setting.hasWatermark)
        watermark.set(this.$store.state.userinfo.uaap)
    },
    methods: {
        reFenpei() {
            if(this.proxyName.length<=0)
            {
                swal({ text: "请填写重新分配的原因" });
                return;
            }
            this.getJdlist(this.refenpeiid);
            this.show_refenpei = false;
            this.goAssign = true;
            this.assign_id = this.refenpeiid;
        },
        //获取数量
        getTotalFp() {
            getTotalFp({})
            .then((res) => {
                if(res===false) return;
                let r = []

                this.tablist.forEach(a => {
                    let count = 0;
                    res.forEach(b => {
                        //console.log(','+a.status+',',','+b.status+',')
                        if((','+a.status+',').includes(','+b.status+','))
                        {
                            count += parseInt(b.total)
                        }
                    });
                    a.count = count;
                    r.push(a);
                });

                //console.log(r)
                this.tablist = r
            })
            .catch((res) => {
                console.log(res)
                swal({ text: "连接失败！" });
            });
        },
        //获取尽调员
        getJdlist(id) {
            this.showloading = true
            getJdUser({
                detailId: id
            })
            .then((res) => {
                this.showloading = false
                if(res===false) return;
                
                this.staffBranchList = res.branchUser
                this.staffPotList = res.netUser
                
            })
            .catch((res) => {
                console.log(res)
                swal({ text: "连接失败！" });
                that.showloading = false
            });
        },
        //切换tab监听
        changeTab(mystatus) {
            //console.log(mystatus);
            this.status = mystatus
            this.page = 1
            this.isload = true
            this.moretxt = '加载中...'
            this.list = []
            this.getData()
        },
        //滚动到底部监听
        scrolledEnd() {
            this.page++
            this.getData()
        },
        //点击item监听
        clickitem(id) {
            //console.log("跳转详情", id);
            router.push({path:'/details', query:{id,type:2} })
        },
        //搜索
        search() {
            let keyword = this.$refs.searchinput.value;
            //console.log(keyword);
            this.keyword = keyword
            this.page = 1
            this.isload = true
            this.moretxt = '加载中...'
            this.list = []
            this.getData()
        },
        //分配
        goFenpei(id) {
            //console.log(id);
            this.getJdlist(id);
            this.goAssign = true;
            this.assign_id = id;
        },
        //复用
        goFuyong(detailId, sourceId) {
            let that = this
            swal(
                {
                    text: "复用将直接恢复之前的尽调信息和状态，是否确认复用？",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    cancelButtonColor: "#ccc",
                }).then(
                function (dismiss) {
                    if(dismiss.value===true)
                    {
                        that.showloading = true
                        jdcopy({
                            targetId: detailId,
                            sourceId
                        }).then((res) => {
                            that.showloading = false
                            if(res===false) return;
                            
                            swal(
                                {
                                    text: "复用成功",
                                }).then(
                                function (dismiss) {
                                    if(dismiss.value===true)
                                    {
                                        that.page = 1
                                        that.isload = true
                                        that.moretxt = '加载中...'
                                        that.list = []
                                        that.getData()
                                    }
                                }
                            );
                        })
                        .catch((res) => {
                            console.log(res)
                            swal({ text: "连接失败！" });
                            that.showloading = false
                        });
                    }
                }
            );
        },
        //转线下
        goOutline(detailId) {
            let that = this
            swal(
                {
                    text: "是否确认转线下？",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    cancelButtonColor: "#ccc",
                }).then(
                function (dismiss) {
                    if(dismiss.value===true)
                    {
                        that.showloading = true
                        offline({
                            detailId: detailId
                        }).then((res) => {
                            that.showloading = false
                            if(res===false) return;
                            
                            swal(
                                {
                                    text: "操作成功",
                                }).then(
                                function (dismiss) {
                                    if(dismiss.value===true)
                                    {
                                        that.page = 1
                                        that.isload = true
                                        that.moretxt = '加载中...'
                                        that.list = []
                                        that.getData()
                                    }
                                }
                            );
                        })
                        .catch((res) => {
                            console.log(res)
                            swal({ text: "连接失败！" });
                            that.showloading = false
                        });
                    }
                }
            );
        },
        //重新分配
        goFenpei1(id) {
            //console.log(id);
            /* this.getJdlist(id);
            this.goAssign = true;
            this.assign_id = id; */
            this.show_refenpei = true
            this.refenpeiid = id
        },
        //选择分配员
        ckpot(uaap) {
            //console.log(uaap)
            this.ckuaap = uaap;
        },
        //取消分配
        cancel() {
            this.goAssign = false;
            this.assign_id = 0;
            this.ckuaap = "";
        },
        //选择审核员
        ckVerify(uaap) {
            this.ckVerifyuaap = uaap;
        },
        //取消分配审核员
        cancel1() {
            this.goVerify = false;
            this.assign_id = 0;
            this.ckVerifyuaap = "";
        },
        //确定分配
        submit1() {
            let that = this;

            if (this.ckuaap == "") {
                swal({ text: "请选择员工！" });
                return;
            }
            console.log(this.assign_id);
            console.log(this.ckuaap);
            
            /* swal(
                {
                    text: "是否确认分配？",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    cancelButtonColor: "#ccc",
                }).then(
                function (dismiss) {
                    if(dismiss.value===true)
                    { */
                        that.showloading = true
                        allocate({
                            detailId: that.assign_id,
                            userId: that.ckuaap,
                            proxyName: that.proxyName
                        })
                        .then((res) => {
                            that.showloading = false
                            if(res===false) return;
                            that.goAssign = false;
                            //that.assign_id = 0
                            that.ckuaap = "";

                            that.getStaffByVerify()
                            that.goVerify = true;
                            
                        })
                        .catch((res) => {
                            console.log(res)
                            swal({ text: "连接失败！" });
                            that.showloading = false
                        });
                    /* }
                }
            ); */
        },
        //确定分配审核员
        submit2() {
            let that = this;

            if (this.ckVerifyuaap == "") {
                swal({ text: "请选择员工！" });
                return;
            }
            console.log(this.assign_id);
            console.log(this.ckVerifyuaap);

            swal(
                {
                    text: "是否确认分配？",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    cancelButtonColor: "#ccc",
                }).then(
                function (dismiss) {
                    if(dismiss.value===true)
                    {
                        that.showloading = true
                        allocatesh({
                            detailId: that.assign_id,
                            userId: that.ckVerifyuaap
                        })
                        .then((res) => {
                            that.showloading = false
                            if(res===false) return;

                            swal(
                                {
                                    text: "分配成功",
                                }).then(
                                function (dismiss) {
                                    if(dismiss.value===true)
                                    {
                                        that.goVerify = false;
                                        that.assign_id = 0
                                        that.ckVerifyuaap = "";

                                        that.page = 1
                                        that.isload = true
                                        that.moretxt = '加载中...'
                                        that.list = []
                                        that.getData()
                                    }
                                }
                            );
                        })
                        .catch((res) => {
                            console.log(res)
                            swal({ text: "连接失败！" });
                            that.showloading = false
                        });
                    }
                }
            );
        },
        //获取列表数据
        getData() {
            if (!this.isload) return;
            this.isload = false;
            this.showloading = true
            var timestamp = Date.parse(new Date());
            getListsFp({
                /* endTime: getDateTime(timestamp),
                beginTime: getDateTime(timestamp-86400*15*1000), */
                enterpriseName: '',
                pageNum: this.page,
                pageSize: this.pagesize,
                status: this.status,
                enterpriseName: this.keyword
            })
            .then((res) => {
                
                this.showloading = false
                if(res===false) return;
                if(res!=undefined&&res!=null&&res!=''&&res.length>0)
                {
                    this.list = this.list.concat(res);
                }

                if(res==''||res.length<this.pagesize)
                {
                    this.moretxt = '后面没有了'
                }
                else {
                    this.isload = true
                }
            })
            .catch((res) => {
                console.log(res)
                swal({ text: "连接失败！" });
                that.showloading = false
            });
        },
        /* //获取网点尽调员
        getStaffByPot() {
            //this.showloading = true
            let data = [
                { uaap: "pengruijie.yn1", name: "张山", count: 3 },
                { uaap: "pengruijie.yn2", name: "张山", count: 4 },
                { uaap: "pengruijie.yn3", name: "张山", count: 5 },
                { uaap: "pengruijie.yn4", name: "张山", count: 6 },
            ];
            data = [];
            this.staffPotList = data;
        },
        //获取二级行尽调员
        getStaffByBranch() {
            //this.showloading = true
            let data = [
                { uaap: "pengruijie.yn5", name: "张寺", count: 3 },
                { uaap: "pengruijie.yn6", name: "张寺", count: 4 },
                { uaap: "pengruijie.yn7", name: "张寺", count: 5 },
                { uaap: "pengruijie.yn8", name: "张寺", count: 6 },
            ];
            this.staffBranchList = data;
        }, */
        //获取审核员
        getStaffByVerify() {
            //this.showloading = true
            /* let data = [
                { uaap: "pengruijie.yn5", name: "张寺", count: 3 },
                { uaap: "pengruijie.yn6", name: "张寺", count: 4 },
                { uaap: "pengruijie.yn7", name: "张寺", count: 5 },
                { uaap: "pengruijie.yn8", name: "张寺", count: 6 },
            ];
            this.staffVerifyList = data; */
            this.showloading = true
            getShUser({
                detailId: this.assign_id
            })
            .then((res) => {
                this.showloading = false
                if(res===false) return;
                this.staffVerifyList = res.netUser
                
            })
            .catch((res) => {
                console.log(res)
                swal({ text: "连接失败！" });
                that.showloading = false
            });
        },
    },
};
</script>
<style scoped lang="scss">
@import "../../assets/assign/scss/index.scss";
</style>
