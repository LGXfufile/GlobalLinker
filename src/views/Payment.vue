<template>
  <div class="payment-page">
    <el-header class="header" height="80">
      <nav-bar />
    </el-header>

    <el-main>
      <!-- 跨境收款方案 -->
      <section class="payment-solutions">
        <div class="container">
          <h2 class="section-title">跨境收款方案</h2>
          <div class="solutions-grid">
            <el-card v-for="solution in paymentSolutions" :key="solution.id" class="solution-card">
              <div class="solution-icon">
                <el-icon><component :is="solution.icon" /></el-icon>
              </div>
              <h3>{{ solution.name }}</h3>
              <p>{{ solution.description }}</p>
              <ul class="feature-list">
                <li v-for="feature in solution.features" :key="feature">
                  <el-icon><Check /></el-icon>
                  {{ feature }}
                </li>
              </ul>
              <div class="solution-footer">
                <div class="price">
                  <span class="amount">{{ solution.price }}</span>
                  <span class="unit">/月</span>
                </div>
                <el-button type="primary" @click="chooseSolution(solution)">立即开通</el-button>
              </div>
            </el-card>
          </div>
        </div>
      </section>

      <!-- 虚拟信用卡 -->
      <section class="virtual-cards">
        <div class="container">
          <h2 class="section-title">虚拟信用卡</h2>
          <el-tabs v-model="activeCardTab">
            <el-tab-pane label="卡片管理" name="manage">
              <div class="cards-grid">
                <el-card v-for="card in virtualCards" :key="card.id" class="card-item">
                  <div class="card-preview" :style="{ background: card.background }">
                    <div class="card-number">**** **** **** {{ card.lastFour }}</div>
                    <div class="card-info">
                      <span>{{ card.expiry }}</span>
                      <img :src="card.network" class="card-network" />
                    </div>
                  </div>
                  <div class="card-details">
                    <div class="balance">
                      <span class="label">可用余额</span>
                      <span class="value">${{ card.balance }}</span>
                    </div>
                    <div class="actions">
                      <el-button type="primary" plain size="small" @click="topUpCard(card)">充值</el-button>
                      <el-button type="info" plain size="small" @click="showTransactions(card)">交易记录</el-button>
                    </div>
                  </div>
                </el-card>
                <div class="add-card-box" @click="createNewCard">
                  <el-icon><Plus /></el-icon>
                  <span>添加新卡</span>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="交易记录" name="transactions">
              <el-table :data="transactions" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180" />
                <el-table-column prop="description" label="交易描述" />
                <el-table-column prop="amount" label="金额" width="180" />
                <el-table-column prop="status" label="状态" width="120">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
                      {{ scope.row.status === 'success' ? '成功' : '失败' }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>

      <!-- 税务合规 -->
      <section class="tax-compliance">
        <div class="container">
          <h2 class="section-title">税务合规</h2>
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="compliance-checker">
                <h3>合规检查工具</h3>
                <el-form :model="taxForm" label-width="120px">
                  <el-form-item label="业务类型">
                    <el-select v-model="taxForm.businessType" placeholder="选择业务类型">
                      <el-option label="跨境电商" value="ecommerce" />
                      <el-option label="数字服务" value="digital" />
                      <el-option label="咨询服务" value="consulting" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="目标市场">
                    <el-select v-model="taxForm.market" multiple placeholder="选择目标市场">
                      <el-option label="美国" value="US" />
                      <el-option label="欧盟" value="EU" />
                      <el-option label="英国" value="UK" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="年营业额">
                    <el-input-number v-model="taxForm.revenue" :min="0" :step="10000" />
                    <span class="unit">USD</span>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="checkCompliance">开始检查</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="compliance-resources">
                <h3>合规资源</h3>
                <el-timeline>
                  <el-timeline-item
                    v-for="resource in complianceResources"
                    :key="resource.id"
                    :timestamp="resource.date"
                  >
                    <h4>{{ resource.title }}</h4>
                    <p>{{ resource.description }}</p>
                    <el-button type="primary" link @click="downloadResource(resource)">
                      下载资料
                    </el-button>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NavBar from '@/components/NavBar.vue'

// 支付方案数据
const paymentSolutions = ref([
  {
    id: 1,
    name: '全球收款通',
    description: 'PayPal替代方案，支持200+国家和地区',
    icon: ElementPlusIconsVue.Money,
    features: [
      '0.5%手续费',
      '实时汇率',
      '7*24客服支持',
      '资金秒到账'
    ],
    price: '299'
  },
  {
    id: 2,
    name: '企业收款专属',
    description: '为大型企业定制的跨境收款解决方案',
    icon: ElementPlusIconsVue.Wallet,
    features: [
      '0.3%手续费',
      'API对接',
      '专属客服',
      '收款报表'
    ],
    price: '999'
  }
])

// 虚拟信用卡数据
const activeCardTab = ref('manage')
const virtualCards = ref([
  {
    id: 1,
    lastFour: '4321',
    expiry: '12/25',
    balance: '5,000',
    background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
    network: '/images/visa.png'
  }
])

// 交易记录
const transactions = ref([
  {
    date: '2024-04-05',
    description: 'Facebook广告费',
    amount: '-$500',
    status: 'success'
  }
])

// 税务合规表单
const taxForm = ref({
  businessType: '',
  market: [],
  revenue: 100000
})

// 合规资源
const complianceResources = ref([
  {
    id: 1,
    title: '2024年跨境电商税务指南',
    description: '最新的跨境电商税务政策解读和案例分析',
    date: '2024-04-01'
  }
])

// 方法
const chooseSolution = (solution) => {
  // 选择支付方案逻辑
}

const topUpCard = (card) => {
  // 充值逻辑
}

const showTransactions = (card) => {
  activeCardTab.value = 'transactions'
}

const createNewCard = () => {
  // 创建新卡逻辑
}

const checkCompliance = () => {
  // 合规检查逻辑
}

const downloadResource = (resource) => {
  // 下载资源逻辑
}
</script>

<style lang="scss" scoped>
.payment-page {
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

  // 支付方案样式
  .solutions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 40px 0;
  }

  .solution-card {
    .solution-icon {
      font-size: 48px;
      color: $primary-color;
      text-align: center;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 24px;
      margin-bottom: 10px;
      text-align: center;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 20px 0;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        color: #666;

        .el-icon {
          color: #67C23A;
        }
      }
    }

    .solution-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      .price {
        .amount {
          font-size: 32px;
          font-weight: bold;
          color: $primary-color;
        }

        .unit {
          color: #666;
        }
      }
    }
  }

  // 虚拟卡片样式
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  .card-item {
    .card-preview {
      height: 180px;
      border-radius: 10px;
      padding: 20px;
      color: white;
      position: relative;

      .card-number {
        font-size: 20px;
        margin-bottom: 40px;
      }

      .card-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .card-network {
          height: 40px;
        }
      }
    }

    .card-details {
      padding: 20px 0;

      .balance {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        .value {
          font-size: 20px;
          font-weight: bold;
          color: $primary-color;
        }
      }

      .actions {
        display: flex;
        gap: 10px;
      }
    }
  }

  .add-card-box {
    border: 2px dashed #dcdfe6;
    border-radius: 8px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }

    .el-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
  }

  // 税务合规样式
  .tax-compliance {
    padding: 60px 0;
    background: #f8f9fa;

    .compliance-checker {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

      h3 {
        margin-bottom: 20px;
      }

      .unit {
        margin-left: 10px;
        color: #666;
      }
    }

    .compliance-resources {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

      h3 {
        margin-bottom: 20px;
      }

      .el-timeline-item {
        h4 {
          color: $text-color;
          margin-bottom: 5px;
        }

        p {
          color: #666;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style> 