import React, { useEffect, useState } from 'react'
import { ControlPanelContainer, StyledCard, CardContent, CompactFormItem } from '../WindPanel/ControlPanel'
import { Form, Space, Tooltip, Typography } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import NumberInput from '../WindPanel/NumberInput'
// import { geoJsonConfig } from '../constants'
import { GeoJsonOptions } from '../interfaces'
import { GeoJsonLayer } from '../class'

const { Text } = Typography

interface PanelProps {
  geojsonLayer: GeoJsonLayer | null
  initialOptions: Partial<GeoJsonOptions>;
  onOptionsChange?: (options: Partial<GeoJsonOptions>) => void;
}

export const TransparencyControl: React.FC<PanelProps> = ({
  geojsonLayer,
  initialOptions,
  onOptionsChange,
}) => {
  const [form] = Form.useForm()
  const collapsed = false
  const [options, setOptions] = useState<GeoJsonOptions>({ Transparency: geojsonLayer?.opacity ?? 1 })

  useEffect(() => {
    if (initialOptions) {
      const newOptions = {
        ...options,
        ...initialOptions,
      }
      setOptions(newOptions)
      form.setFieldsValue(newOptions)
      // geojsonLayer?.updateOptions({ Transparency: newOptions.Transparency })
    }
  }, [options])

  const handleValuesChange = (changedValues: Partial<GeoJsonOptions>, allValues: GeoJsonOptions) => {
    setOptions(allValues);
    
    // 确保直接修改geojsonLayer的内部属性
    if (geojsonLayer) {
      // // 假设geojsonLayer有一个内部透明度属性，具体名称根据你的实现可能不同
      // geojsonLayer.options.Transparency = options.Transparency; // 直接修改内部属性
      
      // 如果有必要，调用一个更新方法触发重绘
      geojsonLayer.updateOptions?.({ Transparency: changedValues.Transparency }); // 或其他可能的更新方法
      
      // 记录更新后的实际值
      // console.log("设置的新透明度:", options.Transparency);
      console.log("更新后geojsonLayer的透明度:", geojsonLayer);
    }

    onOptionsChange?.(changedValues);
  }

  const renderLabel = (label: string, tooltip: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {label}
      <Tooltip title={tooltip}>
        <QuestionCircleOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
      </Tooltip>
    </div>
  );

  return (
    <ControlPanelContainer>
      <StyledCard
        size='small'
      >
        <CardContent $collapsed={collapsed}>
          <Form
            form={form}
            initialValues={initialOptions}
            onValuesChange={handleValuesChange}
            layout="vertical"
            size="small"
          >
            <Space direction="vertical" style={{ width: '100%' }} size={4}>
              <CompactFormItem
                name="Transparency"
                label={renderLabel(
                  'Transparency',
                  'Transparency of GeoJson. Determines the visibility of GeoJson.'
                )}
                help={
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    Current: {Math.pow(options.Transparency, 1)}
                  </Text>
                }
              >
                <NumberInput min={0} max={1} step={0.01} />
              </CompactFormItem>
            </Space>
          </Form>
        </CardContent>
      </StyledCard>
    </ControlPanelContainer>
  )
}