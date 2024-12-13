import { BasePlugin, Earth } from "dde-earth"
import { Compass, ZoomControl } from 'cesium-extends'

export class NavigatorPlugin extends BasePlugin {
  name = 'Navigator'
  compass!: Compass
  zoomControl!: ZoomControl

  init(earth: Earth): this {
    this._init(earth)
    this.compass = new Compass(earth.viewer)
    this.zoomControl = new ZoomControl(earth.viewer)    
    return this
  }

  destroy(): void {
    this.zoomControl.destroy()
    this.compass.destroy()
  }
}