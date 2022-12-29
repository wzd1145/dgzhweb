<template>
    <div class="myitem" @click="clicklistener(data.detailId)">
        <div class="left">
            <div class="name">{{ data.enterpriseName }}</div>
            <div class="hang">
                <img class="head" src="../assets/img/nan.png">
                <div class="hangright">
                    <div class="pname">{{data.operator}}</div>
                    <div class="tel">{{data.phone.substring(0,3)+'****'+data.phone.substring(9)}}</div>
                </div>
            </div>
            <div class="time"><span>预约时间</span>{{data.applyDate.substring(0,16)}}</div>
        </div>
        <div class="right">
            <div class="right1 color2" v-if="type==1&&data.status==Setting.Status.status_1_1">
                分配拒绝
            </div>
            <div class="right1 color2" v-if="type==1&&data.status==Setting.Status.status_1_2">
                尽调拒绝
            </div>
            <div class="right1 color2" v-if="type==1&&data.status==Setting.Status.status_1_3">
                审核拒绝
            </div>
            <div class="right1 color2" v-if="type==1&&data.status==Setting.Status.status_1_4">
                人行已撤销
            </div>
            <div class="right1" v-if="type==1&&data.status==Setting.Status.status0">
                待分配
            </div>
            <div class="right1" v-if="type==1&&data.status==Setting.Status.status1">
                <div class="btn1" @click.stop="goTel(data.phone)"><!-- <img src="../assets/img/tel.png" align="absmiddle"> -->联系TA</div>
            </div>
            <div class="right1" v-if="type==1&&data.status==Setting.Status.status2">
                等待审核
            </div>
            <div class="right1 color1" v-if="type==1&&data.status==Setting.Status.status3">
                审核通过
                <span style="color:#F5BD02;" v-if="data.remark!=null&&data.remark!=''">复用</span>
            </div>
            <div class="right1 color2" v-if="type==1&&data.status==Setting.Status.status4">
                退回
                <span style="color:#F5BD02;" v-if="data.remark!=null&&data.remark!=''">复用</span>
            </div>
            <div class="right1" v-if="type==1&&data.status==Setting.Status.status9">
                转线下
            </div>





            <div class="right1 color2" v-if="type==2&&data.status==Setting.Status.status_1_1">
                分配拒绝
            </div>
            <div class="right1 color2" v-if="type==2&&data.status==Setting.Status.status_1_2">
                尽调拒绝
            </div>
            <div class="right1 color2" v-if="type==2&&data.status==Setting.Status.status_1_3">
                审核拒绝
            </div>
            <div class="right1 color2" v-if="type==2&&data.status==Setting.Status.status_1_4">
                人行已撤销
            </div>
            <div class="right1" v-if="type==2&&data.status==Setting.Status.status0">
                待分配
                <!-- <div v-if="data.enterpriseName!=undefined&&data.enterpriseName!=null&&data.enterpriseName!='null'&&data.enterpriseName!='' && data.billType!=undefined&&data.billType!=null&&data.billType!='null'&&data.billType!='' && data.accountType!=undefined&&data.accountType!=null&&data.accountType!='null'&&data.accountType!='' && data.bank!=undefined&&data.bank!=null&&data.bank!='null'&&data.bank!='' && data.branch!=undefined&&data.branch!=null&&data.branch!='null'&&data.branch!='' && data.applyDate!=undefined&&data.applyDate!=null&&data.applyDate!='null'&&data.applyDate!='' && data.operator!=undefined&&data.operator!=null&&data.operator!='null'&&data.operator!='' && data.phone!=undefined&&data.phone!=null&&data.phone!='null'&&data.phone!=''" class="btn" @click.stop="goFenpei(data.detailId)">分配</div>
                
                <div v-else class="btn">无法分配</div>

                <div class="btn" @click.stop="goFuyong(data.detailId,data.sourceId)" v-if="data.sourceId!=null&&data.sourceId!=''" style="margin-top:10px;background:#F5BD02;">复用</div>

                <div class="btn" @click.stop="goOutline(data.detailId)" style="margin-top:10px;background:#0CC160;">转线下</div> -->

            </div>
            <div class="right1" v-if="type==2&&data.status==Setting.Status.status1">
                待尽调
                <div class="btn" @click.stop="goFenpei1(data.detailId)">重新分配</div>
            </div>
            <div class="right1" v-if="type==2&&data.status==Setting.Status.status2">
                等待审核
                <div class="btn" @click.stop="goFenpei1(data.detailId)">重新分配</div>
            </div>
            <div class="right1 color1" v-if="type==2&&data.status==Setting.Status.status3">
                审核通过
                <span style="color:#F5BD02;" v-if="data.remark!=null&&data.remark!=''">复用</span>
            </div>
            <div class="right1 color2" v-if="type==2&&data.status==Setting.Status.status4">
                退回
                <span style="color:#F5BD02;" v-if="data.remark!=null&&data.remark!=''">复用</span>
                <div class="btn" @click.stop="goFenpei1(data.detailId)">重新分配</div>
            </div>
            <div class="right1" v-if="type==2&&data.status==Setting.Status.status9">
                转线下
            </div>



            <div class="right1 color2" v-if="type==3&&data.status==Setting.Status.status_1_1">
                分配拒绝
            </div>
            <div class="right1 color2" v-if="type==3&&data.status==Setting.Status.status_1_2">
                尽调拒绝
            </div>
            <div class="right1 color2" v-if="type==3&&data.status==Setting.Status.status_1_3">
                审核拒绝
            </div>
            <div class="right1 color2" v-if="type==3&&data.status==Setting.Status.status_1_4">
                人行已撤销
            </div>
            <div class="right1" v-if="type==3&&data.status==Setting.Status.status0">
                待分配
            </div>
            <div class="right1" v-if="type==3&&data.status==Setting.Status.status1">
                待尽调
            </div>
            <div class="right1" v-if="type==3&&data.status==Setting.Status.status2">
                等待审核
            </div>
            <div class="right1 color1" v-if="type==3&&data.status==Setting.Status.status3">
                审核通过
                <span style="color:#F5BD02;" v-if="data.remark!=null&&data.remark!=''">复用</span>
            </div>
            <div class="right1 color2" v-if="type==3&&data.status==Setting.Status.status4">
                退回
                <span style="color:#F5BD02;" v-if="data.remark!=null&&data.remark!=''">复用</span>
            </div>
            <div class="right1" v-if="type==3&&data.status==Setting.Status.status9">
                转线下
            </div>

        </div>

        <div class="btnk" v-if="type==2&&data.status==Setting.Status.status0">
            <div v-if="data.enterpriseName!=undefined&&data.enterpriseName!=null&&data.enterpriseName!='null'&&data.enterpriseName!='' && data.billType!=undefined&&data.billType!=null&&data.billType!='null'&&data.billType!='' && data.accountType!=undefined&&data.accountType!=null&&data.accountType!='null'&&data.accountType!='' && data.bank!=undefined&&data.bank!=null&&data.bank!='null'&&data.bank!='' && data.branch!=undefined&&data.branch!=null&&data.branch!='null'&&data.branch!='' && data.applyDate!=undefined&&data.applyDate!=null&&data.applyDate!='null'&&data.applyDate!='' && data.operator!=undefined&&data.operator!=null&&data.operator!='null'&&data.operator!='' && data.phone!=undefined&&data.phone!=null&&data.phone!='null'&&data.phone!=''" class="btn" @click.stop="goFenpei(data.detailId)">分配</div>
                
            <div v-else class="btn" style="background:#aaa;">无法分配</div>

            <div v-if="data.enterpriseName!=undefined&&data.enterpriseName!=null&&data.enterpriseName!='null'&&data.enterpriseName!='' && data.billType!=undefined&&data.billType!=null&&data.billType!='null'&&data.billType!='' && data.accountType!=undefined&&data.accountType!=null&&data.accountType!='null'&&data.accountType!='' && data.bank!=undefined&&data.bank!=null&&data.bank!='null'&&data.bank!='' && data.branch!=undefined&&data.branch!=null&&data.branch!='null'&&data.branch!='' && data.applyDate!=undefined&&data.applyDate!=null&&data.applyDate!='null'&&data.applyDate!='' && data.operator!=undefined&&data.operator!=null&&data.operator!='null'&&data.operator!='' && data.phone!=undefined&&data.phone!=null&&data.phone!='null'&&data.phone!=''" class="btn" @click.stop="goOutline(data.detailId)" style="background:#0CC160;">转线下</div>

            <div class="btn" @click.stop="goFuyong(data.detailId,data.sourceId)" v-if="data.sourceId!=null&&data.sourceId!=''&&data.enterpriseName!=undefined&&data.enterpriseName!=null&&data.enterpriseName!='null'&&data.enterpriseName!='' && data.billType!=undefined&&data.billType!=null&&data.billType!='null'&&data.billType!='' && data.accountType!=undefined&&data.accountType!=null&&data.accountType!='null'&&data.accountType!='' && data.bank!=undefined&&data.bank!=null&&data.bank!='null'&&data.bank!='' && data.branch!=undefined&&data.branch!=null&&data.branch!='null'&&data.branch!='' && data.applyDate!=undefined&&data.applyDate!=null&&data.applyDate!='null'&&data.applyDate!='' && data.operator!=undefined&&data.operator!=null&&data.operator!='null'&&data.operator!='' && data.phone!=undefined&&data.phone!=null&&data.phone!='null'&&data.phone!=''" style="background:#F5BD02;">复用</div>
        </div>

    </div>
