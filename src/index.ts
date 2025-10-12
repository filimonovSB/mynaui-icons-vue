// import { App } from 'vue'
// import IconSvg from './IconSvg.vue'
// import IconFont from './IconFont.vue'
// import {icons} from './icons'

import * as components from './components'

// Реэкспорт всех иконок
export * from './components'

const VueMynauiIcons = {
  install(app) {
    for (const componentKey in components) {
      app.component(componentKey, components[componentKey])
    }
  }
}

export default VueMynauiIcons

// export { IconSvg }

// Типы для автоподсказок
export interface VueMynauiIcons {
  [key: string]: any
}