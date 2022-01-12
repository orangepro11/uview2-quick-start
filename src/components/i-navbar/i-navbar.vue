<template>
  <div>
    <u-navbar :title="title" :autoBack="isBack" @leftClick="onLeftClick" :bg-color="bgColor" fixed :border="false" placeholder>
      <template v-slot:left v-if="!isBack">
        <div></div>
      </template>
    </u-navbar>
  </div>
</template>

<script>
import UNavBar from 'uview-ui/components/u-navbar/u-navbar';
export default {
  name: 'INavbar',
  components: {
    UNavBar
  },
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
