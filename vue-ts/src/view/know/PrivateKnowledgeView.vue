<template>
  <div style="display: flex; justify-content: right; margin: 20px">
    <el-button type="warning" size="large" @click="uploadFiles" :disabled="uploading">
      全部上传
    </el-button>
  </div>
  <el-upload class="upload-demo" drag multiple v-model:file-list="fileList" :auto-upload="false" v-loading="uploading">
    <el-icon class="el-icon--upload">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">拖拽文件至此或<em>点击选择文件</em>进行上传</div>
    <template #tip>
      <div style="text-align: center">
        <el-text>文件支持 <i>pdf、doc、md、excel、text</i>等，最大可上传<em style="color: blue">20MB</em></el-text>
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {UploadUserFile} from "element-plus";

const uploading = ref(false);
const fileList = ref<UploadUserFile[]>([]);

const uploadFiles = () => {
  if (fileList.value.length === 0) {
    console.log('没有选择文件');
    return;
  }

  uploading.value = true;

  // 模拟文件上传
  setTimeout(() => {
    console.log('文件上传成功', fileList.value);
    uploading.value = false;
  }, 2000);
};
</script>