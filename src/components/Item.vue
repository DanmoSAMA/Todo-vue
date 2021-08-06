<template>
  <li class="item" v-show="isShown">
    <input
      type="checkbox"
      class="toggle"
      :checked="todo.done"
      v-model="todo.done"
    />
    <span contenteditable="true">{{ todo.title }}</span>
    <div class="delete-btn" @click="deleteTodo(todo.id)">×</div>
  </li>
</template>

<script lang="ts">
import { Todo, Mode } from '../types/todo';
import { inject, computed } from 'vue';

export default {
  name: 'Item',
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  setup(props) {
    const deleteTodo = inject('deleteTodo');
    const mode:any = inject('mode');
    let isShown = computed(() => {
      return (
        mode.value === Mode.All ||
        (mode.value === Mode.Active && !props.todo.done) ||
        (mode.value === Mode.Completed && props.todo.done)
      );
    });

    return {
      deleteTodo,
      Mode,
      mode,
      isShown,
    };
  },
};
</script>

<style lang="less" scope>
.item {
  border-top: 1px solid #ededed;
  min-height: 58px;
  line-height: 58px;
  font-size: 24px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #4d4d4d;
  position: relative;

  input[type='checkbox'] {
    width: 10px;
    height: 10px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    margin: 0 auto;
    position: relative;
    left: 6px;
    top: -3px;
  }

  input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -2px;
    background: #fff;
    width: 28px;
    height: 28px;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
  }

  input[type='checkbox']:checked::before {
    content: '\2713';
    background-color: #fff;
    position: absolute;
    top: -8px;
    left: -2px;
    width: 28px;
    border: 1px solid #6dc2ae;
    border-radius: 50%;
    color: #6dc2ae;
    font-size: 20px;
    font-weight: bold;
  }

  span {
    display: inline-block;
    max-width: 486px;
    line-height: 32px;
    vertical-align: middle;
    position: relative;
    left: 30px;
    transition: color 0.3s;
    word-wrap: break-word;
    word-break: break-all;
  }

  div {
    position: absolute;
    font-size: 35px;
    right: 26px;
    bottom: 0;
    color: #c79a9a;
    display: none;
    transition: color 0.3s;
    cursor: default;
  }

  div:hover {
    color: #a05c5d;
  }
}

.item:hover > div {
  display: block;
}

.item.completed {
  // 完成后样式
  span {
    text-decoration: line-through;
    color: #d9d9d9;
  }
}

.item.hidden {
  display: none !important;
}
</style>
