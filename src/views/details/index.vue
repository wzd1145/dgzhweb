<template>
  <div class="app">
    <van-popup v-model:show="show" position="top" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="请选择日期"
        @confirm="confirm1"
        @cancel="onCancel"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
    <mytab1 class="tab" :lists="tablist" @changeTab="changeTab"></mytab1>

    <div class="list">
      <div
        class="listk anim"
        :style="'margin-left:calc(-100% * ' + tabindex + ')'"
      >
        <div class="page">
          <div class="bkk">
            <div class="hang">
              <div class="name">当前状态</div>
              <div class="value">
                <div
                  class="color2"
                  v-if="data.status == Setting.Status.status_1_1"
                >
                  分配拒绝{{
                    parseInt(data.contactStatus) == 1 &&
                    parseInt(data.pushStatus) == 0
                      ? "(申请中)"
                      : parseInt(data.pushStatus) == 1
                      ? "(拒绝成功)"
                      : parseInt(data.pushStatus) == 2
                      ? "(拒绝失败)"
                      : ""
                  }}
                </div>
                <div
                  class="color2"
                  v-if="data.status == Setting.Status.status_1_2"
                >
                  尽调拒绝{{
                    parseInt(data.contactStatus) == 1 &&
                    parseInt(data.pushStatus) == 0
                      ? "(申请中)"
                      : parseInt(data.pushStatus) == 1
                      ? "(拒绝成功)"
                      : parseInt(data.pushStatus) == 2
                      ? "(拒绝失败)"
                      : ""
                  }}
                </div>
                <div
                  class="color2"
                  v-if="data.status == Setting.Status.status_1_3"
                >
                  审核拒绝{{
                    parseInt(data.contactStatus) == 1 &&
                    parseInt(data.pushStatus) == 0
                      ? "(申请中)"
                      : parseInt(data.pushStatus) == 1
                      ? "(拒绝成功)"
                      : parseInt(data.pushStatus) == 2
                      ? "(拒绝失败)"
                      : ""
                  }}
                </div>
                <div
                  class="color2"
                  v-if="data.status == Setting.Status.status_1_4"
                >
                  人行已撤销{{
                    parseInt(data.contactStatus) == 1 &&
                    parseInt(data.pushStatus) == 0
                      ? "(申请中)"
                      : parseInt(data.pushStatus) == 1
                      ? "(拒绝成功)"
                      : parseInt(data.pushStatus) == 2
                      ? "(拒绝失败)"
                      : ""
                  }}
                </div>
                <div class="" v-if="data.status == Setting.Status.status0">
                  待分配
                </div>
                <div class="" v-if="data.status == Setting.Status.status1">
                  待尽调
                </div>
                <div class="" v-if="data.status == Setting.Status.status2">
                  等待审核
                </div>
                <div
                  class="color1"
                  v-if="data.status == Setting.Status.status3"
                >
                  审核通过
                </div>
                <div
                  class="color2"
                  v-if="data.status == Setting.Status.status4"
                >
                  退回
                </div>
              </div>
            </div>
            <div class="hang">
              <div class="name name3" style="color: #39b169">
                尽调员：{{
                  data.jdUserName == "" || data.jdUserName == null
                    ? "无"
                    : data.jdUserName
                }}
              </div>
              <div class="value value3" style="color: #39b169">
                审核员：{{
                  data.auditUserName == "" || data.auditUserName == null
                    ? "无"
                    : data.auditUserName
                }}
              </div>
            </div>
            <div class="jg" style="background: #fff"></div>
            <div class="jg"></div>
            <div class="hang">
              <div class="name">企业名称</div>
              <input
                class="value"
                @blur="save('enterpriseName')"
                type="text"
                v-model="data.enterpriseName"
                placeholder="请输入企业名称"
                :readonly="isReadonly"
                maxlength="50"
              />
            </div>
            <div class="hang">
              <div class="name">联系人</div>
              <input
                class="value"
                type="text"
                v-model="data.operator"
                readonly="readonly"
                maxlength="50"
              />
            </div>
            <div class="line"></div>
            <div class="hang">
              <div class="name">电话</div>
              <input
                class="value"
                type="text"
                :value="
                  data.phone.substring(0, 3) + '****' + data.phone.substring(7)
                "
                readonly="readonly"
                maxlength="50"
              />
            </div>
            <div class="hang">
              <div class="name">预约时间</div>
              <input
                class="value"
                type="text"
                :value="data.applyDate.substring(0, 16)"
                readonly="readonly"
                maxlength="50"
              />
            </div>
            <!-- <div class="line"></div>
                        <div class="hang hang2">
                            <div class="name">身份证号</div>
                            <input class="value value4" type="text" :value="data.idNo===''||data.idNo==null||data.idNo==undefined?'':(data.idNo.substring(0,2)+'****'+data.idNo.substring(6,14)+'****')" :placeholder="isReadonly?'未录入':'请输入身份证号'" v-if="isReadonly" :readonly="isReadonly" maxlength="18">
                            <input class="value value4" type="text" @blur="submityy" v-model="data.idNo" placeholder="请输入身份证号" :readonly="isReadonly" v-if="!isReadonly" maxlength="18">
                            <div style="clear:both;"></div>
                        </div> -->
            <div class="line"></div>
            <div class="hang hang1">
              <div class="name">来源渠道</div>
              <div class="value">{{ data.channelName }}</div>
            </div>
            <div class="hang hang1">
              <div class="name">账户性质</div>
              <select
                v-if="
                  data.typeStatus === '' ||
                  data.typeStatus == undefined ||
                  data.typeStatus == null ||
                  data.typeStatus == 0
                "
                dir="rtl"
                class="value"
                @change="submityy1"
                v-model="data.accountType"
                name=""
                id=""
                :style="
                  'color:#' +
                  (data.accountType === '' || data.accountType == undefined
                    ? '999'
                    : '0047BC')
                "
              >
                <!-- <option :value="''">{{isReadonly?'未录入':'请选择'}}</option> -->
                <option :value="''">请选择</option>
                <option :value="'jiben'">基本账户</option>
                <option :value="'yiban'">一般账户</option>
                <option :value="'zhuanyong'">专用账户</option>
                <option :value="'linshi'">临时账户</option>
              </select>
              <input
                v-else
                class="value"
                type="text"
                v-model="data.accountTypeName"
                placeholder="暂无信息"
                readonly
                maxlength="50"
              />
            </div>
            <div
              class="jcbtn"
              @click="jieqia"
              v-if="
                isjieqia &&
                (data.contactStatus == null ||
                  data.contactStatus == undefined ||
                  data.contactStatus == '')
              "
            >
              接洽
            </div>
            <div
              class="jcbtn"
              v-else-if="
                !isjieqia &&
                (data.contactStatus == null ||
                  data.contactStatus == undefined ||
                  data.contactStatus == '')
              "
            >
              待接洽
            </div>
            <div
              class="jcbtn1"
              v-else-if="
                parseInt(data.contactStatus) === 0 &&
                parseInt(data.pushStatus) == 0
              "
            >
              接洽处理中
            </div>
            <div
              class="jcbtn1"
              v-else-if="
                parseInt(data.contactStatus) === 0 &&
                parseInt(data.pushStatus) == 1
              "
            >
              接洽成功
            </div>
            <div
              class="jcbtn1"
              v-else-if="
                parseInt(data.contactStatus) === 0 &&
                parseInt(data.pushStatus) == 2
              "
            >
              接洽失败
            </div>
            <div class="jcbtn1" v-else>接洽退回</div>
          </div>
        </div>
        <div class="page">
          <div class="txt" style="background: transparent; text-indent: 0">
            请选择要尽调的<span class="xhx"></span>地址：
          </div>

          <div class="checkboxk" style="padding-top: 10px">
            <label>
              <input
                @change="save('annexType')"
                type="checkbox"
                :value="'0'"
                v-model="data.annexType"
                align="absmiddle"
                :disabled="isReadonly"
              />
              <span>经营地</span>
            </label>
            <label>
              <input
                @change="save('annexType')"
                type="checkbox"
                :value="'1'"
                v-model="data.annexType"
                align="absmiddle"
                :disabled="isReadonly"
              />
              <span>注册地</span>
            </label>
            <div style="clear: both"></div>
          </div>

          <div
            v-show="(',' + data.annexType?.toString() + ',').includes(',0,')"
          >
            <div class="bkk">
              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">经营地门头</span>
                (必拍<span class="titlebt">*</span> 1张到4张)
              </div>

              <div class="xk">
                <div
                  v-show="!(item === '' && type != 1)"
                  @click="yulan(!(item === '' && type != 1), item)"
                  class="xitem"
                  v-for="(item, index) in data.annexMt"
                  :key="index"
                  :style="'background-image:url(' + item + ')'"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传照片</div>
                  <input
                    type="file"
                    capture="camera"
                    v-if="!isReadonly && item === ''"
                    accept="image/*"
                    @change="uploadImg($event, data.annexMt)"
                  />
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexMt, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexMtSm')"
                  v-model="data.annexMtSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">经营地场所</span>
                (必拍<span class="titlebt">*</span> 1张到4张)
              </div>

              <div class="xk">
                <div
                  v-show="!(item === '' && type != 1)"
                  @click="yulan(!(item === '' && type != 1), item)"
                  class="xitem"
                  v-for="(item, index) in data.annexJycs"
                  :key="index"
                  :style="'background-image:url(' + item + ')'"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传照片</div>
                  <input
                    type="file"
                    capture="camera"
                    v-if="!isReadonly && item === ''"
                    accept="image/*"
                    @change="uploadImg($event, data.annexJycs)"
                  />
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexJycs, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexJycsSm')"
                  v-model="data.annexJycsSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">经营地-其他</span>
                (选拍 0张到4张)
              </div>

              <div class="xk">
                <div
                  v-show="!(item === '' && type != 1)"
                  @click="yulan(!(item === '' && type != 1), item)"
                  class="xitem"
                  v-for="(item, index) in data.annexQt"
                  :key="index"
                  :style="'background-image:url(' + item + ')'"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传照片</div>
                  <input
                    type="file"
                    capture="camera"
                    v-if="!isReadonly && item === ''"
                    accept="image/*"
                    @change="uploadImg($event, data.annexQt)"
                  />
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexQt, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexQtSm')"
                  v-model="data.annexQtSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">经营地-视频</span>
              </div>

              <div class="xk">
                <div
                  class="xitem"
                  style="width: 160px; height: 160px; border-radius: 15px"
                  v-for="(item, index) in data.annexVideo"
                  :key="index"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传视频</div>
                  <div v-show="item !== ''" class="xtxt">正在加载</div>
                  <input
                    type="file"
                    v-if="!isReadonly && item == ''"
                    accept="video/*"
                    @change="uploadVideo($event, data.annexVideo)"
                  />
                  <video width="160" height="160" v-show="item !== ''" controls>
                    <source :src="item" :key="item" type="video/mp4" />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexVideo, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexVideoSm')"
                  v-model="data.annexVideoSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">经营地-获取定位</span>
              </div>
              <div class="jcbtn" @click="getLocation()" v-if="!isReadonly">
                点击定位
              </div>
              <div
                class="location"
                v-show="data.longitude != null && data.longitude != ''"
              >
                经纬度：{{ data.longitude }},{{ data.latitude }}
              </div>
              <div
                class="location"
                :style="
                  parseFloat(data.errorValue) > parseInt(data.errorLimit)
                    ? 'color:red;'
                    : 'color:green;'
                "
                v-show="data.longitude != null && data.longitude != ''"
              >
                误差值：{{ data.errorValueStr }}
              </div>
              <input
                @blur="save('location')"
                class="location1"
                v-show="data.longitude != null && data.longitude != ''"
                type="text"
                v-model="data.location"
                :placeholder="
                  isReadonly ? '未录入' : '获取地址失败，请点击按钮重新定位'
                "
                :readonly="isReadonly"
                maxlength="50"
              />
            </div>
          </div>

          <div class="jg"></div>
          <div class="jg"></div>
          <div class="jg"></div>
          <div class="jg"></div>
          <div class="jg"></div>

          <div
            v-show="(',' + data.annexType?.toString() + ',').includes(',1,')"
          >
            <div class="bkk">
              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">注册地门头</span>
                (必拍<span class="titlebt">*</span> 1张到4张)
              </div>

              <div class="xk">
                <div
                  v-show="!(item === '' && type != 1)"
                  @click="yulan(!(item === '' && type != 1), item)"
                  class="xitem"
                  v-for="(item, index) in data.annexZcdMt"
                  :key="index"
                  :style="'background-image:url(' + item + ')'"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传照片</div>
                  <input
                    type="file"
                    capture="camera"
                    v-if="!isReadonly && item === ''"
                    accept="image/*"
                    @change="uploadImg($event, data.annexZcdMt)"
                  />
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexZcdMt, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexZcdMtSm')"
                  v-model="data.annexZcdMtSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">注册地场所</span>
                (必拍<span class="titlebt">*</span> 1张到4张)
              </div>

              <div class="xk">
                <div
                  v-show="!(item === '' && type != 1)"
                  @click="yulan(!(item === '' && type != 1), item)"
                  class="xitem"
                  v-for="(item, index) in data.annexZcdJycs"
                  :key="index"
                  :style="'background-image:url(' + item + ')'"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传照片</div>
                  <input
                    type="file"
                    capture="camera"
                    v-if="!isReadonly && item === ''"
                    accept="image/*"
                    @change="uploadImg($event, data.annexZcdJycs)"
                  />
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexZcdJycs, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexZcdJycsSm')"
                  v-model="data.annexZcdJycsSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">注册地-其他</span>
                (选拍 0张到4张)
              </div>

              <div class="xk">
                <div
                  v-show="!(item === '' && type != 1)"
                  @click="yulan(!(item === '' && type != 1), item)"
                  class="xitem"
                  v-for="(item, index) in data.annexZcdQt"
                  :key="index"
                  :style="'background-image:url(' + item + ')'"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传照片</div>
                  <input
                    type="file"
                    capture="camera"
                    v-if="!isReadonly && item === ''"
                    accept="image/*"
                    @change="uploadImg($event, data.annexZcdQt)"
                  />
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexZcdQt, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexZcdQtSm')"
                  v-model="data.annexZcdQtSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">注册地-视频</span>
              </div>

              <div class="xk">
                <div
                  class="xitem"
                  style="width: 160px; height: 160px; border-radius: 15px"
                  v-for="(item, index) in data.annexZcdVideo"
                  :key="index"
                >
                  <img
                    v-show="item === ''"
                    src="../../assets/details/img/xx.png"
                  />
                  <div v-show="item === ''" class="xtxt">上传视频</div>
                  <div v-show="item !== ''" class="xtxt">正在加载</div>
                  <input
                    type="file"
                    v-if="!isReadonly && item == ''"
                    accept="video/*"
                    @change="uploadVideo($event, data.annexZcdVideo)"
                  />
                  <video width="160" height="160" v-show="item !== ''" controls>
                    <source :src="item" :key="item" type="video/mp4" />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div
                    v-show="item !== '' && !isReadonly"
                    class="del"
                    @click="delimg(data.annexZcdVideo, index)"
                  >
                    <img src="../../assets/details/img/cc.png" />
                  </div>
                </div>

                <textarea
                  @blur="save('annexZcdVideoSm')"
                  v-model="data.annexZcdVideoSm"
                  class="sm"
                  name=""
                  id=""
                  :placeholder="isReadonly ? '未录入' : '填写说明(不超过50字)'"
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>

              <div class="jg"></div>

              <div class="title">
                <div class="hline"></div>
                <span class="titletxt1">注册地-获取定位</span>
              </div>
              <div class="jcbtn" @click="getLocation1()" v-if="!isReadonly">
                点击定位
              </div>
              <div
                class="location"
                v-show="data.zcdLongitude != null && data.zcdLongitude != ''"
              >
                经纬度：{{ data.zcdLongitude }},{{ data.zcdLatitude }}
              </div>
              <div
                class="location"
                :style="
                  parseFloat(data.zcdErrorValue) > parseInt(data.errorLimit)
                    ? 'color:red;'
                    : 'color:green;'
                "
                v-show="data.zcdLongitude != null && data.zcdLongitude != ''"
              >
                误差值：{{ data.zcdErrorValueStr }}
              </div>
              <input
                @blur="save('zcdLocation')"
                class="location1"
                v-show="data.zcdLongitude != null && data.zcdLongitude != ''"
                type="text"
                v-model="data.zcdLocation"
                :placeholder="
                  isReadonly ? '未录入' : '获取地址失败，请点击按钮重新定位'
                "
                :readonly="isReadonly"
                maxlength="50"
              />
            </div>
          </div>
        </div>
        <div class="page">
          <div class="bkk">
            <div class="hang hang1">
              <div class="hangline"></div>
              <div class="name">客户名称</div>
              <input
                class="value"
                @blur="save('enterpriseName')"
                type="text"
                v-model="data.enterpriseName"
                :placeholder="isReadonly ? '未录入' : '请输入客户名称'"
                :readonly="isReadonly"
                maxlength="50"
              />
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name4">客户法定代表人/单位负责人姓名</div>
              <input
                class="value value4"
                @blur="save('fzrName')"
                type="text"
                v-model="data.fzrName"
                :placeholder="isReadonly ? '未录入' : '请输入姓名'"
                :readonly="isReadonly"
                maxlength="50"
              />
              <div style="clear: both"></div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name4">客户法定代表人/单位负责人电话</div>
              <input
                class="value value4"
                @blur="save('fzrPhone')"
                type="text"
                v-model="data.fzrPhone"
                :placeholder="isReadonly ? '未录入' : '请输入电话'"
                :readonly="isReadonly"
                maxlength="50"
              />
              <div style="clear: both"></div>
            </div>

            <div class="jg"></div>
            <div class="hang hang1">
              <div class="hangline"></div>
              <div class="name name2">财务负责人电话</div>
              <input
                class="value value2"
                @blur="save('cwfzrPhone')"
                type="text"
                v-model="data.cwfzrPhone"
                :placeholder="isReadonly ? '未录入' : '请输入电话'"
                :readonly="isReadonly"
                maxlength="50"
              />
            </div>

            <div class="jg"></div>
            <div class="hang hang1">
              <div class="hangline"></div>
              <div class="name">开户行</div>
              <!-- <select dir="rtl" class="value" v-model="data.openAccountBranch" name="" id="" :style="'color:#'+(data.openAccountBranch===''||data.openAccountBranch==undefined?'999':'0047BC')" :disabled="isReadonly">
                                <option :value="''">{{isReadonly?'未录入':'请选择'}}</option>
                                <option :value="1">11</option>
                                <option :value="2">22</option>
                            </select> -->
              <input
                class="value"
                @blur="save('openAccountBranch')"
                type="text"
                v-model="data.openAccountBranch"
                :placeholder="isReadonly ? '未录入' : '请输入开户行'"
                readonly
                maxlength="50"
              />
            </div>

            <div class="jg"></div>
            <!-- <div class="hang hang1">
                            <div class="hangline"></div>
                            <div class="name">账户性质</div>
                            <input class="value" type="text" v-model="data.accountTypeName" placeholder="暂无信息" readonly maxlength="50">
                            <select dir="rtl" class="value" @change="save('accountType')" v-model="data.accountType" name="" id="" :style="'color:#'+(data.accountType===''||data.accountType==undefined?'999':'0047BC')" :disabled="isReadonly">
                                <option :value="''">{{isReadonly?'未录入':'请选择'}}</option>
                                <option :value="'jiben'">基本账户</option>
                                <option :value="'yiban'">一般账户</option>
                                <option :value="'zhuanyong'">专用账户</option>
                                <option :value="'linshi'">临时账户</option>
                            </select>
                        </div> -->

            <div class="jg"></div>
            <div class="txt pt30">
              本着“了解你的客户”的原则，已了解该客户基本经营情况、开户目的，客户开户意愿真实，并经法定代表人或单位负责人确认。
            </div>
            <div class="txt">
              经过核查，该客户提供的<span class="xhx">以下文件</span
              >真实有效，符合开立账户要求。
            </div>

            <div class="checkboxk">
              <label>
                <input
                  @change="save('yxwj')"
                  type="checkbox"
                  :value="'壹'"
                  v-model="data.yxwj"
                  align="absmiddle"
                  :disabled="isReadonly"
                />
                <span>壹、证明文件</span>
              </label>
              <label>
                <input
                  @change="save('yxwj')"
                  type="checkbox"
                  :value="'贰'"
                  v-model="data.yxwj"
                  align="absmiddle"
                  :disabled="isReadonly"
                />
                <span>贰、法定代表人/单位负责人信息</span>
              </label>
              <label>
                <input
                  @change="save('yxwj')"
                  type="checkbox"
                  :value="'叁'"
                  v-model="data.yxwj"
                  align="absmiddle"
                  :disabled="isReadonly"
                />
                <span>叁、开户授权书</span>
              </label>
              <label>
                <input
                  @change="save('yxwj')"
                  type="checkbox"
                  :value="'肆'"
                  v-model="data.yxwj"
                  align="absmiddle"
                  :disabled="isReadonly"
                />
                <span>肆、其他</span>
              </label>
              <div style="clear: both"></div>
            </div>

            <div
              class="bkk bkk1"
              v-show="(',' + data.yxwj?.toString() + ',').includes('壹')"
            >
              <div class="hang hang1">
                <div class="hangline"></div>
                <div class="name">证明文件</div>
                <div class="value"></div>
              </div>
              <div>
                <div class="checkboxk checkboxk1">
                  <label>
                    <input
                      @change="save('yxwjZmwj')"
                      type="checkbox"
                      :value="0"
                      v-model="data.yxwjZmwj"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>营业执照</span>
                  </label>
                  <label>
                    <input
                      @change="save('yxwjZmwj')"
                      type="checkbox"
                      :value="1"
                      v-model="data.yxwjZmwj"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>登记证书</span>
                  </label>
                  <label>
                    <input
                      @change="save('yxwjZmwj')"
                      type="checkbox"
                      :value="2"
                      v-model="data.yxwjZmwj"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>批文</span>
                  </label>
                  <label>
                    <input
                      @change="save('yxwjZmwj')"
                      type="checkbox"
                      :value="3"
                      v-model="data.yxwjZmwj"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>开户证明</span>
                  </label>
                  <label>
                    <input
                      @change="save('yxwjZmwj')"
                      type="checkbox"
                      :value="4"
                      v-model="data.yxwjZmwj"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>其他</span>
                  </label>
                  <div style="clear: both"></div>
                  <div
                    class="hang hang3"
                    v-show="(',' + data.yxwjZmwj?.toString() + ',').includes(4)"
                  >
                    <input
                      @blur="save('yxwjZmwjQt')"
                      class="hanginput"
                      type="text"
                      v-model="data.yxwjZmwjQt"
                      :placeholder="
                        isReadonly ? '未录入' : '请输入其他证明文件'
                      "
                      :readonly="isReadonly"
                      maxlength="20"
                    />
                  </div>
                </div>

                <div class="xuline"></div>

                <div class="dcfsk">
                  <div class="hang">
                    <div class="name name2">证明文件有效期</div>
                    <select
                      dir="rtl"
                      @change="save('yxwjZmwjYxq')"
                      class="value value2"
                      v-model="data.yxwjZmwjYxqtype"
                      name=""
                      id=""
                      :style="
                        'color:#' +
                        (data.yxwjZmwjYxqtype === '' ||
                        data.yxwjZmwjYxqtype == undefined
                          ? '999'
                          : '0047BC')
                      "
                      :disabled="isReadonly"
                    >
                      <option :value="''">
                        {{ isReadonly ? "未录入" : "请选择" }}
                      </option>
                      <option :value="0">不是长期</option>
                      <option :value="1">长期</option>
                    </select>
                  </div>
                  <div
                    class="hang hang2"
                    v-show="
                      data.yxwjZmwjYxqtype === 0 || data.yxwjZmwjYxqtype == 1
                    "
                  >
                    <div class="name name3">请选择有效期开始</div>
                    <!-- @blur="save('yxwjZmwjYxq')" -->
                    <!-- maxlength="0" -->
                    <input
                      maxlength="0"
                      id="datePicker"
                      class="value value3"
                      @click.native="bbb('yxwjZmwjYxq')"
                      style="
                        width: 150px;
                        height: 30px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                        background: #f7f7f7;
                      "
                      type="text"
                      v-model="data.yxwjZmwjYxq"
                      :readonly="isReadonly"
                    />
                    <div style="clear: both"></div>
                  </div>
                  <div class="hang hang2" v-show="data.yxwjZmwjYxqtype === 0">
                    <div class="name name3">请选择有效期结束</div>
                    <!-- @blur="save('yxwjZmwjYxq1')" -->
                    <input
                      maxlength="0"
                      id="datePicker"
                      class="value value3"
                      @click.native="bbb('yxwjZmwjYxq1')"
                      style="
                        width: 150px;
                        height: 30px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                        background: #f7f7f7;
                      "
                      type="text"
                      v-model="data.yxwjZmwjYxq1"
                      :readonly="isReadonly"
                    />
                    <div style="clear: both"></div>
                  </div>
                  <div class="xuline"></div>
                  <div class="hang hang2">
                    <div class="name name4">组织机构代码/统一社会信用代码</div>
                    <input
                      @blur="save('enterpriseIdNo')"
                      class="value value4"
                      type="text"
                      style="text-align: left"
                      :style="
                        isScan ? 'width:calc(100% - 40px);float:left;' : ''
                      "
                      v-model="data.enterpriseIdNo"
                      :readonly="isReadonly"
                      :placeholder="
                        isReadonly
                          ? '未录入'
                          : '请输入组织机构代码/统一社会信用代码'
                      "
                      maxlength="50"
                    />
                    <div
                      class="scan"
                      @click="scan(1)"
                      @change="uploadImgScan($event, 1)"
                      v-if="isScan"
                    >
                      <img src="../../assets/img/scan.png" />
                      <input
                        type="file"
                        ref="scanInput1"
                        capture="camera"
                        accept="image/*"
                      />
                    </div>
                    <div style="clear: both"></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bkk bkk1"
              v-show="(',' + data.yxwj?.toString() + ',').includes('贰')"
            >
              <div class="hang hang1">
                <div class="hangline"></div>
                <div class="name name4">法定代表人/单位负责人信息</div>
                <div class="value value3"></div>
              </div>
              <div>
                <div class="xuline"></div>
                <div class="dcfsk">
                  <div class="hang">
                    <div class="name name1">身份证件类型</div>
                    <select
                      dir="rtl"
                      @change="save('fzrIdType')"
                      class="value value1"
                      v-model="data.fzrIdType"
                      name=""
                      id=""
                      :style="
                        'color:#' +
                        (data.fzrIdType === '' || data.fzrIdType == undefined
                          ? '999'
                          : '0047BC')
                      "
                      :disabled="isReadonly"
                    >
                      <option :value="''">
                        {{ isReadonly ? "未录入" : "请选择" }}
                      </option>
                      <option :value="1">身份证</option>
                      <option :value="2">军官证</option>
                      <option :value="3">文职干部证</option>
                      <option :value="4">警官证</option>
                      <option :value="5">士兵证</option>
                      <option :value="6">护照</option>
                      <option :value="7">港、澳、台通行证</option>
                      <option :value="8">户口簿</option>
                    </select>
                  </div>
                  <div class="xuline"></div>
                  <div class="hang hang2">
                    <div class="name name1">身份证件号码</div>
                    <div
                      class="scan"
                      @click="scan(2)"
                      @change="uploadImgScan($event, 2)"
                      v-if="isScan && data.fzrIdType == 1"
                    >
                      <img src="../../assets/img/scan.png" />
                      <input
                        type="file"
                        ref="scanInput2"
                        capture="camera"
                        accept="image/*"
                      />
                    </div>
                    <input
                      @blur="save('fzrIdNo')"
                      class="value value4"
                      type="text"
                      v-model="data.fzrIdNo"
                      :readonly="isReadonly"
                      :placeholder="
                        isReadonly ? '未录入' : '请输入身份证件号码'
                      "
                      maxlength="18"
                    />
                    <div style="clear: both"></div>
                  </div>
                  <div class="xuline"></div>
                  <div class="hang">
                    <div class="name name1">证件有效期</div>
                    <div
                      class="scan"
                      @click="scan(3)"
                      @change="uploadImgScan($event, 3)"
                      v-if="isScan && data.fzrIdType == 1"
                    >
                      <img src="../../assets/img/scan.png" />
                      <input
                        type="file"
                        ref="scanInput3"
                        capture="camera"
                        accept="image/*"
                      />
                    </div>
                    <select
                      @change="save('fzrIdYxq')"
                      dir="rtl"
                      class="value value1"
                      v-model="data.fzrIdYxqtype"
                      name=""
                      id=""
                      :style="
                        'color:#' +
                        (data.fzrIdYxqtype === '' ||
                        data.fzrIdYxqtype == undefined
                          ? '999'
                          : '0047BC') +
                        (isScan && data.fzrIdType == 1)
                          ? 'width:calc(100% - 140px)'
                          : ''
                      "
                      :disabled="isReadonly"
                    >
                      <option :value="''">
                        {{ isReadonly ? "未录入" : "请选择" }}
                      </option>
                      <option :value="0">不是长期</option>
                      <option :value="1">长期</option>
                    </select>
                  </div>
                  <div
                    class="hang hang2"
                    v-show="data.fzrIdYxqtype === 0 || data.fzrIdYxqtype == 1"
                  >
                    <div class="name name3">请选择有效期开始</div>
                    <!-- @blur="save('fzrIdYxq')" -->
                    <input
                      maxlength="0"
                      id="datePicker"
                      class="value value3"
                      @click.native="bbb('fzrIdYxq')"
                      style="
                        width: 150px;
                        height: 30px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                        background: #f7f7f7;
                      "
                      type="text"
                      v-model="data.fzrIdYxq"
                      :readonly="isReadonly"
                    />
                    <div style="clear: both"></div>
                  </div>
                  <div class="hang hang2" v-show="data.fzrIdYxqtype === 0">
                    <div class="name name3">请选择有效期结束</div>
                    <!-- @blur="save('fzrIdYxq1')" -->
                    <input
                      maxlength="0"
                      id="datePicker"
                      class="value value3"
                      @click.native="bbb('fzrIdYxq1')"
                      style="
                        width: 150px;
                        height: 30px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                        background: #f7f7f7;
                      "
                      type="text"
                      v-model="data.fzrIdYxq1"
                      :readonly="isReadonly"
                    />
                    <div style="clear: both"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="bkk bkk1" v-show="(','+data.yxwj?.toString()+',').includes('叁')">
                            <div class="hang hang1">
                                <div class="hangline"></div>
                                <div class="name name4">代理人信息</div>
                                <div class="value value3"></div>
                            </div>
                            <div>
                                <div class="xuline"></div>
                                <div class="dcfsk">
                                    <div class="hang">
                                        <div class="name name1">姓名</div>
                                        <input @blur="save('proxyName')" class="value value1" type="text" v-model="data.proxyName" :readonly="isReadonly" :placeholder="isReadonly?'未录入':'请输入姓名'" maxlength="50">
                                    </div>
                                    <div class="xuline"></div>
                                    <div class="hang">
                                        <div class="name name1">联系方式</div>
                                        <input @blur="save('proxyPhoneNumber')" class="value value1" type="text" v-model="data.proxyPhoneNumber" :readonly="isReadonly" :placeholder="isReadonly?'未录入':'请输入联系方式'" maxlength="50">
                                    </div>
                                    <div class="xuline"></div>
                                    <div class="hang">
                                        <div class="name name1">身份证件类型</div>
                                        <select @change="save('proxyIdType')" dir="rtl" class="value value1" v-model="data.proxyIdType" name="" id="" :style="'color:#'+(data.proxyIdType===''||data.proxyIdType==undefined?'999':'0047BC')" :disabled="isReadonly">
                                            <option :value="''">{{isReadonly?'未录入':'请选择'}}</option>
                                            <option :value="1">身份证</option>
                                            <option :value="2">军官证</option>
                                            <option :value="3">文职干部证</option>
                                            <option :value="4">警官证</option>
                                            <option :value="5">士兵证</option>
                                            <option :value="6">护照</option>
                                            <option :value="7">港、澳、台通行证</option>
                                            <option :value="8">户口簿</option>
                                        </select>
                                    </div>
                                    <div class="xuline"></div>
                                    <div class="hang">
                                        <div class="name name1">身份证件号码</div>
                                        <input @blur="save('proxyIdNo')" class="value value1" type="text" v-model="data.proxyIdNo" :readonly="isReadonly" :placeholder="isReadonly?'未录入':'请输入身份证件号码'" maxlength="50">
                                    </div>
                                    <div class="xuline"></div>
                                    <div class="hang">
                                        <div class="name name1">证件有效期</div>
                                        <select @change="save('proxyZjyxq')" dir="rtl" class="value value1" v-model="data.proxyZjyxqtype" name="" id="" :style="'color:#'+(data.proxyZjyxqtype===''||data.proxyZjyxqtype==undefined?'999':'0047BC')" :disabled="isReadonly">
                                            <option :value="''">{{isReadonly?'未录入':'请选择'}}</option>
                                            <option :value="0">不是长期</option>
                                            <option :value="1">长期</option>
                                        </select>
                                    </div>
                                    <div class="hang" v-show="data.proxyZjyxqtype===0||data.proxyZjyxqtype==1">
                                        <div class="name name3">请选择有效期开始</div>
                                        <input @blur="save('proxyZjyxq')" class="value value3" style="width:150px;height:30px;margin-top:5px;background:#f7f7f7;" type="date" v-model="data.proxyZjyxq" :readonly="isReadonly">
                                    </div>
                                    <div class="hang" v-show="data.proxyZjyxqtype===0">
                                        <div class="name name3">请选择有效期结束</div>
                                        <input @blur="save('proxyZjyxq')" class="value value3" style="width:150px;height:30px;margin-top:5px;background:#f7f7f7;" type="date" v-model="data.proxyZjyxq1" :readonly="isReadonly">
                                    </div>
                                </div>
                            </div>
                        </div> -->

            <div
              class="bkk bkk1"
              v-show="(',' + data.yxwj?.toString() + ',').includes('肆')"
              style="padding-bottom: 0"
            >
              <div class="hang hang2">
                <div class="hangline"></div>
                <div class="name name5">其他有效文件</div>
                <textarea
                  @blur="save('yxwjQt')"
                  class="sm"
                  v-model="data.yxwjQt"
                  name=""
                  id=""
                  :placeholder="
                    isReadonly ? '未录入' : '填写其他有效文件(不超过50字)'
                  "
                  maxlength="50"
                  :readonly="isReadonly"
                ></textarea>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name5">是否严重违法失信企业</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('yzwfsx')"
                    type="radio"
                    :value="0"
                    v-model="data.yzwfsx"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('yzwfsx')"
                    type="radio"
                    :value="1"
                    v-model="data.yzwfsx"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name5">是否注册地址不存在或虚构经营场所</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('zcdExists')"
                    type="radio"
                    :value="0"
                    v-model="data.zcdExists"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('zcdExists')"
                    type="radio"
                    :value="1"
                    v-model="data.zcdExists"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name5">经营地与注册地是否为同一地址</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('zcdJydYz')"
                    type="radio"
                    :value="0"
                    v-model="data.zcdJydYz"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('zcdJydYz')"
                    type="radio"
                    :value="1"
                    v-model="data.zcdJydYz"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name6">注册地是否异地</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('zcdYd')"
                    type="radio"
                    :value="0"
                    v-model="data.zcdYd"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('zcdYd')"
                    type="radio"
                    :value="1"
                    v-model="data.zcdYd"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name6">经营地是否异地</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('jydYd')"
                    type="radio"
                    :value="0"
                    v-model="data.jydYd"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('jydYd')"
                    type="radio"
                    :value="1"
                    v-model="data.jydYd"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name6">法定代表人/单位负责人开户意愿</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('fzrKhyy')"
                    type="radio"
                    :value="0"
                    v-model="data.fzrKhyy"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>真实</span>
                </label>
                <label>
                  <input
                    @change="save('fzrKhyy')"
                    type="radio"
                    :value="1"
                    v-model="data.fzrKhyy"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>不真实</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name6">客户证明文件、授权书是否真实</div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('zmwjSqsZs')"
                    type="radio"
                    :value="0"
                    v-model="data.zmwjSqsZs"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('zmwjSqsZs')"
                    type="radio"
                    :value="1"
                    v-model="data.zmwjSqsZs"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name6">
                注册地址是否为集群、村庄、写字楼内工位、住宅或托管地址
              </div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('zcdQtdz')"
                    type="radio"
                    :value="0"
                    v-model="data.zcdQtdz"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('zcdQtdz')"
                    type="radio"
                    :value="1"
                    v-model="data.zcdQtdz"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name6">
                法定代表人/单位负责人对单位经营规模及业务背景等情况是否清楚
              </div>
              <div style="clear: both"></div>
              <div class="checkboxk checkboxk3">
                <label>
                  <input
                    @change="save('fzrBjqk')"
                    type="radio"
                    :value="0"
                    v-model="data.fzrBjqk"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>是</span>
                </label>
                <label>
                  <input
                    @change="save('fzrBjqk')"
                    type="radio"
                    :value="1"
                    v-model="data.fzrBjqk"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>否</span>
                </label>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="name name5">上门核实时间</div>
              <input
                class="value"
                @blur="save('hssj')"
                style="
                  width: 220px;
                  height: 40px;
                  margin-top: 5px;
                  margin-bottom: 5px;
                  background: #f7f7f7;
                "
                :min="data.addTime"
                type="datetime-local"
                v-model="data.hssj"
                :readonly="isReadonly"
              />
              <div style="clear: both"></div>
            </div>
            <div class="dcfsk">
              <div class="xuline"></div>
            </div>
            <div class="hang hang1">
              <div class="name name1">企业对接人员</div>
              <input
                class="value value1"
                @blur="save('qydjry')"
                type="text"
                v-model="data.qydjry"
                :readonly="isReadonly"
                :placeholder="isReadonly ? '未录入' : '请输入企业对接人员'"
                maxlength="50"
              />
            </div>

            <div class="jg"></div>
            <div class="bkk bkk1" style="padding-bottom: 0">
              <div class="hang hang2">
                <div class="hangline"></div>
                <div class="name name5">其他核实事项</div>
                <textarea
                  @blur="save('hsQt')"
                  class="sm"
                  style="height: 200px"
                  v-model="data.hsQt"
                  name=""
                  id=""
                  :placeholder="
                    isReadonly ? '未录入' : '填写其他核实事项(不超过200字)'
                  "
                  maxlength="200"
                  :readonly="isReadonly"
                ></textarea>
              </div>
            </div>

            <div class="jg"></div>
            <div class="jg"></div>
            <div class="jg"></div>
            <div class="bkk bkk1">
              <div class="hang hang1">
                <div class="hangline"></div>
                <div class="name name5">账户风险等级</div>
              </div>
              <div>
                <div class="checkboxk checkboxk1">
                  <label>
                    <input
                      @change="save('riskLevel')"
                      type="radio"
                      :value="0"
                      v-model="data.riskLevel"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>禁止开户</span>
                  </label>
                  <label>
                    <input
                      @change="save('riskLevel')"
                      type="radio"
                      :value="1"
                      v-model="data.riskLevel"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>可疑</span>
                  </label>
                  <label>
                    <input
                      @change="save('riskLevel')"
                      type="radio"
                      :value="2"
                      v-model="data.riskLevel"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>关注</span>
                  </label>
                  <label>
                    <input
                      @change="save('riskLevel')"
                      type="radio"
                      :value="3"
                      v-model="data.riskLevel"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>正常</span>
                  </label>
                  <label>
                    <input
                      @change="save('riskLevel')"
                      type="radio"
                      :value="4"
                      v-model="data.riskLevel"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>白名单</span>
                  </label>
                  <div style="clear: both"></div>
                </div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="bkk bkk1">
              <div class="hang hang1">
                <div class="hangline"></div>
                <div class="name name5">尽职调查结论</div>
              </div>
              <div>
                <div class="checkboxk checkboxk1">
                  <label>
                    <input
                      @change="save('jdResultKh')"
                      type="radio"
                      :value="0"
                      v-model="data.jdResultKh"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>该客户符合开户条件，同意开户。</span>
                  </label>
                  <label v-if="false">
                    <input
                      @change="save('jdResultKh')"
                      type="radio"
                      :value="1"
                      v-model="data.jdResultKh"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>其他</span>
                  </label>
                  <label>
                    <input
                      @change="save('jdResultKh')"
                      type="radio"
                      :value="2"
                      v-model="data.jdResultKh"
                      align="absmiddle"
                      :disabled="isReadonly"
                    />
                    <span>该客户不符合开户条件，不同意开户。</span>
                  </label>

                  <div style="clear: both"></div>
                  <div class="hang hang3" v-show="data.jdResultKh == 1">
                    <input
                      @blur="save('jdResultQt')"
                      class="hanginput"
                      type="text"
                      v-model="data.jdResultQt"
                      :placeholder="isReadonly ? '未录入' : '请输入其他'"
                      :readonly="isReadonly"
                      maxlength="50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="bkk bkk1">
              <div class="checkboxk checkboxk1" style="margin-top: 10px">
                <label>
                  <input
                    @change="save('aduitWyGm')"
                    type="radio"
                    :value="0"
                    v-model="data.aduitWyGm"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span
                    >开通企业网银，设置企业网银非柜面渠道向非同名银行账户和支付账户转账的累计限额</span
                  >
                </label>
                <label>
                  <input
                    @change="save('aduitWyGm')"
                    type="radio"
                    :value="1"
                    v-model="data.aduitWyGm"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>不开通高版企业网银</span>
                </label>
                <label>
                  <input
                    @change="save('aduitWyGm')"
                    type="radio"
                    :value="2"
                    v-model="data.aduitWyGm"
                    align="absmiddle"
                    :disabled="isReadonly"
                  />
                  <span>不开通非柜面渠道</span>
                </label>
                <div style="clear: both"></div>
              </div>
              <div
                v-show="parseInt(data.aduitWyGm) === 0"
                style="padding-bottom: 10px"
              >
                <div
                  class="xuline"
                  style="padding: 0 10px; margin-bottom: 5px"
                ></div>
                <div class="dcfsk">
                  <div class="hang">
                    <div class="name name2">日累计限额</div>
                    <div class="sb">元</div>
                    <input
                      style="width: calc(100% - 136px - 20px)"
                      @blur="save('aduitWyRljW')"
                      class="value value2"
                      type="number"
                      v-model="data.aduitWyRljW"
                      :readonly="isReadonly"
                      :placeholder="isReadonly ? '未录入' : '请输入日累计限额'"
                    />
                  </div>
                  <div class="hang">
                    <div class="name name2">日累计笔数</div>
                    <div class="sb"></div>
                    <input
                      style="width: calc(100% - 136px - 20px)"
                      @blur="save('aduitWyRljB')"
                      class="value value2"
                      type="number"
                      v-model="data.aduitWyRljB"
                      :readonly="isReadonly"
                      :placeholder="isReadonly ? '未录入' : '请输入日累计笔数'"
                    />
                  </div>
                  <div class="hang">
                    <div class="name name2">年累计限额</div>
                    <div class="sb">元</div>
                    <input
                      style="width: calc(100% - 136px - 20px)"
                      @blur="save('aduitWyNljW')"
                      class="value value2"
                      type="number"
                      v-model="data.aduitWyNljW"
                      :readonly="isReadonly"
                      :placeholder="isReadonly ? '未录入' : '请输入年累计限额'"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="bkk bkk1">
              <div class="hang hang1">
                <div class="hangline"></div>
                <div class="name name2">客户管理部门</div>
                <select
                  @change="save('aduitCustGlbm')"
                  dir="rtl"
                  class="value value2"
                  v-model="data.aduitCustGlbm"
                  name=""
                  id=""
                  :style="
                    'color:#' +
                    (data.aduitCustGlbm === '' ||
                    data.aduitCustGlbm == undefined
                      ? '999'
                      : '0047BC')
                  "
                  :disabled="isReadonly"
                >
                  <option :value="''">
                    {{ isReadonly ? "未录入" : "请选择" }}
                  </option>
                  <option :value="0">公司业务部</option>
                  <option :value="1">战略客户部</option>
                  <option :value="2">机构业务部</option>
                  <option :value="3">国际业务部</option>
                  <option :value="4">投资托管业务部</option>
                  <option :value="5">小企业业务部</option>
                  <option :value="6">资金结算部</option>
                  <option :value="7">住房金融和个人信贷部</option>
                  <option :value="8">同业业务中心</option>
                  <option :value="9">个人金融部</option>
                </select>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="bkk bkk1">
              <div class="hang hang1">
                <div class="hangline"></div>
                <div class="name name4">四部委标准企业规模</div>
                <select
                  @change="save('aduitQyGm')"
                  dir="rtl"
                  class="value value6"
                  v-model="data.aduitQyGm"
                  name=""
                  id=""
                  :style="
                    'color:#' +
                    (data.aduitQyGm === '' || data.aduitQyGm == undefined
                      ? '999'
                      : '0047BC')
                  "
                  :disabled="isReadonly"
                >
                  <option :value="''">
                    {{ isReadonly ? "未录入" : "请选择" }}
                  </option>
                  <option :value="0">大型</option>
                  <option :value="1">中型</option>
                  <option :value="2">小型</option>
                  <option :value="3">微型</option>
                </select>
                <div style="clear: both"></div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="bkk bkk1">
              <div class="hang hang2">
                <div class="hangline"></div>
                <div class="name name5">其他事项</div>
                <textarea
                  @input="save('aduitQt')"
                  class="sm"
                  style="height: 200px"
                  v-model="data.aduitQt"
                  name=""
                  id=""
                  :placeholder="
                    isReadonly ? '未录入' : '填写其他事项(不超过200字)'
                  "
                  maxlength="200"
                  :readonly="isReadonly"
                ></textarea>
              </div>
            </div>

            <div class="jg"></div>
            <div class="jg"></div>
            <div class="jg"></div>

            <div class="jg"></div>
            <div class="jg"></div>
            <div class="jg"></div>

            <div class="jg"></div>
            <div class="jg"></div>
            <div class="jg"></div>
          </div>
        </div>
        <div class="page" v-if="false">
          <div class="bkk">
            <div class="checkboxk checkboxk1" style="margin-top: 10px">
              <label>
                <input
                  @change="savesh('aduitWyGm')"
                  type="radio"
                  :value="0"
                  v-model="data.aduitWyGm"
                  align="absmiddle"
                  :disabled="!isVerify"
                />
                <span
                  >开通企业网银，设置企业网银非柜面渠道向非同名银行账户和支付账户转账的累计限额</span
                >
              </label>
              <label>
                <input
                  @change="savesh('aduitWyGm')"
                  type="radio"
                  :value="1"
                  v-model="data.aduitWyGm"
                  align="absmiddle"
                  :disabled="!isVerify"
                />
                <span>不开通高版企业网银</span>
              </label>
              <label>
                <input
                  @change="savesh('aduitWyGm')"
                  type="radio"
                  :value="2"
                  v-model="data.aduitWyGm"
                  align="absmiddle"
                  :disabled="!isVerify"
                />
                <span>不开通非柜面渠道</span>
              </label>
              <div style="clear: both"></div>
            </div>
            <div
              v-show="parseInt(data.aduitWyGm) === 0"
              style="padding-bottom: 10px"
            >
              <div
                class="xuline"
                style="padding: 0 10px; margin-bottom: 5px"
              ></div>
              <div class="dcfsk">
                <div class="hang">
                  <div class="name name2">日累计限额</div>
                  <div class="sb">元</div>
                  <input
                    style="width: calc(100% - 136px - 20px)"
                    @blur="savesh('aduitWyRljW')"
                    class="value value2"
                    type="number"
                    v-model="data.aduitWyRljW"
                    :readonly="!isVerify"
                    :placeholder="!isVerify ? '未录入' : '请输入日累计限额'"
                  />
                </div>
                <div class="hang">
                  <div class="name name2">日累计笔数</div>
                  <div class="sb"></div>
                  <input
                    style="width: calc(100% - 136px - 20px)"
                    @blur="savesh('aduitWyRljB')"
                    class="value value2"
                    type="number"
                    v-model="data.aduitWyRljB"
                    :readonly="!isVerify"
                    :placeholder="!isVerify ? '未录入' : '请输入日累计笔数'"
                  />
                </div>
                <div class="hang">
                  <div class="name name2">年累计限额</div>
                  <div class="sb">元</div>
                  <input
                    style="width: calc(100% - 136px - 20px)"
                    @blur="savesh('aduitWyNljW')"
                    class="value value2"
                    type="number"
                    v-model="data.aduitWyNljW"
                    :readonly="!isVerify"
                    :placeholder="!isVerify ? '未录入' : '请输入年累计限额'"
                  />
                </div>
              </div>
            </div>

            <div class="jg"></div>
            <div class="hang hang1">
              <div class="hangline"></div>
              <div class="name name2">客户管理部门</div>
              <select
                @change="savesh('aduitCustGlbm')"
                dir="rtl"
                class="value value2"
                v-model="data.aduitCustGlbm"
                name=""
                id=""
                :style="
                  'color:#' +
                  (data.aduitCustGlbm === '' || data.aduitCustGlbm == undefined
                    ? '999'
                    : '0047BC')
                "
                :disabled="!isVerify"
              >
                <option :value="''">
                  {{ !isVerify ? "未录入" : "请选择" }}
                </option>
                <option :value="0">公司业务部</option>
                <option :value="1">战略客户部</option>
                <option :value="2">机构业务部</option>
                <option :value="3">国际业务部</option>
                <option :value="4">投资托管业务部</option>
                <option :value="5">小企业业务部</option>
                <option :value="6">资金结算部</option>
                <option :value="7">住房金融和个人信贷部</option>
                <option :value="8">同业业务中心</option>
                <option :value="9">个人金融部</option>
              </select>
              <div style="clear: both"></div>
            </div>

            <div class="jg"></div>
            <div class="hang hang1">
              <div class="hangline"></div>
              <div class="name name4">四部委标准企业规模</div>
              <select
                @change="savesh('aduitQyGm')"
                dir="rtl"
                class="value value6"
                v-model="data.aduitQyGm"
                name=""
                id=""
                :style="
                  'color:#' +
                  (data.aduitQyGm === '' || data.aduitQyGm == undefined
                    ? '999'
                    : '0047BC')
                "
                :disabled="!isVerify"
              >
                <option :value="''">
                  {{ !isVerify ? "未录入" : "请选择" }}
                </option>
                <option :value="0">大型</option>
                <option :value="1">中型</option>
                <option :value="2">小型</option>
                <option :value="3">微型</option>
              </select>
              <div style="clear: both"></div>
            </div>

            <div class="jg"></div>
            <div class="hang hang2">
              <div class="hangline"></div>
              <div class="name name5">其他事项</div>
              <textarea
                @input="savesh('aduitQt')"
                class="sm"
                style="height: 200px"
                v-model="data.aduitQt"
                name=""
                id=""
                :placeholder="
                  !isVerify ? '未录入' : '填写其他事项(不超过200字)'
                "
                maxlength="200"
                :readonly="!isVerify"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btnkk">
      <div class="btn bg1" v-if="showSubmit" @click="submit">提交</div>
      <div class="btn bg1" v-if="isVerify" @click="verify(true)">通过</div>
      <div
        class="btn bg2"
        v-if="isVerify"
        @click="
          () => {
            show_shenhe = true;
          }
        "
      >
        不通过
      </div>
      <!-- <div class="btn bg1" v-if="isReadonly&&canfenpei" @click="goFenpei">分配</div>
            <div class="btn bg1" v-if="isReadonly&&refenpei" @click="goFenpei">重新分配</div> -->
      <div class="btn bg2" v-if="canJujue" @click="jujueClick">拒绝</div>
      <div
        class="btn bg2"
        v-if="showJujue"
        @click="
          () => {
            show_jujue = true;
          }
        "
      >
        拒绝原因
      </div>
      <div
        class="btn bg3"
        v-if="showXiugaiyijian"
        @click="
          () => {
            show_xgyj = true;
          }
        "
      >
        <img src="../../assets/details/img/xie.png" />修改意见
      </div>
    </div>
  </div>

  <div
    class="jujuepop"
    v-show="show_jujue"
    @click="
      () => {
        show_jujue = false;
      }
    "
  >
    <div class="jujuek" @click.stop="">
      <div class="jujueh">
        <img src="../../assets/details/img/xie.png" align="absmiddle" />
        拒绝原因
      </div>
      <img
        class="cc"
        src="../../assets/details/img/cc.png"
        @click="
          () => {
            show_jujue = false;
          }
        "
      />
      <div class="jujuec">
        <select
          v-show="isSbJujue"
          class="jujuesel"
          v-model="data.auditzMsg111"
          name=""
          id=""
          :disabled="!canJujue"
        >
          <option :value="''">请选择</option>
          <option v-for="(item, index) in msg" :key="index" :value="item">
            {{ item }}
          </option>
          <option :value="'其他原因'">其他原因</option>
        </select>
        <textarea
          class="sm"
          v-show="(isSbJujue && data.auditzMsg111 == '其他原因') || !isSbJujue"
          style="margin-top: 10px"
          v-model="data.auditzMsg1"
          name=""
          id=""
          placeholder="填写原因(不超过50字)"
          maxlength="50"
          :readonly="!canJujue"
        ></textarea>

        <div class="btn1" v-if="canJujue" @click="jujue">提交</div>
      </div>
    </div>
  </div>

  <div
    class="jujuepop"
    v-show="show_shenhe"
    @click="
      () => {
        show_shenhe = false;
      }
    "
  >
    <div class="jujuek" @click.stop="">
      <div class="jujueh">
        <img src="../../assets/details/img/xie.png" align="absmiddle" />
        修改意见
      </div>
      <img
        class="cc"
        src="../../assets/details/img/cc.png"
        @click="
          () => {
            show_shenhe = false;
          }
        "
      />
      <div class="jujuec">
        <textarea
          class="sm"
          v-model="data.auditzMsg2"
          name=""
          id=""
          placeholder="填写修改意见(不超过50字)"
          maxlength="50"
          :readonly="!isReadonly"
        ></textarea>

        <div class="btn1" @click="verify(false)">提交</div>
      </div>
    </div>
  </div>

  <div
    class="xgyjpop"
    v-show="show_xgyj"
    @click="
      () => {
        show_xgyj = false;
      }
    "
  >
    <div class="xgyjk">
      <div class="xgyjh">
        <img src="../../assets/details/img/xie.png" align="absmiddle" />
        修改意见
      </div>
      <img class="cc" src="../../assets/details/img/cc.png" />
      <div class="xgyjc">
        {{ data.auditMsg }}
      </div>
    </div>
  </div>

  <div
    class="ylimg"
    v-show="show_yl"
    @click="yulan(true, '')"
    :style="'background-image:url(' + ylitem + ');'"
  ></div>

  <loading v-show="showloading"></loading>
