<template>
  <div id="basic-layout">
    <el-container>
      <el-aside :style="asideStyle">
        <BasicAside />
      </el-aside>
      <el-main style="margin-left: 10px; background-color: #f3f3f3">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from "vue";
import BasicAside from "@/components/BasicAside.vue";

const asideStyle = ref({ width: "200px" });

</script>

<style scoped lang="less">
#basic-layout {
  margin: 10px;
}
</style>
