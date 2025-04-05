<template>
  <div class="nav-container">
    <div class="logo">
      <h1>GlobalLinker</h1>
      <div class="slogan">Your Bridge to Seamless Overseas Business</div>
    </div>
    <el-menu mode="horizontal" :router="true" class="nav-menu">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/tools">工具</el-menu-item>
      <el-menu-item index="/ecommerce">电商</el-menu-item>
      <el-menu-item index="/payment">支付</el-menu-item>
      <el-menu-item index="/community">社区</el-menu-item>
    </el-menu>
    <div class="right-menu">
      <el-button type="primary">登录/注册</el-button>
      <el-select v-model="language" placeholder="语言">
        <el-option label="中文" value="zh" />
        <el-option label="English" value="en" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const language = ref('zh')
</script>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  background: white;

  .logo {
    h1 {
      margin: 0;
      font-size: 24px;
      color: #2a5298;
    }
    .slogan {
      font-size: 12px;
      color: #666;
    }
  }

  .nav-menu {
    border-bottom: none;
  }

  .right-menu {
    display: flex;
    gap: 15px;
    align-items: center;
  }
}
</style> 