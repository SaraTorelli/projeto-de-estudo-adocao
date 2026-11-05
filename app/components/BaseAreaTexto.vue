<script setup lang="ts">
// Textarea com contador de caracteres (0/500) usado no formulário de adoção
interface Props {
  modelValue: string
  rotulo?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  rows?: number
}

const props = withDefaults(defineProps<Props>(), { maxLength: 500, rows: 3 })
const emit = defineEmits<{ 'update:modelValue': [valor: string] }>()

const id = useId()
</script>

<template>
  <div class="area-texto">
    <label v-if="rotulo" :for="id" class="area-texto__rotulo">
      {{ rotulo }} <em v-if="required">*</em>
    </label>
    <textarea
      :id="id"
      class="area-texto__entrada"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <span class="area-texto__contador">{{ modelValue.length }}/{{ maxLength }}</span>
  </div>
</template>

<style scoped lang="scss">
.area-texto {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__rotulo {
    @include texto-rotulo;
  }

  &__entrada {
    @include superficie-campo;
    resize: vertical;
    min-height: 84px;
  }

  &__contador {
    align-self: flex-end;
    font-size: 0.72rem;
    color: $tinta-400;
    margin-top: -2px;
  }
}
</style>