</template>
<script>
import axios from "axios";
import mytab1 from "../../components/mytab1.vue";
import screenlist from "../../components/screenlist.vue";
import loading from "../../components/loading.vue";
import item from "../../components/item.vue";
import router from "../../router/router.js";
import { compress } from "../../libs/imgtools";
import { useRoute } from "vue-router";
import Setting from "@/setting";
import swal from "sweetalert2";
import EXIF from "exif-js";
import watermark from "../../libs/watermark.js";
import {
  getNowDateTime,
  js_strto_time,
  algorithm,
  distanceFormat,
} from "../../libs/utils.js";
import {
  getDetails,
  edityy,
  concat,
  save,
  savesh,
  uploadImg,
  uploadVideo,
  refused,
  wxConfig,
  submit,
  audit,
  address,
  coding,
  business,
  cardidBack,
  cardidFront,
} from "@/api/content";

export default {
  data() {
    return {
      timevalue: "",
      show: false, //弹出框
      minDate: new Date(1949, 0, 1), //最小日期
      maxDate: new Date(3022, 10, 1), //最大日期
      currentDate: new Date(), //当前日期
      Setting,
      isScan: true,
      data: {
        detailId: 0,
        status: Setting.Status.status0,
        enterpriseName: "", //企业名称
        operator: "", //联系人
        phone: "", //电话
        applyDate: "", //预约时间
        idNo: "", //身份证号
        openAccountBranch: "", //开户网点
        dcsy: 0, //调查事由
        dcsyQt: "", //其他调查事由
        dcsyXxsm: "", //调查事由详细说明
        accountType: "", //账户性质
        dcfs: 0, //调查方式
        dcsj: "", //核实时间 2022-05-23 08:00
        qydjry: "", //对接人
        yhgsry: "", //银行随同人员
        hsdz: "", //核实地址
        sjjydz: "", //实际经营地址
        zcdzExist: "", //注册地址是否存在
        zcdzSm: "", //注册地址不存在——情况说明
        jydzExist: "", //经营地址是否存在
        jydzSm: "", //经营地址不存在，情况说明
        jydzZcdz: "", //经营地址与注册地址不一致
        jydzZcdzSm: "", //经营地址与注册地址不一致说明
        frywblyy: "", //法人办理业务意愿
        frywblyySm: "", //法人办理业务意愿说明
        frkhmd: [], //法人开户目的
        frkhmdSm: "", //法人开户目的说明
        dwzjly: [], //单位资金来源
        dwzjlySm: "", //单位资金来源说明
        dwjyqk: [], //单位经营情况
        dwjyqkSm: "", //单位经营情况说明
        dwjyqkbyzSm: "", //单位经营情况不一致说明
        dwjyqkqtSm: "", //单位经营情况其他说明
        cwglkzsp: [], //财务管理内部控制情况
        cwglkzspSm: "", //财务管理内部控制水平说明
        sxjl: [], //失信记录
        fxdjDw: "", //单位风险等级
        fxdjFr: "", //法人风险等级
        fxdjSm: "", //风险等级说明
        qtycqkSm: "", //其他异常情况说明

        yxwj: [], //有效文件
        yxwjZmwj: [], //证明文件
        yxwjZmwjQt: "", //其他证明文件
        yxwjZmwjYxq: "", //证明文件有效期
        tyshxydm: "", //统一社会信用代码
        frXm: "", //法人或者负责人姓名
        frLxfs: "", //法人联系方式
        fzrIdType: "", //法人证件类型
        fzrIdNo: "", //法人证件号
        fzrIdYxq: "", //法人证件有效期
        proxyName: "", //代理人姓名
        proxyPhoneNumber: "", //代理人联系方式
        proxyIdType: "", //代理人证件类型
        proxyIdNo: "", //代理人证件号
        proxyZjyxq: "", //代理人证件有效期
        yxwj_qt: "", //其他有效文件

        khflLx: "", //客户分类——类型
        khflGlbm: "", //客户分类——管理部门
        keflKscp: "", //客户分类——可售产品
        khflZjly: "", //客户分类——资金用途
        keflQygm: "", //客户分类——企业规模
        wyxeKz: "", //账户非柜面业务管控
        wyxeFtmRljW: "", //非同名账户转账日累计__W
        wyxeFtmRljB: "", //非同名账户转账日累计__笔
        wyxeGzsDbW: "", //公转私限额日单笔__W
        wyxeGzsRljW: "", //公转私限额日累计__W
        ktwyJskQtSm: "", //开通网银/结算卡/转账功能其他说明
        zhgk: "", //账户管控
        zhgkSm: "", //账户管控说明
        resultQtSm: "", //其他说明

        annexMt: [""], //门头照
        annexJycs: [""], //经营场所照
        annexQt: [""], //其他照

        //多余的
        yxwjZmwjYxqtype: "", //证明文件有效期是否长期
        yxwjZmwjYxq1: "", //证明文件有效期结束
        fzrIdYxqtype: "", //法人证件有效期是否长期
        fzrIdYxq1: "", //法人证件有效期结束
        proxyZjyxqtype: "", //代理人证件有效期是否长期
        proxyZjyxq1: "", //代理人证件有效期结束
      },
      id: "",
      msg: [],
      //展示权限 1尽调 2分配
      type: 1,
      //tab相关
      tablist: [],
      tabindex: 0,
      //加载动画相关
      showloading: false,

      show_yxwjZmwj: false,
      show_fzrxx: false,
      show_dlrxx: false,

      show_xgyj: false,
      show_jujue: false,
      show_shenhe: false,

      isloaded: false, //是否加载完成，用于监听器判断
      show_yl: false,

      city: "",
      city1: "",
    };
  },
  components: {
    mytab1,
    screenlist,
    loading,
    item,
  },
  computed: {
    isReadonly() {
      //return Setting.UserType.Verif == sessionStorage.getItem("usertype")
      return (
        this.type == 2 ||
        this.type == 3 ||
        (Setting.Status.status1 != this.data.status &&
          Setting.Status.status4 != this.data.status)
      );
    },
    isjieqia() {
      //return Setting.UserType.Verif == sessionStorage.getItem("usertype")
      return this.type == 1;
    },
    canfenpei() {
      return Setting.Status.status0 == this.data.status;
    },
    refenpei() {
      return (
        Setting.Status.status0 != this.data.status &&
        Setting.Status.status_1_1 != this.data.status &&
        Setting.Status.status_1_2 != this.data.status &&
        Setting.Status.status_1_3 != this.data.status &&
        Setting.Status.status_1_4 != this.data.status &&
        Setting.Status.status3 != this.data.status
      );
    },
    isVerify() {
      return (
        this.type == 3 &&
        this.$store.state.userinfo.userId == this.data.auditBy &&
        Setting.Status.status2 == this.data.status
      );
    },
    showXiugaiyijian() {
      return this.data.status == Setting.Status.status4;
    },
    showSubmit() {
      return (
        !this.isReadonly &&
        (Setting.Status.status1 == this.data.status ||
          Setting.Status.status4 == this.data.status)
      );
    },
    //是否可以拒绝
    canJujue() {
      /* return (this.type==2&&(parseInt(this.data.status)==Setting.Status.status0||parseInt(this.data.status)==Setting.Status.status3))||
            (this.type==1&&(parseInt(this.data.status)===Setting.Status.status1||parseInt(this.data.status)==Setting.Status.status4))||
            (this.type==3&&parseInt(this.data.status)==Setting.Status.status2) */
      return (
        (this.type == 2 &&
          parseInt(this.data.status) == Setting.Status.status0) ||
        (this.type == 1 &&
          (parseInt(this.data.status) === Setting.Status.status1 ||
            parseInt(this.data.status) == Setting.Status.status4)) ||
        (this.type == 3 && parseInt(this.data.status) == Setting.Status.status2)
      );
    },
    showJujue() {
      return parseInt(this.data.status) < Setting.Status.status0;
    },
    isSbJujue() {
      //是否是需要下拉的拒绝
      return (
        [
          Setting.Status.status0,
          Setting.Status.status1,
          Setting.Status.status2,
        ].indexOf(parseInt(this.data.status)) != -1
      );
    },
  },
  //@clickCount()
  mounted() {
    let route = useRoute();
    let id = route.query.id;
    this.type = route.query.type;
    this.id = id;

    this.nowtime = getNowDateTime(); //'2022-06-13T00:00:00'

    //设置title
    if (this.type == 2) {
      document.title = "分配";
    } else if (this.type == 1) {
      document.title = "尽调";
    } else if (this.type == 3) {
      document.title = "审核";
    }
    //初始化tab数据
    this.tablist = [
      { status: 0, name: "接洽信息" },
      /* {status:1,name:'拍照'},
            {status:2,name:'尽调信息'},
            {status:3,name:'审核情况'}, */
    ];
    //初始化列表
    this.getData();

    //注册jssdk
    setTimeout(() => {
      this.agentConfig();
    }, 200);

    if (Setting.hasWatermark) watermark.set(this.$store.state.userinfo.uaap);
  },
  watch: {
    "data.annexMt": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexMt", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexZcdMt": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexZcdMt", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexJycs": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexJycs", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexZcdJycs": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexZcdJycs", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexQt": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexQt", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexZcdQt": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexZcdQt", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexVideo": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexVideo", a);
      },
      immediate: false,
      deep: true,
    },
    "data.annexZcdVideo": {
      handler(newdata, olddata) {
        if (!this.isloaded) return;
        let a = newdata.slice();

        if (a[a.length - 1] == "" && a.length > 1) {
          a.pop();
        }
        a = a.join(",");
        this.save("annexZcdVideo", a);
      },
      immediate: false,
      deep: true,
    },
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    bbb(value) {
      document.activeElement.blur();
      // console.log(1111);
      console.log(value);
      this.timevalue = value;
      this.show = true;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-01
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    confirm1() {
      console.log(this.timeFormat(this.currentDate));
      // console.log(this.timevalue);
      if (this.timevalue == "yxwjZmwjYxq") {
        this.data.yxwjZmwjYxq = this.timeFormat(this.currentDate);
        this.save("yxwjZmwjYxq");
      }
      if (this.timevalue == "yxwjZmwjYxq1") {
        this.data.yxwjZmwjYxq1 = this.timeFormat(this.currentDate);
        this.save("yxwjZmwjYxq1");
      }
      if (this.timevalue == "fzrIdYxq") {
        this.data.fzrIdYxq = this.timeFormat(this.currentDate);
        this.save("fzrIdYxq");
      }
      if (this.timevalue == "fzrIdYxq1") {
        this.data.fzrIdYxq1 = this.timeFormat(this.currentDate);
        this.save("fzrIdYxq1");
      }
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    //扫描ocr
    scan(i) {
      let that = this;
      switch (i) {
        case 1:
          swal({
            text: "请清晰的拍摄营业执照有该信息的部分~",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              that.$refs.scanInput1.dispatchEvent(new MouseEvent("click"));
            }
          });
          break;
        case 2:
          swal({
            text: "请清晰的拍摄身份证正面~",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              that.$refs.scanInput2.dispatchEvent(new MouseEvent("click"));
            }
          });
          break;
        case 3:
          swal({
            text: "请清晰的拍摄身份证背面~",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              that.$refs.scanInput3.dispatchEvent(new MouseEvent("click"));
            }
          });
          break;
      }
    },
    //预览图片
    yulan(bool, item) {
      if (bool && item != "") {
        this.show_yl = !this.show_yl;
        this.ylitem = item;
      } else if (item == "") {
        this.show_yl = false;
        this.ylitem = "";
      }
    },
    //审核
    verify(is) {
      console.log(this.data);

      let status = 0;
      let msg = "";
      if (is) {
        status = Setting.Status.status3;

        if (
          this.data.aduitWyGm === "" ||
          this.data.aduitWyGm == null ||
          this.data.aduitWyGm == undefined
        ) {
          swal({ text: "请选择是否开通企业网银" });
          return;
        } else if (parseInt(this.data.aduitWyGm) === 0) {
          if (
            this.data.aduitWyRljW === "" ||
            this.data.aduitWyRljW == null ||
            this.data.aduitWyRljW == "null" ||
            this.data.aduitWyRljW == undefined
          ) {
            swal({ text: "请填写日累计限额" });
            return;
          }
          if (
            this.data.aduitWyRljB === "" ||
            this.data.aduitWyRljB == null ||
            this.data.aduitWyRljB == "null" ||
            this.data.aduitWyRljB == undefined
          ) {
            swal({ text: "请填写日累计笔数" });
            return;
          }
          if (
            this.data.aduitWyNljW === "" ||
            this.data.aduitWyNljW == null ||
            this.data.aduitWyNljW == "null" ||
            this.data.aduitWyNljW == undefined
          ) {
            swal({ text: "请填写年累计限额" });
            return;
          }
        }

        if (
          this.data.aduitCustGlbm === "" ||
          this.data.aduitCustGlbm == null ||
          this.data.aduitCustGlbm == undefined
        ) {
          swal({ text: "请选择客户管理部门" });
          return;
        }

        if (
          this.data.aduitQyGm === "" ||
          this.data.aduitQyGm == null ||
          this.data.aduitQyGm == undefined
        ) {
          swal({ text: "请选择四部委标准企业规模" });
          return;
        }
      } else {
        status = Setting.Status.status4;
        msg = this.data.auditzMsg2;
      }

      this.showloading = true;
      audit({
        detailId: this.id,
        msg: msg,
        status: status,
      })
        .then((res) => {
          this.showloading = false;
          if (res === false) return;
          let that = this;
          swal({
            text: "审核成功",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              that.show_shenhe = false;
              router.go(-1);
            }
          });
        })
        .catch((res) => {
          console.log(res);
          swal({ text: "连接失败！" });
          this.showloading = false;
        });
    },
    //提交
    submit() {
      console.log("触发了提交", this.data);
      if (this.data.enterpriseName == null || this.data.enterpriseName == "") {
        swal({ text: "“接洽信息-企业名称”不能为空" });
        return;
      }
      if (this.data.accountType == null || this.data.accountType == "") {
        swal({ text: "请选择“接洽信息-账户性质”" });
        return;
      }

      /* if(this.data.idNo==null||this.data.idNo=='') {
                swal({ text: '“接洽信息-身份证号”不能为空' }); return;
            } */

      /* let reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if(!reg.test(this.data.idNo))
            {
                swal({ text: "身份证号格式不正确" }); return;
            } */

      if (
        !("," + this.data.annexType?.toString() + ",").includes(",0,") &&
        !("," + this.data.annexType?.toString() + ",").includes(",1,")
      ) {
        swal({ text: "请勾选“拍照-要尽调的地址”" });
        return;
      }

      if (("," + this.data.annexType?.toString() + ",").includes(",0,")) {
        if (this.data.annexMt[0] == "") {
          swal({ text: "请在“拍照-经营地门头”上传至少一张照片" });
          return;
        }

        if (this.data.annexJycs[0] == "") {
          swal({ text: "请在“拍照-经营地场所”上传至少一张照片" });
          return;
        }

        //if(this.data.annexVideo[0]=='') {
        //    swal({ text: '请在“拍照-经营地-视频”上传视频' }); return;
        //}

        if (
          this.data.longitude == null ||
          this.data.longitude == "" ||
          this.data.latitude == null ||
          this.data.latitude == "" ||
          this.data.location == null ||
          this.data.location == ""
        ) {
          console.log(111);
          swal({ text: "请在“拍照-经营地-点击定位”点击按钮定位" });
          return;
        }
      }

      if (("," + this.data.annexType?.toString() + ",").includes(",1,")) {
        if (this.data.annexZcdMt[0] == "") {
          swal({ text: "请在“拍照-注册地门头”上传至少一张照片" });
          return;
        }

        if (this.data.annexZcdJycs[0] == "") {
          swal({ text: "请在“拍照-注册地场所”上传至少一张照片" });
          return;
        }

        //if(this.data.annexZcdVideo[0]=='') {
        //    swal({ text: '请在“拍照-注册地-视频”上传视频' }); return;
        //}

        if (
          this.data.zcdLongitude == null ||
          this.data.zcdLongitude == "" ||
          this.data.zcdLatitude == null ||
          this.data.zcdLatitude == "" ||
          this.data.zcdLocation == null ||
          this.data.zcdLocation == ""
        ) {
          swal({ text: "请在“拍照-注册地-点击定位”点击按钮定位" });
          return;
        }
      }

      if (this.data.fzrName == null || this.data.fzrName == "") {
        swal({
          text: "“尽调信息-客户法定代表人/单位负责人姓名”不能为空",
        });
        return;
      }

      if (this.data.fzrPhone == null || this.data.fzrPhone == "") {
        swal({
          text: "“尽调信息-客户法定代表人/单位负责人电话”不能为空",
        });
        return;
      }

      if (this.data.cwfzrPhone == null || this.data.cwfzrPhone == "") {
        swal({ text: "“尽调信息-财务负责人电话”不能为空" });
        return;
      }

      if (
        this.data.openAccountBranch == null ||
        this.data.openAccountBranch == ""
      ) {
        swal({ text: "“尽调信息-开户行”不能为空" });
        return;
      }

      if (this.data.yxwj.length <= 0) {
        swal({ text: "请勾选“尽调信息-有效文件”" });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("壹") &&
        this.data.yxwjZmwj.length <= 0
      ) {
        swal({ text: "请勾选“尽调信息-证明文件”" });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("壹") &&
        ("," + this.data.yxwjZmwj?.toString() + ",").includes(4) &&
        (this.data.yxwjZmwjQt == null || this.data.yxwjZmwjQt == "")
      ) {
        swal({ text: "“尽调信息-证明文件-其他证明文件”不能为空" });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("壹") &&
        (this.data.yxwjZmwjYxq == null || this.data.yxwjZmwjYxq == "")
      ) {
        swal({ text: "“尽调信息-证明文件-证明文件有效期”不能为空" });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("壹") &&
        (this.data.enterpriseIdNo == null || this.data.enterpriseIdNo == "")
      ) {
        swal({
          text: "“尽调信息-证明文件-组织机构代码/统一社会信用代码”不能为空",
        });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("贰") &&
        (this.data.fzrIdType == null || this.data.fzrIdType == "")
      ) {
        swal({
          text: "“尽调信息-法定代表人/单位负责人信息-身份证件类型”不能为空",
        });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("贰") &&
        (this.data.fzrIdNo == null || this.data.fzrIdNo == "")
      ) {
        swal({
          text: "“尽调信息-法定代表人/单位负责人信息-身份证件号码”不能为空",
        });
        return;
      }

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("贰") &&
        (this.data.fzrIdYxq == null || this.data.fzrIdYxq == "")
      ) {
        swal({
          text: "“尽调信息-法定代表人/单位负责人信息-证件有效期”不能为空",
        });
        return;
      }

      /* if((','+this.data.yxwj?.toString()+',').includes('叁')&&(this.data.proxyName==null||this.data.proxyName=='')) {
                swal({ text: '“尽调信息-代理人信息-姓名”不能为空' }); return;
            }

            if((','+this.data.yxwj?.toString()+',').includes('叁')&&(this.data.proxyPhoneNumber==null||this.data.proxyPhoneNumber=='')) {
                swal({ text: '“尽调信息-代理人信息-联系方式”不能为空' }); return;
            }

            if((','+this.data.yxwj?.toString()+',').includes('叁')&&(this.data.proxyIdType==null||this.data.proxyIdType=='')) {
                swal({ text: '“尽调信息-代理人信息-身份证件类型”不能为空' }); return;
            }

            if((','+this.data.yxwj?.toString()+',').includes('叁')&&(this.data.proxyIdNo==null||this.data.proxyIdNo=='')) {
                swal({ text: '“尽调信息-代理人信息-身份证件号码”不能为空' }); return;
            }

            if((','+this.data.yxwj?.toString()+',').includes('叁')&&(this.data.proxyZjyxq==null||this.data.proxyZjyxq=='')) {
                swal({ text: '“尽调信息-代理人信息-证件有效期”不能为空' }); return;
            } */

      if (
        ("," + this.data.yxwj?.toString() + ",").includes("肆") &&
        (this.data.yxwjQt == null || this.data.yxwjQt == "")
      ) {
        swal({ text: "“尽调信息-代理人信息-其他有效文件”不能为空" });
        return;
      }

      if (this.data.yzwfsx == null || this.data.yzwfsx === "") {
        swal({ text: "请勾选“尽调信息-是否严重违法失信企业”" });
        return;
      }

      if (this.data.zcdExists == null || this.data.zcdExists === "") {
        swal({
          text: "请勾选“尽调信息-是否注册地址不存在或虚构经营场所”",
        });
        return;
      }

      if (this.data.zcdJydYz == null || this.data.zcdJydYz === "") {
        swal({ text: "请勾选“尽调信息-经营地与注册地是否为同一地址”" });
        return;
      }

      if (this.data.zcdYd == null || this.data.zcdYd === "") {
        swal({ text: "请勾选“尽调信息-注册地是否异地”" });
        return;
      }

      if (this.data.jydYd == null || this.data.jydYd === "") {
        swal({ text: "请勾选“尽调信息-经营地是否异地”" });
        return;
      }

      if (this.data.fzrKhyy == null || this.data.fzrKhyy === "") {
        swal({
          text: "请勾选“尽调信息-法定代表人/单位负责人开户意愿”",
        });
        return;
      }

      if (this.data.zmwjSqsZs == null || this.data.zmwjSqsZs === "") {
        swal({ text: "请勾选“尽调信息-客户证明文件、授权书是否真实”" });
        return;
      }

      if (this.data.zcdQtdz == null || this.data.zcdQtdz === "") {
        swal({
          text: "请勾选“尽调信息-注册地址是否为集群、村庄、写字楼内工位、住宅或托管地址”",
        });
        return;
      }

      if (this.data.fzrBjqk == null || this.data.fzrBjqk === "") {
        swal({
          text: "请勾选“尽调信息-法定代表人/单位负责人对单位经营规模及业务背景等情况是否清楚”",
        });
        return;
      }

      if (this.data.hssj == null || this.data.hssj === "") {
        swal({ text: "“尽调信息-上门核实时间”不能为空" });
        return;
      }

      if (this.data.qydjry == null || this.data.qydjry === "") {
        swal({ text: "“尽调信息-企业对接人员”不能为空" });
        return;
      }

      if (this.data.jdResultKh == null || this.data.jdResultKh === "") {
        swal({ text: "请勾选“尽调信息-尽职调查结论”" });
        return;
      }

      if (
        parseInt(this.data.jdResultKh) === 1 &&
        (this.data.jdResultKh == null || this.data.jdResultKh === "")
      ) {
        swal({ text: "“尽调信息-尽职调查结论-其他”不能为空" });
        return;
      }

      if (
        this.data.aduitWyGm === "" ||
        this.data.aduitWyGm == null ||
        this.data.aduitWyGm == undefined
      ) {
        swal({ text: "请选择是否开通企业网银" });
        return;
      } else if (parseInt(this.data.aduitWyGm) === 0) {
        if (
          this.data.aduitWyRljW === "" ||
          this.data.aduitWyRljW == null ||
          this.data.aduitWyRljW == "null" ||
          this.data.aduitWyRljW == undefined
        ) {
          swal({ text: "请填写日累计限额" });
          return;
        }
        if (
          this.data.aduitWyRljB === "" ||
          this.data.aduitWyRljB == null ||
          this.data.aduitWyRljB == "null" ||
          this.data.aduitWyRljB == undefined
        ) {
          swal({ text: "请填写日累计笔数" });
          return;
        }
        if (
          this.data.aduitWyNljW === "" ||
          this.data.aduitWyNljW == null ||
          this.data.aduitWyNljW == "null" ||
          this.data.aduitWyNljW == undefined
        ) {
          swal({ text: "请填写年累计限额" });
          return;
        }
      }

      if (
        this.data.aduitCustGlbm === "" ||
        this.data.aduitCustGlbm == null ||
        this.data.aduitCustGlbm == undefined
      ) {
        swal({ text: "请选择客户管理部门" });
        return;
      }

      if (
        this.data.aduitQyGm === "" ||
        this.data.aduitQyGm == null ||
        this.data.aduitQyGm == undefined
      ) {
        swal({ text: "请选择四部委标准企业规模" });
        return;
      }

      this.showloading = true;
      submit({
        detailId: this.id,
        idNo: "", //this.data.idNo,
        status: Setting.Status.status2,
      })
        .then((res) => {
          this.showloading = false;
          if (res === false) return;
          swal({
            text: "提交成功，请耐心等待审核",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              //router.go(0)
              location.reload();
            }
          });
        })
        .catch((res) => {
          console.log(res);
          swal({ text: "连接失败！" });
          this.showloading = false;
        });
    },
    //注册jssdk
    agentConfig() {
      wxConfig({
        url: location.href.split("#")[0],
      })
        .then((res) => {
          if (res === false) return;
          wx.agentConfig({
            corpid: res.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
            agentid: res.agentid, // 必填，企业微信的应用id （e.g. 1000247）
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
            jsApiList: ["getLocation"], //必填，传入需要使用的接口名称
            success: function (res) {
              // 回调
              console.log(res);
            },
            fail: function (res) {
              console.log(res);
              if (res.errMsg.indexOf("function not exist") > -1) {
                swal({ text: "版本过低请升级" });
              }
              swal({
                text: "注册jssdk失败，请检查是否在企业微信APP中访问此链接",
              });
            },
          });
        })
        .catch((res) => {
          console.log(res);
          swal({ text: "注册jssdk连接失败！" });
        });
    },
    //拒绝
    jujue() {
      if (this.isSbJujue) {
        if (this.data.auditzMsg111 == "") {
          swal({ text: "请选择拒绝原因" });
          return;
        }
        if (this.data.auditzMsg111 == "其他原因") {
          if (this.data.auditzMsg1 == null || this.data.auditzMsg1 == "") {
            swal({ text: "请填写拒绝原因" });
            return;
          }
        } else {
          this.data.auditzMsg1 = this.data.auditzMsg111;
        }
      } else {
        if (this.data.auditzMsg1 == null || this.data.auditzMsg1 == "") {
          swal({ text: "请填写拒绝原因" });
          return;
        }
      }

      if (this.data.accountType == null || this.data.accountType == "") {
        swal({ text: "请选择“接洽信息-账户性质”" });
        return;
      }

      let status = 0;
      if (this.data.status == Setting.Status.status0) {
        //分配拒绝
        status = Setting.Status.status_1_1;
      } else if (
        this.data.status == Setting.Status.status1 ||
        status == Setting.Status.status4
      ) {
        //尽调拒绝
        status = Setting.Status.status_1_2;
      } else if (this.data.status == Setting.Status.status2) {
        //审核拒绝
        status = Setting.Status.status_1_3;
      } else if (this.data.status == Setting.Status.status3) {
        //完成拒绝
        status = Setting.Status.status_1_4;
      } else {
        swal({ text: "错误的状态！" });
        return;
      }

      this.showloading = true;
      refused({
        detailId: this.id,
        msg: this.data.auditzMsg1,
        status: status,
      })
        .then((res) => {
          this.showloading = false;

          if (res === false) return;
          let that = this;
          swal({
            text: "操作成功",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              that.show_jujue = false;
              router.go(-1);
            }
          });
        })
        .catch((res) => {
          console.log(res);
          swal({ text: "连接失败！" });
          this.showloading = false;
        });
    },
    jujueClick() {
      this.show_jujue = true;
    },
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    gcj02tobd09: function (lng, lat) {
      var that = this;
      var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
      var PI = 3.1415926535897932384626;
      var a = 6378245.0;
      var ee = 0.00669342162296594323;
      var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
      var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
      var bd_lng = z * Math.cos(theta) + 0.0065;
      var bd_lat = z * Math.sin(theta) + 0.006;
      return [bd_lng, bd_lat];
    },
    //定位
    getLocation() {
      let that = this;
      this.showloading = true;

      wx.getLocation({
        type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          //swal({ text: latitude+'    '+longitude });

          that.data.longitude = longitude;
          that.data.latitude = latitude;
          that.save("longitude");
          that.save("latitude");

          address(Setting.CCBSDK.cappid, {
            lgt: that.data.longitude + "",
            ltt: that.data.latitude + "",
            trgtRgonRdsNVal: "",
            acsStmID: Setting.CCBSDK.Acs_Stm_ID,
            acsStmEcrptKeyCntnt: Setting.CCBSDK.AcsStm_EcrptKey_Cntnt,
          })
            .then(function (res) {
              console.log(res);
              let data = res;
              that.city = data.addressComponent[0].urbnNm;
              that.data.location = data.strctAdrInf;
              that.save("location");
              that.showloading = false;
            })
            .catch(function (error) {
              console.log(error);
              that.showloading = false;
            });
        },
        fail: function (e) {
          console.log(e);
          swal({ text: "定位失败:" + JSON.stringify(e) });
          that.showloading = false;
        },
      });
      return;

      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        console.log(r);
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
          that.data.longitude = r.point.lng;
          that.data.latitude = r.point.lat;
          that.save("longitude");
          that.save("latitude");

          address(Setting.CCBSDK.cappid, {
            lgt: that.data.longitude + "",
            ltt: that.data.latitude + "",
            trgtRgonRdsNVal: "",
            acsStmID: Setting.CCBSDK.Acs_Stm_ID,
            acsStmEcrptKeyCntnt: Setting.CCBSDK.AcsStm_EcrptKey_Cntnt,
          })
            .then(function (res) {
              console.log(res);
              let data = res;
              that.city = data.addressComponent[0].urbnNm;
              that.data.location = data.strctAdrInf;
              that.save("location");
              that.showloading = false;
            })
            .catch(function (error) {
              console.log(error);
              that.showloading = false;
            });

          /* var myGeo = new BMapGL.Geocoder();
                    // 根据坐标得到地址描述
                    myGeo.getLocation(
                        new BMapGL.Point(r.point.lng, r.point.lat),
                        function (result) {
                            if (result) {
                                console.log(result.addressComponents.city);
                                that.city = result.addressComponents.city;
                                that.data.location = result.address;
                                that.save("location");
                            }
                            that.showloading = false;
                        }
                    ); */
        } else {
          swal({ text: "failed" + this.getStatus() });
          that.showloading = false;
        }
      });
    },
    //定位
    getLocation1() {
      let that = this;
      this.showloading = true;

      wx.getLocation({
        type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          //swal({ text: latitude+'    '+longitude });

          that.data.zcdLongitude = longitude;
          that.data.zcdLatitude = latitude;
          that.save("zcdLongitude");
          that.save("zcdLatitude");

          address(Setting.CCBSDK.cappid, {
            lgt: that.data.zcdLongitude + "",
            ltt: that.data.zcdLatitude + "",
            trgtRgonRdsNVal: "",
            acsStmID: Setting.CCBSDK.Acs_Stm_ID,
            acsStmEcrptKeyCntnt: Setting.CCBSDK.AcsStm_EcrptKey_Cntnt,
          })
            .then(function (res) {
              console.log(res);
              let data = res;
              that.city1 = data.addressComponent[0].urbnNm;
              that.data.zcdLocation = data.strctAdrInf;
              that.save("zcdLocation");
              that.showloading = false;
            })
            .catch(function (error) {
              console.log(error);
              that.showloading = false;
            });
          return;

          var myGeo = new BMapGL.Geocoder();
          // 根据坐标得到地址描述
          let ssws = that.gcj02tobd09(longitude, latitude);
          //解决定位偏移
          var ssssss1 = ssws[1] - 0.00016;
          var ssssss2 = ssws[0] - 0.00016;
          myGeo.getLocation(
            new BMapGL.Point(ssssss2, ssssss1),
            function (result) {
              if (result) {
                //alert(result.address);
                that.city1 = result.addressComponents.city;
                that.data.zcdLocation = result.address;
                that.save("zcdLocation");
              }
              that.showloading = false;
            }
          );
        },
        fail: function (e) {
          console.log(e);
          swal({ text: "定位失败:" + JSON.stringify(e) });
          that.showloading = false;
        },
      });
      return;

      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        console.log(r);
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
          that.data.zcdLongitude = r.point.lng;
          that.data.zcdLatitude = r.point.lat;
          that.save("zcdLongitude");
          that.save("zcdLatitude");

          address(Setting.CCBSDK.cappid, {
            lgt: that.data.zcdLongitude + "",
            ltt: that.data.zcdLatitude + "",
            trgtRgonRdsNVal: "",
            acsStmID: Setting.CCBSDK.Acs_Stm_ID,
            acsStmEcrptKeyCntnt: Setting.CCBSDK.AcsStm_EcrptKey_Cntnt,
          })
            .then(function (res) {
              console.log(res);
              let data = res;
              that.city1 = data.addressComponent[0].urbnNm;
              that.data.zcdLocation = data.strctAdrInf;
              that.save("zcdLocation");
              that.showloading = false;
            })
            .catch(function (error) {
              console.log(error);
              that.showloading = false;
            });
          return;

          var myGeo = new BMapGL.Geocoder();
          // 根据坐标得到地址描述
          myGeo.getLocation(
            new BMapGL.Point(r.point.lng, r.point.lat),
            function (result) {
              if (result) {
                //alert(result.address);
                that.city1 = result.addressComponents.city;
                that.data.zcdLocation = result.address;
                that.save("zcdLocation");
              }
              that.showloading = false;
            }
          );
        } else {
          swal({ text: "failed" + this.getStatus() });
          that.showloading = false;
        }
      });
    },
    getPoint() {},
    /* //分配
        goFenpei() {
            
            this.goAssign = true;
            this.assign_id = this.data.id;
        }, */
    //修改身份证号
    submityy() {
      //if(this.data.idNo!=null&&this.data.idNo!='')
      /* if(this.data.idNo==null||this.data.idNo==undefined)
            {
                this.data.idNo = ''
            } */

      edityy({
        id: this.id,
        idNo: "", //this.data.idNo
      })
        .then((res) => {
          //this.data = res;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    submityy1() {
      //if(this.data.idNo!=null&&this.data.idNo!='')
      /* if(this.data.idNo==null||this.data.idNo==undefined)
            {
                this.data.idNo = ''
            } */

      edityy({
        id: this.id,
        accountType: this.data.accountType,
      })
        .then((res) => {
          //this.data = res;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //接洽
    jieqia() {
      /* var reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            
            if(!reg.test(this.data.idNo))
            {
                swal({ text: "身份证号格式不正确" });
                return;
            } */
      if (this.data.accountType == null || this.data.accountType == "") {
        swal({ text: "请选择账户性质" });
        return;
      }
      this.showloading = true;
      concat({
        detailId: this.id,
        status: 1,
        idNo: "", //this.data.idNo
      })
        .then((res) => {
          this.showloading = false;
          if (res === false) return;
          swal({
            text: "已发送接洽，请稍后查看接洽状态！",
          }).then(function (dismiss) {
            if (dismiss.value === true) {
              //router.go(0)
              location.reload();
            }
          });
        })
        .catch((res) => {
          this.showloading = false;
          console.log(res);
        });
    },
    //保存
    save(name, values) {
      //console.log(this.data[name])
      //return
      let b = "";
      if (values != undefined && values != null) {
        b = values;
      } else {
        b = this.data[name];
      }

      if (
        name == "fzrName" &&
        this.data.yxwj.includes("贰") &&
        ((this.data.fzrIdNo != "" && this.data.fzrIdNo != null) ||
          (this.data.fzrIdYxq != "" && this.data.fzrIdYxq != null))
      ) {
        swal({
          text: "客户法定代表人/单位负责人姓名已修改，请重新填写法定代表人/单位负责人信息",
        });
        this.data.fzrIdNo = "";
        this.save("fzrIdNo");
        this.data.fzrIdYxq = "";
        this.data.fzrIdYxq1 = "";
        this.save("fzrIdYxq");
      }

      if (name == "yxwj") {
        b = b.join(",");
      } else if (name == "annexType") {
        b = b.join(",");
      } else if (name == "yxwjZmwj") {
        b = b.join(",");
      } else if (name == "yxwjZmwjYxq" || name == "yxwjZmwjYxq1") {
        if (this.data.yxwjZmwjYxqtype === 0) {
          if (
            this.data.yxwjZmwjYxq != "" &&
            this.data.yxwjZmwjYxq != undefined &&
            this.data.yxwjZmwjYxq1 != "" &&
            this.data.yxwjZmwjYxq1 != undefined
          ) {
            b = this.data.yxwjZmwjYxq + "~" + this.data.yxwjZmwjYxq1;
          } else {
            return;
          }
        } else if (this.data.yxwjZmwjYxqtype === 1) {
          if (
            this.data.yxwjZmwjYxq != "" &&
            this.data.yxwjZmwjYxq != undefined
          ) {
            b = this.data.yxwjZmwjYxq + "~长期";
          } else {
            return;
          }
        } else {
          return;
        }
        name = "yxwjZmwjYxq";
      } else if (name == "fzrIdYxq" || name == "fzrIdYxq1") {
        if (this.data.fzrIdYxqtype === 0) {
          if (
            this.data.fzrIdYxq != "" &&
            this.data.fzrIdYxq != undefined &&
            this.data.fzrIdYxq1 != "" &&
            this.data.fzrIdYxq1 != undefined
          ) {
            b = this.data.fzrIdYxq + "~" + this.data.fzrIdYxq1;
          } else {
            //return;
          }
        } else if (this.data.fzrIdYxqtype === 1) {
          if (this.data.fzrIdYxq != "" && this.data.fzrIdYxq != undefined) {
            b = this.data.fzrIdYxq + "~长期";
          } else {
            //return;
          }
        } else {
          return;
        }
        name = "fzrIdYxq";
      } else if (name == "proxyZjyxq" || name == "proxyZjyxq1") {
        if (this.data.proxyZjyxqtype === 0) {
          if (
            this.data.proxyZjyxq != "" &&
            this.data.proxyZjyxq != undefined &&
            this.data.proxyZjyxq1 != "" &&
            this.data.proxyZjyxq1 != undefined
          ) {
            b = this.data.proxyZjyxq + "~" + this.data.proxyZjyxq1;
          } else {
            return;
          }
        } else if (this.data.proxyZjyxqtype === 1) {
          if (this.data.proxyZjyxq != "" && this.data.proxyZjyxq != undefined) {
            b = this.data.proxyZjyxq + "~长期";
          } else {
            return;
          }
        } else {
          return;
        }
        name = "proxyZjyxq";
      } else if (name == "hssj") {
        b = b.replace("T", " ");
        if (b.length == 16) {
          b = b + ":00";
        }
        if (b.length > 19) {
          b = b.substring(0, 19);
        }
        console.log(js_strto_time(this.data.addTime));
        console.log(
          js_strto_time(this.nowtime.replace("T", " ")),
          js_strto_time(b)
        );
        //if(js_strto_time(this.nowtime.replace('T',' '))>js_strto_time(b))
        if (js_strto_time(this.data.addTime) > js_strto_time(b)) {
          swal({ text: "“上门核实时间”不能在创建时间之前" });
          this.data.hssj = "";
          return;
        }
        if (b == ":00") {
          b = "";
        }
      }

      if (b == null || b == undefined) {
        b = "";
      }

      if (name == "location") {
        console.log(b);
        let that = this;
        let jlstr = "";
        if (b == "") {
          swal({ text: "地址不能为空" });
          return;
        }

        coding(Setting.CCBSDK.cappid, {
          strctAdrInf: b,
          urbnNm: this.city,
          acsStmID: Setting.CCBSDK.Acs_Stm_ID,
          acsStmEcrptKeyCntnt: Setting.CCBSDK.AcsStm_EcrptKey_Cntnt,
        })
          .then(function (res) {
            console.log(res);

            let jl = algorithm(
              [res.ltt, res.lgt],
              [that.data.latitude, that.data.longitude]
            );
            jlstr = distanceFormat(jl);
            if (parseInt(that.data.errorLimit) < jl) {
              //swal({ text: "您填写的地址距离您定位的位置已经超过"+that.data.errorLimit+"米（当前距离"+jlstr+"），可能会审核不通过，请注意填写！" });
              swal({
                text: "你修改的定位地址与点击定位时的地址偏差超过3000米，请核对或重新定位！",
              });
            }
            that.data.errorValue = jl;
            that.data.errorValueStr = jlstr;
            that.save("errorValue");

            that.showloading = false;
          })
          .catch(function (error) {
            console.log(error);
            that.showloading = false;
          });

        /* var myGeo = new BMapGL.Geocoder();
                myGeo.getPoint(
                    b,
                    function (point) {
                        if (point) {
                            console.log(point);
                            let jl = algorithm(
                                [point.lat, point.lng],
                                [that.data.latitude, that.data.longitude]
                            );
                            jlstr = distanceFormat(jl);
                            if (parseInt(that.data.errorLimit) < jl) {
                                //swal({ text: "您填写的地址距离您定位的位置已经超过"+that.data.errorLimit+"米（当前距离"+jlstr+"），可能会审核不通过，请注意填写！" });
                                swal({
                                    text: "你修改的定位地址与点击定位时的地址偏差超过3000米，请核对或重新定位！",
                                });
                            }
                            that.data.errorValue = jl;
                            that.data.errorValueStr = jlstr;
                            that.save("errorValue");
                        } else {
                            swal({ text: "您填写的地址没有解析到结果！" });
                            jlstr = "无法计算误差";
                            that.data.errorValue = jlstr;
                            that.data.errorValueStr = jlstr;
                            that.save("errorValue");
                        }
                    },
                    this.city
                ); */
      }
      if (name == "zcdLocation") {
        console.log(b);
        let that = this;
        let jlstr = "";
        if (b == "") {
          swal({ text: "地址不能为空" });
          return;
        }
        coding(Setting.CCBSDK.cappid, {
          strctAdrInf: b,
          urbnNm: this.city,
          acsStmID: Setting.CCBSDK.Acs_Stm_ID,
          acsStmEcrptKeyCntnt: Setting.CCBSDK.AcsStm_EcrptKey_Cntnt,
        })
          .then(function (res) {
            console.log(res);

            let jl = algorithm(
              [res.ltt, res.lgt],
              [that.data.zcdLatitude, that.data.zcdLongitude]
            );
            jlstr = distanceFormat(jl);
            if (parseInt(that.data.errorLimit) < jl) {
              //swal({ text: "您填写的地址距离您定位的位置已经超过"+that.data.errorLimit+"米（当前距离"+jlstr+"），可能会审核不通过，请注意填写！" });
              swal({
                text: "你修改的定位地址与点击定位时的地址偏差超过3000米，请核对或重新定位！",
              });
            }
            that.data.zcdErrorValue = jl;
            that.data.zcdErrorValueStr = jlstr;
            that.save("zcdErrorValue");

            that.showloading = false;
          })
          .catch(function (error) {
            console.log(error);
            that.showloading = false;
          });

        /* var myGeo = new BMapGL.Geocoder();
                myGeo.getPoint(
                    b,
                    function (point) {
                        if (point) {
                            console.log(point);
                            let jl = algorithm(
                                [point.lat, point.lng],
                                [that.data.zcdLatitude, that.data.zcdLongitude]
                            );
                            jlstr = distanceFormat(jl);
                            if (parseInt(that.data.errorLimit) < jl) {
                                //swal({ text: "您填写的地址距离您定位的位置已经超过"+that.data.errorLimit+"米（当前距离"+jlstr+"），可能会审核不通过，请注意填写！" });
                                swal({
                                    text: "你修改的定位地址与点击定位时的地址偏差超过3000米，请核对或重新定位！",
                                });
                            }
                            that.data.zcdErrorValue = jl;
                            that.data.zcdErrorValueStr = jlstr;
                            that.save("zcdErrorValue");
                        } else {
                            swal({ text: "您的地址没有解析到结果！" });
                            jlstr = "无法计算误差";
                            that.data.zcdErrorValue = jlstr;
                            that.data.zcdErrorValueStr = jlstr;
                            that.save("zcdErrorValue");
                        }
                    },
                    this.city1
                ); */
      }

      let a = '{"' + name + '":"' + b + '"}';
      a = JSON.parse(a);
      a.detailId = this.id;
      //console.log(a)
      //return
      save(a)
        .then((res) => {})
        .catch((res) => {
          console.log(res);
        });
    },
    //保存
    savesh(name, values) {
      9;
      //console.log(this.data[name])
      //return
      let b = "";
      if (values != undefined && values != null) {
        b = values;
      } else {
        b = this.data[name];
      }

      if (name == "yxwj") {
        b = b.join(",");
      } else if (name == "yxwjZmwj") {
        b = b.join(",");
      } else if (name == "yxwjZmwjYxq" || name == "yxwjZmwjYxq1") {
        if (this.data.yxwjZmwjYxqtype === 0) {
          if (
            this.data.yxwjZmwjYxq != "" &&
            this.data.yxwjZmwjYxq != undefined &&
            this.data.yxwjZmwjYxq1 != "" &&
            this.data.yxwjZmwjYxq1 != undefined
          ) {
            b = this.data.yxwjZmwjYxq + "~" + this.data.yxwjZmwjYxq1;
          } else {
            return;
          }
        } else if (this.data.yxwjZmwjYxqtype === 1) {
          if (
            this.data.yxwjZmwjYxq != "" &&
            this.data.yxwjZmwjYxq != undefined
          ) {
            b = this.data.yxwjZmwjYxq + "~长期";
          } else {
            return;
          }
        } else {
          return;
        }
        name = "yxwjZmwjYxq";
      } else if (name == "fzrIdYxq" || name == "fzrIdYxq1") {
        if (this.data.fzrIdYxqtype === 0) {
          if (
            this.data.fzrIdYxq != "" &&
            this.data.fzrIdYxq != undefined &&
            this.data.fzrIdYxq1 != "" &&
            this.data.fzrIdYxq1 != undefined
          ) {
            b = this.data.fzrIdYxq + "~" + this.data.fzrIdYxq1;
          } else {
            return;
          }
        } else if (this.data.fzrIdYxqtype === 1) {
          if (this.data.fzrIdYxq != "" && this.data.fzrIdYxq != undefined) {
            b = this.data.fzrIdYxq + "~长期";
          } else {
            return;
          }
        } else {
          return;
        }
        name = "fzrIdYxq";
      } else if (name == "proxyZjyxq" || name == "proxyZjyxq1") {
        if (this.data.proxyZjyxqtype === 0) {
          if (
            this.data.proxyZjyxq != "" &&
            this.data.proxyZjyxq != undefined &&
            this.data.proxyZjyxq1 != "" &&
            this.data.proxyZjyxq1 != undefined
          ) {
            b = this.data.proxyZjyxq + "~" + this.data.proxyZjyxq1;
          } else {
            return;
          }
        } else if (this.data.proxyZjyxqtype === 1) {
          if (this.data.proxyZjyxq != "" && this.data.proxyZjyxq != undefined) {
            b = this.data.proxyZjyxq + "~长期";
          } else {
            return;
          }
        } else {
          return;
        }
        name = "proxyZjyxq";
      } else if (name == "hssj") {
        b = b.replace("T", " ") + ":00";
      }

      if (b == null || b == undefined) {
        b = "";
      }

      let a = '{"' + name + '":"' + b + '"}';
      a = JSON.parse(a);
      a.detailId = this.id;
      //console.log(a)
      //return
      savesh(a)
        .then((res) => {})
        .catch((res) => {
          console.log(res);
        });
    },
    //切换tab监听
    changeTab(mystatus) {
      //console.log(mystatus)
      this.tabindex = mystatus;
    },
    delimg(data, index) {
      data.splice(index, 1);
      if (data[data.length - 1] !== "") {
        data.push("");
      }
    },
    uploadImgScan: function (event, i) {
      let file = event.target.files[0];

      if (file.type.indexOf("image") != 0) {
        swal({ text: "只能上传图片文件" });
        return;
      }

      let param = new FormData(); // 创建form对象
      param.append("file", file);

      this.showloading = true;

      switch (i) {
        case 1:
          business(param)
            .then((res) => {
              this.showloading = false;
              if (res === false) return;
              this.data.enterpriseIdNo = res.regNum;
              this.save("enterpriseIdNo");
            })
            .catch((res) => {
              console.log(res);
              this.showloading = false;
            });
          break;
        case 2:
          cardidFront(param)
            .then((res) => {
              this.showloading = false;
              if (res === false) return;
              if (this.data.fzrName != res.name) {
                swal({
                  text: "身份证姓名与“客户法定代表人/单位负责人姓名”不一致",
                });
                this.$refs.scanInput2.value = "";
                return;
              }
              this.data.fzrIdNo = res.idNum;
              this.save("fzrIdNo");
            })
            .catch((res) => {
              console.log(res);
              this.showloading = false;
            });
          break;
        case 3:
          cardidBack(param)
            .then((res) => {
              this.showloading = false;
              if (res === false) return;
              /* authority: "新沂市公安局"
                        validDateEd: "长期"
                        validDateSt: "20160215" */
              /* authority: "昆明市公安局五华分局"
                        validDateEd: "20420618"
                        validDateSt: "20220618" */
              if (res.validDateEd == "长期") {
                this.data.fzrIdYxqtype = 1;
              } else {
                this.data.fzrIdYxqtype = 0;
                this.data.fzrIdYxq1 =
                  res.validDateEd.substring(0, 4) +
                  "-" +
                  res.validDateEd.substring(4, 6) +
                  "-" +
                  res.validDateEd.substring(6);
              }
              this.data.fzrIdYxq =
                res.validDateSt.substring(0, 4) +
                "-" +
                res.validDateSt.substring(4, 6) +
                "-" +
                res.validDateSt.substring(6);

              this.save("fzrIdYxq");
            })
            .catch((res) => {
              console.log(res);
              this.showloading = false;
            });
          break;
      }
    },
    uploadImg: function (event, data) {
      let file = event.target.files[0];

      /* EXIF.getData(file,function(){
                //图片包含的所有信息(例：拍照方向、相机设备型号、拍摄时间、ISO 感光度、GPS 地理位置等数据。)
                const imgAllInfo = EXIF.getAllTags(this);
                console.log(imgAllInfo)
                const imgLon = EXIF.getTag(this, 'GPSLongitude')
                const imgLat = EXIF.getTag(this, 'GPSLatitude')
                if(imgLon && imgLat){
                    //计算出经纬度并保留6为小数
                    const lon = (imgLon[0] + imgLon[1]/60 + imgLon[2]/60/60).toFixed(6)
                    const lat = (imgLat[0] + imgLat[1]/60 + imgLat[2]/60/60).toFixed(6)
                    alert(lon+','+lat)
                } else {
                    alert('暂未获得该图片地址')
                }
            }) */

      if (file.type.indexOf("image") != 0) {
        swal({ text: "只能上传图片文件" });
        return;
      }

      /* if (this.data.annexMt.length == 4) {
                swal({ text: "只能上传4张图片" });
                return;
            } */

      compress(file, 1000000).then(([{ files, ndata }]) => {
        /* console.log(files.size);
                console.log(files);
                console.log(ndata); */
        //console.log(this.data.annexMt)
        //console.log(data)
        /* data.pop()
                data.push(ndata)
                if (data.length < 4) {
                    data.push('')
                } */

        let param = new FormData(); // 创建form对象
        param.append("file", ndata);

        this.showloading = true;
        uploadImg(param)
          .then((res) => {
            this.showloading = false;
            if (res === false) return;
            data.pop();
            res = res.substring(1);
            data.push(Setting.apiBaseURL + res);
            if (data.length < 4) {
              data.push("");
            }
            this.showloading = false;
          })
          .catch((res) => {
            console.log(res);
            this.showloading = false;
          });
      });
    },
    uploadVideo: function (event, data) {
      let file = event.target.files[0];

      if (file.type.indexOf("video") != 0) {
        swal({ text: "只能上传视频文件" });
        return;
      }

      let param = new FormData(); // 创建form对象
      param.append("file", file);

      this.showloading = true;
      uploadVideo(param)
        .then((res) => {
          console.log(res);
          this.showloading = false;
          if (res === false) return;
          data.pop();
          res = res.substring(1);
          data.push(Setting.apiBaseURL + res);
          //this.data.annexVideo = data
          //console.log('aaaa',this.data.annexVideo)

          this.showloading = false;
        })
        .catch((res) => {
          console.log(res);
          this.showloading = false;
        });
    },
    //获取列表数据
    getData() {
      this.showloading = true;
      getDetails({
        detailId: this.id,
      })
        .then((res) => {
          this.showloading = false;
          if (res === false) return;
          Object.keys(res).forEach((key) => {
            if (res[key] == "null") {
              res[key] = "";
            }
          });
          if (this.type == 2) {
            if (res.status == Setting.Status.status0) {
              this.tablist = [{ status: 0, name: "接洽信息" }];
            } else if (res.status == Setting.Status.status1) {
              this.tablist = [
                { status: 0, name: "接洽信息" },
                { status: 1, name: "拍照" },
                { status: 2, name: "尽调信息" },
              ];
            } else {
              this.tablist = [
                { status: 0, name: "接洽信息" },
                { status: 1, name: "拍照" },
                { status: 2, name: "尽调信息" },
                //{status:3,name:'审核情况'},
              ];
            }
          } else if (this.type == 1) {
            if (res.status == Setting.Status.status1) {
              this.tablist = [
                { status: 0, name: "接洽信息" },
                { status: 1, name: "拍照" },
                { status: 2, name: "尽调信息" },
              ];
            } else {
              this.tablist = [
                { status: 0, name: "接洽信息" },
                { status: 1, name: "拍照" },
                { status: 2, name: "尽调信息" },
                //{status:3,name:'审核情况'},
              ];
            }
          } else if (this.type == 3) {
            this.tablist = [
              { status: 0, name: "接洽信息" },
              { status: 1, name: "拍照" },
              { status: 2, name: "尽调信息" },
              //{status:3,name:'审核情况'},
            ];
          }

          if (res.aduitQt == null || res.aduitQt == "null") res.aduitQt = "";
          if (res.hssj != null)
            res.hssj = res.hssj.substring(0, 16).replace(" ", "T");

          if (res.annexType == null || res.annexType == "") {
            res.annexType = [];
          } else {
            res.annexType = res.annexType.split(",");
          }
          if (res.annexMt == null || res.annexMt == "") {
            res.annexMt = [];
          } else {
            res.annexMt = res.annexMt.split(",");
          }
          if (res.annexZcdMt == null || res.annexZcdMt == "") {
            res.annexZcdMt = [];
          } else {
            res.annexZcdMt = res.annexZcdMt.split(",");
          }
          if (res.annexMt.length < 4) {
            res.annexMt.push("");
          }
          if (res.annexZcdMt.length < 4) {
            res.annexZcdMt.push("");
          }
          if (res.annexJycs == null || res.annexJycs == "") {
            res.annexJycs = [];
          } else {
            res.annexJycs = res.annexJycs.split(",");
          }
          if (res.annexZcdJycs == null || res.annexZcdJycs == "") {
            res.annexZcdJycs = [];
          } else {
            res.annexZcdJycs = res.annexZcdJycs.split(",");
          }
          if (res.annexJycs.length < 4) {
            res.annexJycs.push("");
          }
          if (res.annexZcdJycs.length < 4) {
            res.annexZcdJycs.push("");
          }
          if (res.annexQt == null || res.annexQt == "") {
            res.annexQt = [];
          } else {
            res.annexQt = res.annexQt.split(",");
          }
          if (res.annexQt.length < 4) {
            res.annexQt.push("");
          }
          if (res.annexZcdQt == null || res.annexZcdQt == "") {
            res.annexZcdQt = [];
          } else {
            res.annexZcdQt = res.annexZcdQt.split(",");
          }
          if (res.annexZcdQt.length < 4) {
            res.annexZcdQt.push("");
          }
          if (res.annexVideo == null || res.annexVideo == "") {
            res.annexVideo = [];
          } else {
            res.annexVideo = res.annexVideo.split(",");
          }
          if (res.annexVideo.length < 1) {
            res.annexVideo.push("");
          }
          if (res.annexZcdVideo == null || res.annexZcdVideo == "") {
            res.annexZcdVideo = [];
          } else {
            res.annexZcdVideo = res.annexZcdVideo.split(",");
          }
          if (res.annexZcdVideo.length < 1) {
            res.annexZcdVideo.push("");
          }
          if (res.yxwjZmwj == null || res.yxwjZmwj == "") {
            res.yxwjZmwj = [];
          } else {
            res.yxwjZmwj = res.yxwjZmwj.split(",");
          }
          if (res.yxwj == null || res.yxwj == "") {
            res.yxwj = [];
          } else {
            res.yxwj = res.yxwj.split(",");
          }

          if (res.fzrIdType == null) {
            res.fzrIdType = "";
          }
          if (res.accountType == null) {
            res.accountType = "";
          }
          if (res.proxyIdType == null) {
            res.proxyIdType = "";
          }
          if (res.aduitCustGlbm == null) {
            res.aduitCustGlbm = "";
          }
          if (res.aduitQyGm == null) {
            res.aduitQyGm = "";
          }

          if (res.yxwjZmwjYxq == null) {
            res.yxwjZmwjYxqtype = "";
          } else if (res.yxwjZmwjYxq.includes("长期")) {
            res.yxwjZmwjYxqtype = 1;
            res.yxwjZmwjYxq = res.yxwjZmwjYxq.split("~")[0];
          } else {
            res.yxwjZmwjYxqtype = 0;
            res.yxwjZmwjYxq1 = res.yxwjZmwjYxq.split("~")[1];
            res.yxwjZmwjYxq = res.yxwjZmwjYxq.split("~")[0];
          }

          if (res.fzrIdYxq == null) {
            res.fzrIdYxqtype = "";
          } else if (res.fzrIdYxq.includes("长期")) {
            res.fzrIdYxqtype = 1;
            res.fzrIdYxq = res.fzrIdYxq.split("~")[0];
          } else {
            res.fzrIdYxqtype = 0;
            res.fzrIdYxq1 = res.fzrIdYxq.split("~")[1];
            res.fzrIdYxq = res.fzrIdYxq.split("~")[0];
          }

          if (res.proxyZjyxq == null) {
            res.proxyZjyxqtype = "";
          } else if (res.proxyZjyxq.includes("长期")) {
            res.proxyZjyxqtype = 1;
            res.proxyZjyxq = res.proxyZjyxq.split("~")[0];
          } else if (res.proxyZjyxq != "") {
            res.proxyZjyxqtype = 0;
            res.proxyZjyxq1 = res.proxyZjyxq.split("~")[1];
            res.proxyZjyxq = res.proxyZjyxq.split("~")[0];
          }

          if (parseInt(res.status) < 0) {
            res.auditzMsg1 = res.auditMsg;
          }
          if (res.auditMsg == null) {
            res.auditzMsg111 = "";
          } else if (this.msg.indexOf(res.auditMsg) != -1) {
            res.auditzMsg111 = res.auditMsg;
          } else {
            res.auditzMsg111 = "其他原因";
          }

          switch (res.accountType) {
            case "jiben":
              res.accountTypeName = "基本账户";
              break;
            case "yiban":
              res.accountTypeName = "一般账户";
              break;
            case "zhuanyong":
              res.accountTypeName = "专用账户";
              break;
            case "linshi":
              res.accountTypeName = "临时账户";
              break;
          }

          if (isNaN(parseFloat(res.errorValue))) {
            res.errorValueStr = res.errorValue;
          } else {
            res.errorValueStr = distanceFormat(parseFloat(res.errorValue));
          }

          if (isNaN(parseFloat(res.zcdErrorValue))) {
            res.zcdErrorValueStr = res.zcdErrorValue;
          } else {
            res.zcdErrorValueStr = distanceFormat(
              parseFloat(res.zcdErrorValue)
            );
          }

          switch (parseInt(res.channelId)) {
            case 0:
              res.channelName = "人行";
              break;
            case 1:
              res.channelName = "建行";
              break;
            case 2:
              res.channelName = "掌上网点";
              break;
            case 3:
              res.channelName = "惠懂你";
              break;
            case 4:
              res.channelName = "供应链";
              break;
            case 5:
              res.channelName = "建行生活";
              break;
            case 6:
              res.channelName = "建融智合";
              break;
            case 7:
              res.channelName = "员工APP";
              break;
            case 8:
              res.channelName = "开放银行";
              break;
            case 9:
              res.channelName = "网银";
              break;
            case 10:
              res.channelName = "员工渠道";
              break;
            case 99:
              res.channelName = "其它";
              break;
          }

          this.nowtime = res.applyDate.replace(" ", "T");

          //[Setting.Status.status0,Setting.Status.status1,Setting.Status.status2].indexOf(parseInt(this.data.status))!=-1
          if (
            res.contactStatus == null ||
            res.contactStatus == undefined ||
            res.contactStatus == ""
          ) {
            this.msg = [
              "不符合账户设立标准",
              "客户尽调未通过",
              "已开立账户",
              "重复提交",
              "预约信息有误",
              "客户取消开户",
            ];
          } else {
            this.msg = [
              "资料不全或有误",
              "资料审核不通过",
              "印章未带或有误",
              "存在久悬户或未销户账户",
              "己开立账户",
              "重复提交",
              "客户取消开户",
              "客户未来办理",
              "人行核准失败",
            ];
          }

          this.data = res;

          setTimeout(() => {
            this.isloaded = true;
          }, 100);
          this.showloading = false;
        })
        .catch((res) => {
          console.log(res);
          swal({ text: "连接失败！" });
          this.showloading = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/details/scss/index.scss";
</style>
