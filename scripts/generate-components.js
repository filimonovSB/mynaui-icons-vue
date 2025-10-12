import fs from 'fs-extra'
import path from 'node:path'
import empty from 'empty-lite'
import { fileURLToPath } from 'node:url'
// const fs = require('fs-extra');
// const path = require('node:path');
// const empty = require('empty-lite');

function getDirname(importMetaUrl) {
    return path.dirname(fileURLToPath(importMetaUrl));
}

// const icons = require('./icons')
import icons from './icons.js'

// console.log(getDirname(import.meta.url))

// process.exit(1)
const __dirname = getDirname(import.meta.url)
const iconsMeta = fs.readJsonSync(path.join(__dirname, './meta.json'))
// console.log(icons)

const baseComponentTemplate = (iconPath) => `
<script setup lang="ts">
    import { computed, defineAsyncComponent } from 'vue'
    const IconSvg = defineAsyncComponent(() => import('../../IconSvg.vue'))

    interface Props {
      size?: number | string
      color?: string
    }

    const props = withDefaults(defineProps<Props>(), {
      size: 12,
      color: undefined
    })
</script>
<template>
    <IconSvg :size="size" :color="color">
        ${iconPath}
    </IconSvg>
</template>
`

// const baseComponentTemplate = (iconPath) => `
//     import { computed, defineAsyncComponent } from 'vue'
//     const IconSvg = defineAsyncComponent(() => import('../../IconSvg.vue'))
//
//     export const AArrowDown = defineComponent({
//       name: 'AArrowDown',
//       setup() {
//         return () => (
//           <IconSvg :size="size" :color="color">${iconPath}</IconSvg>
//         );
//       }
//     });
// `

let iconComponents = []
const iconsDir = path.join(__dirname, '../src/components/icons')
fs.ensureDirSync(iconsDir)

// Генерируем файлы компонентов
icons.forEach(iconName => {

    if (empty(iconsMeta[iconName])) {
        return
    }

    const componentName = iconName.split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')

    if (iconsMeta[iconName]?.regular) {
        fs.writeFileSync(
            path.join(iconsDir, `${componentName}.vue`),
            baseComponentTemplate(iconsMeta[iconName]?.regular)
        )
        iconComponents.push(`${componentName}`)
    }

    if (iconsMeta[iconName]?.solid) {
        fs.writeFileSync(
            path.join(iconsDir, `${componentName}Solid.vue`),
            baseComponentTemplate(iconsMeta[iconName]?.solid)
        )
        iconComponents.push(`${componentName}Solid`)
    }

    // const fileName = `${componentName}.vue`;
    // const filePath = path.join(iconsDir, fileName);
    //
    // fs.writeFileSync(filePath, baseComponentTemplate(iconName));
})

// Генерируем индексный файл для иконок
const indexContent = iconComponents.map(iconName => {
    // const componentName = iconName.split('-')
    //     .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    //     .join('');

    return `export { default as ${iconName} } from './icons/${iconName}.vue'`
}).join('\n')

fs.writeFileSync(path.join(__dirname, '../src/components', 'index.ts'), indexContent)

console.log(`Generated ${icons.length} icon components`);
