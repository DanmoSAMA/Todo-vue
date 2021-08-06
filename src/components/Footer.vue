<template>
  <li id="footer">
    <ul>
      <a href="javascript:;" id="stati"> {{ undoneNum }} item left </a>
      <a
        href="javascript:;"
        class="btn"
        id="show-all-btn"
        @click="selectMode(Mode.All)"
        :class="{ selected: mode === Mode.All }"
      >
        All
      </a>
      <a
        href="javascript:;"
        class="btn"
        id="show-active-btn"
        @click="selectMode(Mode.Active)"
        :class="{ selected: mode === Mode.Active }"
      >
        Active
      </a>
      <a
        href="javascript:;"
        class="btn"
        id="show-completed-btn"
        @click="selectMode(Mode.Completed)"
        :class="{ selected: mode === Mode.Completed }"
      >
        Completed
      </a>
      <a href="javascript:;" id="clear" v-show="clearIsShown" @click="clear">
        Clear completed
      </a>
    </ul>
  </li>
</template>

<script lang="ts">
import { inject, computed } from 'vue';
import { Mode } from '../types/todo';

export default {
  name: 'Footer',
  setup() {
    const state: any = inject('state');
    const undoneNum: any = inject('undoneNum');
    const selectMode = inject('selectMode');
    const mode = inject('mode');
    const clear = inject('clear');

    let clearIsShown = computed(() => {
      return state.todos.length !== undoneNum.value;
    });

    return {
      undoneNum,
      selectMode,
      Mode,
      mode,
      clearIsShown,
      clear,
    };
  },
};
</script>

<style lang="less" scope>
#footer {
  border-top: 1px solid #ededed;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;

  ul {
    a {
      display: inline-block;
      font: 16px 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #777;
    }

    a:first-child {
      cursor: default;
      margin-right: 60px;
    }

    a.btn {
      margin-right: 10px;
      padding: 3px 8px;
    }

    a.selected {
      outline: 1px solid #ecd5d5;
    }

    a#clear {
      margin-right: 0;
      margin-left: 22px;
    }

    a#clear.appear {
      display: inline-block;
    }

    a#clear:hover {
      text-decoration: underline;
    }
  }
}
</style>
