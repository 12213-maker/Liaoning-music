## 开发

```bash
# 进入项目目录
cd ai-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 引入按照Vuiket
# 添加依赖
npm install vuikit -s  
npm install @vuikit/icons -s  
npm install @vuikit/theme -s  
# 安装
import VuikitTheme from '@vuikit/theme'  
import Vuikit from 'vuikit'  
import VuikitIcons from '@vuikit/icons'  

Vue.use(Vuikit)  
Vue.use(VuikitIcons)  
Vue.use(VuikitTheme)  




张海明:
## 开发完成定义

### 需求就绪定义
1. 需求澄清完成
2. 有明确的验收条件

### 需求开发完成定义
1. 前后端联调完成
2. 自测完成
3. 老功能的影响范围清单提交到测试人员

### 自测完成标准
1. 开发人员完成所有需求验收条件的验证
2. 验证交互和原型一致
3. 验证样式和高保真一致
4. 受影响老功能的正确性验证
5. 缺陷修复验证通过


## 上线流程
#### 上线日志
1. 测试人员提供功能清单和缺陷修复清单给产品经理

#### 上线前置条件
1. QA测试通过
2. 产品经理验收通过（BUG修复版本除外）
3. 用户验收通过（BUG修复版本除外）

#### 上线时机
1. 节假日前一天不上线（和客户达成一致）
2. 承诺日期前上线

#### 上线策略
1. 上线尽量不中断服务 or 业务低峰期上线
2. 必须有快速回退机制
3. 上线完成后产品经理将上线日志发送到相关方



# Liaoning-music
