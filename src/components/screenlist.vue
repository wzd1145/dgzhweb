<template>
    <div class="mylistk">
        <div class="mylist" @scroll="scroll">
            <div class="mycontent">
                <slot></slot>
            </div>
            <div class="mymore">{{moretxt}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "screenlist",
    props: ['moretxt','isload'],
    data() {
        return {
            
        };
    },
    computed: {},
    mounted() {
        //console.log(this.isload)
    },
    methods: {
        scroll(e) {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (scrollTop + clientHeight === scrollHeight&&this.isload) {
                //this.isload = false
                //console.log("滚动到底部啦");
                this.$emit("scrolledEnd");
            }
        }
    },
};
</script>

<style scoped>
.mylistk {
    overflow: hidden;
}
.mylist {
    width: calc(100% + 20px);
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.mycontent {
    width: calc(100% - 20px);
}
.mymore {
    width: calc(100% - 20px);
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    color: #999;
}
</style>
