<template>
  <div class="aside">
    <el-menu :default-active="this.$route.path" router class="el-menu-vertical-demo"
             background-color="rgb(216,29,0)" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-sub-menu v-if="isAdmin" index="1">
        <template  #title>学生页面</template>
        <el-menu-item index="/user/add">添加学生</el-menu-item>
        <el-menu-item index="/user/list">学生列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu v-if="isAdmin" index="2">
        <template #title>管理员页面</template>
        <el-menu-item v-if="suAdmin" index="/admin/add">添加管理员</el-menu-item>
        <el-menu-item index="/admin/list">管理员列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu v-if="isAdmin" index="3">
        <template #title>图书分类页面</template>
        <el-menu-item v-if="showAddBook" index="/category/add">添加书籍分类</el-menu-item>
        <el-menu-item index="/category/list">图书分类列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>图书页面</template>
        <el-menu-item v-if="showAddBook" index="/book/add">添加书籍</el-menu-item>
        <el-menu-item index="/book/list">图书列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>借书页面</template>
        <!-- <el-menu-item index="/borrow/add">添加借书信息</el-menu-item> -->
        <el-menu-item index="/borrow/list">借书列表</el-menu-item>
      </el-sub-menu>
    </el-menu>

  </div>
</template>

<script>
import jsCookie from 'js-cookie';
import {ref} from 'vue';

export default {
  setup() {
    let suAdmin = false;
    let isAdmin = false;
    let showAddBook = false;
    // 从 Cookie 中获取管理员信息
    let adminInfo = jsCookie.get('admin') ? JSON.parse(jsCookie.get('admin')) : {};
    console.log("adminInfo", adminInfo)
    if (adminInfo && adminInfo.level === -1) {
      suAdmin = ref(true);
      isAdmin = ref(true);
    }
    if (adminInfo && adminInfo.level === 1) {
      isAdmin = ref(true);
    }
    if (adminInfo.level === -1 || adminInfo.level === 1) {
      showAddBook = ref(true);
    }
    return {
      isAdmin,
      suAdmin,
      showAddBook
    };
  }
}
</script>


<style scoped>
.aside {
  width: 200px;
  overflow: hidden;
  margin-right: 2px;
  background-color: rgb(131, 0, 0);
}
</style>