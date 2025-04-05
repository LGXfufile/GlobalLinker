<template>
  <div class="ecommerce-page">
    <el-header class="header" height="80">
      <nav-bar />
    </el-header>

    <el-main>
      <!-- 平台入驻指南 -->
      <section class="platform-section">
        <div class="container">
          <h2 class="section-title">平台入驻</h2>
          <el-row :gutter="20">
            <el-col :span="8" v-for="platform in platforms" :key="platform.id">
              <el-card class="platform-card" :body-style="{ padding: '0px' }">
                <img :src="platform.image" class="platform-image">
                <div class="platform-info">
                  <h3>{{ platform.name }}</h3>
                  <p>{{ platform.description }}</p>
                  <div class="platform-stats">
                    <div class="stat">
                      <div class="value">{{ platform.gmv }}</div>
                      <div class="label">平台GMV</div>
                    </div>
                    <div class="stat">
                      <div class="value">{{ platform.sellers }}+</div>
                      <div class="label">活跃卖家</div>
                    </div>
                  </div>
                  <el-button type="primary" @click="showPlatformGuide(platform)">
                    快速入驻
                  </el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </section>

      <!-- 选品数据库 -->
      <section class="product-section">
        <div class="container">
          <h2 class="section-title">选品数据库</h2>
          <div class="product-search">
            <el-input
              v-model="searchQuery"
              placeholder="搜索热销产品..."
              class="search-input"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-select v-model="selectedCategory" placeholder="选择类目">
              <el-option
                v-for="category in categories"
                :key="category.value"
                :label="category.label"
                :value="category.value"
              />
            </el-select>
          </div>

          <el-table :data="products" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="产品名称" />
            <el-table-column prop="category" label="类目" width="120" />
            <el-table-column prop="sales" label="月销量" width="120" sortable />
            <el-table-column prop="price" label="价格" width="120" sortable />
            <el-table-column prop="trend" label="趋势" width="120">
              <template #default="scope">
                <el-tag :type="scope.row.trend === 'up' ? 'success' : 'danger'">
                  {{ scope.row.trend === 'up' ? '上升' : '下降' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>

      <!-- KOL合作 -->
      <section class="kol-section">
        <div class="container">
          <h2 class="section-title">KOL合作</h2>
          <el-tabs v-model="activeRegion">
            <el-tab-pane v-for="region in regions" :key="region.value" :label="region.label" :name="region.value">
              <div class="kol-grid">
                <el-card v-for="kol in getKolsByRegion(region.value)" :key="kol.id" class="kol-card">
                  <div class="kol-avatar">
                    <img :src="kol.avatar" :alt="kol.name">
                    <div class="kol-platform">
                      <el-icon><component :is="kol.platform.icon" /></el-icon>
                      {{ kol.platform.name }}
                    </div>
                  </div>
                  <div class="kol-info">
                    <h3>{{ kol.name }}</h3>
                    <div class="kol-stats">
                      <div class="stat">
                        <div class="value">{{ kol.followers }}</div>
                        <div class="label">粉丝数</div>
                      </div>
                      <div class="stat">
                        <div class="value">{{ kol.engagement }}%</div>
                        <div class="label">互动率</div>
                      </div>
                    </div>
                    <div class="kol-tags">
                      <el-tag v-for="tag in kol.tags" :key="tag" size="small">
                        {{ tag }}
                      </el-tag>
                    </div>
                    <el-button type="primary" @click="contactKol(kol)">联系合作</el-button>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>

      <!-- 海外仓查询 -->
      <section class="warehouse-section">
        <div class="container">
          <h2 class="section-title">海外仓查询</h2>
          <el-form :model="warehouseForm" label-width="120px" class="warehouse-form">
            <el-form-item label="发货地">
              <el-select v-model="warehouseForm.from" placeholder="选择发货地">
                <el-option label="中国大陆" value="CN" />
                <el-option label="香港" value="HK" />
              </el-select>
            </el-form-item>
            <el-form-item label="目的地">
              <el-select v-model="warehouseForm.to" placeholder="选择目的地">
                <el-option label="美国" value="US" />
                <el-option label="英国" value="UK" />
                <el-option label="德国" value="DE" />
              </el-select>
            </el-form-item>
            <el-form-item label="包裹重量">
              <el-input-number v-model="warehouseForm.weight" :min="0.1" :step="0.1" />
              <span class="unit">kg</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchWarehouses">查询仓储</el-button>
            </el-form-item>
          </el-form>

          <div v-if="warehouseResults.length" class="warehouse-results">
            <el-table :data="warehouseResults" border>
              <el-table-column prop="name" label="仓库名称" />
              <el-table-column prop="location" label="位置" />
              <el-table-column prop="price" label="价格" />
              <el-table-column prop="time" label="时效" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="primary" link @click="selectWarehouse(scope.row)">
                    选择
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </section>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NavBar from '@/components/NavBar.vue'

// 平台数据
const platforms = ref([
  {
    id: 1,
    name: 'TikTok Shop',
    image: '/images/platforms/tiktok.jpg',
    description: '短视频直播带货平台，年轻用户群体',
    gmv: '$500亿',
    sellers: '100万'
  },
  {
    id: 2,
    name: 'Temu',
    image: '/images/platforms/temu.jpg',
    description: '跨境电商平台，主打性价比',
    gmv: '$200亿',
    sellers: '50万'
  }
  // ... 其他平台
])

// 选品数据
const searchQuery = ref('')
const selectedCategory = ref('')
const loading = ref(false)
const products = ref([
  {
    name: '便携式蓝牙音箱',
    category: '电子产品',
    sales: 15000,
    price: 29.99,
    trend: 'up'
  }
  // ... 其他产品
])

// KOL数据
const activeRegion = ref('southeast-asia')
const regions = [
  { label: '东南亚', value: 'southeast-asia' },
  { label: '欧美', value: 'west' },
  { label: '中东', value: 'middle-east' }
]

const kols = ref([
  {
    id: 1,
    name: 'Sarah',
    avatar: '/images/kols/avatar1.jpg',
    platform: {
      name: 'TikTok',
      icon: ElementPlusIconsVue.VideoPlay
    },
    followers: '100万',
    engagement: 5.2,
    tags: ['美妆', '时尚', '生活方式'],
    region: 'southeast-asia'
  }
  // ... 其他KOL
])

// 仓库查询表单
const warehouseForm = ref({
  from: '',
  to: '',
  weight: 1
})

const warehouseResults = ref([])

// 方法
const showPlatformGuide = (platform) => {
  // 显示平台入驻指南
}

const getKolsByRegion = (region) => {
  return kols.value.filter(kol => kol.region === region)
}

const contactKol = (kol) => {
  // 联系KOL逻辑
}

const searchWarehouses = () => {
  // 查询仓库逻辑
}

const selectWarehouse = (warehouse) => {
  // 选择仓库逻辑
}
</script>

<style lang="scss" scoped>
.ecommerce-page {
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

  // 平台卡片样式
  .platform-card {
    margin-bottom: 20px;
    overflow: hidden;

    .platform-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .platform-info {
      padding: 20px;

      h3 {
        margin: 0 0 10px;
        font-size: 20px;
      }

      .platform-stats {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;

        .stat {
          text-align: center;

          .value {
            font-size: 24px;
            font-weight: bold;
            color: $primary-color;
          }

          .label {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }

  // 选品搜索样式
  .product-search {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .search-input {
      flex: 1;
    }
  }

  // KOL卡片样式
  .kol-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  .kol-card {
    .kol-avatar {
      position: relative;
      margin-bottom: 20px;

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
      }

      .kol-platform {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    .kol-info {
      h3 {
        margin: 0 0 10px;
      }

      .kol-stats {
        display: flex;
        justify-content: space-around;
        margin: 15px 0;
      }

      .kol-tags {
        margin: 15px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
    }
  }

  // 仓库查询表单样式
  .warehouse-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .unit {
      margin-left: 10px;
      color: #666;
    }
  }

  .warehouse-results {
    margin-top: 40px;
  }
}
</style> 