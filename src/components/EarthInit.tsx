import { Earth } from "dde-earth"
import { PropsWithChildren, useEffect, useRef } from "react"
import { styled } from 'styled-components'
import { NavigatorPlugin } from "../utils/plugin-navigator"
import { ArcGisMapServerImageryProvider, CesiumTerrainProvider, ImageryLayer, Ion, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartesian2, Entity, Color, ConstantProperty } from 'cesium'
// import { WindData, WindLayer, WindLayerOptions } from "cesium-wind-layer"
import { PageContainer, geoJsonConfig } from './constants'
// import { SpeedQuery } from './WindPanel/SpeedQuery'
// import { ControlPanel } from './WindPanel/ControlPanel'
import { addGeojsonByDataSource } from "./functions"
// // import { TransparencyControl } from './GeoJsonPanel/TransparencyControl'
// import { GeoJsonOptions } from './interfaces'
// import { GeoJsonLayer } from "./class"

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhY2IzNzQzNi1iOTVkLTRkZjItOWVkZi1iMGUyYTUxN2Q5YzYiLCJpZCI6NTUwODUsImlhdCI6MTcyNTQyMDE4NX0.yHbHpszFexPrxX6_55y0RgNrHjBQNu9eYkW9cXKUTPk'

export interface EarthProps {}

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
`

export default function EarthInit({
  children
}: PropsWithChildren<EarthProps>) {
  const earth = useRef<Earth | null>(null)
  // const geojsonLayerRef = useRef<GeoJsonLayer | null>(null)
  // const windLayerRef = useRef<WindLayer | null>(null)
  // const [, setIsWindLayerReady] = useState(false)
  // const windDataFiles = [dataConfigs.wind.file, dataConfigs.ocean.file]
  // const isFirstLoadRef = useRef(true)
  // const [currentDataIndex, setCurrentDataIndex] = useState(0)
  // const [currentOptions, setCurrentOptions] = useState<WindLayerOptions>({
  //   ...defaultOptions,
  //   ...dataConfigs.wind.options
  // } as WindLayerOptions)
  // const [currentOptions, setCurrentOptions] = useState<GeoJsonOptions>({
  //   ...GeoJsonDefaultOptions,
  //   Transparency: GeoJsonDefaultOptions.Transparency ?? 1
  // } as GeoJsonOptions)

  useEffect(() => {
    // let isComponentMounted = true

    const earcur = new Earth('container', {
      baseLayer: ImageryLayer.fromProviderAsync(ArcGisMapServerImageryProvider.fromUrl('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer', {
        enablePickFeatures: false
      }), {}),
      baseLayerPicker: false,
      animation: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      selectionIndicator: true,
      timeline: false,
      navigationHelpButton: false,
      shouldAnimate: true,
      useBrowserRecommendedResolution: false,
      orderIndependentTranslucency: false,
    })
    earth.current = earcur
    earcur.usePlugin(new NavigatorPlugin())
    // addGeojsonByPrimitive(earcur, '/California_heat.geojson', heightConfig)
    // const windLayer = new WindLayer(earcur.viewer, windData, windLayerProps)
    // const geojsonLayer = new GeoJsonLayer(earcur.viewer, geoJsonConfig.style?.config.opacity)
    addGeojsonByDataSource(earcur, '/Niger_and_Nigeria.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Senegal_Basin.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Karoo_Basin.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Congo_basin.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Upper_Egypt_basin.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })
    
    addGeojsonByDataSource(earcur, '/Trias_Ghadames_basin.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Tunisia.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Panama.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Belgium.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Qatar.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Middle_East.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/India_plate.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Malaysia.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Thailand.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/Vietnam.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })

    addGeojsonByDataSource(earcur, '/China.geojson', geoJsonConfig).then(res => {
      earcur.viewer.zoomTo(res)
    })
    
    const handler = new ScreenSpaceEventHandler(earcur.viewer.scene.canvas)
    let highlightedEntity: Entity | null = null;

    function resetHighlight() {
      if (highlightedEntity && highlightedEntity.polygon) {
        highlightedEntity.polygon.outlineWidth  = new ConstantProperty(1);
        highlightedEntity.polygon.outlineColor  = new ConstantProperty(Color.BLACK);
        highlightedEntity = null;
      }
    }

    handler.setInputAction((e: { position: Cartesian2 }) => {
      const pickedObj = earcur.viewer.scene.pick(e.position)
      if (pickedObj) {
        console.log(pickedObj.id)
        switch(pickedObj.id.name) {
          case "Nigeria":
            window.open("https://nigerialex.geolex.org/index.php")
            break
          case "Niger":
            window.open("https://nigerlex.geolex.org/")
            break
          case "Senegal basin":
            window.open("https://africalex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=Senegal+Basin")
            break
          case "Karoo basin (simplified)":
            window.open("https://africalex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=Karoo+Basin")
            break
          case "Congo basin":
            window.open("https://africalex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=Central+Africa%3A+Congo+basin+General")
            break
          case "Upper Egypt basin":
            window.open("https://africalex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=Northern+Africa%3A+Upper+Egypt+basin")
            break
          case "Trias/Ghadames basin":
            window.open("https://africalex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=Northern+Africa%3A+Trias%2FGhadames+basin")
            break
          case "Tunisia":
            window.open("https://africalex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=Northern+Africa%3A+Tunisia")
            break
          case "Panama":
            window.open("https://panamalex.geolex.org/")
            break
          case "Belgium":
            window.open("https://belgiumlex.geolex.org/index.php?search=&lithoSearch=&fossilSearch=&searchtype=Period&filterperiod=All&agefilterstart=&agefilterend=&filterprovince%5B%5D=All")
            break
          case "Qatar":
            window.open("https://qatarlex.geolex.org/")
            break
          case "Middle East Simplified":
            window.open("https://mideastlex.geolex.org/")
            break
          case "India plate simplified":
            window.open("https://indplex.geolex.org/")
            break
          case "Malaysia":
            window.open("https://malaylex.geolex.org/")
            break
          case "Thailand":
            window.open("https://thailex.geolex.org/")
            break
          case "Vietnam":
            window.open("https://vietlex.geolex.org/")
            break
          case "People's Republic of China":
            window.open("https://chinalex.geolex.org/")
            break
          default:
            break
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction((e: { endPosition: Cartesian2 }) => {
      const pickedObj = earcur.viewer.scene.pick(e.endPosition)
      if (pickedObj && pickedObj.id instanceof Entity) {
        const entity = pickedObj.id
        // 仅处理特定实体（如"Nigeria"或"Niger"）
        if (entity.name  === "Nigeria" ||
            entity.name  === "Niger" ||
            entity.name === "Senegal basin" ||
            entity.name === "Karoo basin (simplified)" ||
            entity.name === "Congo basin" ||
            entity.name === "Upper Egypt basin" ||
            entity.name === "Trias/Ghadames basin" ||
            entity.name === "Tunisia" ||
            entity.name === "Panama" ||
            entity.name === "Belgium" ||
            entity.name === "Qatar" ||
            entity.name === "Middle East Simplified" ||
            entity.name === "India plate simplified" ||
            entity.name === "Malaysia" ||
            entity.name === "Thailand" ||
            entity.name === "Vietnam" ||
            entity.name === "People's Republic of China") {
          if (highlightedEntity !== entity) {
            resetHighlight(); // 恢复之前高亮
            highlightedEntity = entity;
            // 设置高亮样式
            if (highlightedEntity && highlightedEntity.polygon) {
              highlightedEntity.polygon.height = new ConstantProperty(0);
              highlightedEntity.polygon.outline = new ConstantProperty(true);
              highlightedEntity.polygon.outlineWidth = new ConstantProperty(10);
              highlightedEntity.polygon.outlineColor = new ConstantProperty(Color.YELLOW);
            }
          }
        }
      } else {
        resetHighlight()
      }
    }, ScreenSpaceEventType.MOUSE_MOVE)

    CesiumTerrainProvider.fromIonAssetId(1).then(terrainProvider => {
      if (earcur) {
        earcur.viewer.terrainProvider = terrainProvider;
      }
    })

    earcur.viewer.scene.globe.depthTestAgainstTerrain = false
    // Optional: Add exaggeration to make terrain features more visible
    // earcur.scene.verticalExaggeration = 2;
    // earcur.sceneModePicker.viewModel.duration = 0;
    // const initGeojsonLayer = async () => {
    //   const initialOptions = {
    //     ...GeoJsonDefaultOptions
    //   }
    //   setCurrentOptions(initialOptions as GeoJsonOptions)
    //   const layer = new GeoJsonLayer(earcur.viewer, geoJsonConfig.style?.config.opacity)
    //   // layer.addEventListener('optionsChange', (options) => {
    //   //   console.log('Options updated:', options);
    //   //   // Handle options change
    //   // })
    //   geojsonLayerRef.current = layer
    // }

    // initGeojsonLayer()
    
    // const initWindLayer = async () => {
    //   try {
    //     const res = await fetch(windDataFiles[0])
    //     const data = await res.json()

    //     if (!isComponentMounted || !earcur) return

    //     const windData: WindData = {
    //       ...data,
    //       bounds: {
    //         west: data.bbox[0],
    //         south: data.bbox[1],
    //         east: data.bbox[2],
    //         north: data.bbox[3],
    //       }
    //     }

    //     // Apply initial options with wind configuration
    //     const initialOptions = {
    //       ...defaultOptions,
    //       ...dataConfigs.wind.options
    //     }
    //     setCurrentOptions(initialOptions as WindLayerOptions)

    //     if (isFirstLoadRef.current && windData.bounds) {
    //       const rectangle = Rectangle.fromDegrees(
    //         windData.bounds.west,
    //         windData.bounds.south,
    //         windData.bounds.east,
    //         windData.bounds.north
    //       )
    //       earcur.viewer.camera.flyTo({
    //         destination: rectangle,
    //         duration: 0,
    //       })
    //       isFirstLoadRef.current = false
    //     }

    //     const layer = new WindLayer(earcur.viewer, windData, initialOptions)
        
    //     // Add event listeners
    //     layer.addEventListener('dataChange', (data) => {
    //       console.log('Wind data updated:', data);
    //       // Handle data change
    //     })

    //     layer.addEventListener('optionsChange', (options) => {
    //       console.log('Options updated:', options);
    //       // Handle options change
    //     })

    //     windLayerRef.current = layer
    //     setIsWindLayerReady(true)
    //   } catch (error) {
    //     console.error('Failed to initialize wind layer:', error)
    //   }
    // };

    // // Initialize wind layer
    // initWindLayer()

    return () => {
      // isComponentMounted = false
      // isFirstLoadRef.current = true
      
      // if (windLayerRef.current) {
      //   windLayerRef.current.destroy()
      //   // windLayerRef.current = null;
      //   setIsWindLayerReady(false)
      // }

      earcur?.destroy()
    }
  }, [])

  // const handleOptionsChange = (changedOptions: Partial<GeoJsonOptions>) => {
  //   setCurrentOptions({
  //     ...currentOptions,
  //     ...changedOptions
  //   })
  // }

  // const handleSwitchData = async () => {
  //   try {
  //     const nextIndex = (currentDataIndex + 1) % windDataFiles.length
  //     const res = await fetch(windDataFiles[nextIndex])
  //     const data = await res.json()

  //     if (!windLayerRef.current) return;

  //     const windData: WindData = {
  //       ...data,
  //       bounds: {
  //         west: data.bbox[0],
  //         south: data.bbox[1],
  //         east: data.bbox[2],
  //         north: data.bbox[3],
  //       }
  //     };

  //     // Get the correct configuration based on the next index
  //     const configKey = nextIndex === 0 ? 'wind' : 'ocean'
  //     const newOptions = {
  //       ...currentOptions, // Keep current options
  //       ...dataConfigs[configKey].options // Only override specific options
  //     }

  //     // Update both the wind data and options
  //     windLayerRef.current.updateOptions(newOptions)
  //     windLayerRef.current.updateWindData(windData)
  //     setCurrentOptions(newOptions)
  //     setCurrentDataIndex(nextIndex)
  //   } catch (error) {
  //     console.error('Failed to switch wind data:', error)
  //   }
  // }
  
  return (
    <PageContainer>
      {/* <SpeedQuery windLayer={windLayerRef.current} viewer={earth.current?.viewer ?? null} /> */}
      <Div id='container'>
        {/* <SwitchButton onClick={handleSwitchData}>
          Switch to {currentDataIndex === 0 ? 'Ocean' : 'Wind'} Data
        </SwitchButton>
        <ControlPanel
          windLayer={windLayerRef.current}
          initialOptions={currentOptions}
          onOptionsChange={handleOptionsChange}
        /> */}
        {/* <TransparencyControl
          geojsonLayer={geojsonLayerRef.current}
          initialOptions={currentOptions}
          onOptionsChange={handleOptionsChange}
        /> */}
        {children}
      </Div>
    </PageContainer>
  )
}
