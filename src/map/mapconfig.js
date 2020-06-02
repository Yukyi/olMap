import * as layer from 'ol/layer'
import * as source from 'ol/source'

// 新建图层用于绘画
const VectorDraw = new source.Vector()
const VectorDrawLayer = new layer.Vector({
  source: VectorDraw
})

// Open Street Map 地图层
const MAP0 = new layer.Tile({
  source: new source.OSM()
})

// 谷歌地图
const MAP1 = new layer.Tile({
  source: new source.XYZ({
    url: 'https://mt0.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
  })
})

// ArcGIS地图
const MAP2 = new layer.Tile({
  source: new source.TileArcGISRest({
    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
  })
})

// 高德地图
const MAP3 = new layer.Tile({
  source: new source.XYZ({
    url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
  })
})

const mapTypeObj = {
  0: MAP0,
  1: MAP1,
  2: MAP2,
  3: MAP3
}

// 初始化地图返回所有图层
const streetmap = (maptype = 1) => {
  let maplayer = [
    mapTypeObj[maptype],
    VectorDrawLayer
  ]
  return maplayer
}

// 调整绘图图层的层级
const setDrawVectorIndex = (index) => {
  VectorDrawLayer.setZIndex(index)
}

var mapconfig = {
  x: 114.064839,
  y: 22.548857,
  zoom: 15,
  VectorDraw,
  VectorDrawLayer,
  streetmap: streetmap,
  setDrawVectorIndex
}

export default mapconfig
