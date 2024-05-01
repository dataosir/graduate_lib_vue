<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <div id="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script>

import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'large',
    }
  },
})
</script>

<style>

</style>
