<template>
  <el-select
    v-model="userid"
    placeholder="请选择人员"
    filterable
    size="small"
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
</template>

<script>
// import {getUserList} from '@/api/common/index.js';
export default {
  components: {},
  name: 'formItem-handler',
  props: {
    data: Array,
    fieldInfo: Object,
  },
  mounted() {
    // 字段名 userName
    this.getUserInfo();
  },
  created() {
    this.$emit('change', []);
  },
  data() {
    return {
      userid: '',
      UserList: [],
    };
  },
  watch: {
    data(val) {
      if (val.length === 0) {
        this.userid = '';
      }
    },
  },
  methods: {
    // 获取数据
    getUserInfo() {
      getUserList({}).then((res) => {
        if (res) {
          // console.log('用户',res);
          this.UserList = res;
        }
      });
    },
    // 选择回调
    getUserMan() {
      this.$emit('change', [this.userid]);
    },
  },
};
</script>
