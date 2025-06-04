'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  RadarChart as EChartsRadarChart,
} from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  EChartsRadarChart,
  CanvasRenderer,
])

type RadarChartProps = {
  abilities: Array<{
    name: string
    score: number
  }>
}

const RadarChart = ({ abilities = [] }: RadarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 初始化图表
    if (!chartInstance.current)
      chartInstance.current = echarts.init(chartRef.current)

    // 准备数据
    const indicator = abilities.map(item => ({
      name: item.name,
      max: 100,
    }))

    const data = abilities.map(item => item.score)

    // 配置选项
    const option = {
      color: ['#6b47ff'],
      radar: {
        indicator,
        radius: '70%',
        splitNumber: 4,
        axisName: {
          color: '#666',
          fontSize: 12,
        },
        splitArea: {
          areaStyle: {
            color: ['#f5f5f5', '#fff'],
          },
        },
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: data,
              name: '能力值',
              areaStyle: {
                color: 'rgba(107, 71, 255, 0.2)',
              },
              lineStyle: {
                width: 2,
              },
            },
          ],
        },
      ],
    }

    // 设置图表
    chartInstance.current.setOption(option)

    // 响应窗口大小变化
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }, [abilities])

  return <div ref={chartRef} className="h-full w-full" />
}

export default RadarChart
