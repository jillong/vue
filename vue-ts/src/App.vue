<template>
  <div id="basic-layout">
    <el-container>
      <el-aside :style="asideStyle">
        <BasicAside @change-aside="changeAside" />
      </el-aside>
      <el-main style="margin-left: 10px; background-color: #f3f3f3">
        <RouterView />
      </el-main>
    </el-container>
  </div>
  <router-view></router-view>
</template>

<script setup>

import {ref} from "vue";
// 创建一个响应式变量
const asideStyle = ref({ width: "200px" });

const changeAside = (isCollapse) => {
  if (isCollapse) {
    asideStyle.value.width = "auto";
  } else {
    // 动态变到150px
    asideStyle.value.width = "200px";
  }
};
</script>

<style scoped lang="less">
#basic-layout {
  margin: 10px;
}
</style>
