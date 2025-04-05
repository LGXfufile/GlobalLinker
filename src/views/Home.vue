<template>
  <div class="home">
    <!-- 顶部导航 -->
    <el-header class="header" height="80">
      <nav-bar />
    </el-header>

    <!-- 主要内容区 -->
    <el-main>
      <!-- 动态地图区域 -->
      <section class="map-section">
        <world-map />
        <div class="data-dashboard">
          <el-card class="stats-card">
            <template #header>
              <div class="card-header">
                <span>实时数据</span>
                <el-tag type="success">在线</el-tag>
              </div>
            </template>
            <div class="stats-content">
              <count-to :start-val="0" :end-val="2318" :duration="2500" />
              <div class="stats-text">今日已有人通过我们开通TikTok Shop</div>
            </div>
          </el-card>
        </div>
      </section>

      <!-- 智能诊断工具 -->
      <section class="diagnosis-section">
        <div class="container">
          <h2 class="section-title">智能诊断工具</h2>
          <div class="diagnosis-content">
            <el-steps :active="activeStep" finish-status="success" class="steps">
              <el-step title="选择身份" description="我们为不同角色提供专属解决方案" />
              <el-step title="选择痛点" description="精准定位您的业务困境" />
              <el-step title="获取方案" description="定制化解决方案" />
            </el-steps>
            
            <div class="step-content">
              <!-- 步骤1：身份选择 -->
              <div v-if="activeStep === 1" class="identity-selection">
                <el-radio-group v-model="userType" size="large">
                  <el-radio-button v-for="option in identityOptions" 
                                  :key="option.label" 
                                  :label="option.label">
                    <el-icon><component :is="option.icon" /></el-icon>
                    {{ option.text }}
                  </el-radio-button>
                </el-radio-group>
              </div>
              
              <!-- 步骤2：痛点选择 -->
              <div v-if="activeStep === 2" class="pain-points">
                <el-checkbox-group v-model="selectedPainPoints">
                  <el-checkbox label="account_banned">账号被封</el-checkbox>
                  <el-checkbox label="slow_logistics">物流太慢</el-checkbox>
                  <el-checkbox label="high_cost">获客成本高</el-checkbox>
                  <el-checkbox label="payment_issue">收款困难</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div class="step-actions">
              <el-button 
                type="primary" 
                @click="nextStep"
                :disabled="!canProceed">
                {{ activeStep === 3 ? '生成方案' : '下一步' }}
              </el-button>
            </div>
          </div>
        </div>
      </section>

      <!-- 热门服务 -->
      <section class="services-section">
        <div class="container">
          <h2 class="section-title">热门服务</h2>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="service in hotServices" :key="service.id">
              <el-card class="service-card" shadow="hover">
                <div class="service-icon">
                  <el-icon><component :is="service.icon" /></el-icon>
                </div>
                <h3>{{ service.name }}</h3>
                <p>{{ service.description }}</p>
                <div class="service-stats">
                  <span class="users">{{ service.users }}+ 用户</span>
                  <el-rate v-model="service.rating" disabled />
                </div>
                <el-button type="primary" class="try-button">立即试用</el-button>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </section>

      <!-- 合作伙伴 -->
      <section class="partners-section">
        <div class="container">
          <h2 class="section-title">合作伙伴</h2>
          
          <!-- 合作案例展示 -->
          <div class="partnership-showcase">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(image, index) in partnershipImages" :key="index">
                <el-card class="partnership-card" shadow="hover">
                  <img :src="image.src" :alt="image.alt" class="partnership-image">
                  <div class="partnership-text">
                    <h3>{{ image.title }}</h3>
                    <p>{{ image.description }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <!-- 合作伙伴logo展示 -->
          <div class="partner-logos">
            <img v-for="partner in partners" 
                 :key="partner.id" 
                 :src="partner.logo" 
                 :alt="partner.name"
                 class="partner-logo" />
          </div>
        </div>
      </section>

      <!-- 成功案例 -->
      <section class="case-studies-section">
        <div class="container">
          <h2 class="section-title">成功案例</h2>
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="item in successCases" :key="item.id">
              <div class="case-card">
                <div class="case-content">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                  <div class="case-stats">
                    <div class="stat">
                      <div class="value">{{ item.improvement }}</div>
                      <div class="label">业绩提升</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
    </el-main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NavBar from '@/components/NavBar.vue'
import WorldMap from '@/components/WorldMap.vue'
import CountTo from '@/components/CountTo.vue'

const activeStep = ref(1)
const userType = ref('')
const selectedPainPoints = ref([])

const identityOptions = [
  {
    label: 'seller',
    text: '跨境卖家',
    icon: ElementPlusIconsVue.Shop
  },
  {
    label: 'kol',
    text: 'KOL主播',
    icon: ElementPlusIconsVue.VideoPlay
  },
  {
    label: 'business',
    text: '企业主',
    icon: ElementPlusIconsVue.OfficeBuilding
  }
]

const hotServices = ref([
  {
    id: 1,
    name: 'TikTok下载与注册',
    description: '一键下载，快速注册，专业团队保驾护航',
    icon: ElementPlusIconsVue.Download,
    users: 12580,
    rating: 4.8
  },
  {
    id: 2,
    name: '海外仓查询',
    description: '覆盖全球主要电商仓储，实时比价',
    icon: ElementPlusIconsVue.Van,
    users: 8960,
    rating: 4.6
  },
  {
    id: 3,
    name: '防关联工具',
    description: '智能防关联浏览器，账号安全防护',
    icon: ElementPlusIconsVue.Lock,
    users: 15320,
    rating: 4.9
  }
])

const partners = ref([
  { 
    id: 1, 
    name: 'Temu', 
    logo: 'https://via.placeholder.com/150x60?text=Temu' 
  },
  { 
    id: 2, 
    name: 'Shopify', 
    logo: 'https://via.placeholder.com/150x60?text=Shopify' 
  },
  { 
    id: 3, 
    name: 'AWS', 
    logo: 'https://via.placeholder.com/150x60?text=AWS' 
  }
])

const successCases = ref([
  {
    id: 1,
    title: '从月亏5万到营收百万的蜕变',
    description: '某服装卖家通过我们的选品分析和直播运营支持，实现销售额提升300%',
    improvement: '300%'
  }
])

const partnershipImages = ref([
  {
    src: '/images/handshake1.jpg',
    alt: '商业合作',
    title: '战略合作',
    description: '与全球领先企业建立长期战略合作伙伴关系'
  },
  {
    src: '/images/handshake2.jpg',
    alt: '团队合作',
    title: '本地化服务',
    description: '为跨境企业提供专业的本地化运营支持'
  },
  {
    src: '/images/handshake3.jpg',
    alt: '商务洽谈',
    title: '资源对接',
    description: '连接优质资源，助力企业快速拓展海外市场'
  }
])

const canProceed = computed(() => {
  if (activeStep.value === 1) return !!userType.value
  if (activeStep.value === 2) return selectedPainPoints.value.length > 0
  return true
})

const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  } else {
    // 生成方案逻辑
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background: rgba(255, 255, 255, 0.98);
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
    margin-bottom: 40px;
    color: #2c3e50;
  }

  .map-section {
    height: 600px;
    position: relative;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    margin-top: 80px;
  }

  .stats-card {
    position: absolute;
    right: 40px;
    top: 40px;
    width: 300px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }

  .diagnosis-section {
    padding: 80px 0;
    background: #f8f9fa;

    .steps {
      margin-bottom: 40px;
    }

    .step-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }

    .identity-selection {
      text-align: center;
      .el-radio-button {
        margin: 0 10px;
      }
    }
  }

  .services-section {
    padding: 80px 0;

    .service-card {
      height: 100%;
      text-align: center;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .service-icon {
        font-size: 48px;
        color: #2a5298;
        margin-bottom: 20px;
      }

      .service-stats {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .try-button {
        width: 100%;
      }
    }
  }

  .partners-section {
    padding: 80px 0;
    background: #f8f9fa;

    .partnership-showcase {
      margin-bottom: 60px;

      .partnership-card {
        height: 100%;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        .partnership-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }

        .partnership-text {
          padding: 20px;
          text-align: center;

          h3 {
            font-size: 20px;
            color: $primary-color;
            margin-bottom: 10px;
          }

          p {
            color: #666;
            line-height: 1.5;
          }
        }
      }
    }

    .partner-logos {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 40px;
      margin-top: 40px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

      .partner-logo {
        height: 60px;
        filter: grayscale(1);
        transition: all 0.3s;

        &:hover {
          filter: grayscale(0);
          transform: scale(1.1);
        }
      }
    }
  }

  .case-studies-section {
    padding: 80px 0;

    .case-card {
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      height: 400px;

      .case-stats {
        margin-top: 30px;
        text-align: center;

        .value {
          font-size: 48px;
          font-weight: bold;
          color: #2a5298;
        }

        .label {
          color: #666;
        }
      }
    }
  }
}
</style> 