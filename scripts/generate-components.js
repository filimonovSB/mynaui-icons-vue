import fs from 'fs-extra'
import path from 'node:path'
import empty from 'empty-lite'
import { fileURLToPath } from 'node:url'

function getDirname(importMetaUrl) {
    return path.dirname(fileURLToPath(importMetaUrl));
}

import icons from './icons.js'
const __dirname = getDirname(import.meta.url)
const iconsMeta = fs.readJsonSync(path.join(__dirname, './meta.json'))

// base icon component template
const baseComponentTemplate = (iconPath, iconName) => `
import { defineComponent, h } from 'vue'
import type { IconProps } from '../../types'

export const ${iconName} = defineComponent({
  name: '${iconName}',
  props: {
      size: {
        type: [Number, String],
        default: 24
      },
      color: {
        type: String,
        default: 'currentColor'
      },
      stroke: {
        type: String,
        default: '1.5'
      }
    },
  setup(props: IconProps) {
    return () =>
        h('svg', {
            width: props.size,
            height: props.size,
            stroke: props.color,
            'stroke-width': props.stroke,
            viewBox: '0 0 24 24',
            fill: "none",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            xmlns: 'http://www.w3.org/2000/svg',
            innerHTML: "${iconPath}"
        })
  }
})

export default ${iconName}
`

let iconComponents = []
const iconsDir = path.join(__dirname, '../src/components/icons')
fs.ensureDirSync(iconsDir)

// generate components files файлы компонентов
icons.forEach(iconName => {

    if (empty(iconsMeta[iconName])) {
        return
    }

    const componentName = iconName.split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')

    if (iconsMeta[iconName]?.regular) {
        fs.writeFileSync(
            path.join(iconsDir, `${componentName}.ts`),
            baseComponentTemplate(iconsMeta[iconName]?.regular, `Icon${componentName}`)
        )
        iconComponents.push(`${componentName}`)
    }

    if (iconsMeta[iconName]?.solid) {
        fs.writeFileSync(
            path.join(iconsDir, `${componentName}Solid.ts`),
            baseComponentTemplate(iconsMeta[iconName]?.solid, `Icon${componentName}Solid`)
        )
        iconComponents.push(`${componentName}Solid`)
    }
})

// generate index file for icons
const indexContent = iconComponents.map(iconName => {
    return `export { Icon${iconName} } from './icons/${iconName}'`
}).join('\n')

fs.writeFileSync(path.join(__dirname, '../src/components', 'index.ts'), indexContent)

console.log(`Generated ${icons.length} icon components`);
