import { create } from 'zustand'

interface EngineParams {
  rpm: number
  fuelMix: number // 0-100
  drs: boolean
  boost: number // 0-100
}

interface UIState {
  // Navigation
  currentSection: string
  isMenuOpen: boolean
  
  // Theme
  theme: 'dark' | 'light'
  
  // Engine widget
  engineParams: EngineParams
  isEngineWidgetOpen: boolean
  
  // Gallery
  gallerySortBy: 'date'
  galleryFilter: string | null
  
  // Interactions
  clickedElements: Set<string>
  hoveredElements: Set<string>
  
  // Actions
  setCurrentSection: (section: string) => void
  toggleMenu: () => void
  toggleTheme: () => void
  setTheme: (theme: 'dark' | 'light') => void
  updateEngineParams: (params: Partial<EngineParams>) => void
  toggleEngineWidget: () => void
  setGallerySort: (sort: typeof gallerySortBy) => void
  setGalleryFilter: (filter: string | null) => void
  registerClick: (elementId: string) => void
  registerHover: (elementId: string, isHovering: boolean) => void
}

export const useStore = create<UIState>((set, get) => {
  return {
    currentSection: 'home',
    isMenuOpen: false,
    theme: 'dark', // Default, will be set by ThemeProvider
    engineParams: {
      rpm: 5000,
      fuelMix: 50,
      drs: false,
      boost: 0,
    },
    isEngineWidgetOpen: false,
    gallerySortBy: 'date',
    galleryFilter: null,
    clickedElements: new Set(),
    hoveredElements: new Set(),
    
    setCurrentSection: (section) => set({ currentSection: section }),
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    toggleTheme: () => {
      const newTheme = get().theme === 'dark' ? 'light' : 'dark'
      set({ theme: newTheme })
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
    },
    setTheme: (theme) => {
      set({ theme })
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme)
        document.documentElement.classList.toggle('light', theme === 'light')
        document.documentElement.classList.toggle('dark', theme === 'dark')
      }
    },
    updateEngineParams: (params) =>
      set((state) => ({
        engineParams: { ...state.engineParams, ...params },
      })),
    toggleEngineWidget: () =>
      set((state) => ({ isEngineWidgetOpen: !state.isEngineWidgetOpen })),
    setGallerySort: (sort) => set({ gallerySortBy: sort }),
    setGalleryFilter: (filter) => set({ galleryFilter: filter }),
    registerClick: (elementId) =>
      set((state) => {
        const newSet = new Set(state.clickedElements)
        newSet.add(elementId)
        return { clickedElements: newSet }
      }),
    registerHover: (elementId, isHovering) =>
      set((state) => {
        const newSet = new Set(state.hoveredElements)
        if (isHovering) {
          newSet.add(elementId)
        } else {
          newSet.delete(elementId)
        }
        return { hoveredElements: newSet }
      }),
  }
})

