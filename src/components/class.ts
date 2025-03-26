import { GeoJsonOptions } from "./interfaces";
import { deepMerge } from "dde-earth";
import { GeoJsonDefaultOptions } from "./constants";
import { Viewer } from "cesium";
import { PolygonCommonOptions } from "cesium-extends";

const DefaultOptions = GeoJsonDefaultOptions
type GeoJsonLayerEventType = 'optionsChange'
type GeoJsonLayerEventCallback = (data: GeoJsonOptions) => void;

export class GeoJsonLayer {
  private _isDestroyed: boolean = false;
  private eventListeners: Map<GeoJsonLayerEventType, Set<GeoJsonLayerEventCallback>> = new Map();
  static defaultOptions: Partial<GeoJsonOptions> = DefaultOptions;

  opacity: PolygonCommonOptions["opacity"]
  viewer: Viewer;

  constructor(viewer: Viewer, opacity?: PolygonCommonOptions["opacity"]) {
    this.viewer = viewer
    this.opacity = opacity as PolygonCommonOptions["opacity"]
  }

  addEventListener(type: GeoJsonLayerEventType, callback: GeoJsonLayerEventCallback) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, new Set());
    }
    this.eventListeners.get(type)?.add(callback);
  }

  updateOptions(options: Partial<GeoJsonOptions>): void {
    if (this._isDestroyed) return
    this.opacity = deepMerge(options, this.opacity);
    this.viewer.scene.requestRender()
    this.dispatchEvent('optionsChange', { Transparency: this.opacity ?? 1 })
  }

  private dispatchEvent(type: GeoJsonLayerEventType, data: GeoJsonOptions) {
    this.eventListeners.get(type)?.forEach(callback => callback(data));
  }

  isDestroyed(): boolean {
    return this._isDestroyed;
  }
}