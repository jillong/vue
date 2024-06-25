<template>
  <h1>Markdown 编辑器</h1>
  <textarea v-model="markdownText" placeholder="输入 Markdown 文本"></textarea>
  <div v-highlight v-html="renderedMarkdown"></div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {marked} from 'marked';

const markdownText = ref('');
const renderedMarkdown = computed(() => {
  return marked(markdownText.value);
});

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
  height: 200px;
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