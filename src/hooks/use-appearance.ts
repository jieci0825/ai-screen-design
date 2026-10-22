import { createSharedComposable, useColorMode } from '@vueuse/core'
import { computed } from 'vue'

const themeOptions = {
    auto: {
        label: '跟随系统',
        icon: 'fluent:dark-theme-24-regular',
        next: 'light',
    },
    light: {
        label: '浅色',
        icon: 'akar-icons:sun',
        next: 'dark',
    },
    dark: {
        label: '深色',
        icon: 'ant-design:moon-outlined',
        next: 'auto',
    },
} as const

/** 共享主题状态、持久化用户选择，并在自动模式下跟随系统主题。 */
export const useAppearance = createSharedComposable(() => {
    const { store: theme } = useColorMode({
        storageKey: 'screen-design-color-scheme',
        modes: { light: '', dark: 'dark' },
    })
    const currentTheme = computed(() => themeOptions[theme.value] ?? themeOptions.auto)
    const themeIcon = computed(() => currentTheme.value.icon)
    const themeLabel = computed(
        () => `当前主题：${currentTheme.value.label}，点击切换为${themeOptions[currentTheme.value.next].label}`,
    )

    /** 按跟随系统、浅色、深色的顺序循环切换主题。 */
    function toggleTheme(): void {
        theme.value = currentTheme.value.next
    }

    return { themeIcon, themeLabel, toggleTheme }
})
