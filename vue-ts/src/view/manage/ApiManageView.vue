<template>
  <div>
    <!-- 上半部分：添加API 和 搜索框 -->
    <div class="header">
      <div class="header-left">
        <span>调用API管理</span>
        <span style="margin-right: 50px;"></span>
        <el-input
            v-model="searchQuery"
            placeholder="暂未实现"
            prefix-icon="el-icon-search"
            @input="handleSearch"
            style="width: 200px"
        />
      </div>
      <div class="header-right">
        <el-button type="primary" @click="openDialog()">添加API</el-button>
      </div>
    </div>
    <!-- 灰色的区分线 -->
    <div class="divider"></div>

    <el-table class="table" table-layout="auto" border :data="data" v-loading="loading">
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="apiKey" label="ApiKey"/>
      <el-table-column prop="baseUrl" label="BaseUrl"/>
      <el-table-column prop="description" label="Description"/>
      <el-table-column prop="status" label="Status">
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="()=> chatApiUpdate(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="left">
        <template #header>
          <span style="width: 132px; display: inline-block;">操作</span>
        </template>
        <template #default="scope">
          <div>
            <el-button type="primary" size="default" @click="openDialog(scope.row)">编辑</el-button>
            <el-button type="danger" size="default" @click="handleDelete(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或编辑 API 对话框 -->
    <el-dialog
        :title="isEditing ? '编辑 API' : '添加 API'"
        v-model="dialogVisible"
        width="35%"
        @close="resetForm"
    >
      <el-form
          :model="form"
          :rules="insertFormRules"
          label-width="100px"
      >
        <el-form-item label="Id" prop="id" required>
          <el-input v-model.trim="form.id" placeholder="id"/>
        </el-form-item>
        <el-form-item label="ApiKey" prop="apiKey" required>
          <el-input v-model.trim="form.apiKey"/>
        </el-form-item>
        <el-form-item label="BaseUrl" prop="baseUrl" required>
          <el-input v-model.trim="form.baseUrl"/>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model.trim="form.description"/>
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model.trim="form.status"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>

    <!--  删除 api 对话框 -->
    <el-dialog
        class="deleteDialog"
        v-model="deleteDialogVisible"
        title="删除API"
        width="400px"
        align-center
    >
      <span>确定删除该API？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="primary" size="large" @click="chatApiDelete">确定</el-button>
          <el-button size="large" @click="deleteDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {addChatApi, deleteChatApi, getChatApi, updateChatApi} from "@/api/ChatApi";
import {AddChatApiDto, UpdateChatApiDto} from "@/entity/chatDTO";

const data = ref([])
const deleteId = ref<string>()
const loading = ref(true)
const isEditing = ref(false)
const searchQuery = ref('');
const dialogVisible = ref(false)
const deleteDialogVisible = ref<boolean>(false)
const form = ref<AddChatApiDto | UpdateChatApiDto>(<AddChatApiDto>{status: false})

const openDialog = (row?: UpdateChatApiDto) => {
  if (row) {
    // 打开编辑对话框
    form.value = {...row}
    isEditing.value = true
  } else {
    // 打开添加对话框
    form.value = <AddChatApiDto>{status: false}
    isEditing.value = false
  }
  dialogVisible.value = true
}

const handleDelete = async (id: string) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}

const save = async () => {
  if (isEditing.value) {
    try {
      await updateChatApi(form.value as UpdateChatApiDto)
    } catch (error) {
      console.error('更新失败:', error);
    }

  } else {
    try {
      await addChatApi(form.value as AddChatApiDto)
    } catch (error) {
      console.error('添加失败:', error);
    }

  }
  await chatApiGet()
  dialogVisible.value = false
}

const chatApiGet = async () => {
  try {
    const res = await getChatApi()
    data.value = res.data
  } catch (error) {
    console.error('查询失败：', error)
  }

}
const chatApiUpdate = async (updateChatApiDto: UpdateChatApiDto) => {
  try {
    await updateChatApi(updateChatApiDto);
    await chatApiGet();
  } catch (error) {
    console.error('更新失败:', error);
  }

}

const chatApiDelete = async () => {
  try {
    await deleteChatApi(deleteId.value as string);
    await chatApiGet();
    deleteDialogVisible.value = false
  } catch (error) {
    console.error('删除失败:', error);
  }

}

const handleSearch = () => {
  // 这里可以添加搜索逻辑
};
// 表单验证规则
const insertFormRules = ref({
  apiKey: [
    {required: true, message: '请输入 ApiKey', trigger: 'blur'},
  ],
  baseUrl: [
    {required: true, message: '请输入 BaseUrl', trigger: 'blur'},
  ],
});

// 重置表单数据
const resetForm = () => {
  ref<AddChatApiDto>(<AddChatApiDto>{status: false})
};

/**
 * onMounted() 钩子函数：可以在组件挂载到 DOM 后执行各种操作，如数据获取、DOM 操作和初始化任务
 */
onMounted(async () => {
  await chatApiGet()
  loading.value = false
})

</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.header-left {
  display: flex;
  align-items: center;
  margin-right: 100px;
}

.header-right {
  /* 调整 header-right 的布局 */
  display: flex;
  align-items: center;
}

.divider {
  height: 1px;
  background-color: #d3d3d3;
  margin: 10px 0;
}

.table {
  width: 100%;
}
</style>