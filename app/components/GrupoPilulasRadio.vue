<script setup lang="ts">
//seleção de forma de contato no passo final
interface Option {
  valor: string
  rotulo: string
  icone?: string
}

interface Props {
  modelValue: string
  rotulo: string
  opcoes: Option[]
  required?: boolean
}

defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [valor: string] }>()
</script>

<template>
  <div class="pilulas-radio">
    <span class="pilulas-radio__rotulo">{{ rotulo }} <em v-if="required">*</em></span>
    <div class="pilulas-radio__linha" role="radiogroup">
      <button
        v-for="opt in opcoes"
        :key="opt.valor"
        type="button"
        class="pilula"
        :class="{ 'pilula--ativo': modelValue === opt.valor }"
        role="radio"
        :aria-checked="modelValue === opt.valor"
        @click="emit('update:modelValue', opt.valor)"
      >
        <span class="pilula__bolinha" />
        <AppIcone v-if="opt.icone" :name="opt.icone as any" :size="15" />
        {{ opt.rotulo }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pilulas-radio {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__rotulo {
    @include texto-rotulo;
  }
}

.pilulas-radio__linha {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pilula {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: $raio-pill;
  border: 1.5px solid $linha-300;
  background: $creme-50;
  font: 600 0.85rem/1 $fonte-sans;
  color: $tinta-700;
  transition: all 0.15s ease;

  &:hover {
    border-color: $marrom-500;
  }

  &__bolinha {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid $linha-300;
    display: grid;
    place-items: center;

    &::after {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: transparent;
      transition: background 0.15s ease;
    }
  }

  &--ativo {
    border-color: $marrom-700;
    color: $marrom-900;

    .pilula__bolinha {
      border-color: $marrom-700;

      &::after {
        background: $marrom-700;
      }
    }
  }
}
</style>
