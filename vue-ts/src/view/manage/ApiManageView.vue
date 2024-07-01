<template>
  <div>
    <el-table class="table" table-layout="auto" border :data="data" v-loading="loading">
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="status" label="status"/>
      <el-table-column prop="apiKey" label="apiKey"/>
      <el-table-column prop="baseUrl" label="baseUrl"/>
      <el-table-column prop="description" label="description"/>
      <el-table-column align="right">
        <template #header>
          <el-button
              style="width: 132px"
              type="primary"
              size="default"
              @click="insertDialogVisible = true"
          >添加API
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getChatApi} from "@/api/ChatApi";

const data = ref([])
const loading = ref(true)
const insertDialogVisible = ref(false)

const getData = async () => {
  const res = await getChatApi()
  console.log(res)
  data.value = res.data
}

onMounted(async () => {
  await getData()
  loading.value = false
})

</script>
