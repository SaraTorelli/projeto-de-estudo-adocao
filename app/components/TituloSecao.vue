<script setup lang="ts">
// Cabeçalho de seção padrão: sobretitulo em script, título serif e apoio
interface Props {
  sobretitulo?: string
  titulo: string
  descricao?: string
  alinhamento?: 'centro' | 'esquerda'
}

withDefaults(defineProps<Props>(), { alinhamento: 'centro' })
</script>

<template>
  <div class="cabecalho-secao" :class="{ 'cabecalho-secao--esquerda': alinhamento === 'esquerda' }">
    <span v-if="sobretitulo" class="sobretitulo">{{ sobretitulo }}</span>
    <h2>{{ titulo }}</h2>
    <p v-if="descricao">{{ descricao }}</p>
  </div>
</template>

<style scoped lang="scss">
.cabecalho-secao--esquerda {
  text-align: left;
  margin-inline: 0;
}
</style>
