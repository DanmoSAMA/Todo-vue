<template>
  <div id="header">
    <span id="arrow" @click="selectAll" :class="{ selected: isAll }">∨</span>
    <input
      type="text"
      placeholder="What needs to be done?"
      id="input"
      minlength="1"
      maxlength="300"
      v-model="title"
      @keydown.enter="add"
    />
  </div>
</template>

<script lang="ts">
import { nanoid } from 'nanoid';
import { ref } from 'vue';

export default {
  name: 'Header',
  props: {
    isAll: {
      type: Boolean,
      required: true,
    },
    addTodo: {
      type: Function,
      required: true,
    },
    selectAll: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const title = ref('');

    function add() {
      const text = title.value;
      if (!text.trim()) return;
      const todo = { id: nanoid(), title: text, done: false };
      props.addTodo(todo);
      title.value = '';
    }

    return {
      add,
      title,
    };
  },
};
</script>

<style lang="less" scope>
#header {
  input {
    padding: 16px;
    font-size: 24px;
    min-width: 476px;
    height: 33.6px;
    line-height: 33.6px;
  }

  #arrow {
    font-size: 27px;
    color: #e6e6e6;
    padding-left: 16px;
    font-weight: bold;
    transition: color 0.1s;

    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #arrow.selected {
    color: #737373;
  }
}
</style>
