<template>
  <!-- 报表首页 -->
  <div class="dy-page-wrap">
    <!-- <img src="@/assets/images/banner-mini.png" style="width:100%;" /> -->
    <div class="dy-container">
      <section class="Reportcenter">
        <div class="title-center">
          <NumberTitle num="01" text="报表中心" />
          <!-- clearable -->
          <div class="searchContent">
            <el-select
            class="searchInput"
              v-model="searchInput"
              size="medium"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              @change="goPage"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.id + ',' + item.statementUrl"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="Report-swiper">
          <div class="satSwiper swiperBox">
            <swiper ref="mySwiper" :options="swiperOptions" class="mySwiper">
              <swiper-slide
                v-for="(item, index) in ReportCenterData"
                :key="index"
                :class="{ active: isActive === index }"
              >
                <div class="content">
                  <div class="name">
                    {{ item.statementMenuName }}
                    <span class="score">
                      {{ item.statementSumNumByUser }}/{{
                        item.statementSumNum
                      }}
                    </span>
                  </div>
                  <div class="Per">{{ item.statementPercent }}</div>
                  <div>
                    <progress
                      class="centerProgress"
                      :value="parseInt(item.statementPercent)"
                      max="100"
                    ></progress>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div
              class="swiper-button-prev"
              @click="prev"
              :class="{ btnActive: prevCanActive }"
            >
              <i class="el-icon-caret-left"></i>
            </div>
            <div
              class="swiper-button-next"
              @click="next"
              :class="{ btnActive: nextCanActive }"
            >
              <i class="el-icon-caret-right"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="recommendLook">
        <!-- 报表推荐 -->
        <div class="box-card Report-recommend">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px"><b>报表推荐</b></span>
          </div>
          <div>
            <ul class="recommendList scroll_box4" ref="recommendUl">
              <li v-for="item in recommendList" :key="item.id">
                <img class="rec" :src="recommendListLogo" alt="" />
                <span @click="goPath(item)" class="reword">{{ item.statementName }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 大家都在看 -->
        <section class="box-card All-watch">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px"><b>大家都在看</b></span>
          </div>
          <div>
            <section id="lookbox">
              <ul class="Looklist scroll_box4">
                <li v-for="(item, index) in Looklist" :key="index">
                  <span
                    :class="index + 1 < 4 ? 'CurrentStyle' : ''"
                    id="initNumber"
                    >{{ index + 1 }}</span
                  >
                  <img class="rec" :src="recommendListLogo" alt="" />
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.statementName"
                    placement="top"
                  >
                    <span @click="goPath(item)" class="Cword">{{item.statementName}}</span>
                  </el-tooltip>
                  <span id="clickNum">{{ item.clickNum }} 次</span>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </section>

      <!-- 报表检索 -->
      <NumberTitle num="02" text="报表检索" class="TitleTwo" />
      <section class="Report-retrieval">
        <div class="centerReport">
          <p class="Recommended">报表推荐</p>
          <div class="retrievalbox">
            <div class="ReportChart" ref="Mygird"></div>
            <section class="complatints" v-loading="listLoading">
              <ul class="apply">
                <li v-for="item in complatintsList" :key="item.id">
                  <img class="rec" :src="recommendListLogo" alt="" />
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.statementName"
                    placement="top"
                  >
                    <span @click="goPath(item)" class="Cword">
                      <!-- .substring(9, 17) -->
                      {{ item.statementName }}</span
                    >
                  </el-tooltip>
                </li>
              </ul>
            </section>
          </div>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="total,prev, pager, next,jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "swiper/dist/css/swiper.css";
import NumberTitle from "@/components/common/numberTitle";
import { getToken } from "@/api/login";
import { getReportList, postSearch, postReportList } from "@/api/dy/report.js";
const satValue = [
  {
    icon: require("@/assets/images/home/icon5.png"),
    name: "KPI预估",
    value: "",
  },
];
export default {
  name: "ReportHome",
  components: { NumberTitle },
  data() {
    return {
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [],
      searchInput: "",
      countLi: 0,
      prevCanActive: false,
      nextCanActive: false,
      customColors: "#F19733",
      ReportCenterData: [],
      percentage: 20,
      echartsData: "",
      menuData: [],
      satValue,
      Looklist: [],
      currentPage: 1, //当前页码
      total: 0, //总记录数
      currentPage: 1, //当前页码
      pageSize: 15, //每页显示15条数据
      input2: "",
      recommendList: [],
      carList: [], //轮播图数组
      isActive: 0,
      NewData: [],
      swiperOptions: {
        autoplay: false,
        spaceBetween: 50,
        slidesPerView: 6,
        observer: true,
        observeParents: true,
        // loop: true, // 环路
        // loopedSlides: 4, //looped slides should be the same

        slideToClickedSlide: true,
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        onTouchEnd: (swiper, event) => {
          //  监听swiper鼠标滚动事件更改小箭头颜色
          if (swiper.isBeginning) {
            this.prevCanActive = false;
          } else {
            this.prevCanActive = true;
          }
          if (swiper.isEnd) {
            this.nextCanActive = false;
          } else {
            this.nextCanActive = true;
          }
        },
      },
      complatintsList: [],
      recommendListLogo: require("@/assets/images/editgoup14.png"),
      footLogo: require("@/assets/images/ed2.png"),

      listLoading: false
    };
  },
  methods: {
    // 下拉列表
    getSelectData() {
      postReportList(
        { statementName: this.searchInput },
        "statementDetailList/searchStatementList"
      ).then((res) => {
        if (res.success) {
          this.states = res.data;
          this.list = this.states.map((item) => {
            return {
              id: `${item.id}`,
              value: `${item.statementName}`,
              label: `${item.statementName}`,
              statementUrl: `${item.statementUrl}`,
            };
          });
          // console.log(this.states);
        }
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
          // console.log(this.options);
        }, 200);
      } else {
        this.options = [];
      }
    },

    goPage(my) {
      if (my) {
        let id = my.split(",");
        console.log(id[0]);
        // 点击发送报表日志接口
        postReportList({ statementId: id[0] }, "statementLogUser/statementLog");
        // 查询列表接口
        if (id[1] !== "") {
          getToken().then((res) => {
            if (res.status === 200) {
              window.open(`${id[1]}&token=${res.data}`);
              this.getAllwatch();
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          this.$message.error("url为空");
        }
      }
    },
    goPath(item) {
      //点击发送报表日志接口
      postReportList(
        { statementId: item.id ? item.id : item.statementId },
        "statementLogUser/statementLog"
      );
      // 查询列表接口
      if (item.statementUrl) {
        getToken().then((res) => {
          if (res.status === 200) {
            window.open(`${item.statementUrl}&token=${res.data}`);
            this.getAllwatch();
            this.getRecommend();
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        this.$message.error("url为空");
      }
    },
    //获取报表右侧列表分页查询
    getBusinessData() {
      let param = {
        menuId: 0,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.listLoading = true;
      postSearch(param, "statementDetailList/reportToRetrieve")
      .then((res) => {
        console.log('a:',res)
        if (res.success) {
          this.complatintsList = res.data.list;
          this.total = parseInt(res.data.total);
        }
      })
      .finally(()=>{
        this.listLoading = false;
      })
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getBusinessData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBusinessData();
    },
    // 报表推荐
    getRecommend() {
      getReportList("statementLogUser/statementRecommend").then((res) => {
        console.log('b:',res)
        if (res.success) {
          this.recommendList = res.data;
          this.countLi = res.data.length;
        }
      });
    },
    //大家都在看
    getAllwatch() {
      getReportList("statementLogUser/everyoneIsWatching").then((res) => {
        console.log('c:',res)
        if (res.success) {
          this.Looklist = res.data.filter((item, index) => {
            if (index < 5) {
              return item;
            }
          });
        }
      });
    },
    //报表中心展示
    showReportCenter() {
      getReportList("statement/proportion").then((res) => {
        console.log('d:',res)
        this.ReportCenterData = res.data;
        console.log(res.data.length);
        if (res.data.length > 6) {
          this.nextCanActive = true;
        }
      });
    },

    // 矩形图

    Ldraw() {
      var myChart = echarts.init(this.$refs.Mygird);
      let _this = this;
      console.log(1)
      // myChart.getDom().style.height = document.body.clientHeight + 50 + "vh";
      myChart.on("click", (params) => {
        console.log("echart clicked", params);
        _this.currentPage = 1;
        _this.listLoading = true;
        let sonData = { pageNum: _this.currentPage, pageSize: _this.pageSize, menuId: params.data.id };
        postSearch(sonData, "statementDetailList/reportToRetrieve").then(
          (res) => {
            if (res.success) {
              this.complatintsList = res.data.list;
              this.total = res.data.total;
            }
          }
        ).finally(()=>{
          _this.listLoading = false;
        })
      });

      myChart.on("dblclick", (params) => {
        console.log("echart clicked", params);
        this.getBusinessData();
      });

      myChart.showLoading({
        text: "正在努力加载中...",
        color: "#ff9900",
      });

      console.log(2)
      myChart.setOption({
        // color:['#66B2FF','#85C285','#FF8585','#FFC266'],
        color: ["#FFC266", "#FFC266", "#FFC266", "#FFC266"],
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "0",
                  y: "1",
                  height: "100%",
                  width: "100%",
                  funnelAlign: "left",
                  max: 500,
                },
              },
            },
            restore: { show: false },
            saveAsImage: { show: false },
          },
        },

        calculable: false,
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ",
        },
        legend: {
          left: "right",
          data: [],
        },

        series: [
          {
            nodeClick: false,
            roam: false,
            width: 360,
            top: 20,
            left: 0,
            name: "",
            borderColor: "white",
            type: "treemap",
            breadcrumb: {
              show: false,
            },
            data: [{}],
            itemStyle: {
              normal: {
                // borderWidth:1,
                //   borderColor: '#fff'    //方块分割边框颜色
                gapWidth: 1,
              },
            },
          },
        ],
      });

      console.log(3)

      getReportList("statement/menu").then((res) => {
        if (res.success) {
          this.menuData = res.data;
          var newArr = [];
          res.data.forEach((item, index) => {
            newArr.push({
              id: item.id,
              name: item.menuName,
              value: item.statementNum,
            });
          });
          this.echartsData = newArr;
          var options = myChart.getOption();
          options.series[0].data = newArr;
          myChart.hideLoading();
          myChart.setOption(options);
        }
      });
    },
    //轮播图
    prev() {
      this.Swiper.slidePrev();
      if (!this.Swiper.isEnd) {
        this.nextCanActive = true;
      }
      if (this.Swiper.isBeginning) {
        return (this.prevCanActive = false);
      }
      this.prevCanActive = true;
    },
    next() {
      this.Swiper.slideNext();
      if (!this.Swiper.isBeginning) {
        this.prevCanActive = true;
      }
      if (this.Swiper.isEnd) {
        return (this.nextCanActive = false);
      }
      this.nextCanActive = true;
    },
    load() {
      this.Looklist += 1;
    },
  },
  mounted() {
    this.getBusinessData();
    this.getRecommend();
    this.Ldraw();
    this.remoteMethod();
    this.showReportCenter();
  },
  computed: {
    Swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  created() {
    this.isActive = 0;
    this.getSelectData();
    this.getAllwatch();

    // this.getretrievalLeftData()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.searchInput v-deep .el-input .el-input__inner{
    border-color: #E6E6E6;
    height: 32px;
    width: 200px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.reword {
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Cword {
  width: 230px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Reportcenter {
  width: 100%;
  .title-center {
    width: 100%;
    // height: 64px;
    line-height: 64px;
    .searchContent {
      margin-top: -50px;
      float: right;
      .ReportSearch {
        width: 236px;
        height: 32px;
      }
      .searchBtn {
        position: relative;
        z-index: 2;
        margin-left: 10px;
        width: 76px !important;
        height: 32px !important;
      }
    }
  }
}

/* 报表中心等轮播 */
.Report-swiper {
  width: 100%;
  height: 118px;
  margin: 24px auto;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  .swiperBox {
    background-color: rgb(245, 245, 245);
    justify-content: space-around;
    padding: 0px 30px 0px 30px;
    .mySwiper {
      width: 100%;
      .content {
        width: 100%;
        height: 100%;
        .centerProgress {
          width: 100%;
          height: 10px;
          border-radius: inherit;
          margin-top: 15px;
          border:0px;
          outline:0px;
        }
      }
    }
  }

  progress::-webkit-progress-bar {
    background-color: #f2f2f2;
  }
  progress::-webkit-progress-value {
    background-color: #ffa721;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #dcdcdc;
    background: transparent;
  }
  .swiper-button-prev {
    left: -15px;
  }
  .btnActive {
    color: #ff9900 !important;
  }
  .score {
    float: right;
    color: #595959;
  }

  .name {
    width: 100%;
  }
  .Per {
    font-size: 24px;
    font-weight: bold;
    margin-top: 7px;
  }
}
.swiper-slide {
  background-color: white;
  width: 202px !important;
  margin-right: 24px !important;
  height: 118px;
  padding: 14px;
  box-sizing:border-box;

  .content {
    height:100%;
  }
}

.Report-swiper i {
  font-size: 50px;
}
.Report-swiper ul li {
  /* float: left; */
  margin-right: 35px;
  vertical-align: top;
  width: 240px;
  height: 104px;
  padding: 10px;
  background-color: white;
}

/* 报表推荐 */

.recommendLook {
  display: flex;
  margin-top: 24px;
  .Report-recommend {
    width: 67%;
    height: 280px;
    background: white;
    padding: 12px 24px 24px 24px;
    margin-right: 24px;
    .recommendList {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 200px;
      overflow: auto;
      font-size: 14px;
      margin-top: 16px;
      :hover {
        cursor: pointer;
        background-color: #f5f5f5;
      }
      li {
        width: 46%;
        margin-right: 24px;
        height: 40px;
        align-items: center;
        clear: both;
        display: flex;
      }
    }
  }
  /* 大家都在看 */
  .All-watch {
    width: 37%;
    height: 280px;
    padding: 12px 23px 23px 23px;
    background-color: white;
    #lookbox {
      display: flex;
      justify-content: space-between;
      .Looklist {
        width: 100%;
        height: 188px;
        // overflow: auto;
        margin-top: 16px;
        :hover {
          cursor: pointer;
          background-color: #f5f5f5;
        }
        li {
          width: 100%;
          height: 40px;
          overflow: hidden;
          display: flex;
          align-items: center;
          position: relative;
          img {
            vertical-align: top;
            margin-left: 10px;
            margin-right: 5px;
          }
          #initNumber {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            display: inline-block;
          }
          .CurrentStyle {
            background-color: #fe9a00;
            color: white;
          }
          #clickNum {
            margin-left: 50px;
            width: 60px;
            box-sizing: border-box;
            text-align: right;
          }
        }
      }
    }
  }
}
.title {
  font-size: 30px;
}
img.rec {
  margin-right: 5px;
  width: 24px;
  height: 24px;
}

/* 报表检索 */
.TitleTwo {
  margin-top: 24px;
}
.Report-retrieval {
  margin-top: 24px;
  width: 100%;
  height: 326px;
  background-color: white;
  padding: 14px 23px 23px 23px;
  margin-top: 24px;
  .retrievalTitle {
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 9;
    .retrievalNumber {
      width: 166px;
      height: 64px;
      font-size: 56px;
      font-family: SourceHanSansSC-Bold, SourceHanSansSC;
      font-weight: bold;
      color: #fcd0a4;
      line-height: 64px;
      position: absolute;
      top: -33px;
      left: 0;
      z-index: -1;
    }
    .retrievalLine {
      width: 328px;
      height: 8px;
      background: linear-gradient(270deg, #ffebcc 0%, #ffa51e 100%);
      position: absolute;
      bottom: 20px;
      left: 0;
      z-index: -1;
    }
  }
  .centerReport {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: relative;
    .Recommended {
      font-size: 20px;
      margin:0px;
      height:40px;
      line-height:40px;
      min-height:40px;
    }
    .page {
      bottom: 20px;
      right: 20px;
      position: absolute;
    }
    .retrievalbox {
      width: 100%;
      height:auto;
      display: flex;
      .ReportChart {
        width: 30%;
        height: 263px;
        #main {
          width: 100%;
          height: 263px;
        }
      }
      .complatints {
        height: 263px;
        width: 70%;
        margin-left: 35px;
        .apply {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          :hover {
            cursor: pointer;
            background-color: #f5f5f5;
          }
          li {
            margin-right: 24px;
            width: 30%;
            height: 40px;
            display: flex;
            align-items: center;
            img {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}

/* ****************************** */
</style>
