<template>
  <div class="audition-wrap dy-page-wrap">
    <div class="audition-container dy-container">
      <div class="audition-precise">
        <div class="precise-title">
          <h4>客户投诉声音问题分类</h4>
          <button type="button" class="query-btn" @click="goToMain" >查看全部录音</button>
        </div>
        <el-row>
          <el-col :span="8">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="精选录音" name="preciseTab">
                <dl class="precise-situation">
                  <dt>选音情况</dt>
                  <dd>
                    <span>{{ AmountItem.cnt2 }}</span>
                    <small>条</small>
                  </dd>
                </dl>
                <div class="precise-table">
                  <table>
                    <thead>
                      <tr>
                        <th style="width:100px;padding-right:20px;">占比</th>
                        <th>选音量</th>
                      </tr>
                    </thead>
                    <tbody id="preciseTbody">
                      <template v-for="(loopItem, index) in PreciseList">
                        <tr>
                          <td class="first_row">| <span>{{scopePercent(loopItem.scale)}}</span>%</td>
                          <td>{{scopeDigit(loopItem.amount)}}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div id="preciseEchart" ref="preciseEchart" class="echart-item"></div>
              </el-tab-pane>
              <el-tab-pane label="全部录音" name="allTab">
                <dl class="precise-situation">
                  <dt>选音情况</dt>
                  <dd>
                    <span>{{ AmountItem.cnt1 }}</span>
                    <small>条</small>
                  </dd>
                </dl>
                <div class="precise-table">
                  <table>
                    <thead>
                      <tr>
                        <th style="width:100px;padding-right:20px;">占比</th>
                        <th>选音量</th>
                      </tr>
                    </thead>
                    <tbody id="fullTbody">
                      <template v-for="(loopItem, index) in FullList">
                        <tr>
                          <td class="first_row">| <span>{{scopePercent(loopItem.scale)}}</span>%</td>
                          <td>{{scopeDigit(loopItem.amount)}}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div id="fullEchart" ref="fullEchart" class="echart-item"></div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="2"><div class="seg-line"></div></el-col>
          <el-col :span="14">
            <div class="panel-heading">精选工单播放TOP5</div>
            <div class="precise-list-box" id="preciseList" v-loading.fullscreen.lock="fullscreenLoading" >
              <template v-for="(infoItem, index) in PreciseTop5List">
                <div class="precise-item">
                  <div class="type-title"><i class="el-icon-reading"></i>{{ infoItem.subType }}</div>
                  <div class="precise-ticket">
                    <template v-for="(ticketInfo, ticketIndex) in infoItem.ticketList">
                      <dl>
                        <dt>{{ scopeTicket(ticketInfo.name)}}</dt>
                        <dd @click="initLookDetailEvent(ticketInfo)">播放{{ ticketInfo.amount }}次</dd>
                      </dl>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
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
        <!-- 详情头部区域 -->
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
        <!-- 详情内容区域 -->
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
        <!-- 音频播放控件区域 -->
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
</template>

<script>
import { setWaterMark,removeWatermark } from '@/utils/watermask.js';
import { ContrastOpt } from './auditionPreciseJson.js';
import { initParamSelect, queryAuditionStatistics, queryPreciseTop5,
 queryItemInfoSingle,
 recordDetailList,
 queryRepeatedItemList,
 getOpenApiStream,
 updateOrderId
  } from '@/api/audition/api.js';
