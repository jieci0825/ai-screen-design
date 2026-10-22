import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { generate } from '@ant-design/colors'

/**
 * 语义色基色配置：只需要修改这里，色阶会自动生成。
 * 输入色会作为色阶的第 6 档（--color-{name}-500）。
 */
const BASE_COLORS = {
    primary: '#171717',
    success: '#22c55e',
    danger: '#dc2626',
    warning: '#d97706',
    info: '#2563eb',
}

/** antd generate 输出 10 档（index 0 最浅、5 为基色、9 最深），映射为 50~900 色阶命名 */
const SCALE_NAMES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const targetPath = resolve(rootDir, 'src/styles/generated/palette.scss')

/**
 * antd 算法为中等亮度的彩色基色设计（如 #1890ff，L≈55%）。
 * 对中性灰基色（如 #171717），色相/饱和度补偿不生效，且亮度插值会被
 * 压缩——浅端最浅只能到 L≈34%，深端全部坍缩为纯黑，无法得到可用的
 * 浅灰（#f5f5f5）与深灰阶梯。
 *
 * 因此中性基色改用纯亮度插值：50~400 向白色插值、600~900 向黑色插值、
 * 500 为基色本身。这与 antd 算法在中性色上的数学形式一致，但没有压缩缺陷。
 *
 * 注意：极端亮度的彩色基色（L < 20% 或 L > 90%）仍可能出现阶梯压缩，
 * 当前 5 个基色都在安全范围内。
 */
function isNeutralColor(hex) {
    const [r, g, b] = hexToRgb(hex)
    return Math.max(r, g, b) - Math.min(r, g, b) <= 15
}

/** 将十六进制颜色转换为 RGB 通道。 */
function hexToRgb(hex) {
    const value = hex.replace('#', '')
    return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)]
}

/** 将 RGB 通道转换为十六进制颜色。 */
function rgbToHex(r, g, b) {
    /** 将单个颜色通道格式化为两位十六进制。 */
    const toHex = (channel) => Math.round(channel).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/** 中性基色：在基色与近白锚点/黑色之间做线性插值，返回 10 档 */
function generateNeutralPalette(hex) {
    const [r, g, b] = hexToRgb(hex)

    /** 将基色向指定亮度锚点插值。 */
    const mix = (t, target) => rgbToHex(r + (target - r) * t, g + (target - g) * t, b + (target - b) * t)

    // 浅端锚点为 #f5f5f5（50 档），避免出现纯白导致与白色容器背景无法区分；
    // 600~900 向黑色插值（900 为纯黑）
    const lightHalf = [1, 0.8, 0.6, 0.4, 0.2].map((t) => mix(t, 245))
    const base = [hex]
    const darkHalf = [0.2, 0.4, 0.7, 1].map((t) => mix(t, 0))

    return [...lightHalf, ...base, ...darkHalf]
}

/** 生成单个语义色的色阶变量 */
function buildScaleBlock(name, baseColor) {
    const palette = isNeutralColor(baseColor) ? generateNeutralPalette(baseColor) : generate(baseColor)

    const lines = SCALE_NAMES.map((scaleName, index) => `    --color-${name}-${scaleName}: ${palette[index]};`)

    return [`    // ${name}（基色 ${baseColor.toLowerCase()}）`, ...lines].join('\n')
}

/** 将全部色阶序列化为可直接引用的 SCSS 文件。 */
function buildScss() {
    const blocks = Object.entries(BASE_COLORS).map(([name, color]) => buildScaleBlock(name, color))

    return [
        '// 此文件由 scripts/generate-theme.mjs 自动生成，请勿手动修改。',
        '// 基色配置见 scripts/generate-theme.mjs 的 BASE_COLORS，修改后运行 gen:theme 重新生成。',
        ':root {',
        blocks.join('\n\n'),
        '}',
        '',
    ].join('\n')
}

const content = buildScss()
const existing = existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : null

if (existing === content) {
    console.log('[gen:theme] 色板未变化，跳过写入')
    process.exit(0)
}

mkdirSync(dirname(targetPath), { recursive: true })
writeFileSync(targetPath, content)
console.log(`[gen:theme] 已生成 ${relative(rootDir, targetPath)}`)
