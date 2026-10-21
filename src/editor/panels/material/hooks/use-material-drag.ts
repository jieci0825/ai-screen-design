import { h, onScopeDispose, render } from 'vue'

import MaterialDragPreview from '../components/material-drag-preview.vue'

import type { MaterialDefinition } from '@/materials'

/** 为原生物料拖拽生成独立预览，并管理临时挂载节点的生命周期。 */
export function useMaterialDrag() {
    let previewHost: HTMLDivElement | undefined
    let cleanupFrame: number | undefined

    /** 释放预览组件及其临时宿主，兼容取消拖拽和组件卸载。 */
    const clearDragPreview = () => {
        if (cleanupFrame !== undefined) {
            cancelAnimationFrame(cleanupFrame)
            cleanupFrame = undefined
        }

        if (previewHost) {
            render(null, previewHost)
            previewHost.remove()
            previewHost = undefined
        }
    }

    /** 同步渲染物料预览并设置鼠标居中的拖拽影像，保留原有 schema 数据协议。 */
    const handleDragStart = (event: DragEvent, material: MaterialDefinition) => {
        const dataTransfer = event.dataTransfer
        if (!dataTransfer) return

        clearDragPreview()
        dataTransfer.setData('schema', JSON.stringify(material.schema))
        dataTransfer.effectAllowed = 'copy'

        // 挂入可见视口以供浏览器截图；下一帧移除，避免页面遗留预览。
        previewHost = document.createElement('div')
        Object.assign(previewHost.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '2147483647',
            pointerEvents: 'none',
        })
        previewHost.setAttribute('aria-hidden', 'true')
        document.body.append(previewHost)
        render(h(MaterialDragPreview, { material }), previewHost)

        const previewElement = previewHost.firstElementChild as HTMLElement
        const { width, height } = previewElement.getBoundingClientRect()
        dataTransfer.setDragImage(previewElement, width / 2, height / 2)
        cleanupFrame = requestAnimationFrame(clearDragPreview)
    }

    onScopeDispose(clearDragPreview)

    return { handleDragStart, handleDragEnd: clearDragPreview }
}
