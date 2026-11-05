<script setup lang="ts">
// Botão único do portal
interface Props {
  variante?: 'primario' | 'contorno' | 'suave' | 'fantasma' | 'escuro'
  size?: 'pequeno' | 'medio' | 'grande'
  to?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  bloco?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variante: 'primario',
  size: 'medio',
  type: 'button',
})

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="to || href ? undefined : type"
    :disabled="disabled || undefined"
    class="botao"
    :class="[`botao--${variante}`, `botao--${size}`, { 'botao--bloco': bloco }]"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: $raio-pill;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease, color 0.15s ease;

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &--primario {
    background: $marrom-700;
    color: $creme-50;
    box-shadow: 0 10px 20px -10px rgba(95, 55, 34, 0.55);

    &:hover:not(:disabled) {
      background: $marrom-600;
      transform: translateY(-1px);
    }
  }

  &--escuro {
    background: $marrom-900;
    color: $creme-50;

    &:hover:not(:disabled) {
      background: #453024;
      transform: translateY(-1px);
    }
  }

  &--contorno {
    background: transparent;
    border: 1.5px solid rgba(95, 55, 34, 0.45);
    color: $marrom-700;

    &:hover:not(:disabled) {
      background: rgba(95, 55, 34, 0.07);
      border-color: $marrom-700;
    }
  }

  &--suave {
    background: $creme-200;
    color: $marrom-700;

    &:hover:not(:disabled) {
      background: $linha-300;
    }
  }

  &--fantasma {
    background: transparent;
    color: $marrom-700;

    &:hover:not(:disabled) {
      background: rgba(95, 55, 34, 0.08);
    }
  }

  &--pequeno {
    font-size: 0.82rem;
    padding: 9px 16px;
  }

  &--medio {
    font-size: 0.9rem;
    padding: 12px 22px;
  }

  &--grande {
    font-size: 1rem;
    padding: 15px 28px;
  }

  &--bloco {
    width: 100%;
  }
}
</style>
