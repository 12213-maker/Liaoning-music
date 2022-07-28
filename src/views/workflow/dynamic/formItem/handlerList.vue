<template>
  <div>
    <el-select
      v-model="userid"
      placeholder="请选择人员"
      filterable
      size="small"
      :multiple="true"
      @change="getUserMan"
    >
      <el-option
        v-for="(item, index) in UserList"
        :key="index"
        :label="item.username"
        :value="item.userid"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
// import {getUserList} from '@/api/common/index.js';
export default {
  components: {},
  name: 'formItem-handlerList',
  props: {
    data: Array,
    fieldInfo: Object,
  },
  mounted() {
    // 字段名 userName
    this.getUserInfo();
  },
  data() {
    return {
      userid: [],
      UserList: [],
    };
  },
  watch: {
    data(val) {
      if (val.length === 0) {
        this.userid = [];
      }
    },
  },
  created() {
    this.getUserMan();
  },
  methods: {
    // 获取数据
    getUserInfo() {
      getUserList({}).then((res) => {
        if (res) {
          this.UserList = res;
        }
      });
    },
    // 选择回调
    getUserMan() {
      this.$emit('change', this.userid);
    },
  },
};
</script>
