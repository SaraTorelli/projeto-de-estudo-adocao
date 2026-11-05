<script setup lang="ts">
// Checkbox com texto principal e nota de apoio (termos de responsabilidade)
interface Props {
  modelValue: boolean
  rotulo: string
  dica?: string
  required?: boolean
}

defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [valor: boolean] }>()

const id = useId()
</script>

<template>
  <label :for="id" class="caixa" :class="{ 'caixa--marcada': modelValue }">
    <input
      :id="id"
      type="checkbox"
      class="caixa__entrada"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="caixa__quadrado"><AppIcone name="confirmar" :size="12" /></span>
    <span class="caixa__texto">
      {{ rotulo }} <em v-if="required">*</em>
      <small v-if="dica">{{ dica }}</small>
    </span>
  </label>
</template>

<style scoped lang="scss">
.caixa {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
  cursor: pointer;
  padding: 4px 0;

  &__entrada {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &__quadrado {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1.5px solid $linha-300;
    background: $creme-50;
    display: grid;
    place-items: center;
    color: transparent;
    transition: all 0.15s ease;
    margin-top: 2px;
  }

  &--marcada &__quadrado,
  &__entrada:checked + &__quadrado {
    background: $marrom-700;
    border-color: $marrom-700;
    color: $creme-50;
  }

  &__entrada:focus-visible + &__quadrado {
    outline: 2px solid $terracota-500;
    outline-offset: 2px;
  }

  &__texto {
    font-size: 0.85rem;
    color: $tinta-700;
    line-height: 1.5;

    em {
      color: $vermelho-500;
      font-style: normal;
    }

    small {
      display: block;
      color: $tinta-400;
    }
  }
}
</style>
