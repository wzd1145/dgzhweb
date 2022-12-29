<template>
    <div class="tab" :style="'padding: 0 '+(len > 3 ? 0 : 20)+'px;'">
        <div class="tabk">
            <div
                class="tabitem anim"
                :class="{ tabitema: mystatus == item.status }"
                v-for="(item, index) in lists"
                :key="item.status"
                @click="change(item.status,index)"
				:style="'width: calc(100% / '+len+')'"
            >
                {{ item.name }}
				<div class="tabcount" v-if="item.count>0">{{item.count}}</div>
            </div>
            <div class="tabline anim" :style="'left: calc('+lineleft+')'"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mytab",
    props: ["lists"],
    data() {
        return {
            mystatus: 0,
			len: 0,
			index: 0
        };
    },
    computed: {
		len() {
			//console.log(this.lists.length > 3 ? 0 : 20)
			return this.lists.length;
		},
		lineleft() {
			return '(100% / '+this.lists.length+' - 16px) / 2 + 100% / '+this.lists.length+' * '+this.index;
		}
	},
    mounted() {
        if (this.lists.length > 0) {
            this.mystatus = this.lists[0].status;
        } else {
            this.mystatus = 0;
        }
    },
    methods: {
        change(mystatus,index) {
			this.index = index;
            this.mystatus = mystatus;
            this.$emit("changeTab", mystatus);
        },
    },
};
</script>

<style scoped>
.tab {
    min-height: 40px;
	box-sizing: border-box;
}
.tabk {
    width: 100%;
    height: 100%;
    position: relative;
}
.tabitem {
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
    color: #6a6969;
	position: relative;
}
.tabitema {
    color: #000000;
    font-weight: bold;
}
.anim {
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -ms-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
}
.tabline {
    width: 16px;
    height: 3px;
    background: #0065c2;
    position: absolute;
    top: 0;
    bottom: -30px;
    margin: auto;
}
.tabcount {
	height: 18px;
	line-height: 18px;
	background: #FF685A;
	color: #fff;
	font-size: 12px;
	text-align: center;
	padding: 0px 5px;
	border-top-left-radius: 9px;
	border-top-right-radius: 9px;
	border-bottom-right-radius: 9px;
	transform: scale(.75, .75);
    transform-origin: center top;
	margin-top: -6px;
}
</style>
