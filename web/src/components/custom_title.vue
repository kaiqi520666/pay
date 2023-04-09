<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--el-border-color);
  border-left: 3px solid var(--el-color-primary);
  border-radius: var(--el-border-radius-base);
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