export default {
  data() {
    return {
      username:null,
      activeName: 'preciseTab',
      mainType: '重复投诉',
      initParamData: null,
      AmountItem: {},
      FullList: [],
      PreciseList: [],
      PreciseTop5List: [],

      fullscreenLoading: false,
      //当前工单详情
      currDialogVisible: false,
      currAuditionItem: {},
      currRecordDetailList: [],
      currRepeatedList: [],
      currRecordList: [],
      currActive: 0,
      currRepeatIndex: 0,
      JplayerObj: $('#jquery_jplayer_1'),
      //重复工单详情
      repeatDialogVisible: false,
      repeatAuditionItem: {},
      repeatRecordDetailList: [],
      repeatRepeatedList: [],
      repeatRecordList: [],
      repeatRepeatActive: 0,
      JplayerRepeatObj: $('#jquery_jplayer_repeat')
    };
  },
  mounted() {
    this.initParamSelect();
    this.queryAuditionStatistics();
    this.queryPreciseTop5();
  },
  beforeDestroy(){
     removeWatermark();
  },
  methods: {
    //格式化-话务流水号
    scopeCallSwftno(keyParam) {
      return keyParam.substring(0, 8) + ' ' + keyParam.substring(8, 10) + ':' + keyParam.substring(10, 12) + ':' + keyParam.substring(12, 14);
    },
    scopeTicket(dataParam){
       return dataParam.replace(/(-$)/g, "");
    },
    scopePercent(dataParam) {
      return parseFloat(dataParam).toFixed(2);
    },
    scopeDigit(dataParam) {
      return parseInt(dataParam, 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        } else {
          this.$router.push({ name: 'auditionPrompt' });
        }
      });
    },
    goToMain(){
      this.$router.push({ name: 'auditionMain' });
    },
    queryAuditionStatistics() {
      let _self = this;
      queryAuditionStatistics({ mainType: encodeURIComponent(_self.mainType) }).then(response => {
        console.log('精准推音-听音情况分析统计:');
        console.log(response);
        if (response.state == 200) {
          //大类列表
          _self.AmountItem = response.data['amountItem'];
          _self.FullList = response.data['fullList'];
          _self.PreciseList = response.data['preciseList'];
          _self.drawPreciseEchart();
          _self.drawFullEchart();
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
    //精选录音
    drawPreciseEchart() {
     let _self = this;
     let _legendArr = [];
     let _dataArr = [];
      for (let j = 0; j < _self.PreciseList.length; j++) {
        _legendArr.push(_self.PreciseList[j]['name']);
        _dataArr.push({
          name: _self.PreciseList[j]['name'],
          value: _self.PreciseList[j]['amount']
        });
      }
      ContrastOpt['legend']['data'] = _legendArr;
      ContrastOpt['series'][0]['data'] = _dataArr;
      const chartItem = this.$echarts.init(this.$refs.preciseEchart);
      chartItem.clear();
      chartItem.setOption(ContrastOpt);
    },
    //全部录音
    drawFullEchart() {
      let _self = this;
      let _legendArr = [];
      let _dataArr = [];
      for (let i = 0; i < _self.FullList.length; i++) {
        _legendArr.push(_self.FullList[i]['name']);
        _dataArr.push({
          value: _self.FullList[i]['amount'],
          name: _self.FullList[i]['name']
        });
      }
      ContrastOpt['legend']['data'] = _legendArr;
      ContrastOpt['series'][0]['data'] = _dataArr;
      $('#fullEchart').width($('#preciseEchart').width());
      const chartItem = this.$echarts.init(this.$refs.fullEchart);
      chartItem.clear();
      chartItem.setOption(ContrastOpt);
    },
    //精选工单播放TOP5-查询列表
    queryPreciseTop5(){
      let _self = this;
      queryPreciseTop5({ mainType: encodeURIComponent(_self.mainType) }).then(response => {
        console.log('精准推音-听音情况top5列表:');
        console.log(response);
        if (response.state == 200) {
          _self.PreciseTop5List = response.data['topList'];
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

    initLookDetailEvent(paramItem) {
      let _self = this;
      //初始化参数
      _self.currRecordDetailList = [];
      _self.currRepeatedList = [];
      _self.currRecordList = [];
      _self.currActive = 0;
     /* paramItem['value'] = 'E00AF4DE7EA7073AE0532C50440AE1C4';
      paramItem['cnt1'] = 20220524; */
      let dataParam = {
        majorId: paramItem['value'],
        opTime: paramItem['cnt1'],
        userId: _self.username
      };
      _self.fullscreenLoading = true;
      queryItemInfoSingle(dataParam).then(response => {
        console.log('查询工单详情信息');
        console.log(response.data);
        _self.fullscreenLoading = false;
        if (response.state == 200 && response.data['infoItem'] != null) {
          _self.currDialogVisible = true;
          _self.currAuditionItem = response.data['infoItem'];
          _self.recordDetailList(_self.currAuditionItem);
          _self.queryRepeatedItemList(_self.currAuditionItem);
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
        if (response.state == 200 && response.data.recordDetailList.length > 0) {
          //大类列表
          _self.currRecordDetailList = response.data.recordDetailList;
          _self.JplayerObj = $('#jquery_jplayer_1').jPlayer({
            ready: function() {
            },
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
        //debugger
        console.log('站店听音:录音详情列表');
        console.log(response.data);
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
        const content = res;
        const blob = new Blob([content]);
        _self.JplayerObj
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
           //自动播放第一条记录
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

    }

  }
};
</script>
<style lang="css">
@import "../../../assets/styles/audition.css";
</style>
