<template>
  <div>
    <u-toast ref="uvToast"></u-toast>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Toast',
  components: {},
  data() {
    return {};
  },
  methods: {
    success(message: string, duration: number = 1500, showIcon: boolean = true) {
      return new Promise(resolve => {
        this.$refs.uvToast.show({
          message,
          duration,
          type: 'success',
          icon: showIcon,
          complete: resolve
        });
      });
    },
    error(message: string, duration: number = 1500, showIcon: boolean = true) {
      return new Promise(resolve => {
        this.$refs.uvToast.show({
          message,
          duration,
          type: 'error',
          icon: showIcon,
          complete: resolve
        });
      });
    },
    loading(message: string = '正在加载中', duration: number = 1500) {
      return new Promise(resolve => {
        this.$refs.uvToast.show({
          type: 'loading',
          duration,
          loading: true,
          message,
          complete: resolve
        });
      });
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="less" scoped></style>
