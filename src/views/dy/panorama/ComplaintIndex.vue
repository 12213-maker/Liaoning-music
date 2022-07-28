<template>
  <div class="complaintindex">
    <div class="selctChoice">
      <span>地市：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-tabs v-model="activeNameOuter" @tab-click="handleClickOuter">
      <el-tab-pane label="工信部百万用户申诉量" name="first">
        <div class="flexcontain" v-if="echart_show[0].Tab_show">
          <div class="leftcontain">
            <div style="width: 100%; height: 100%; box-sizing: border-box">
              <h2 class="title-h3">工信部百万用户申诉量</h2>
              <el-tabs
                class="tabPaneItem"
                v-model="activeName1_left"
                @tab-click="handleClickInner($event, 0, 'left')"
              >
                <el-tab-pane label="上月" name="first">
                  <div v-if="echart_show[0].left[0]">
                    <div class="showinfo">
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                    </div>
                    <LineBarChart
                      ref="Tab1_left_tab1"
                      width="100%"
                      height="50vh"
                      :xName="xName"
                      :legendsBar="['上月来量', '上月有效量']"
                      :legendsLine="[]"
                      :colors="chartColors"
                      :barValue="barValue"
                      :lineValue="[]"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="当月" name="second">
                  <div v-if="echart_show[0].left[1]">
                    <div class="showinfo">
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                    </div>
                    <LineBarChart
                      ref="Tab1_left_tab2"
                      width="100%"
                      height="50vh"
                      :xName="xName"
                      :legendsBar="['上月来量', '上月有效量']"
                      :legendsLine="[]"
                      :colors="chartColors"
                      :barValue="barValue"
                      :lineValue="[]"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="rightcontain">
            <div class="topcontain">
              <h2 class="title-h3">工信部百万用户申诉量对比趋势</h2>
              <el-tabs
                class="tabPaneItem"
                v-model="activeName1_right"
                @tab-click="handleClickInner($event, 0, 'right')"
              >
                <el-tab-pane label="年度趋势" name="first">
                  <div v-if="echart_show[0].right[0]">
                    <LineBarChart
                      ref="Tab1_right_tab1"
                      width="100%"
                      height="28vh"
                      :xName="xName"
                      :legendsBar="[]"
                      :legendsLine="['来量', '有效量']"
                      :colors="chartColors"
                      :barValue="[]"
                      :lineValue="lineValue"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="月度趋势" name="second">
                  <div v-if="echart_show[0].right[1]">
                    <LineBarChart
                      ref="Tab1_right_tab2"
                      width="100%"
                      height="28vh"
                      :xName="xName"
                      :legendsBar="[]"
                      :legendsLine="['来量', '有效量']"
                      :colors="chartColors"
                      :barValue="[]"
                      :lineValue="lineValue"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="bottomcontain">
              <h3 class="title-h3">TOP10申诉问题改善率</h3>
              <!-- <PieChart
                ref="pieChart"
                width="100%"
                height="100%"
                labelName="客户"
                :lengendTitles="['', '', '']"
                :tableData="pieData"
              ></PieChart> -->
              <div ref="piechart" style="width: 100%; height: 100%"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="携号转网百万用户申诉量" name="second">
        <div class="flexcontain" v-if="echart_show[1].Tab_show">
          <div class="leftcontain">
            <div style="width: 100%; height: 100%; box-sizing: border-box">
              <h2 class="title-h3">工信部百万用户申诉量</h2>
              <el-tabs
                class="tabPaneItem"
                v-model="activeName2_left"
                @tab-click="handleClickInner($event, 1, 'left')"
              >
                <el-tab-pane label="上月" name="first">
                  <div v-if="echart_show[1].left[0]">
                    <div class="showinfo">
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                    </div>
                    <LineBarChart
                      ref="Tab2_left_tab1"
                      width="100%"
                      height="50vh"
                      :xName="xName"
                      :legendsBar="['上月来量', '上月有效量']"
                      :legendsLine="[]"
                      :colors="chartColors"
                      :barValue="barValue"
                      :lineValue="[]"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="当月" name="second">
                  <div v-if="echart_show[1].left[1]">
                    <div class="showinfo">
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                    </div>
                    <LineBarChart
                      ref="Tab2_left_tab2"
                      width="100%"
                      height="50vh"
                      :xName="xName"
                      :legendsBar="['上月来量', '上月有效量']"
                      :legendsLine="[]"
                      :colors="chartColors"
                      :barValue="barValue"
                      :lineValue="[]"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="rightcontain">
            <div class="topcontain">
              <h2 class="title-h3">工信部百万用户申诉量对比趋势</h2>
              <el-tabs
                class="tabPaneItem"
                v-model="activeName2_right"
                @tab-click="handleClickInner($event, 1, 'right')"
              >
                <el-tab-pane label="年度趋势" name="first">
                  <div v-if="echart_show[1].right[0]">
                    <LineBarChart
                      ref="Tab2_right_tab1"
                      width="100%"
                      height="28vh"
                      :xName="xName"
                      :legendsBar="[]"
                      :legendsLine="['来量', '有效量']"
                      :colors="chartColors"
                      :barValue="[]"
                      :lineValue="lineValue"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="月度趋势" name="second">
                  <div v-if="echart_show[1].right[1]">
                    <LineBarChart
                      ref="Tab2_right_tab2"
                      width="100%"
                      height="28vh"
                      :xName="xName"
                      :legendsBar="[]"
                      :legendsLine="['来量', '有效量']"
                      :colors="chartColors"
                      :barValue="[]"
                      :lineValue="lineValue"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="bottomcontain">
              <h3 class="title-h3">TOP10申诉问题改善率</h3>
              <!-- <PieChart
                ref="pieChart"
                width="100%"
                height="100%"
                labelName="客户"
                :lengendTitles="['', '', '']"
                :tableData="pieData"
              ></PieChart> -->
              <!-- <div ref="piechart" style="width: 100%; height: 100%"></div> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="宣传营销百万用户申诉量" name="third">
        <div class="flexcontain" v-if="echart_show[2].Tab_show">
          <div class="leftcontain">
            <div style="width: 100%; height: 100%; box-sizing: border-box">
              <h2 class="title-h3">工信部百万用户申诉量</h2>
              <el-tabs
                class="tabPaneItem"
                v-model="activeName3_left"
                @tab-click="handleClickInner($event, 2, 'left')"
              >
                <el-tab-pane label="上月" name="first">
                  <div v-if="echart_show[2].left[0]">
                    <div class="showinfo">
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                    </div>
                    <LineBarChart
                      ref="Tab3_left_tab1"
                      width="100%"
                      height="50vh"
                      :xName="xName"
                      :legendsBar="['上月来量', '上月有效量']"
                      :legendsLine="[]"
                      :colors="chartColors"
                      :barValue="barValue"
                      :lineValue="[]"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="当月" name="second">
                  <div v-if="echart_show[2].left[1]">
                    <div class="showinfo">
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                      <div class="showinfo_item">
                        <div class="item_left">
                          <div>上月来量人次</div>
                          <div class="item_left_data">{{ visitors }}</div>
                        </div>
                        <div class="item_right">
                          <span>环比：</span>
                          <Arrow :num="0.13" unit="pp" />
                        </div>
                      </div>
                    </div>
                    <LineBarChart
                      ref="Tab3_left_tab2"
                      width="100%"
                      height="50vh"
                      :xName="xName"
                      :legendsBar="['上月来量', '上月有效量']"
                      :legendsLine="[]"
                      :colors="chartColors"
                      :barValue="barValue"
                      :lineValue="[]"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="rightcontain">
            <div class="topcontain">
              <h2 class="title-h3">工信部百万用户申诉量对比趋势</h2>
              <el-tabs
                class="tabPaneItem"
                v-model="activeName3_right"
                @tab-click="handleClickInner($event, 2, 'right')"
              >
                <el-tab-pane label="年度趋势" name="first">
                  <div v-if="echart_show[2].right[0]">
                    <LineBarChart
                      ref="Tab3_right_tab1"
                      width="100%"
                      height="28vh"
                      :xName="xName"
                      :legendsBar="[]"
                      :legendsLine="['来量', '有效量']"
                      :colors="chartColors"
                      :barValue="[]"
                      :lineValue="lineValue"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="月度趋势" name="second">
                  <div v-if="echart_show[2].right[1]">
                    <LineBarChart
                      ref="Tab3_right_tab2"
                      width="100%"
                      height="28vh"
                      :xName="xName"
                      :legendsBar="[]"
                      :legendsLine="['来量', '有效量']"
                      :colors="chartColors"
                      :barValue="[]"
                      :lineValue="lineValue"
                      :showSymbol="false"
                      :clickCb="clickCb"
                    ></LineBarChart>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="bottomcontain">
              <h3 class="title-h3">TOP10申诉问题改善率</h3>
              <!-- <PieChart
                ref="pieChart"
                width="100%"
                height="100%"
                labelName="客户"
                :lengendTitles="['', '', '']"
                :tableData="pieData"
              ></PieChart> -->
              <!-- <div ref="piechart" style="width: 100%; height: 100%"></div> -->
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LineBarChart from "@/components/common/charts/LineBarChart.vue";
import PieChart from "@/views/dy/unsatifyAnalysis/components/PieChart.vue";
import TrendLine from "@/components/common/charts/TrendLine.vue";
import Arrow from "@/components/common/arrow.vue";
import PieChart2 from "./components/pieChart.vue";
export default {
  name: "ComplaintIndex",
  components: { LineBarChart, PieChart, TrendLine, Arrow, PieChart2 },
  data() {
    return {
      show: false,

      areaStyle: {
        // 要加这个属性,折线与下方的区域才能填充颜色
        // color: 'red', // 可以直接填充颜色
        color: {
          // 这边是设置渐变色,好看一点
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0,156,255,0.5)",
            },
            {
              offset: 0.5, //这是于下方线的距离,设置1就不留空隙
              color: "rgba(0,156,255,0)",
            },
          ],
          global: false,
        },
      },

      activeNameOuter: "first",
      activeName1_left: "first",
      activeName1_right: "first",
      activeName2_left: "first",
      activeName2_right: "first",
      activeName3_left: "first",
      activeName3_right: "first",

      pieData: [
        {
          score: 0,
          target_name: "标题",
          partrate: "-",
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "已修复",
          partrate: Math.random().toFixed(1),
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "已接触未修复",
          partrate: Math.random().toFixed(1),
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "未接触成功",
          partrate: Math.random().toFixed(1),
        },
        {
          score: parseInt(Math.random() * 100),
          target_name: "无反馈信息",
          partrate: Math.random().toFixed(1),
        },
      ],
      showPie: false,
      chart: null,

      chartColors: [
        ["#5FAEFF,#0682FF", "#FFBE4D"],
        ["#FFBE4D", "#4CD1C3"],
      ],
      xName: [
        "沈阳",
        "本溪",
        "辽阳",
        "朝阳",
        "鞍山",
        "抚顺",
        "丹东",
        "锦州",
        "营口",
        "阜新",
        "盘锦",
        "铁岭",
        "葫芦岛",
      ],
      legendsBar: ["修复量"],
      legendsLine: ["成功率"],
      barValue: [
        [
          {
            name: "沈阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "本溪",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "辽阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "朝阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "鞍山",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "抚顺",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "丹东",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "锦州",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "营口",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "阜新",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "盘锦",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "铁岭",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "葫芦岛",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
        ],
        [
          {
            name: "沈阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "本溪",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "辽阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "朝阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "鞍山",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "抚顺",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "丹东",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "锦州",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "营口",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "阜新",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "盘锦",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "铁岭",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "葫芦岛",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
        ],
      ],
      lineValue: [
        [
          {
            name: "沈阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "本溪",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "辽阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "朝阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "鞍山",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "抚顺",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "丹东",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "锦州",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "营口",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "阜新",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "盘锦",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "铁岭",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "葫芦岛",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
        ],
        [
          {
            name: "沈阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "本溪",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "辽阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "朝阳",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "鞍山",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "抚顺",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "丹东",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "锦州",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "营口",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "阜新",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "盘锦",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "铁岭",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
          {
            name: "葫芦岛",
            value: parseInt(Math.random() * 100).toString(),
            cityId: 1,
          },
        ],
      ],

      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],

      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      visitors: "6.70",
      piecolor: [
        "rgb(45, 154, 85)",
        "rgb(67, 165, 93)",
        "rgb(89, 175, 100)",
        "rgb(112, 186, 107)",
        "rgb(134, 196, 115)",
        "rgb(155, 208, 122)",
        "rgb(177, 218, 130)",
        "rgb(200, 228, 137)",
        "rgb(222, 239, 144)",
        "rgb(244, 249, 152)",
      ],
      legendsPie: [
        "服务",
        "资费",
        "收费",
        "营销",
        "安全",
        "网络",
        "客服",
        "宣传",
        "通信",
        "业务",
      ],
      PieValue: [],
      echart_show: [
        { Tab_show: true, left: [true, false], right: [true, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
      ],
    };
  },
  methods: {
    changeTabShow(flag, value) {
      this.activeName1_left = "first";
      this.activeName1_right = "first";
      this.activeName2_left = "first";
      this.activeName2_right = "first";
      this.activeName3_left = "first";
      this.activeName3_right = "first";
      this.echart_show = [
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
        { Tab_show: false, left: [false, false], right: [false, false] },
      ];
      this.echart_show[flag] = value;
      if (flag == 0) {
        this.$nextTick(() => {
          this.$refs.Tab1_left_tab1.drawChart();
          this.$refs.Tab1_right_tab1.drawChart();
          this.tryPieChart();
        });
      } else if (flag == 1) {
        this.$nextTick(() => {
          this.$refs.Tab2_left_tab1.drawChart();
          this.$refs.Tab2_right_tab1.drawChart();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.Tab3_left_tab1.drawChart();
          this.$refs.Tab3_right_tab1.drawChart();
        });
      }
    },
    handleClickOuter(tab) {
      const value = {
        Tab_show: true,
        left: [true, false],
        right: [true, false],
      };
      const page = tab._props.name;
      if (page == "first") {
        this.changeTabShow(0, value);
      } else if (page == "second") {
        this.changeTabShow(1, value);
      } else {
        this.changeTabShow(2, value);
      }
    },
    handleClickInner(tab, pageNum, pos) {
      const page = tab._props.name;
      //pageNum:最外面第几页
      //pos:柱状图还是折线图
      //page:上月/当月  或者 年度趋势/月度趋势

      //第一大页
      if (pageNum == 0) {
        //左边的图表
        if (pos == "left") {
          if (page == "first") {
            console.log("第一页 left first");
            //这里面只用处理左边的show的true or false
            this.echart_show[0].left = [true, false];
            this.$nextTick(() => {
              this.$refs.Tab1_left_tab1.drawChart();
            });
          } else {
            console.log("第一页 left second");
            this.echart_show[0].left = [false, true];
            this.$nextTick(() => {
              this.$refs.Tab1_left_tab2.drawChart();
            });
          }
        } else {
          if (page == "first") {
            console.log("第一页 right first");
            this.echart_show[0].right = [true, false];
            this.$nextTick(() => {
              this.$refs.Tab1_right_tab1.drawChart();
            });
          } else {
            console.log("第一页 right second");
            this.echart_show[0].right = [false, true];
            this.$nextTick(() => {
              this.$refs.Tab1_right_tab2.drawChart();
            });
          }
        }
      }
      //第二大页
      else if (pageNum == 1) {
        if (pos == "left") {
          if (page == "first") {
            console.log("第二页 left first");
            //这里面只用处理左边的show的true or false
            this.echart_show[1].left = [true, false];
            this.$nextTick(() => {
              this.$refs.Tab2_left_tab1.drawChart();
            });
          } else {
            console.log("第二页 left second");
            this.echart_show[1].left = [false, true];
            this.$nextTick(() => {
              this.$refs.Tab2_left_tab2.drawChart();
            });
          }
        } else {
          if (page == "first") {
            console.log("第一页 right first");
            this.echart_show[1].right = [true, false];
            this.$nextTick(() => {
              this.$refs.Tab2_right_tab1.drawChart();
            });
          } else {
            console.log("第一页 right second");
            this.echart_show[1].right = [false, true];
            this.$nextTick(() => {
              this.$refs.Tab2_right_tab2.drawChart();
            });
          }
        }
      }
      //第三大页
      else {
        if (pos == "left") {
          if (page == "first") {
            console.log("第三页 left first");
            //这里面只用处理左边的show的true or false
            this.echart_show[2].left = [true, false];
            this.$nextTick(() => {
              this.$refs.Tab3_left_tab1.drawChart();
            });
          } else {
            console.log("第三页 left second");
            this.echart_show[2].left = [false, true];
            this.$nextTick(() => {
              this.$refs.Tab3_left_tab2.drawChart();
            });
          }
        } else {
          if (page == "first") {
            console.log("第三页 left first");
            //这里面只用处理左边的show的true or false
            this.echart_show[2].right = [true, false];
            this.$nextTick(() => {
              this.$refs.Tab3_right_tab1.drawChart();
            });
          } else {
            console.log("第三页 left second");
            this.echart_show[2].right = [false, true];
            this.$nextTick(() => {
              this.$refs.Tab3_right_tab2.drawChart();
            });
          }
        }
      }
    },

    clickCb(params) {
      console.log(params.data.name, params.data.cityId);
    },
    tryPieChart() {
      let mychart = this.$echarts.init(this.$refs.piechart);
      let option = {
        backgroundColor: "white",
        calculable: true,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255,255,255,1)",
          textStyle: {
            color: "black",
          },
          formatter: function (param) {
            let content = `<div style="padding:5px 10px 10px 10px;">
                            <span style="width:140px;display:inline-block;color:#666; font-family:syht">
                                 <span>${param.name}</span> <br/><span style="margin-left:30px;">改善率 ${param.percent}%</span>
                            </span>
                          </div>`;
            return (
              '<div class="showBox"  style="box-shadow:0px 4px 11px 1px rgba(99,99,99,0.19)" >' +
              content +
              "</div>"
            );
          },
        },
        legend: {
          itemGap: 40,
          data: [
            "服务",
            "资费",
            "收费",
            "营销",
            "安全",
            "网络",
            "客服",
            "宣传",
            "通信",
          ],
          textStyle: {
            color: "black",
          },
          orient: "vertical",
          left: "right",
          itemHeight: 14,
          icon: "circle",
        },
        calculable: true,
        series: [
          {
            name: "半圆",
            type: "pie",
            //这个圆的大小,只有一个0.2%大
            radius: ["4.8%", "5%"],
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "半圆",
                label: {
                  show: false,
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第一条圆弧",
            type: "pie",
            radius: ["14.8%", "15%"],
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第一条圆弧",
                label: {
                  show: false,
                },
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第二条圆弧",
            type: "pie",
            startAngle: -180,
            center: ["25%", "75%"],
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["24.8%", "25%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第二条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第三条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["34.8%", "35%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第三条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第四条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["44.8%", "45%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第四条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第五条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["54.8%", "55%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第五条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第六条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["64.8%", "65%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: "500",
                name: "第六条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },
          {
            name: "第七条圆弧",
            type: "pie",
            center: ["25%", "75%"],
            startAngle: -180,
            hoverAnimation: false,
            legendHoverLink: true,
            radius: ["74.8%", "75%"],
            label: {
              normal: {
                show: false,
              },
            },
            // splitLine: {
            //     show:true,
            //     length: '92%',
            //     lineStyle: {
            //         color: 'red',
            //         width: '1'
            //     }
            // },
            data: [
              {
                value: "500",
                name: "第七条圆弧",
              },
              {
                value: "500",
                itemStyle: {
                  normal: {
                    color: "transparent",
                  },
                },
              },
            ],
          },

          //上面的都是圆弧
          {
            name: "",
            type: "pie",
            radius: [37, 255],
            avoidLabelOverlap: false,
            startAngle: -180,
            center: ["25%", "75%"],
            roseType: "area",
            selectedMode: "single",
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              show: false,
            },
            data: [
              //这下面才是真正的数据
              {
                value: 1000,
                name: this.legendsPie[0],
                itemStyle: {
                  normal: {
                    color: this.piecolor[0],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 1500,
                name: this.legendsPie[1],
                itemStyle: {
                  normal: {
                    color: this.piecolor[1],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 2000,
                name: this.legendsPie[2],
                itemStyle: {
                  normal: {
                    color: this.piecolor[2],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 2500,
                name: this.legendsPie[3],
                itemStyle: {
                  normal: {
                    color: this.piecolor[3],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 3000,
                name: this.legendsPie[4],
                itemStyle: {
                  normal: {
                    color: this.piecolor[4],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 3500,
                name: this.legendsPie[5],
                itemStyle: {
                  normal: {
                    color: this.piecolor[5],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 4000,
                name: this.legendsPie[6],
                itemStyle: {
                  normal: {
                    color: this.piecolor[6],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 4500,
                name: this.legendsPie[7],
                itemStyle: {
                  normal: {
                    color: this.piecolor[7],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 5000,
                name: this.legendsPie[8],
                itemStyle: {
                  normal: {
                    color: this.piecolor[8],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 5000,
                name: this.legendsPie[9],
                itemStyle: {
                  normal: {
                    color: this.piecolor[9],
                    borderWidth: 1,
                    borderColor: "white",
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
              {
                value: 0,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
              },
            ],
          },
        ],
      };
      mychart.setOption(option);
    },
  },
  mounted() {
    //第一页图表的初始化
    this.$refs.Tab1_left_tab1.drawChart();
    // this.$refs.Tab1_left_tab2.drawChart();
    this.$refs.Tab1_right_tab1.drawChart();
    // this.$refs.Tab1_right_tab2.drawChart();
    this.tryPieChart();
  },
};
</script>

<style lang="scss">
.complaintindex {
  background-color: rgb(242, 242, 242);
  padding: 20px;
  width: 100vw;
  height: 100vh;
  position: relative;
  .selctChoice {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
  }
  .el-tabs__nav-wrap::after {
    background-color: rgb(242, 242, 242) !important;
  }
  .flexcontain {
    display: flex;
    height: 650px;
    width: 100%;
    .leftcontain {
      background-color: white;
      width: 50%;
      height: 100%;
      margin-right: 20px;
      border-radius: 10px;
      padding: 20px;
      .el-tabs__content {
        overflow: hidden;
        position: relative;
        height: 100%;
        // background-color: pink;
        padding-top: 20px;
      }
      .el-tab-pane {
        // padding-top: 30px;
        height: 100%;
      }
      .tabPaneItem,
      .el-tabs,
      .el-tabs--top {
        height: 100%;
      }
      .showinfo {
        position: relative;
        top: -25px;
        font-size: 12px;
        color: rgb(127, 127, 127);
        width: 100%;
        height: 14vh;
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .showinfo_item {
          background-color: rgb(245, 245, 245);
          height: 100%;
          width: 48%;
          display: flex;
          flex-direction: row;
          align-content: center;
          justify-content: space-around;
          .item_left {
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
            padding-left: 10px;
            .item_left_data {
              width: 100%;
              font-size: 25px;
              color: black;
            }
          }
          .item_right {
            padding-top: 15px;
            font-size: 12px;
            width: 45%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .rightcontain {
      height: 100%;
      width: 50%;
      .topcontain {
        background-color: white;
        border-radius: 10px;
        width: 100%;
        height: 50%;
        padding: 20px;
      }
      .bottomcontain {
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        margin-top: 20px;
        width: 100%;
        height: 50%;
      }
    }
    .btns {
      height: 15%;
    }
  }
  .title-h3 {
    margin: 0;
  }
}
</style>