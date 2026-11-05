<script setup lang="ts">
// Select estilizado com rótulo e placeholder  usado nos filtros e no formulário
interface Option {
  valor: string
  rotulo: string
}

interface Props {
  modelValue: string
  rotulo?: string
  opcoes: Option[]
  placeholder?: string
  required?: boolean
  compacto?: boolean
}

const props = withDefaults(defineProps<Props>(), { placeholder: 'Selecione' })
const emit = defineEmits<{ 'update:modelValue': [valor: string] }>()

const id = useId()
</script>

<template>
  <div class="selecao" :class="{ 'selecao--compacto': compacto }">
    <label v-if="rotulo" :for="id" class="selecao__rotulo">
      {{ rotulo }} <em v-if="required">*</em>
    </label>
    <div class="selecao__caixa">
      <select
        :id="id"
        class="selecao__campo"
        :value="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in opcoes" :key="opt.valor" :value="opt.valor">{{ opt.rotulo }}</option>
      </select>
      <AppIcone name="seta-baixo" :size="16" class="selecao__seta" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selecao {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__rotulo {
    @include texto-rotulo;
  }

  &__caixa {
    position: relative;
  }

  &__campo {
    @include superficie-campo;
    appearance: none;
    padding-right: 34px;
    cursor: pointer;
  }

  &__seta {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: $tinta-400;
    pointer-events: none;
  }

  &--compacto .selecao__campo {
    padding: 9px 32px 9px 12px;
    font-size: 0.85rem;
  }
}
</style>
