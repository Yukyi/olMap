/**
 * javascript comment
 * @Author: yucong5
 * @Date: 2020-01-10 15:40:11
 */

import 'ol/ol.css'
import { Map, View } from 'ol'
import * as olstyle from 'ol/style'
import Config from './mapconfig'
import * as interaction from 'ol/interaction'
import * as Control from 'ol/control'

export default class OlMap extends Map {
  // 设置父类默认值
  constructor (target) {
    // 构建地图
    super({
      target,
      logo: false,
      // 控件 默认控件不显示
      controls: Control.defaults({
        attribution: false,
        rotate: false,
        zoom: false
      }),
      // 图层
      layers: Config.streetmap(),
      view: new View({
        projection: 'EPSG:4326', // 使用这个坐标系
        center: [Config.x, Config.y], // 深圳
        zoom: Config.zoom
      }),
      interactions: Config.interact
    })
  }

  data = {
    draw: null,
    drawType: [ // 绘图的类型
      'Point',
      'LineString',
      'LinearRing',
      'Polygon',
      'MultiPoint',
      'MultiLineString',
      'MultiPolygon',
      'GeometryCollection',
      'Circle',
      'Hand'
    ],
    mapcode: 1 // 当前的地图资源
  }
  // 改变绘图类型
  /**
   * @param  {String} type 绘图的类型
   * @param  {String} fill 绘画时内部填充色
   * @param  {String} stroke 绘画时的线条颜色粗细
   * @param  {String} image 鼠标圆点色彩大小
   * @param  {Object} argobj 其余自定义参数
   * Point:点
   * LineString:线
   * LinearRing：线性环
   * Polygon：多边形
   * MultiPoint：多点
   * MultiLineString：MultiLineString
   * MultiPolygon：多多边形
   * GeometryCollection：几何集合
   * Circle：圈
   */
  changeDrawType (
    {
      type,
      style = {
        fill: { color: 'rgba(0, 255, 255, 0.2)' },
        stroke: {
          color: '#ffcc33',
          width: 2
        },
        image: {
          radius: 7,
          fill: new olstyle.Fill({
            color: '#ffcc33'
          })
        }
      },
      argobj }
  ) {
    if (!this.data.drawType.includes(type)) {
      console.error('传入了不符合规范的绘图类型')
      return
    }
    this.data.draw && this.removeInteraction(this.data.draw)
    this.data.draw = new interaction.Draw({
      source: Config.VectorDraw, // 勾绘的要素会添加到 source 所属的矢量图层
      type: type === 'Hand' ? 'LineString' : type,
      style: new olstyle.Style({
        // 绘画时内部填充色
        fill: new olstyle.Fill(style.fill),
        stroke: new olstyle.Stroke(style.stroke),
        image: new olstyle.Circle(style.image)
      }),
      freehand: type === 'Hand', // 手绘
      snapTolerance: 50, // 以矢量点为圆心吸附的半径，默认12px
      ...argobj
    })
    // 将绘制的图片添加到map中
    this.addInteraction(this.data.draw)
  }

  // 删除上一次处于绘画中的上一个点
  clearLastDraw () {
    if (!this.data.draw) return
    const removeLastFeature = () => {
      const featuresArray = Config.VectorDraw.getFeatures()
      if (featuresArray.length !== 0) {
        Config.VectorDraw.removeFeature(featuresArray[featuresArray.length - 1])
      }
    }
    // 如果处于线段或多边形绘画中 撤销上一个点
    if (this.data.draw.finishCoordinate_) {
      this.data.draw.removeLastPoint()
      if (!this.data.draw.finishCoordinate_) {
        removeLastFeature()
      }
    } else { // 否则取消上一次绘图
      removeLastFeature()
    }
  }
  // 清空当前绘画图层
  clearboard () {
    this.data.draw && Config.VectorDraw.clear()
  }
  // 保持绘画并改变地图资源
  changeMap (mapcode) {
    if (this.data.mapcode === mapcode) return
    this.data.mapcode = mapcode
    // 先移除当前的地图，再添加 地图
    const layerIndex = 0 // 第一个视图
    this.removeLayer(this.getLayers().item(layerIndex))
    this.addLayer(Config.streetmap(mapcode)[0])
    // 倒转图层数组，让地图层永远在数组第一位
    this.getLayers().array_.reverse()
  }
  // 清除所有绘图
  clearPic () {
    // this.getOverlays().
  }
  // 全屏
  fullScreen (el, isfull) {
    if (!isfull) {
      let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
      if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        // eslint-disable-next-line no-undef
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    } else {
      // el.webkitExitFullscreen()
      let cfs = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen
      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        // eslint-disable-next-line no-undef
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }
}
