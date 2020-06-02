<template>
  <div style="width:100%;height:100%">
    <div ref="map" id="map" :style="{width:width,height:height}">
      <!-- 自定义工具栏 -->
      <div class="tool-container">
        <div class="t_close"></div>
        <ul>
          <li @click="changeType('Point')">
            <div class="icon" title="定点">
              <img src="./image/icon1.svg">
            </div>
          </li>
          <li @click="changeType('Hand')">
            <div class="icon" title="画笔">
              <img src="./image/icon2.svg">
            </div>
          </li>
          <Popover>
            <template v-slot:button>
              <li>
                <div class="icon" title="切换地图">
                  <img src="./image/icon3.svg">
                </div>
              </li>
            </template>
            <template v-slot:content>
              <ul class="maplist">
                <li @click="changeMap(GOOGLEADRESS)">谷歌地图</li>
                <li @click="changeMap(GAODEADRESS)">高德地图</li>
                <li @click="changeMap(OPENSTREETADRESS)">OpenStreet地图</li>
                <li @click="changeMap(ARCGISADRESS)">ArcGIS地图</li>
              </ul>
            </template>
          </Popover>
          <li @click="clearPic">
            <div class="icon" title="撤销上一次绘图">
              <img src="./image/icon5.svg">
            </div>
          </li>
          <li @click="clearboard">
            <div class="icon" title="清空绘图">
              <img src="./image/icon4.svg">
            </div>
          </li>
          <li @click="fullScreen(false)" v-show="!isFull">
            <div class="icon" title="全屏">
              <img src="./image/icon6.svg">
            </div>
          </li>
          <li @click="fullScreen(true)" v-show='isFull'>
            <div class="icon" title="缩屏">
              <img src="./image/icon7.svg">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import OlMap from './map'
import Popover from './Popover'
// import PmsMapOperator from './map/PmsMapOperator'
// 各个地图对应的code
const GAODEADRESS = 3
const GOOGLEADRESS = 1
const OPENSTREETADRESS = 0
const ARCGISADRESS = 2

export default {
  name: 'OLMap',
  components: {
    Popover
  },
  props: {
    width: {
      type: String,
      default: '480px'
    },
    height: {
      type: String,
      default: '480px'
    }
  },
  data () {
    return {
      GOOGLEADRESS,
      GAODEADRESS,
      ARCGISADRESS,
      OPENSTREETADRESS,
      isFull: false
    }
  },
  mounted () {
    this.createMap(this.$refs.map)
  },
  methods: {
    createMap (dom) {
      this.map = new OlMap(dom)
    },
    // 改变绘图类型
    changeType (val) {
      this.map.changeDrawType({ type: val })
      // this.map.clearLastDraw()
    },
    // 改变在线地图
    changeMap (mapcode) {
      this.map.changeMap(mapcode)
    },
    // 清除全部绘图
    clearPic () {
      this.map.clearLastDraw()
    },
    clearboard () {
      this.map.clearboard()
    },
    fullScreen (full) {
      let isFull = this.map.fullScreen(this.$refs.map, full)
      if (isFull !== false) {
        this.isFull = !this.isFull
      }
    }
  }
}
</script>
<style scoped>
.logo-large {
  width: 200px;
}
#map {
  height: 400px;
  width: 800px;
  position: relative;
}
.tool-container {
  position: absolute;
  right: 4px;
  top: 4px;
  height: 30px;
  border-radius: 4px;
  z-index: 10;
  font-size: 14px;
  display: flex;
}
.tool-container ul {
  display: flex;
}
.tool-container ul li {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  margin-left: 7px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}
.icon {
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
}
.icon img {
  width: 100%;
  height: auto;
}
</style>
