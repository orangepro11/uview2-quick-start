<template>
  <div>
    <u-navbar placeholder :border="false" fixed :title="title" :autoBack="isBack" @leftClick="onLeftClick" :bg-color="bgColor">
      <template slot="left">
        <div></div>
      </template>
    </u-navbar>
  </div>
</template>

<script>
export default {
  name: 'INavbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    isBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onLeftClick() {
      this.isBack && this.$emit('back');
    }
  },
  computed: {
    bgColor() {
      return '#fff';
    }
  }
};
</script>
