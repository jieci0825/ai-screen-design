import { onScopeDispose } from 'vue'

/** 跟随系统主题，并在根组件销毁时释放媒体查询监听。 */
export function useAppearance(): void {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    /** 将系统颜色偏好同步到文档根元素。 */
    const handleThemeChange = () => {
        document.documentElement.classList.toggle('dark', media.matches)
    }

    handleThemeChange()
    media.addEventListener('change', handleThemeChange)
    onScopeDispose(() => media.removeEventListener('change', handleThemeChange))
}
