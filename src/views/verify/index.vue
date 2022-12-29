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
                type="3"
                :key="item.id"
                :data="item"
                @clicklistener="clickitem"
            ></item>
        </screenlist>
    </div>

    <div class="assignk" v-show="goAssign">
        <div class="kk">
            <div class="title">
                <div class="line"></div>
                本网点
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
                二级行
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
        <div class="btn btn1" @click="submit1">确定分配</div>
        <div class="btn btn2" @click="cancel">取消</div>
    </div>

    <div class="assignk" v-show="goVerify">
        <div class="kk">
            <div class="title">
                <div class="line"></div>
                指定审核人员
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
    getListsSh,
    allocate,
    getShUser,
    allocatesh,
    getTotalSh } from "@/api/content";
import {getDateTime} from "../../libs/utils.js";

export default {
    data() {
        return {
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
        document.title = "审核";
        //初始化tab数据
        this.tablist = [
            { status: Setting.Status.status2, name: "待审核", count: 0 },
            { status: Setting.Status.status8, name: "完成", count: 0 },
        ];
        //初始化列表
        this.status = this.tablist[0].status
        this.getData()

        this.getTotalSh()

        if(Setting.hasWatermark)
        watermark.set(this.$store.state.userinfo.uaap)
    },
    methods: {
        //获取数量
        getTotalSh() {
            getTotalSh({})
            .then((res) => {
                if(res===false) return;
                let r = []

                this.tablist.forEach(a => {
                    let count = 0;
                    res.forEach(b => {
                        console.log(','+a.status+',',','+b.status+',')
                        if((','+a.status+',').includes(','+b.status+','))
                        {
                            count += parseInt(b.total)
                        }
                    });
                    a.count = count;
                    r.push(a);
                });

                console.log(r)
                this.tablist = r
            })
            .catch((res) => {
                console.log(res)
                swal({ text: "连接失败！" });
            });
        },
        //切换tab监听
        changeTab(mystatus) {
            console.log(mystatus);
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
            router.push({path:'/details', query:{id,type:3} })
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
        //获取列表数据
        getData() {
            if (!this.isload) return;
            this.isload = false;
            this.showloading = true
            var timestamp = Date.parse(new Date());
            getListsSh({
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
                this.list = this.list.concat(res);
                

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
    },
};
</script>
<style scoped lang="scss">
@import "../../assets/verify/scss/index.scss";
</style>
