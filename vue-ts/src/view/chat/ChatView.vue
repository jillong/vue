<template>
  <div id="basic-aside">
    <el-scrollbar ref="myScrollbar" always>
      <div class="content-container" v-highlight ref="innerElement">
        <div class="messages">
          <div
              v-for="(item, index) in messageList"
              :key="index"
              :class="['scrollbar-item', item.role]"
          >
            <div class="card-content" v-if="item.role !== 'system'">
              <MDView v-if="item.content !== ''" :content="item.content" />
              <div v-else>AI思考中...</div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="system-settings" v-if="systemMessage">
      <div class="card-header">
        <el-image :src="User" style="width: 50px; margin-right: 20px" />
        <span style="font-size: large; font-weight: 800">系统设置</span>
      </div>
      <el-input
          v-model="systemMessage.content"
          type="textarea"
          placeholder="系统设置"
          class="system-input"
      />
    </div>
    <div class="chat-footer-container">
      <div class="chat-footer">
        <el-input
            v-model="userQuery"
            type="textarea"
            autofocus
            :autosize="{ minRows: 1, maxRows: 4 }"
            resize="none"
            placeholder="请输入对话内容，发送请使用Shift+Enter"
            class="input-box chat-input"
        />
        <div class="button-group">
          <el-button type="primary" @click="submitChat">发送</el-button>
          <el-button type="warning" @click="cleanMessage">删除对话</el-button>
        </div>
      </div>
    </div>
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
const messageList = computed(() => chatMessages.globalMessages);

const systemMessage = computed(() => messageList.value.find(msg => msg.role === 'system'));

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
  position: relative;
}

.el-scrollbar {
  flex: 1;
  display: flex;
  flex-direction: column;

}

.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: auto;
}

.el-scrollbar__view {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.content-container {
  display: flex;
  flex-direction: row;
  width: 74%;
}

.messages {
  flex: 1;
  padding-left: 20%;
}

.system-settings {
  position: fixed;
  right: 2%;
  left: 77%;
  top: 3%;
  bottom: 8%;
  width: 20%; /* 设置系统设置部分宽度 */
  padding: 10px;
  background-color: #ffffff; /* 设置背景颜色 */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.system-input {
  width: 100%;
  height: 100%;
}

.chat-footer-container {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: transparent;
}

.chat-footer {
  width: 70%;
  display: flex;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
  border-top: none; /* 移除顶部边框 */
}

.chat-input {
  width: 70%;
  display: flex;
  align-items: center;
  padding-left: 0;
}

.input-box {
  flex: 1;
  margin-right: 10px;
  background-color: #672626; /* 设置文本输入框背景颜色 */
  color: #333333; /* 设置文本输入框文字颜色 */
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
  display: flex;
}

.scrollbar-item.assistant {
  justify-content: flex-start; /* assistant 消息框靠左对齐 */
}

.scrollbar-item.user {
  justify-content: flex-end; /* user 消息框靠右对齐 */
}

.card-content {
  max-width: 100%;
  background-color: #f5f5f5; /* 设置消息框背景色 */
  padding: 10px;
  border-radius: 10px;
}

.message-content {
  word-wrap: break-word;
}

.scrollbar-item.assistant .card-content {
  background-color: rgba(247, 247, 250, 0.84); /* 设置 assistant 消息框背景色 */
  text-align: left;
}

.scrollbar-item.user .card-content {
  background-color: #fff2e8; /* 设置 user 消息框背景色 */
  text-align: right;
}

</style>