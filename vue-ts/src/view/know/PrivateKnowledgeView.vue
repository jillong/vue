<template>
  <el-upload
      class="upload-demo"
      multiple
      v-model:file-list="fileList"
      :auto-upload="false"
      v-loading="uploading"
      :show-file-list="false"
  >
    <el-tooltip content="文件支持 pdf、doc、md、excel、text 等">
      <el-button class="upload-button" type="primary">上传文件</el-button>
    </el-tooltip>
  </el-upload>
  <div class="file-list-container">
    <el-table
        :data="fileList"
        border
        stripe
        style="width: 100%;"
        height="250"
    >
      <el-table-column label="文件名" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button type="text" @click="deleteFile($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {UploadUserFile} from "element-plus";

const fileList = ref<UploadUserFile[]>([]);
const uploading = ref(false);

const deleteFile = (index: number) => {
  fileList.value.splice(index, 1);
};
</script>

<style scoped>
.upload-button {
  width: 120px; /* 设置按钮宽度 */
  height: 36px; /* 设置按钮高度 */
  line-height: 36px; /* 设置按钮内文字行高，使其居中 */
}

.upload-demo {
  display: inline-block; /* 调整上传组件为行内块显示 */
  vertical-align: middle; /* 垂直居中对齐 */
}

.file-list-container {
  width: 98%;
  max-height: 30%; /* 设置最大高度 */
  overflow-y: auto; /* 垂直滚动条 */
  padding-top: 10px; /* 顶层边距 */
}

.empty-list {
  text-align: center;
  padding: 20px;
  color: #999;
}

/* 设置表格的虚线边框 */
.el-table {
  border: 1px dashed #ccc;
}

</style>
