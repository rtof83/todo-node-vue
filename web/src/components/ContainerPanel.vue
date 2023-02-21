<template>
  <div class="container-main">
    <div class="container-main__panel">
      <h1>{{ title }}</h1>
        <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContainerPanel',

    props: {
      title: String
    }
  }
</script>

<style src="@/assets/scss/container-panel.scss" lang="scss" scoped />
