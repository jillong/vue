<template>
  <h1>spring ai 助手</h1>
  <textarea v-model="userQuery" placeholder="请输入查询内容"></textarea>
  <button @click="sendPostRequest">发送请求</button>

  <div v-if="response">
    <div v-highlight v-html="renderedMarkdown"></div>
  </div>

  <div v-if="error">
    <h3>错误:</h3>
    <pre>{{ error }}</pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {marked} from 'marked';
import axios from 'axios';

const renderedMarkdown = computed(() => {
  return marked(response.value);
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
  } catch (error) {
    error.value = error.message;
    response.value = null;
  }
};

</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

textarea {
  width: 98%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  resize: vertical;
}

div {
  width: 98%;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  font-family: sans-serif;
}
</style>