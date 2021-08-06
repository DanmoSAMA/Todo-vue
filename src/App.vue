<template>
  <div id="wrapper">
    <h1 id="title">todos</h1>
    <div id="todoapp">
      <Header :isAll="isAll" :addTodo="addTodo" :selectAll="selectAll" />
      <List :todos="todos" />
    </div>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';
import List from './components/List.vue';
import { ref, reactive, computed, provide, toRefs } from 'vue';
import { Todo, Mode } from './types/todo';

export default {
  name: 'App',
  components: { Header, List },
  setup() {
    // 定义数据
    let state = reactive<{ todos: Todo[] }>({
      todos: [
        { title: '吃饭', id: '1', done: false },
        { title: '编程', id: '2', done: false },
        { title: '睡觉', id: '3', done: true },
      ],
    });
    provide('state', state);

    let mode = ref(Mode.All);
    provide('mode', mode);

    // 底部统计值
    let undoneNum = computed(() => {
      let undoneNum = 0;
      for (let i = 0; i < state.todos.length; i++) {
        if (!state.todos[i].done) undoneNum++;
      }
      return undoneNum;
    });
    provide('undoneNum', undoneNum);

    // 是否全选
    let isAll = computed(() => {
      let isAll = true;
      for (let i = 0; i < state.todos.length; i++) {
        if (!state.todos[i].done) {
          isAll = false;
          break;
        }
      }
      return isAll;
    });

    // 添加Todo
    function addTodo(todo: Todo) {
      state.todos.unshift(todo);
    }
    // 删除Todo
    function deleteTodo(id: String) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    }
    provide('deleteTodo', deleteTodo);

    // 全选与反选
    function selectAll() {
      let isAll = true;
      for (let i = 0; i < state.todos.length; i++) {
        if (!state.todos[i].done) isAll = false;
      }
      if (isAll) {
        for (let i = 0; i < state.todos.length; i++) {
          state.todos[i].done = false;
        }
      } else {
        for (let i = 0; i < state.todos.length; i++) {
          state.todos[i].done = true;
        }
      }
    }
    // 选择模式
    function selectMode(toMode: Mode) {
      mode.value = toMode;
    }
    provide('selectMode', selectMode);
    // 清除已完成
    function clear() {
      state.todos = state.todos.filter(todo => !todo.done);
    }
    provide('clear', clear);

    return {
      ...toRefs(state),
      isAll,
      addTodo,
      deleteTodo,
      selectAll,
    };
  },
};
</script>

<style lang="less">
#wrapper {
  width: 550px;
  margin: 0 auto;
  padding-bottom: 100px;

  #title {
    color: #e8d7d7;
    font-size: 105px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0;
    font-weight: 100;
    text-align: center;
  }

  #todoapp {
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

    #main {
      margin: 0;
    }
  }
}
</style>
