<script setup lang="ts">
// Grid responsivo da listagem  exibe esqueletos durante o carregamento
import type { Raca } from '~/tipos/api'

defineProps<{ racas: Raca[]; carregando?: boolean; esqueletos?: number }>()
</script>

<template>
  <div class="grade">
    <template v-if="carregando">
      <CardEsqueleto v-for="n in esqueletos ?? 8" :key="n" />
    </template>
    <template v-else>
      <CardRaca v-for="raca in racas" :key="raca.id" :raca="raca" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.grade {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
}
</style>
