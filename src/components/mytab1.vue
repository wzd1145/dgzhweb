<template>
    <div class="tab">
        <div class="tabk">
            <div class="tabline anim" :style="'left: calc('+lineleft+');width: calc(33.33%)'"></div>
            <div
                class="tabitem anim"
                :class="{ tabitema: mystatus == item.status }"
                v-for="(item, index) in lists"
                :key="item.status"
                @click="change(item.status,index)"
				:style="'width: calc(33.33%)'"
            >
                {{ item.name }}
            </div>
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
			return '33.33% * '+this.index;
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
    padding: 10px;
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
    color: #fff;
	position: relative;
}
.tabitema {
    color: #3774C6;
}
.anim {
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -ms-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
}
.tabline {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    margin: auto;
    border-radius: 5px;
}
</style>
