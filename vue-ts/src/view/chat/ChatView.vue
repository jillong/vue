<template>
  <div id="basic-aside">
    <el-scrollbar
        ref="myScrollbar"
        always
    >
      <div ref="innerElement">
        <div class="card-header">
          <el-image
              :src="User"
              style="width: 50px; margin-right: 20px"
          />
        </div>
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
      <div style="display: flex; justify-content: right; margin: 10px">
        <el-button
            type="primary"
            @click="sendPostRequest"
        >
          发送
        </el-button>
      </div>
    </div>
  </div>
  <div v-if="response">
    <div
        v-highlight
        v-html="renderedMarkdown"
    />
  </div>

  <div v-if="error">
    <h3>错误:</h3>
    <pre>{{ error }}</pre>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {marked} from 'marked';
import axios from 'axios';
import User from "../../assets/user.svg";
import {ElScrollbar} from "element-plus";

const innerElement = ref<HTMLElement>();
const myScrollbar = ref<InstanceType<typeof ElScrollbar>>();
const renderedMarkdown = computed(() => {
  return marked(response.value || "");
});

const userQuery = ref(''); // 用户输入的查询内容
const response = ref(null);
const error = ref(null);

const sendPostRequest = async () => {
  const url = 'http://localhost:8090/ai/chat';
  const data = {
    chatOptions: {
      stream: false,
      augmented: false,
    },
    messages: [{
      role: 'user',
      content: '使用中文回答',
    }],
    query: userQuery.value,
  };

  try {
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response.value = res.data;
    error.value = null;
  } catch (error: any) {
    error.value = error.message;
    response.value = null;
  }
};

</script>

<style>
.chat-footer {
  background-color: transparent;
  width: 100%;
  border-top: 2px solid #cecccc;
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  align-items: flex-end; /* 开始位置对齐 */
}

#basic-aside {
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  height: 100%;
}
</style>