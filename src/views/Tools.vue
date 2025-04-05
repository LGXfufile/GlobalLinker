<template>
  <div class="tools-page">
    <el-header class="header" height="80">
      <nav-bar />
    </el-header>

    <el-main>
      <!-- 工具分类导航 -->
      <section class="tools-nav">
        <div class="container">
          <el-tabs v-model="activeCategory" class="tool-tabs">
            <el-tab-pane label="网络加速" name="network">
              <div class="tools-grid">
                <el-card v-for="tool in networkTools" :key="tool.id" class="tool-card">
                  <div class="tool-icon">
                    <el-icon><component :is="tool.icon" /></el-icon>
                  </div>
                  <h3>{{ tool.name }}</h3>
                  <p>{{ tool.description }}</p>
                  <div class="tool-meta">
                    <el-tag :type="tool.status === 'free' ? 'success' : 'warning'">
                      {{ tool.status === 'free' ? '免费试用' : '付费' }}
                    </el-tag>
                    <span class="users">{{ tool.users }}+ 用户</span>
                  </div>
                  <el-button type="primary" class="try-button">立即使用</el-button>
                </el-card>
              </div>
            </el-tab-pane>

            <el-tab-pane label="账号管理" name="account">
              <div class="tools-grid">
                <el-card v-for="tool in accountTools" :key="tool.id" class="tool-card">
                  <div class="tool-icon">
                    <el-icon><component :is="tool.icon" /></el-icon>
                  </div>
                  <h3>{{ tool.name }}</h3>
                  <p>{{ tool.description }}</p>
                  <div class="tool-meta">
                    <el-tag :type="tool.status === 'free' ? 'success' : 'warning'">
                      {{ tool.status === 'free' ? '免费试用' : '付费' }}
                    </el-tag>
                    <span class="users">{{ tool.users }}+ 用户</span>
                  </div>
                  <el-button type="primary" class="try-button">立即使用</el-button>
                </el-card>
              </div>
            </el-tab-pane>

            <el-tab-pane label="数据工具" name="data">
              <div class="tools-grid">
                <el-card v-for="tool in dataTools" :key="tool.id" class="tool-card">
                  <div class="tool-icon">
                    <el-icon><component :is="tool.icon" /></el-icon>
                  </div>
                  <h3>{{ tool.name }}</h3>
                  <p>{{ tool.description }}</p>
                  <div class="tool-meta">
                    <el-tag :type="tool.status === 'free' ? 'success' : 'warning'">
                      {{ tool.status === 'free' ? '免费试用' : '付费' }}
                    </el-tag>
                    <span class="users">{{ tool.users }}+ 用户</span>
                  </div>
                  <el-button type="primary" class="try-button">立即使用</el-button>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>

      <!-- 工具对比 -->
      <section class="tools-comparison">
        <div class="container">
          <h2 class="section-title">工具对比</h2>
          <el-table :data="comparisonData" border style="width: 100%">
            <el-table-column prop="feature" label="功能特性" width="180" />
            <el-table-column prop="free" label="免费版" width="180">
              <template #default="scope">
                <el-icon v-if="scope.row.free" color="#67C23A"><Check /></el-icon>
                <el-icon v-else color="#909399"><Close /></el-icon>
              </template>
            </el-table-column>
            <el-table-column prop="pro" label="专业版">
              <template #default="scope">
                <el-icon v-if="scope.row.pro" color="#67C23A"><Check /></el-icon>
                <el-icon v-else color="#909399"><Close /></el-icon>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>

      <!-- API文档 -->
      <section class="api-docs">
        <div class="container">
          <h2 class="section-title">开发者API</h2>
          <el-tabs type="border-card">
            <el-tab-pane label="快速开始">
              <div class="api-content">
                <h3>接入步骤</h3>
                <el-steps :active="1" finish-status="success" simple>
                  <el-step title="注册账号" description="创建开发者账号" />
                  <el-step title="获取密钥" description="申请API密钥" />
                  <el-step title="调用接口" description="开始使用API" />
                </el-steps>
                <div class="code-block">
                  <pre><code>
// 示例代码
const api = new GlobalLinkerAPI({
  apiKey: 'your-api-key'
});

// 调用接口
const result = await api.checkAccount({
  platform: 'tiktok',
  accountId: '12345'
});
                  </code></pre>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="接口文档">
              <div class="api-content">
                <el-descriptions title="接口说明" :column="1" border>
                  <el-descriptions-item label="接口地址">https://api.globallinker.com/v1</el-descriptions-item>
                  <el-descriptions-item label="请求方式">POST</el-descriptions-item>
                  <el-descriptions-item label="返回格式">JSON</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NavBar from '@/components/NavBar.vue'

const activeCategory = ref('network')

// 网络加速工具
const networkTools = ref([
  {
    id: 1,
    name: '全球代理IP',
    description: '覆盖200+国家地区的优质代理IP池',
    icon: ElementPlusIconsVue.Connection,
    status: 'free',
    users: 15800
  },
  {
    id: 2,
    name: 'ID购买',
    description: '一键购买各平台认证账号',
    icon: ElementPlusIconsVue.User,
    status: 'paid',
    users: 8900
  }
])

// 账号管理工具
const accountTools = ref([
  {
    id: 3,
    name: '防关联浏览器',
    description: '智能指纹管理，有效防止账号关联',
    icon: ElementPlusIconsVue.Monitor,
    status: 'paid',
    users: 12600
  },
  {
    id: 4,
    name: '批量管理工具',
    description: '多账号批量操作管理系统',
    icon: ElementPlusIconsVue.Management,
    status: 'free',
    users: 6800
  }
])

// 数据工具
const dataTools = ref([
  {
    id: 5,
    name: 'SEO优化助手',
    description: '智能优化产品标题和描述',
    icon: ElementPlusIconsVue.DataLine,
    status: 'free',
    users: 9400
  },
  {
    id: 6,
    name: '广告投放分析',
    description: '多平台广告数据分析与优化',
    icon: ElementPlusIconsVue.TrendCharts,
    status: 'paid',
    users: 5200
  }
])

// 对比数据
const comparisonData = ref([
  {
    feature: '基础功能',
    free: true,
    pro: true
  },
  {
    feature: '高级功能',
    free: false,
    pro: true
  },
  {
    feature: '技术支持',
    free: false,
    pro: true
  }
])
</script>

<style lang="scss" scoped>
.tools-page {
  padding-top: 80px;

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin: 40px 0;
    color: $text-color;
  }

  .tools-nav {
    padding: 40px 0;

    .tool-tabs {
      margin-bottom: 20px;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }

    .tool-card {
      height: 100%;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .tool-icon {
        font-size: 48px;
        color: $primary-color;
        margin-bottom: 20px;
        text-align: center;
      }

      h3 {
        font-size: 20px;
        margin-bottom: 10px;
        color: $text-color;
      }

      p {
        color: #666;
        margin-bottom: 20px;
        min-height: 40px;
      }

      .tool-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .try-button {
        width: 100%;
      }
    }
  }

  .tools-comparison {
    padding: 60px 0;
    background: #f8f9fa;
  }

  .api-docs {
    padding: 60px 0;

    .api-content {
      padding: 20px;

      h3 {
        margin-bottom: 20px;
        color: $text-color;
      }

      .code-block {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 4px;
        margin: 20px 0;

        pre {
          margin: 0;
          code {
            color: #476582;
            font-family: Monaco, Consolas, 'Courier New', monospace;
          }
        }
      }
    }
  }
}
</style> 