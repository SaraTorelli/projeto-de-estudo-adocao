<template>
  <div class="estrutura-app">
    <AppTopo />
    <main id="conteudo" class="principal-app">
      <slot />
    </main>
    <AppRodape />
  </div>
</template>

<style scoped lang="scss">
.estrutura-app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-top: $altura-topo;
}

.principal-app {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
