<template>
  <div>
    <div class="logo-container">
      <img class="logo" src="~@/assets/login_logo.png">
      <span>单词管理</span>
    </div>
    <el-col>
      <el-menu
        :router="true"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/admin/classify">
          <i class="el-icon-date"></i>
          <span slot="title">单词分类</span>
        </el-menu-item>
        <el-menu-item index="/admin/word">
          <i class="el-icon-date"></i>
          <span slot="title">单词管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  props: {
    defaultActive: String,
  },
  methods: {
    // eslint-disable-next-line
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    // eslint-disable-next-line
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
.logo-container{
  height: 60px;
  line-height: 59px;
  color: #002140;
  font-size: 14px;
  border-bottom: 1px solid #e4e4e4;

  .logo{
    height: 40px;
    margin: 10px 20px;
    vertical-align: middle;
  }
}

.el-menu{
  border-right: 0;
}
</style>
