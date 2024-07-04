<template>
  <div id="basic-layout">
    <el-container style="height: 99vh;">
      <el-aside :style="asideStyle">
        <BasicAside />
      </el-aside>
      <el-main style="margin-left: 10px; background-color: #ffffff;">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import BasicAside from "./components/BasicAside.vue";

const asideStyle = ref({ width: "300px" });

</script>

<style scoped lang="less">
#basic-layout {
  margin: 10px;
  height: calc(100vh - 20px); /* 减去上下边距 */
}
</style>