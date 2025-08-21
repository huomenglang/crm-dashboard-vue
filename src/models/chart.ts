import type { ApexOptions } from "apexcharts"


export interface TypeProps {
    type?: string | null
    props?: any
}
export interface DashboardRowModel<T> {
    props?: any
    data?: T[]
}
export interface StatsOperationTypeProjection extends TypeProps {
    amount?: number
    title?: string | null
    icon?: string | null
    color?: string | null
    prefix?: string | null
    suffix?: string | null
    precision?: number | null
}
export interface DashboardStatsModel {
    stats?: StatsOperationTypeProjection[]
    rows?: DashboardRowModel<StatsOperationTypeProjection>
}
export interface ChartOptions {
    type?: ChartType
    series?: ApexOptions['series']
    options?: ApexOptions
    height?: string | number
    width?: string | number
    [key: string]: any
}

export interface ChartTypeProjection extends TypeProps {
    title?: string | null
    chartOptions?: ChartOptions
}

export type ChartType =
    | 'line'
    | 'area'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
export interface DashboardChartsModel {
    charts?: ChartTypeProjection[]
    rows?: DashboardRowModel<ChartTypeProjection>[]
}
