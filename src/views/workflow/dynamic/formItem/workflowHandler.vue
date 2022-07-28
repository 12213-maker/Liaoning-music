<template>
  <el-select
    v-model="userid"
    placeholder="请选择人员"
    size="small"
    collapse-tags
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
</template>

<script>
// import {getUserByRole} from '@/api/common/index.js';
export default {
  components: {},
  name: 'formItem-workflowHandler',
  props: {
    data: String,
    fieldInfo: Object,
  },
  mounted() {
    // 字段名 userName
    this.getUserInfo();
  },
  created() {
    this.$emit('change', '');
  },
  data() {
    return {
      userid: '',
      UserList: [],
    };
  },
  watch: {
    data(val) {
      if (val && val.length === 0) {
        this.userid = '';
      }
    },
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
