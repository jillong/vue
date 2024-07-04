<template>
  <div id="basic-aside">
    <el-scrollbar ref="myScrollbar" always>
      <div v-highlight ref="innerElement">
        <el-card
            v-for="(item, index) in messageList"
            :key="index"
            :class="['scrollbar-item', item.role]"
        >
          <div class="card-content">
            <div class="card-header" v-if="item.role === 'system'">
              <el-image :src="User" style="width: 50px; margin-right: 20px" />
              <span style="font-size: large; font-weight: 800">系统设置</span>
            </div>
            <div v-else class="message-content">
              <MDView v-if="item.content !== ''" :content="item.content" />
              <div v-else>AI思考中...</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-scrollbar>

    <div class="chat-footer">
      <el-input
          v-model="userQuery"
          type="textarea"
          autofocus
          :autosize="{ minRows: 1, maxRows: 4 }"
          resize="none"
          placeholder="请输入对话内容，发送请使用Shift+Enter"
          class="input-box"
      />
      <div class="button-group">
        <el-button type="primary" @click="submitChat">发送</el-button>
        <el-button type="warning" @click="cleanMessage">删除对话</el-button>
      </div>
    </div>
  </div>

  <div v-if="error">
    <h3>错误:</h3>
    <pre>{{ error }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import User from "../../assets/user.svg";
import { ElMessage, ElScrollbar } from "element-plus";
import { sendChatRequest, sendMessageChat } from "@/api/ChatApi";
import { chatMessagesStore } from "@/store/message";
import MDView from "@/components/MDView.vue";

const innerElement = ref<HTMLElement>();
const myScrollbar = ref<InstanceType<typeof ElScrollbar>>();

const userQuery = ref(''); // 用户输入的查询内容
const response = ref(null);
const error = ref(null);
const chatMessages = chatMessagesStore();
const messageList = computed(() => {
  return chatMessages.globalMessages;
});

const cleanMessage = () => {
  chatMessages.resetGlobalMessage();
};

const submitChatStream = () => {
  if (userQuery.value === "") {
    ElMessage({
      type: "error",
      message: "请输入内容",
    });
  } else {
    chatMessages.setChatting(true);
    sendMessageChat(userQuery.value);
    userQuery.value = "";
  }
};

const submitChat = async () => {
  if (userQuery.value === "") {
    ElMessage({
      type: "error",
      message: "请输入内容",
    });
  } else {
    chatMessages.setChatting(true);
    const res = await sendChatRequest(userQuery);
    chatMessages.addMessage({
      role: "assistant",
      content: res.data,
    });
    userQuery.value = "";
  }
};
</script>

<style>
#basic-aside {
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  height: 100%;
}

.chat-footer {
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 2px solid #cecccc;
  padding: 10px;
  background-color: transparent;
}

.input-box {
  flex: 1;
  margin-right: 10px;
}

.button-group {
  display: flex;
  align-items: center;
}

.button-group .el-button {
  margin-right: 10px;
}

.button-group .el-button:last-child {
  margin-right: 0;
}

.scrollbar-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
}

.scrollbar-item.assistant .card-content {
  display: flex;
  justify-content: flex-start;
}

.scrollbar-item.user .card-content {
  display: flex;
  justify-content: flex-end;
}

.scrollbar-item.system .card-content {
  display: flex;
  justify-content: flex-start;
}

.message-content {
  max-width: 60%;
}
</style>