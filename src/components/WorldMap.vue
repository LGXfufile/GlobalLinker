<template>
  <div class="world-map">
    <div class="map-placeholder">
      <h2>全球业务分布图</h2>
      <div class="region-markers">
        <div class="marker" style="top: 30%; left: 75%">东南亚</div>
        <div class="marker" style="top: 20%; left: 45%">欧美</div>
        <div class="marker" style="top: 40%; left: 55%">中东</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.world-map {
  height: 100%;
  
  .map-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    h2 {
      color: white;
      font-size: 36px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .region-markers {
      position: absolute;
      width: 100%;
      height: 100%;
      
      .marker {
        position: absolute;
        padding: 8px 16px;
        background: rgba(255,255,255,0.2);
        border-radius: 4px;
        color: white;
        font-weight: bold;
        backdrop-filter: blur(4px);
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }
      }
    }
  }
}
</style> 