</template>

<script>
import Setting from "@/setting";
export default {
    name: "item",
    props: ["data","type"/*1尽调员2分配员3审核员*/],
    data() {
        return {
            Setting
        };
    },
    methods: {
        goTel(tel) {
            location.href = 'tel:'+tel
        },
        clicklistener(id) {
            this.$emit("clicklistener", id);
        },
        goFenpei(id) {
            this.$emit("goFenpei", id);
        },
        goFenpei1(id) {
            this.$emit("goFenpei1", id);
        },
        goFuyong(detailId,sourceId) {
            //console.log(detailId,sourceId)
            this.$emit("goFuyong", detailId, sourceId);
        },
        goOutline(detailId) {
            //console.log(detailId,sourceId)
            this.$emit("goOutline", detailId);
        }
    }
};
</script>

<style scoped lang="scss">
    .myitem {
        width: calc(100% - 40px);
        margin-left: 20px;
        /* height: 120px; */
        padding: 13px 18px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0px 0px 6px rgba($color: #ddd, $alpha: 0.6);
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 14px;
        position: relative;

        .left {
            width: calc(100% - 78px);
            height: 100%;

            .name {
                height: 20px;
                line-height: 20px;
                width: calc(100% + 100px);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 15px;
                color: #000;
                font-weight: bold;
            }

            .hang {
                width: 100%;
                height: 40px;
                margin-top: 7px;
                margin-bottom: 7px;

                .head {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    float: left;
                }
                .hangright {
                    float: right;
                    width: calc(100% - 50px);

                    .pname,.tel {
                        font-size: 15px;
                        color: #000;
                        line-height: 20px;
                    }
                }
            }
            .time {
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #777;

                span {
                    background: #E5F3FF;
                    color: #008CFF;
                    padding: 0 5px;
                    margin-right: 7px;
                }
            }
        }

        .right {
            position: absolute;
            right: 0;
            top: 0;
            width: 100px;
            height: 100%;
            height: 120px;
        }
        .right1 {
            width: 100%;
            height: 100%;
            height: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #507FED;
            flex-direction: column;

            img {
                height: 14px;
                margin-right: 5px;
            }

            
        }
        .color1 {
            color: #39B169;
        }
        .color2 {
            color: #FF685A;
        }
        .btnk {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: flex-start;
            height: 35px;
        }
        .btn {
            width: 65px;
            height: 25px;
            background: #36A1E3;
            text-align: center;
            line-height: 25px;
            color: #fff;
            font-size: 13px;
            border-radius: 6px;
            margin-top: 4px;
            margin-left: 5px;
        }

        .btn1 {
            width: 70px;
            height: 25px;
            background: #36A1E3;
            text-align: center;
            line-height: 25px;
            color: #fff;
            font-size: 13px;
            border-radius: 6px;
        }
    }
</style>
