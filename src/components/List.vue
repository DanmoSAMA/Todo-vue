<template>
  <ul id="main">
    <Item v-for="item in todos" :key="item.id" :todo="item" />
    <Footer />
  </ul>
</template>

<script lang="ts">
import Item from './Item.vue';
import Footer from './Footer.vue';

export default {
  name: 'List',
  props: {
    todos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: { Item, Footer },
};
</script>

<style lang="less" scope>
#main {
  margin: 0;
}
</style>
