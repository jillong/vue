<template>
  <el-form
    label-width="auto"
    label-position="top"
  >
    <el-form>
      <el-form-item label="聊天历史长度">
        <el-input-number
          v-model="message"
          :min="1"
          :max="50"
          @change="handleChangeHistoryLength"
        />
      </el-form-item>
    </el-form>
  </el-form>
</template>

<script setup>
import {ref} from "vue";

const message = ref('')
const handleChangeHistoryLength = (e) => {
  message.value = e;
};
</script>