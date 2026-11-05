<script setup lang="ts">
// Selo de status reutilizado em cards, resumo e detalhes
interface Props {
  variante?: 'sucesso' | 'neutro' | 'coracao' | 'marrom'
}

withDefaults(defineProps<Props>(), { variante: 'sucesso' })
</script>

<template>
  <span class="selo" :class="`selo--${variante}`"><slot /></span>
</template>

<style scoped lang="scss">
.selo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: $raio-pill;
  font: 600 0.76rem/1.2 $fonte-sans;

  &--sucesso {
    background: $verde-100;
    color: $verde-700;
  }

  &--neutro {
    background: $creme-200;
    color: $tinta-600;
  }

  &--coracao {
    background: $vermelho-100;
    color: $vermelho-500;
  }

  &--marrom {
    background: rgba(95, 55, 34, 0.12);
    color: $marrom-700;
  }
}
</style>
