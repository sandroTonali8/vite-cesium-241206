import { GeoJsonRenderConfig } from "cesium-extends"
import { WindLayerOptions, WindLayer } from "cesium-wind-layer"
import styled from "styled-components"
import { colorSchemes } from './WindPanel/ColorTableInput'

export const earthquakeConfig: GeoJsonRenderConfig = {
  type: 'point',
  style: {
    type: 'bubble',
    config: {
      field: 'MAG',
      'fill-type': 'multi',
      'section-type': 'average',
      'section-num': 10,
      'label-size': [2, 40],
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white',
      colors: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026',
      ],
    },
  },
}

export const heightConfig: GeoJsonRenderConfig = {
  type: 'polygon',
  style: {
    type: 'height',
    config: {
      field: 'est',
      color: [
        '#053061',
        '#144c87',
        '#2467a6',
        '#3680b9',
        '#5199c6',
        '#75b2d4',
        '#9ac8e0',
        '#bcdaea',
        '#d7e8f0',
        '#ebeff1',
        '#f6ece7',
        '#fadfcf',
        '#f9c8b0',
        '#f3ac8e',
        '#e88b6f',
        '#d86755',
        '#c64240',
        '#ae2330',
        '#8e0e26',
        '#67001f',
      ],
      'section-type': 'natural',
      'outline-color': 'transparent',
      'height-range': [0, 500],
    },
  },
}

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

export const SwitchButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`

// Add data configurations
export const dataConfigs = {
  wind: {
    options: {
      domain: {
        min: 0,
        max: 8,
      },
      speedFactor: 0.8,
      lineWidth: { min: 1, max: 2 },
      lineLength: { min: 50, max: 100 },
      particleHeight: 100,
    },
    file: '/wind.json'
  },
  ocean: {
    options: {
      domain: {
        min: 0,
        max: 1,
      },
      speedFactor: 8,
      lineWidth: { min: 1, max: 4 },
      lineLength: { min: 20, max: 50 },
      particleHeight: 10,
    },
    file: '/ocean.json'
  }
}

export const defaultOptions: Partial<WindLayerOptions> = {
  ...WindLayer.defaultOptions,
  particlesTextureSize: 200,
  colors: colorSchemes.find(item => item.value === 'cool')?.colors.reverse(),
  flipY: true,
  useViewerBounds: true,
  dynamic: true,
}

