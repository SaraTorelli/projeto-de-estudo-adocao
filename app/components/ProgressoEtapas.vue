<script setup lang="ts">
// Progresso do formulário de adoção em 4 etapas 
interface Step {
  titulo: string
  dica: string
}

defineProps<{ etapas: Step[]; atual: number }>()
</script>

<template>
  <ol class="passos">
    <li
      v-for="(step, i) in etapas"
      :key="step.titulo"
      class="passo"
      :class="{ 'passo--feito': i < atual - 1, 'passo--atual': i === atual - 1 }"
    >
      <span class="passo__bola">
        <AppIcone v-if="i < atual - 1" name="confirmar" :size="13" />
        <template v-else>{{ i + 1 }}</template>
      </span>
      <span class="passo__texto">
        <strong>{{ step.titulo }}</strong>
        <small>{{ step.dica }}</small>
      </span>
      <span v-if="i < etapas.length - 1" class="passo__linha" aria-hidden="true" />
    </li>
  </ol>
</template>

<style scoped lang="scss">
.passos {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  overflow-x: auto;

  @media (max-width: 780px) {
    flex-direction: column;
    gap: 14px;
  }
}

.passo {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 11px;
  position: relative;
  min-width: 0;

  &__bola {
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font: 700 0.95rem/1 $fonte-sans;
    background: $creme-200;
    color: $tinta-400;
    transition: all 0.2s ease;
  }

  &__texto {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    min-width: 0;

    strong {
      font: 600 0.92rem/1.25 $fonte-sans;
      color: $tinta-400;
      white-space: nowrap;
    }

    small {
      font-size: 0.74rem;
      color: $tinta-400;
    }
  }

  &--atual &__bola {
    background: $marrom-700;
    color: $creme-50;
    box-shadow: 0 0 0 5px rgba(95, 55, 34, 0.12);
  }

  &--atual &__texto strong {
    color: $marrom-900;
  }

  &--feito &__bola {
    background: $marrom-700;
    color: $creme-50;
  }

  &--feito &__texto strong {
    color: $marrom-700;
  }

  &__linha {
    flex: 1;
    height: 1.5px;
    background: $linha-300;
    margin: 0 14px;
    min-width: 24px;
  }

  &--feito &__linha {
    background: $marrom-700;
  }

  &:last-child {
    flex: 0 0 auto;
  }
}
</style>
