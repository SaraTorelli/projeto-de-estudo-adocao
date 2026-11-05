<script setup lang="ts">
// Input de formulário com rótulo, marcador de obrigatório e contador opcional
interface Props {
  modelValue: string
  rotulo?: string
  type?: string
  placeholder?: string
  required?: boolean
  counter?: boolean
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), { type: 'text' })
const emit = defineEmits<{ 'update:modelValue': [valor: string] }>()

const id = useId()
</script>

<template>
  <div class="campo">
    <label v-if="rotulo" :for="id" class="campo__rotulo">
      {{ rotulo }} <em v-if="required">*</em>
    </label>
    <input
      :id="id"
      :type="type"
      class="campo__entrada"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="counter && maxLength" class="campo__contador">{{ modelValue.length }}/{{ maxLength }}</span>
  </div>
</template>

<style scoped lang="scss">
.campo {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__rotulo {
    @include texto-rotulo;
  }

  &__entrada {
    @include superficie-campo;
  }

  &__contador {
    position: absolute;
    right: 4px;
    bottom: -18px;
    font-size: 0.72rem;
    color: $tinta-400;
  }
}
</style>
