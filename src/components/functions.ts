import { DataSource, GeoJsonDataSource } from "cesium";
import { GeoJsonPrimitiveLayer, GeoJsonRenderConfig, renderGeoJson, renderPrimitiveGeoJson, updateDataSourcePosition } from "cesium-extends";
import { Earth } from "dde-earth";

export async function addGeojsonByDataSource(
  earth: Earth,
  url: string,
  config: GeoJsonRenderConfig,
) {
  const dataSource: DataSource = await GeoJsonDataSource.load(url);
  updateDataSourcePosition(dataSource);
  await renderGeoJson(dataSource, config);
  await earth.viewer.dataSources.add(dataSource);
  return dataSource;
}

export async function addGeojsonByPrimitive(
  earth: Earth,
  url: string,
  config: GeoJsonRenderConfig,
) {
  const primitiveLayer = await GeoJsonPrimitiveLayer.load(url);
  await renderPrimitiveGeoJson(primitiveLayer, config);
  earth.viewer.scene.primitives.add(primitiveLayer.primitiveCollection);
  earth.viewer.scene.primitives.lowerToBottom(primitiveLayer.primitiveCollection);

  return primitiveLayer;
}