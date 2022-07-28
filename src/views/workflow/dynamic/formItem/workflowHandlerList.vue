<template>
  <div>
    <el-select
      v-model="userid"
      placeholder="请选择人员"
      size="small"
      :multiple="true"
      @change="getUserMan"
    >
      <el-option
        v-for="item in UserList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
// import {getUserByRole} from '@/api/common/index.js';
export default {
  components: {},
  name: 'formItem-workflowHandlerList',
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
      if (val && val.length === 0) {
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
      // getUserByRole({roleId: this.fieldInfo.params.userRoleId}).then(
      //   (res) => {
      //     if (res) {
      //       this.UserList = res.data;
      //     }
      //   }
      // );
    },
    // 选择回调
    getUserMan() {
      this.$emit('change', this.userid);
    },
  },
};
</script>
