<template>
  <div></div>
</template>

<script>
import MNavBar from '@/uview-ui/components/u-navbar/u-navbar';
export default {
  name: 'INavbar',
  components: {
    MNavBar
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
