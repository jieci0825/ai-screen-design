const categorys = [
    { type: 'chart', name: '图表', icon: 'basil:chart-pie-outline' },
    { type: 'info', name: '信息', icon: 'ant-design:info-circle-outlined' },
]

// 分类物料映射表
const categoryMaterialMap: Record<string, any[]> = {
    chart: [
        { name: '柱状图', key: 'bar', icon: 'bi:bar-chart-fill' },
        { name: '折线图', key: 'line', icon: 'boxicons:chart-sine-filled' },
        { name: '饼图', key: 'pie', icon: 'boxicons:pie-chart-filled' },
    ],
    info: [{ name: '文本', key: ' text', icon: 'ant-design:font-size-outlined' }],
}

/**
 * 获取所有分类
 */
export function getCategorys() {
    return categorys
}

/**
 * 获取指定分类下的物料列表
 */
export function getMaterialsByCategory(type: string) {
    return categoryMaterialMap[type] || []
}
