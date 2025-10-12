# MynaUI Icons Vue

Beautifully crafted open source icons from [Myna UI](https://mynaui.com/icons).

## Install
```sh
npm i -S mynaui-icons-vue
```

or

```sh
bun i mynaui-icons-vue
```

or

```sh
yarn add mynaui-icons-vue
```

## Usage

```vue
<template>
    <button class="btn btn-primary">
        <IconAArrowDown size="25" />
        Icon Btn
    </button>
</template>
<script setup lang="ts">
    import { IconAArrowDown } from 'mynaui-icons-vue';
</script>
```

### Props

| name     | type              | default     |
| -------- |-------------------|-------------|
| `size`   | Number  \| String | 24           |
| `stroke` | Number  \| String | 1.5          |
| `color`  | String            | currentColor |