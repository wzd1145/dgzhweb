<template>
  <div class="app">
    <mytab class="tab" :lists="tablist" @changeTab="changeTab"></mytab>
    <screenlist
      class="list"
      :moretxt="moretxt"
      :isload="isload"
      @scrolledEnd="scrolledEnd"
    >
      <item
        v-for="item in list"
        type="1"
        :key="item.id"
        :data="item"
        @clicklistener="clickitem"
      ></item>
    </screenlist>
  </div>

  <div class="fenpei" v-if="isVerif" @click="goFenpei">分配</div>
  <div class="verify" v-if="isVerify || isVerif" @click="goVerify">
    我的审核
  </div>
  <div class="question" @click="goQuestion">常见问题</div>

  <loading v-show="showloading"></loading>
</template>
<script>
import mytab from '../../components/mytab.vue';
import screenlist from '../../components/screenlist.vue';
import loading from '../../components/loading.vue';
import item from '../../components/item.vue';
import router from '../../router/router.js';
import Setting from '@/setting';
import watermark from '../../libs/watermark.js';
import { getLists, getTotalJd } from '@/api/content';
import { getDateTime } from '../../libs/utils.js';

export default {
  data() {
    return {
      data: this.$store.state.data,
      //tab相关
      //滚动框相关
      tablist: [],
      moretxt: '加载中...',
      isload: true,
      page: 1,
      pagesize: 10,
      status: 0,
      //项相关
      list: [],
      //加载动画相关
      showloading: false,
    };
  },
  components: {
    mytab,
    screenlist,
    loading,
    item,
    //watermark
  },
  computed: {
    isVerif() {
      //console.log(this.$store.state.userinfo)
      let a = ',' + this.$store.state.userinfo.roleKey.join(',') + ',';
      return a.includes(',DISPATCHER,');
    },
    isVerify() {
      let a = ',' + this.$store.state.userinfo.roleKey.join(',') + ',';
      return a.includes(',AUDITOR,');
    },
  },
  //@clickCount()
  mounted() {
    //设置title
    document.title = '尽调';
    //初始化tab数据
    this.tablist = [
      { status: Setting.Status.status6, name: '待处理', count: 0 },
      { status: Setting.Status.status7, name: '已处理', count: 0 },
      { status: Setting.Status.status8, name: '已完成', count: 0 },
    ];
    //初始化列表
    this.status = this.tablist[0].status;
    this.getData();
    this.getTotalJd();

    if (Setting.hasWatermark) watermark.set(this.$store.state.userinfo.uaap);
  },
  methods: {
    //获取数量
    getTotalJd() {
      getTotalJd({})
        .then((res) => {
          if (res === false) return;
          let r = [];

          this.tablist.forEach((a) => {
            let count = 0;
            res.forEach((b) => {
              //console.log(','+a.status+',',','+b.status+',')
              if ((',' + a.status + ',').includes(',' + b.status + ',')) {
                count += parseInt(b.total);
              }
            });
            a.count = count;
            r.push(a);
          });

          //console.log(r)
          this.tablist = r;
        })
        .catch((res) => {
          console.log(res);
          swal({ text: '连接失败！' });
        });
    },
    //切换tab监听
    changeTab(mystatus) {
      //console.log(mystatus)
      this.status = mystatus;
      this.page = 1;
      this.isload = true;
      this.moretxt = '加载中...';
      this.list = [];
      this.getData();
    },
    //滚动到底部监听
    scrolledEnd() {
      //console.log("滚动到底部啦11");
      this.page++;
      this.getData();
    },
    //点击item监听
    clickitem(id) {
      //console.log('跳转详情',id)
      router.push({ path: '/details', query: { id, type: 1 } });
    },
    //获取列表数据
    getData() {
      //this.isload = false
      //this.showloading = true
      //this.moretxt = '后面没有了'

      if (!this.isload) return;
      this.isload = false;
      this.showloading = true;
      var timestamp = Date.parse(new Date());
      getLists({
        /* endTime: getDateTime(timestamp),
                beginTime: getDateTime(timestamp-86400*15*1000), */
        enterpriseName: '',
        pageNum: this.page,
        pageSize: this.pagesize,
        status: this.status,
      })
        .then((res) => {
          this.showloading = false;
          if (res === false) return;
          this.list = this.list.concat(res);

          if (res == '' || res.length < this.pagesize) {
            this.moretxt = '后面没有了';
          } else {
            this.isload = true;
          }
        })
        .catch((res) => {
          console.log(res);
          swal({ text: '连接失败！' });
          that.showloading = false;
        });
    },
    //跳转分配
    goFenpei() {
      router.push({ path: '/assign' });
    },
    //跳转审核
    goVerify() {
      router.push({ path: '/verify' });
    },
    goQuestion() {
      location.href = 'http://106.58.185.29:12601/dgzhwebtj/#/dypage';
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../assets/index/scss/index.scss';
</style>
