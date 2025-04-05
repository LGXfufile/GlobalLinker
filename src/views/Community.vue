<template>
  <div class="community-page">
    <el-header class="header" height="80">
      <nav-bar />
    </el-header>

    <el-main>
      <!-- 行业报告 -->
      <section class="reports-section">
        <div class="container">
          <h2 class="section-title">行业报告</h2>
          <div class="reports-filter">
            <el-input
              v-model="searchQuery"
              placeholder="搜索报告..."
              class="search-input"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-select v-model="selectedIndustry" placeholder="选择行业">
              <el-option
                v-for="industry in industries"
                :key="industry.value"
                :label="industry.label"
                :value="industry.value"
              />
            </el-select>
          </div>

          <div class="reports-grid">
            <el-card v-for="report in reports" :key="report.id" class="report-card">
              <div class="report-cover">
                <img :src="report.cover" :alt="report.title">
                <div class="report-type">{{ report.type }}</div>
              </div>
              <div class="report-info">
                <h3>{{ report.title }}</h3>
                <p>{{ report.description }}</p>
                <div class="report-meta">
                  <span class="date">{{ report.date }}</span>
                  <span class="downloads">{{ report.downloads }}次下载</span>
                </div>
                <div class="report-actions">
                  <el-button type="primary" @click="downloadReport(report)">
                    {{ report.price === 0 ? '免费下载' : `购买 ¥${report.price}` }}
                  </el-button>
                  <el-button type="info" plain @click="previewReport(report)">预览</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </section>

      <!-- 问答论坛 -->
      <section class="forum-section">
        <div class="container">
          <h2 class="section-title">问答论坛</h2>
          <div class="forum-header">
            <el-button type="primary" @click="createPost">发布问题</el-button>
            <div class="forum-filter">
              <el-radio-group v-model="postFilter" size="large">
                <el-radio-button label="latest">最新</el-radio-button>
                <el-radio-button label="hot">热门</el-radio-button>
                <el-radio-button label="unanswered">待回答</el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div class="posts-list">
            <el-card v-for="post in posts" :key="post.id" class="post-card">
              <div class="post-stats">
                <div class="stat">
                  <div class="value">{{ post.votes }}</div>
                  <div class="label">投票</div>
                </div>
                <div class="stat">
                  <div class="value">{{ post.answers }}</div>
                  <div class="label">回答</div>
                </div>
                <div class="stat">
                  <div class="value">{{ post.views }}</div>
                  <div class="label">浏览</div>
                </div>
              </div>
              <div class="post-content">
                <h3>{{ post.title }}</h3>
                <p>{{ post.excerpt }}</p>
                <div class="post-tags">
                  <el-tag v-for="tag in post.tags" :key="tag" size="small">{{ tag }}</el-tag>
                </div>
                <div class="post-meta">
                  <div class="author">
                    <el-avatar :size="24" :src="post.author.avatar" />
                    <span>{{ post.author.name }}</span>
                  </div>
                  <span class="time">{{ post.time }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </section>

      <!-- 线下活动 -->
      <section class="events-section">
        <div class="container">
          <h2 class="section-title">线下活动</h2>
          <el-tabs v-model="activeEventTab">
            <el-tab-pane label="即将举办" name="upcoming">
              <div class="events-grid">
                <el-card v-for="event in upcomingEvents" :key="event.id" class="event-card">
                  <div class="event-image">
                    <img :src="event.image" :alt="event.title">
                    <div class="event-date">
                      <div class="day">{{ event.date.day }}</div>
                      <div class="month">{{ event.date.month }}</div>
                    </div>
                  </div>
                  <div class="event-info">
                    <h3>{{ event.title }}</h3>
                    <p>{{ event.description }}</p>
                    <div class="event-details">
                      <div class="detail">
                        <el-icon><Location /></el-icon>
                        <span>{{ event.location }}</span>
                      </div>
                      <div class="detail">
                        <el-icon><Timer /></el-icon>
                        <span>{{ event.time }}</span>
                      </div>
                    </div>
                    <div class="event-footer">
                      <div class="price">{{ event.price === 0 ? '免费' : `¥${event.price}` }}</div>
                      <el-button type="primary" @click="registerEvent(event)">立即报名</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="活动回顾" name="past">
              <div class="events-gallery">
                <el-card v-for="event in pastEvents" :key="event.id" class="gallery-card">
                  <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="photo in event.photos" :key="photo">
                      <img :src="photo" class="gallery-image">
                    </el-carousel-item>
                  </el-carousel>
                  <div class="gallery-info">
                    <h3>{{ event.title }}</h3>
                    <p>{{ event.summary }}</p>
                    <el-button type="primary" text @click="viewEventDetails(event)">
                      查看详情
                    </el-button>
                  </div>
                </el-card>
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

// 行业报告数据
const searchQuery = ref('')
const selectedIndustry = ref('')
const industries = [
  { label: '跨境电商', value: 'ecommerce' },
  { label: '社交媒体', value: 'social' },
  { label: '数字支付', value: 'payment' }
]

// 使用占位图片URL
const placeholderImage = 'https://via.placeholder.com/300x200'

// 更新报告数据
const reports = ref([
  {
    id: 1,
    title: '2024东南亚电商市场分析报告',
    description: '深度解析东南亚六国电商市场趋势与机遇',
    cover: placeholderImage,  // 临时使用占位图片
    type: '市场分析',
    date: '2024-04-01',
    downloads: 1280,
    price: 299
  },
  {
    id: 2,
    title: '跨境支付解决方案白皮书',
    description: '最新跨境支付趋势与解决方案分析',
    cover: placeholderImage,  // 临时使用占位图片
    type: '行业白皮书',
    date: '2024-03-28',
    downloads: 890,
    price: 199
  }
])

// 问答论坛数据
const postFilter = ref('latest')
const posts = ref([
  {
    id: 1,
    title: '如何解决TikTok Shop物流时效问题？',
    excerpt: '最近遇到物流时效延长的问题，求解决方案...',
    votes: 15,
    answers: 8,
    views: 235,
    tags: ['TikTok', '物流', '跨境电商'],
    author: {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40',  // 临时使用占位头像
    },
    time: '2小时前'
  }
])

// 活动数据
const activeEventTab = ref('upcoming')
const upcomingEvents = ref([
  {
    id: 1,
    title: '2024跨境电商峰会',
    description: '聚焦最新跨境电商趋势与机遇',
    image: placeholderImage,  // 临时使用占位图片
    date: {
      day: '15',
      month: '5月'
    },
    location: '深圳会展中心',
    time: '09:00-18:00',
    price: 299
  }
])

const pastEvents = ref([
  {
    id: 1,
    title: '东南亚市场研讨会',
    summary: '深入探讨东南亚市场机遇与挑战',
    photos: [
      placeholderImage,  // 临时使用占位图片
      placeholderImage,
      placeholderImage
    ]
  }
])

// 方法
const downloadReport = (report) => {
  // 下载报告逻辑
}

const previewReport = (report) => {
  // 预览报告逻辑
}

const createPost = () => {
  // 创建帖子逻辑
}

const registerEvent = (event) => {
  // 活动报名逻辑
}

const viewEventDetails = (event) => {
  // 查看活动详情逻辑
}
</script>

<style lang="scss" scoped>
.community-page {
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

  // 行业报告样式
  .reports-filter {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    .search-input {
      flex: 1;
    }
  }

  .reports-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .report-card {
    .report-cover {
      position: relative;
      
      img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        border-radius: 4px;
      }

      .report-type {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }

    .report-info {
      padding: 15px 0;

      h3 {
        margin-bottom: 10px;
        font-size: 18px;
      }

      .report-meta {
        display: flex;
        justify-content: space-between;
        color: #666;
        margin: 10px 0;
      }

      .report-actions {
        display: flex;
        gap: 10px;
      }
    }
  }

  // 问答论坛样式
  .forum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .post-card {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .post-stats {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 10px;
      border-right: 1px solid #eee;

      .stat {
        text-align: center;

        .value {
          font-size: 20px;
          font-weight: bold;
          color: $primary-color;
        }

        .label {
          font-size: 12px;
          color: #666;
        }
      }
    }

    .post-content {
      flex: 1;

      h3 {
        margin-bottom: 10px;
      }

      .post-tags {
        margin: 10px 0;
        display: flex;
        gap: 5px;
      }

      .post-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        color: #666;

        .author {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    }
  }

  // 活动样式
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .event-card {
    .event-image {
      position: relative;

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
      }

      .event-date {
        position: absolute;
        top: 10px;
        left: 10px;
        background: white;
        padding: 10px;
        border-radius: 4px;
        text-align: center;

        .day {
          font-size: 24px;
          font-weight: bold;
          color: $primary-color;
        }

        .month {
          font-size: 14px;
          color: #666;
        }
      }
    }

    .event-info {
      padding: 20px 0;

      h3 {
        margin-bottom: 10px;
      }

      .event-details {
        margin: 15px 0;

        .detail {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #666;
        }
      }

      .event-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          font-size: 20px;
          font-weight: bold;
          color: $primary-color;
        }
      }
    }
  }

  .events-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .gallery-card {
      .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .gallery-info {
        padding: 15px;
        text-align: center;

        h3 {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style> 