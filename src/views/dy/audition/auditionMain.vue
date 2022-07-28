<template>
  <div class="audition-wrap">
    <div class="audition-container">
      <el-form ref="queryForm" :model="queryForm">
        <ol class="form-list">
          <li style="width:225px;margin-right:0px;">
            <el-form-item label="结单日期:" prop="arcTimeBegin">
              <el-date-picker style="width:140px;" v-model="queryForm.arcTimeBegin"
              value-format="yyyy-MM-dd" type="date" :picker-options="pickerBeginOpts" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="" prop="arcTimeEnd">
              <span>~&nbsp;</span>
              <el-date-picker
                style="width:140px;"
                v-model="queryForm.arcTimeEnd"
                :clearable="false"
                type="date"
                :picker-options="pickerBeginOpts"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </li>
          <li style="width:160px;">
            <el-form-item label="地市:" prop="areaName">
              <el-select v-model="queryForm.areaName" style="width:110px;">
                <el-option v-for="(loopItem, loopIndex) in areaNameList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li style="width:200px;">
            <el-form-item label="问题大类:" prop="mainType">
              <el-select v-model="queryForm.mainType" @change="querySubTypeList" style="width:110px;">
                <el-option v-for="(loopItem, loopIndex) in mainTypeList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li style="width:300px;">
            <el-form-item label="问题小类:" prop="subType">
              <el-select v-model="queryForm.subType" multiple collapse-tags placeholder="请选择" style="width:210px;">
                <el-option v-for="(loopItem, loopIndex) in subTypeList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li style="width:156px;margin-right:0px;">
            <el-form-item label="编号:" prop="numberType">
              <el-select v-model="queryForm.numberType" style="width:110px;">
                <el-option v-for="(loopItem, loopIndex) in numberTypeList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="" prop="ticketsPhone">
              <el-input v-model="queryForm.ticketsPhone" placeholder="请输入内容" maxlength="50" style="width:240px;"></el-input>
            </el-form-item>
          </li>
          <li style="width: 210px;">
            <el-form-item label="是否已听：" prop="isListen">
              <el-select v-model="queryForm.isListen" style="width:110px;">
                <el-option v-for="(loopItem, loopIndex) in isBooleanList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li style="width:225px;">
            <el-form-item label="是否有录音：" prop="isMp3Data">
              <el-select v-model="queryForm.isMp3Data" style="width:110px;">
                <el-option v-for="(loopItem, loopIndex) in isBooleanList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li style="width:205px;">
            <el-form-item label="" prop="bizCntt">
              <el-input v-model="queryForm.bizCntt" placeholder="投诉内容模糊搜索" maxlength="200" style="width:200px;"></el-input>
            </el-form-item>
          </li>
          <li style="width:230px;">
            <el-form-item label="是否精选工单:" prop="isLevel1">
              <el-select v-model="queryForm.isLevel1" style="width:110px;"  @change="isLevel1Change" >
                <el-option v-for="(loopItem, loopIndex) in isBooleanList" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li style="width:225px;">
            <el-form-item label="工单满意度：" prop="lastCustSatis">
              <el-select v-model="queryForm.lastCustSatis" style="width:110px;">
                <el-option v-for="(loopItem, loopIndex) in LastCustSatisArr" :key="loopItem.key" :label="loopItem.name" :value="loopItem.key"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <!--  <li>
                            <label class="labFmt100">排序筛选：</label>
                            <select id="orderBy" class="selectFmt110">
                                <option value="arcTime">结单日期</option>
                                <option value="playCount">听音次数</option>
                            </select>
                                             </li> -->
          <li>
            <el-button type="primary" @click="queryItemInfoOfPage" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button type="warning" plain  icon="el-icon-back" @click="goAuditionPrecise()" >返回精选</el-button>
          </li>
        </ol>
      </el-form>
      <div class="audition-query-list-box">
        <template v-for="(infoItem, loopIndex) in auditionQueryList">
          <div class="audition-query-item">
            <div class="audition-title">{{ infoItem.serType6 == null ? infoItem.serType3 : infoItem.serType6 }}</div>
            <div class="bi-content">
              <div class="title"><div>业务内容</div></div>
              <div class="detail" @click="initLookDetailEvent(loopIndex)">{{ infoItem.bizCntt }}</div>
            </div>
            <ol class="audition-field">
              <li>
                <label>相关单位:</label>
                <span>{{ infoItem.areaName }}</span>
              </li>
              <li>
                <label>问题分类:</label>
                <span>{{ infoItem.mainType }}</span>
              </li>
              <li>
                <label>三级服务请求:</label>
                <span>{{ infoItem.serType3 }}</span>
              </li>
              <li>
                <label>六级服务请求:</label>
                <span>{{ infoItem.serType6 == null ? '无' : infoItem.serType6 }}</span>
              </li>
              <li>
                <label>结单时间:</label>
                <span>{{ infoItem.arcTime }}</span>
              </li>
            </ol>
            <div class="query-item-play hand" @click="initLookDetailEvent(loopIndex)">
             <!-- <i class="el-icon-video-play"></i> -->
              <a href="javascript:void(0);" class="icon-play"></a>
              播放
              <span>{{ infoItem.playCount }}</span>
              次
              <template v-if="infoItem.isListen == 1">
                <br />
                <div class="is-listen">已听</div>
              </template>
            </div>
          </div>
          <div class="split-lines"></div>
        </template>
      </div>
      <!-- 分页组件 -->
      <pagination
        v-show="queryParams.maxentries > 0"
        :total="queryParams.maxentries"
        :page.sync="queryParams.currentPage"
        :limit.sync="queryParams.itemsPerPage"
        :page-sizes="[5, 10]"
        @pagination="queryItemInfoOfPage"
      />
      <!--当前工单详情  -->
      <el-dialog title="当前工单详情" :visible.sync="currDialogVisible" width="90%" custom-class="audition-dialog" @close="openRepeatDialog">
        <div>
          <!-- 详情头部区域 -->
          <div class="audition-detail-item">
            <div class="title">
              <i class="el-icon-reading"></i>
              {{ currAuditionItem.serType6 == null ? currAuditionItem.serType3 : currAuditionItem.serType6 }}
              <el-link type="primary" @click="launchTickets(currAuditionItem)">发起听音问题单</el-link>
            </div>
            <ol class="audition-field">
              <li>
                <label>相关单位:</label>
                <span>{{ currAuditionItem.areaName }}</span>
              </li>
              <li>
                <label>问题分类:</label>
                <span>{{ currAuditionItem.mainType }}</span>
              </li>
              <li>
                <label>三级服务请求:</label>
                <span>{{ currAuditionItem.serType3 }}</span>
              </li>
              <li>
                <label>六级服务请求:</label>
                <span>{{ currAuditionItem.serType6 == null ? '无' : currAuditionItem.serType6 }}</span>
              </li>
              <li>
                <label>结单时间:</label>
                <span>{{ currAuditionItem.arcTime }}</span>
              </li>
            </ol>
          </div>
          <!-- 详情内容区域 -->
          <div class="audition-detail-content">
            <el-row>
              <el-col :span="12">
                <div class="record-title">录音文本</div>
                <div class="record-info-box">
                  <template v-for="(loopItem, loopIndex) in currRecordList">
                    <dl v-if="loopIndex % 2 == 0" class="bs-callout bs-callout-warning">
                      <dt>客服：</dt>
                      <dd>{{ loopItem }}</dd>
                    </dl>
                    <dl v-else class="bs-callout bs-callout-success">
                      <dt>用户：</dt>
                      <dd>{{ loopItem }}</dd>
                    </dl>
                  </template>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="accept-title">受理情况</div>
                <div class="accept-info-box">
                  <table>
                    <caption>【基本信息】</caption>
                    <tbody>
                      <tr width="130">
                        <th>投诉工单标识:</th>
                        <td>{{ currAuditionItem.wrkfmShowSwftno }}</td>
                      </tr>
                      <tr>
                        <th>所属标签：</th>
                        <td>
                          <strong class="attribution-tags">{{ currAuditionItem.subType }}</strong>
                        </td>
                      </tr>
                      <tr>
                        <th>是否超时：</th>
                        <td>{{ currAuditionItem.isOverTime }}</td>
                      </tr>
                      <tr>
                        <th>服务请求分类路径：</th>
                        <td>{{ currAuditionItem.srvReqstTypeFullNm }}</td>
                      </tr>
                      <tr>
                        <th>录音播放次数：</th>
                        <td>{{ currAuditionItem.playCount }}次</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <caption>【业务信息】</caption>
                    <tbody>
                      <tr>
                        <th width="130">受理部门：</th>
                        <td>{{ currAuditionItem.acptOrgaName }}</td>
                      </tr>
                      <tr>
                        <th>受理地市：</th>
                        <td>{{ currAuditionItem.areaName }}</td>
                      </tr>
                      <tr>
                        <th>受理渠道：</th>
                        <td>{{ currAuditionItem.acptChnlNm }}</td>
                      </tr>
                      <tr>
                        <th>受理时间：</th>
                        <td>{{ currAuditionItem.acptTime }}</td>
                      </tr>
                      <tr>
                        <th>受理号码：</th>
                        <td>{{ currAuditionItem.acptNum }}</td>
                      </tr>
                      <tr>
                        <th>主机号码：</th>
                        <td>{{ currAuditionItem.acptNum2 }}</td>
                      </tr>
                      <tr>
                        <th>业务内容：</th>
                        <td>
                          <p>{{ currAuditionItem.bizCntt }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 音频播放控件区域 -->
          <div class="audition-play-box">
            <el-row>
              <el-col :span="12">
                <div class="repeated-title">录音列表</div>
                <div class="my-playbar">
                  <div id="jquery_jplayer_1" class="jp-jplayer"></div>
                  <div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">
                    <div class="jp-type-single">
                      <div class="jp-gui jp-interface">
                        <div class="jp-controls"><button class="jp-play" role="button" tabindex="0">play</button></div>
                        <div class="jp-progress">
                          <div class="jp-seek-bar"><div class="jp-play-bar"></div></div>
                        </div>
                        <div class="jp-volume-controls">
                          <button class="jp-mute" role="button" tabindex="0">mute</button>
                          <div class="jp-volume-bar"><div class="jp-volume-bar-value"></div></div>
                        </div>
                        <div class="jp-time-holder">
                          <span class="jp-current-time" role="timer" aria-label="time">&nbsp;</span>
                          <strong>/</strong>
                          <span class="jp-duration" role="timer" aria-label="duration">&nbsp;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 播放列表-->
                <div class="play-list-box">
                  <div class="list-body">
                    <ul>
                      <template v-for="(loopItem, loopIndex) in currRecordDetailList">
                        <li @click="playMp3(loopIndex)" :class="{ active: currActive == loopIndex }">
                          <div class="play-title">
                            <i class="el-icon-video-play"></i>
                            {{ scopeCallSwftno(loopItem.callSwftno) }}--录音【{{ loopItem.isListen == '1' ? '已听' : '未听' }}】
                          </div>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="repeated-title">重复投诉</div>
                <table class="comTable">
                  <thead>
                    <tr>
                      <th width="100">序号</th>
                      <th>工单流水号</th>
                      <th width="200">受理时间</th>
                    </tr>
                  </thead>
                </table>
                <div class="repeated-list-box">
                  <table class="comTable">
                    <tbody>
                      <template v-for="(loopItem, loopIndex) in currRepeatedList">
                        <tr @click="queryItemInfoSingle(loopItem, loopIndex)" :class="{ active: currRepeatIndex == loopIndex }">
                          <td width="100">{{ loopIndex + 1 }}</td>
                          <td>{{ loopItem.wrkfmShowSwftno }}</td>
                          <td width="200">{{ loopItem.acptTime }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>
      <!--重复投诉工单详情 -->
      <!--当前工单详情  -->
    <el-dialog title="重复投诉工单详情" :visible.sync="repeatDialogVisible" width="90%" custom-class="audition-dialog" @close="closeRepeatDialog" @open="openRepeatDialog">
        <div>

          <div class="audition-detail-item">
            <div class="title">
              <i class="el-icon-reading"></i>
              {{ repeatAuditionItem.serType6 == null ? repeatAuditionItem.serType3 : repeatAuditionItem.serType6 }}
              <el-link type="primary" @click="launchTickets(repeatAuditionItem)">发起听音问题单</el-link>
            </div>
            <ol class="audition-field">
              <li>
                <label>相关单位:</label>
                <span>{{ repeatAuditionItem.areaName }}</span>
              </li>
              <li>
                <label>问题分类:</label>
                <span>{{ repeatAuditionItem.mainType }}</span>
              </li>
              <li>
                <label>三级服务请求:</label>
                <span>{{ repeatAuditionItem.serType3 }}</span>
              </li>
              <li>
                <label>六级服务请求:</label>
                <span>{{ repeatAuditionItem.serType6 == null ? '无' : repeatAuditionItem.serType6 }}</span>
              </li>
              <li>
                <label>结单时间:</label>
                <span>{{ repeatAuditionItem.arcTime }}</span>
              </li>
            </ol>
          </div>

          <div class="audition-detail-content">
            <el-row>
              <el-col :span="12">
                <div class="record-title">录音文本</div>
                <div class="record-info-box">
                  <template v-for="(loopItem, loopIndex) in repeatRecordList">
                    <dl v-if="loopIndex % 2 == 0" class="bs-callout bs-callout-warning">
                      <dt>客服：</dt>
                      <dd>{{ loopItem }}</dd>
                    </dl>
                    <dl v-else class="bs-callout bs-callout-success">
                      <dt>用户：</dt>
                      <dd>{{ loopItem }}</dd>
                    </dl>
                  </template>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="accept-title">受理情况</div>
                <div class="accept-info-box">
                  <table>
                    <caption>【基本信息】</caption>
                    <tbody>
                      <tr width="130">
                        <th>投诉工单标识:</th>
                        <td>{{ repeatAuditionItem.wrkfmShowSwftno }}</td>
                      </tr>
                      <tr>
                        <th>所属标签：</th>
                        <td>
                          <strong class="attribution-tags">{{ repeatAuditionItem.subType }}</strong>
                        </td>
                      </tr>
                      <tr>
                        <th>是否超时：</th>
                        <td>{{ repeatAuditionItem.isOverTime }}</td>
                      </tr>
                      <tr>
                        <th>服务请求分类路径：</th>
                        <td>{{ repeatAuditionItem.srvReqstTypeFullNm }}</td>
                      </tr>
                      <tr>
                        <th>录音播放次数：</th>
                        <td>{{ repeatAuditionItem.playCount }}次</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <caption>【业务信息】</caption>
                    <tbody>
                      <tr>
                        <th width="130">受理部门：</th>
                        <td>{{ repeatAuditionItem.acptOrgaName }}</td>
                      </tr>
                      <tr>
                        <th>受理地市：</th>
                        <td>{{ repeatAuditionItem.areaName }}</td>
                      </tr>
                      <tr>
                        <th>受理渠道：</th>
                        <td>{{ repeatAuditionItem.acptChnlNm }}</td>
                      </tr>
                      <tr>
                        <th>受理时间：</th>
                        <td>{{ repeatAuditionItem.acptTime }}</td>
                      </tr>
                      <tr>
                        <th>受理号码：</th>
                        <td>{{ repeatAuditionItem.acptNum }}</td>
                      </tr>
                      <tr>
                        <th>主机号码：</th>
                        <td>{{ repeatAuditionItem.acptNum2 }}</td>
                      </tr>
                      <tr>
                        <th>业务内容：</th>
                        <td>
                          <p>{{ repeatAuditionItem.bizCntt }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="audition-play-box">
            <el-row>
              <el-col :span="12">
                <div class="repeated-title">录音列表</div>
                <div class="my-playbar">
                  <div id="jquery_jplayer_repeat" class="jp-jplayer"></div>
                  <div id="jp_container_repeat" class="jp-audio" role="application" aria-label="media player">
                    <div class="jp-type-single">
                      <div class="jp-gui jp-interface">
                        <div class="jp-controls"><button class="jp-play" role="button" tabindex="0">play</button></div>
                        <div class="jp-progress">
                          <div class="jp-seek-bar"><div class="jp-play-bar"></div></div>
                        </div>
                        <div class="jp-volume-controls">
                          <button class="jp-mute" role="button" tabindex="0">mute</button>
                          <div class="jp-volume-bar"><div class="jp-volume-bar-value"></div></div>
                        </div>
                        <div class="jp-time-holder">
                          <span class="jp-current-time" role="timer" aria-label="time">&nbsp;</span>
                          <strong>/</strong>
                          <span class="jp-duration" role="timer" aria-label="duration">&nbsp;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 播放列表-->
                <div class="play-list-box">
                  <div class="list-body">
                    <ul>
                      <template v-for="(loopItem, loopIndex) in repeatRecordDetailList">
                        <li @click="playRepeatMp3(loopIndex)" :class="{ active: repeatRepeatActive == loopIndex }">
                          <div class="play-title">
                            <i class="el-icon-video-play"></i>
                            {{ scopeCallSwftno(loopItem.callSwftno) }}--录音【{{ loopItem.isListen == '1' ? '已听' : '未听' }}】
                          </div>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="repeated-title">重复投诉</div>
                <table class="comTable">
                  <thead>
                    <tr>
                      <th width="100">序号</th>
                      <th>工单流水号</th>
                      <th width="200">受理时间</th>
                    </tr>
                  </thead>
                </table>
                <div class="repeated-list-box">
                  <table class="comTable">
                    <tbody>
                      <template v-for="(loopItem, loopIndex) in repeatRepeatedList">
                        <tr>
                          <td width="100">{{ loopIndex + 1 }}</td>
                          <td>{{ loopItem.wrkfmShowSwftno }}</td>
                          <td width="200">{{ loopItem.acptTime }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import { setWaterMark,removeWatermark } from '@/utils/watermask.js';
import {
  initParamSelect,
  querySubTypeList,
  queryItemInfoOfPage,
  recordDetailList,
  queryRepeatedItemList,
  getOpenApiStream,
  queryItemInfoSingle,
  updateOrderId
} from '@/api/audition/api.js';
///stationStoreQuestionEdit/1/0/工单id


export default {
  name: 'auditionMain',
  data() {
    return {
      username: 'null',
      initParamData: {},
      areaNameList: [],
      mainTypeList: [],
      subTypeList: [],
      auditionQueryList: [],
      numberTypeList: [{ key: 1, name: '工单编号' }, { key: 2, name: '手机号码' }],
      isBooleanList: [{ key: -1, name: '全部' }, { key: 1, name: '是' }, { key: 0, name: '否' }],
      LastCustSatisArr: [
        { key: '-1', name: '全部' },
        { key: '不满意', name: '不满意' },
        { key: '一般', name: '一般' },
        { key: '未知', name: '未知' },
        { key: '满意', name: '满意' }
      ],
      queryForm: {
        arcTimeBegin: '',
        arcTimeEnd: '',
        areaName: '',
        mainType: '重复投诉',
        subType: -1,
        numberType: 1,
        ticketsPhone: '',
        isLevel1: '',
        lastCustSatis: '',
        bizCntt: '',
        isMp3Data: 1
      },
      queryParams: {
        itemsPerPage: 5,
        maxentries: 0,
        currentPage: 1
      },
      pickerBeginOpts: {
        disabledDate: time => {
          const curDate = new Date().getTime();
          const day = 4 * 24 * 3600 * 1000;
          const dateRegion = curDate - day;
          return time.getTime() > dateRegion;
        }
      },
      fullscreenLoading: false,
      //当前工单详情
      currDialogVisible: false,
      currAuditionItem: {},
      currRecordDetailList: [],
      currRepeatedList: [],
      currRecordList: [],
      currActive: 0,
      currRepeatIndex: 0,
      JplayerObj: null,
      repeatDialogVisible: false,
      repeatAuditionItem: {},
      repeatRecordDetailList: [],
      repeatRepeatedList: [],
      repeatRecordList: [],
      repeatRepeatActive: 0,
      JplayerRepeatObj: null
    };
  },
  mounted() {
    this.initParamSelect();
  },
  beforeDestroy(){
     removeWatermark();
  },
  methods: {
    //验证是否为空
    isNotEmpty(txtVal) {
      if (txtVal === '' || txtVal === undefined || txtVal === null) {
        return false;
      } else {
        return true;
      }
    },
    //判断元素内容是否为手机格式
    isMobile(txtVal) {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.test(txtVal)) {
        return true;
      } else {
        return false;
      }
    },
    //格式化-话务流水号
    scopeCallSwftno(keyParam) {
      return keyParam.substring(0, 8) + ' ' + keyParam.substring(8, 10) + ':' + keyParam.substring(10, 12) + ':' + keyParam.substring(12, 14);
    },
    //初始化查询条件
    initParamSelect() {
      let _self = this;
      initParamSelect().then(response => {
        console.log('初始化查询条件:');
        console.log(response);
        //debugger;
        if (response.state == 200) {
          _self.initParamData = response.data;

          _self.username = _self.initParamData['userItem']['userId'];
          //增加水印效果
          setWaterMark(_self.username, _self.initParamData['userItem']['phoneNo']);
          //地市列表
          if (_self.initParamData['cityList'].length > 1) {
            _self.areaNameList = _self.initParamData['cityList'];
            _self.areaNameList.unshift({ key: -1, name: '全部' });
          } else {
            _self.areaNameList = _self.initParamData['cityList'];
          }
          _self.queryForm.areaName = _self.areaNameList[0]['key'];
          //大类列表
          _self.mainTypeList = _self.initParamData['mainTypeList'];
          _self.mainTypeList.unshift({ key: -1, name: '全部' });
          _self.queryForm.arcTimeEnd = _self.initParamData['maxDate'];
          //针对一级领导特殊处理
          if (_self.initParamData['userItem']['userLevel'] == '1') {
            _self.queryForm.isLevel1 = 1;
            _self.queryForm.mainType = -1;
          } else {
            _self.queryForm.arcTimeBegin = _self.initParamData['minDate'];
            _self.queryForm.mainType = '重复投诉';
          }
           _self.querySubTypeList();
           _self.queryItemInfoOfPage();
        } else {
          this.$router.push({ name: 'auditionPrompt' });
        }
      });
    },
    //是否精选工单
    isLevel1Change(){
        let _self = this;
        if((_self.queryForm.isLevel1 == -1) &&( _self.initParamData['userItem']['userLevel'] == "1")&&(!this.isNotEmpty(this.queryForm.arcTimeBegin))) {
            this.queryForm.arcTimeBegin = _self.initParamData['minDate'];
         }
    },
    //级联查询子分类列表
    querySubTypeList() {
      let _self = this;
      if (this.queryForm.mainType != -1) {
        querySubTypeList({ mainType: encodeURIComponent(this.queryForm.mainType) }).then(response => {
          console.log('初始化查询条件:');
          console.log(response);
          _self.queryForm.subType = '';
          //大类列表
          if (response.state == 200) {
            _self.subTypeList = response.data['subTypeList'];
          } else {
            _self.$notify({
              title: '温馨提示',
              message: response.message,
              type: 'warning',
              position: 'bottom-right'
            });
          }
        });
      } else {
        this.resetSelectDefault();
      }
    },
    //问题小类默认参数
    resetSelectDefault(){
      let _self = this;
      _self.subTypeList = [];
      _self.subTypeList.unshift({ key: -1, name: '全部' });
    },
    //重置表单
    resetForm() {
      let _self = this;
      this.$refs.queryForm.resetFields();
       _self.initParamData['userItem']['userLevel'];

      if (_self.initParamData['userItem']['userLevel'] == '1') {
        _self.queryForm.arcTimeEnd = _self.initParamData['maxDate'];
        _self.queryForm.isLevel1 = 1;
        _self.queryForm.mainType = -1;
      } else {
        _self.queryForm.arcTimeBegin = _self.initParamData['minDate'];
        _self.queryForm.arcTimeEnd = _self.initParamData['maxDate'];
        _self.queryForm.mainType = '重复投诉';
        _self.querySubTypeList();
      }
    },
    joinQueryParam() {

      let dataParam = {
        itemsPerPage: this.queryParams.itemsPerPage,
        currentPage: this.queryParams.currentPage,
        userId: this.username
      };
      //日期开始时间
      if (this.isNotEmpty(this.queryForm.arcTimeBegin)) {
        dataParam['arcTimeBegin'] = this.queryForm.arcTimeBegin;
      }
      //日期结束时间
      if (this.isNotEmpty(this.queryForm.arcTimeEnd)) {
        dataParam['arcTimeEnd'] = this.queryForm.arcTimeEnd;
      }
      //地市编码
      if (this.isNotEmpty(this.queryForm.areaName) && this.queryForm.areaName != -1) {
        dataParam['areaName'] = encodeURIComponent(this.queryForm.areaName);
      }
      //问题大类
      if (this.isNotEmpty(this.queryForm.mainType) && this.queryForm.mainType != -1) {
        dataParam['mainType'] = encodeURIComponent(this.queryForm.mainType);
      }
      //问题小类
      if (this.isNotEmpty(this.queryForm.subType) ){
        if(this.queryForm.subType != -1) {
          dataParam['subType'] = encodeURIComponent(this.queryForm.subType);
        } else {
          if (this.queryForm.mainType != -1) {
            var subTypeArr = [];
            for (var i = 0; i < this.subTypeList.length; i++) {
              subTypeArr.push(this.subTypeList[i]['key']);
            }
            dataParam['subType'] = encodeURIComponent(subTypeArr.join(','));
          }
        }
      }
      //编号
      if (this.isNotEmpty(this.queryForm.numberType) && this.isNotEmpty(this.queryForm.ticketsPhone)) {
        //工单号码
        if (this.queryForm.numberType == 1) {
          dataParam['wrkfmShowSwftno'] = this.queryForm.ticketsPhone;
        } else if (this.queryForm.numberType == 2) {
          if (this.isMobile(this.queryForm.ticketsPhone)) {
            dataParam['acptNum'] = this.queryForm.ticketsPhone;
          } else {
            this.$notify({
              title: '温馨提示',
              message: '手机号码填写不符合要求!!',
              type: 'warning',
              position: 'bottom-right'
            });
          }
        }
      }
      //是否已听
      if (this.isNotEmpty(this.queryForm.isListen) && this.queryForm.isListen != -1) {
        dataParam['isListen'] = this.queryForm.isListen;
      }
      //是否有录音
      if (this.isNotEmpty(this.queryForm.isMp3Data) && this.queryForm.isMp3Data != -1) {
        dataParam['isMp3Data'] = this.queryForm.isMp3Data;
      }
      //工作内容
      if (this.isNotEmpty(this.queryForm.bizCntt)) {
        dataParam['bizCntt'] = encodeURIComponent(this.queryForm.bizCntt);
      }
      //是否精选工单
      if (this.isNotEmpty(this.queryForm.isLevel1) && this.queryForm.isLevel1 != -1) {
        dataParam['isLevel1'] = this.queryForm.isLevel1;
      }
      //满意度
      if (this.isNotEmpty(this.queryForm.lastCustSatis) && this.queryForm.lastCustSatis != -1) {
        dataParam['lastCustSatis'] =  encodeURIComponent(this.queryForm.lastCustSatis);
      }
      return dataParam;
    },
    //站内听音主页-分页查询
    queryItemInfoOfPage() {
      let _self = this;
      _self.fullscreenLoading = true;
      queryItemInfoOfPage(this.joinQueryParam()).then(response => {
        _self.fullscreenLoading = false;
        if (response.state == 200) {
          //大类列表
          _self.auditionQueryList = response.data.itemList;
          _self.queryParams.maxentries = response.data['maxentries'];
        } else {
          _self.auditionQueryList = [];
          _self.queryParams.maxentries = 0;
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    initLookDetailEvent(itemIndex) {
      let _self = this;
      //初始化参数
      _self.currRecordDetailList = [];
      _self.currRepeatedList = [];
      _self.currRecordList = [];
      _self.currActive = 0;
      this.currAuditionItem = this.auditionQueryList[itemIndex];
      this.currDialogVisible = true;
      this.recordDetailList(this.currAuditionItem);
      this.queryRepeatedItemList(this.currAuditionItem);
    },
    recordDetailList(itemParam) {
      let _self = this;
      let dataParamObj = {
        majorId: itemParam['majorId'],
        userId: this.username,
        opTime: itemParam['opTime'],
        wrkfmShowSwftno: itemParam['wrkfmShowSwftno']
      };
      recordDetailList(dataParamObj).then(response => {
        console.log('站店听音:录音详情列表');
        console.log(response.data);
        //_self.fullscreenLoading = false;
        if (response.state == 200 && response.data.recordDetailList.length > 0) {
          //大类列表
          _self.currRecordDetailList = response.data.recordDetailList;
          _self.JplayerObj = $('#jquery_jplayer_1').jPlayer({
            ready: function() { },
            swfPath: "../../../utils/jquery.jplayer.swf",
            solution: "html",
            supplied: "mp3",
            wmode: "window",
            cssSelectorAncestor: '#jp_container_1',
            useStateClassSkin: true,
            autoBlur: false,
            autoPlay:true,
            smoothPlayBar: true,
            keyEnabled: false,
            remainingDuration: false,
            toggleDuration: true
          });
          //自动播放第一条记录
          if(_self.currRecordDetailList.length > 0){
             _self.playMp3(0);
          }

        } else {
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    queryRepeatedItemList(itemParam) {
      let _self = this;
      let dataParamObj = {
        majorId: itemParam['majorId'],
        userId: this.username,
        opTime: itemParam['opTime'],
        wrkfmShowSwftno: itemParam['wrkfmShowSwftno']
      };
      queryRepeatedItemList(dataParamObj).then(response => {
        console.log('站店听音:录音详情列表');
        console.log(response.data);
        //_self.fullscreenLoading = false;
        if (response.state == 200) {
          //大类列表
          _self.currRepeatIndex = -1;
          _self.currRepeatedList = response.data.repeatedList;
        } else {
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    playMp3(indexParam) {
      console.log("开始播放音频:") ;
      let _self = this;
      this.currActive = indexParam;
      this.currRecordList = this.currRecordDetailList[indexParam]['dialogList'];

      let recordItem = this.currRecordDetailList[indexParam];
      let dataParamObj = {
        majorId: this.currAuditionItem['majorId'],
        userId: this.username,
        wrkfmShowSwftno: recordItem['wrkfmShowSwftno'],
        callSwftno: recordItem['callSwftno'],
        reoverKey: recordItem['reoverKey']
      };
      getOpenApiStream(dataParamObj).then(res => {
        //debugger
        const content = res;
         let blobObject = new Blob([content]);
         _self.JplayerObj
            .jPlayer('setMedia', {
              mp3: window.URL.createObjectURL(blobObject)
            }).jPlayer('play');
      });
      //mp3文件加载中提示
     this.$notify({
        title: '温馨提示',
        message: '录音文件加载中...',
        type: 'warning',
        position: 'bottom-right'
      });
    },
    //查询重复投诉工单详情
    queryItemInfoSingle(paramItem, indexParam) {
      if (this.currRepeatIndex != indexParam) {
        this.currRepeatIndex = indexParam;
      } else {
        return false;
      }
      let _self = this;
      let dataParam = {
        majorId: paramItem['majorId'],
        opTime: paramItem['opTime'],
        userId: this.username
      };
      _self.fullscreenLoading = true;
      queryItemInfoSingle(dataParam).then(response => {
        console.log('查询重复工单详情信息');
        console.log(response.data);
        _self.fullscreenLoading = false;
        if (response.state == 200 && response.data['infoItem'] != null) {
          _self.repeatDialogVisible = true;
          _self.repeatAuditionItem = response.data['infoItem'];
          _self.queryRepeatRecordDetailList(_self.repeatAuditionItem);
          _self.queryRepeatRepeatedItemList(_self.repeatAuditionItem);
        } else {
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    queryRepeatRecordDetailList(itemParam) {
      let _self = this;
      let dataParamObj = {
        majorId: itemParam['majorId'],
        userId: this.username,
        opTime: itemParam['opTime'],
        wrkfmShowSwftno: itemParam['wrkfmShowSwftno']
      };
      recordDetailList(dataParamObj).then(response => {
        console.log('站店听音:录音详情列表');
        console.log(response.data);
        //_self.fullscreenLoading = false;
        if (response.state == 200 && response.data.recordDetailList.length > 0) {
          _self.repeatRecordDetailList = response.data.recordDetailList;
          _self.JplayerRepeatObj = $('#jquery_jplayer_repeat').jPlayer({
            ready: function() {
            },
            swfPath: "../../../utils/jquery.jplayer.swf",
            solution: 'html',
            supplied: 'mp3',
            wmode: 'window',
            cssSelectorAncestor: '#jp_container_repeat',
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: false,
            remainingDuration: false,
            toggleDuration: true
          });
          //自动播放
          if(_self.repeatRecordDetailList.length > 0){
             _self.playRepeatMp3(0);
          }

        } else {
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    playRepeatMp3(indexParam) {
      let _self = this;
      this.repeatRepeatActive = indexParam;
      this.repeatRecordList = this.repeatRecordDetailList[indexParam]['dialogList'];

      let recordItem = this.repeatRecordDetailList[indexParam];
      let dataParamObj = {
        majorId: this.repeatAuditionItem['majorId'],
        userId: this.username,
        wrkfmShowSwftno: recordItem['wrkfmShowSwftno'],
        callSwftno: recordItem['callSwftno'],
        reoverKey: recordItem['reoverKey']
      };
      getOpenApiStream(dataParamObj).then(res => {
        const content = res;
        const blob = new Blob([content]);
        _self.JplayerRepeatObj
          .jPlayer('setMedia', {
            mp3: URL.createObjectURL(blob)
          })
          .jPlayer('play');
      });
      //mp3文件加载中提示
      this.$notify({
        title: '温馨提示',
        message: '录音文件加载中...',
        type: 'warning',
        position: 'bottom-right'
      });
    },
    queryRepeatRepeatedItemList(itemParam) {
      let _self = this;
      let dataParamObj = {
        majorId: itemParam['majorId'],
        userId: this.username,
        opTime: itemParam['opTime'],
        wrkfmShowSwftno: itemParam['wrkfmShowSwftno']
      };
      queryRepeatedItemList(dataParamObj).then(response => {
        console.log('站店听音:录音详情列表');
        console.log(response.data);
        //_self.fullscreenLoading = false;
        if (response.state == 200) {
          //大类列表
          _self.repeatRepeatedList = response.data.repeatedList;
        } else {
          _self.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            position: 'bottom-right'
          });
        }
      });
    },
    //打开重复投诉工单详情弹出框
    openRepeatDialog() {
      //关闭当前录音文件
      if (this.JplayerObj && this.JplayerObj.length > 0) {
        this.JplayerObj.jPlayer('stop');
      }
    },
    closeRepeatDialog() {
      //关闭当前录音文件
      if (this.JplayerRepeatObj && this.JplayerRepeatObj.length > 0) {
        this.JplayerRepeatObj.jPlayer('stop');
      }
    },
    //发起问题工单
    launchTickets(itemObj) {
      var _self  = this ;
      //关闭重复投诉工单详情弹出框
      if (this.repeatDialogVisible) {
        this.repeatDialogVisible = false;
        if (this.JplayerRepeatObj && this.JplayerRepeatObj.length > 0) {
          this.JplayerRepeatObj.jPlayer('stop');
        }
      }
      //关闭当前投诉工单详情弹出框
      if (this.currDialogVisible) {
        this.currDialogVisible = false;
        if (this.JplayerObj && this.JplayerObj.length > 0) {
          this.JplayerObj.jPlayer('stop');
        }
      }
      if(itemObj.orderId==null){
        var dataParamObj={
             "majorId":itemObj.majorId,
             "opTime":itemObj.opTime,
             'userId':this.username
        }
        updateOrderId(dataParamObj).then(response => {
          console.log('站店听音:录音详情列表');
          console.log(response.data);
          if (response.state == 200) {
            //跳转至王楠-发起听音问题单路由
            _self.$router.push('/stationStoreQuestionEdit/1/0/' +  response.data['infoItem'].orderId);
          } else {
            _self.$notify({
              title: '温馨提示',
              message: response.message,
              type: 'warning',
              position: 'bottom-right'
            });
          }
        });
      }else{
         //跳转至王楠-发起听音问题单路由
         this.$router.push('/stationStoreQuestionEdit/1/0/' + itemObj.orderId);
      }
    },
    //返回精选
    goAuditionPrecise(){
      this.$router.push('/auditionPrecise');
    }
  }
};
</script>
<style lang="css">
@import "../../../assets/styles/audition.css";
</style>
