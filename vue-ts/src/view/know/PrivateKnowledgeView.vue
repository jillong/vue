<template>
  <!-- TODO 添加文件时，滑轮自动往下拉。最好实现文件拖拉框和 el-table在一起-->
  <div style="display: flex; justify-content: space-between; align-items: center;">
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
    <el-button type="warning" size="large" @click="uploadFile" :disabled="uploading">
      全部上传
    </el-button>
  </div>

  <div class="file-list-container">
    <el-table
        :data="fileList"
        border
        stripe
        style="width: 100%;"
        height="250"
        :empty-text="fileList.length === 0 ? '文件仅暂存在此处，点击【全部上传】按钮到知识库。' : ''"
    >
      <el-table-column label="文件名" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button type="text" @click="deleteFileInWeb($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-form
      style="display: flex; justify-content: space-between"
      :model="queryFileDto"
  >
    <div class="form-item-container">
      <el-button type="primary" @click="getFileData" :disabled="isLoading">搜索</el-button>
      <el-input class="input-with-margin" placeholder="请输入文件名称" v-model="queryFileDto.filter"/>
    </div>
  </el-form>

  <el-table :data="storeFileData" border v-loading="isLoading">
    <el-table-column prop="id" label="ID"/>
    <el-table-column prop="fileName" label="文件名"/>
    <el-table-column label="上传时间">
      <template #default="scope">
        {{ format(new Date(scope.row.createTime), "yyyy-MM-dd HH:mm") }}
      </template>
    </el-table-column>
    <el-table-column label="更新时间">
      <template #default="scope">
        {{ format(new Date(scope.row.updateTime), "yyyy-MM-dd HH:mm") }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button type="danger" size="small" @click="deleteStoreFileWithConfirm(scope.row.id)">删除</el-button>
        <el-button type="primary" size="small" @click="openFilePreview(scope.row.url)">预览</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox, ElMessageBoxOptions, UploadUserFile} from "element-plus";
import {QueryFileDto, StoreFile} from "@/entity/chatDTO";
import {deleteFileApi, queryFileApi, uploadFileApi} from "@/api/Knowledge";
import {format} from 'date-fns';

const fileList = ref<UploadUserFile[]>([]);
const uploading = ref(false);
const isLoading = ref(false);
const storeFileTotal = ref(0);
const storeFileData = ref<StoreFile[]>([]);
const deleteFileInWeb = (index: number) => {
  fileList.value.splice(index, 1);
};

const options: ElMessageBoxOptions = {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  type: "warning",
};
const deleteStoreFileWithConfirm = async (id: any) => {
  await ElMessageBox.confirm("确定要删除这个文件吗？", "警告", options);
  await deleteStoreFile(id);
  await getFileData();
};
const deleteStoreFile = async (id: any) => {
  await deleteFileApi(id)
      .then((res) => {
        console.log("res", res);
        let status = res.status;
        if (status == 200) {
          ElMessage({
            type: "success",
            message: res.data.message,
          });
        } else {
          ElMessage({
            type: "error",
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        ElMessage({
          type: "error",
          message: err,
        });
      });
}
const uploadFile = async () => {
  const files: File[] = [];
  fileList.value?.forEach((e) => {
    files.push(e.raw as File);
  });
  uploading.value = true;
  await uploadFileApi(files);
  await getFileData();
  fileList.value = [];
  uploading.value = false;
}

// 查询知识库文件
const getFileData = () => {
  isLoading.value = true;
  queryFileApi(queryFileDto.value)
      .then((res) => {
        console.log("res", res);
        let status = res.status;
        if (status == 200) {
          const data = res.data;
          storeFileTotal.value = data.total;
          storeFileData.value = data.data;
        } else {
          // 接口异常
          ElMessage({
            type: "error",
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        ElMessage({
          type: "error",
          message: err,
        });
      })
      .finally(() => {
        isLoading.value = false;
      });
};
const openFilePreview = (url: string) => {
  window.open(url, "_blank");
};

onMounted(() => {
  getFileData();
});

const queryFileDto = ref<QueryFileDto>({
  page: 1,
  pageSize: 10,
  filter: "",
});

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
  width: 100%;
  max-height: 30%; /* 设置最大高度 */
  overflow-y: auto; /* 垂直滚动条 */
  padding-top: 10px; /* 顶层边距 */
  padding-bottom: 30px; /* 顶层边距 */
}

/* 设置表格的虚线边框 */
.el-table {
  border: 1px dashed #ccc;
}

.form-item-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-with-margin {
  margin-left: 10px; /* Adjust the spacing as needed */
}

</style>
