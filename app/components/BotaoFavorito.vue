<script setup lang="ts">
// Coração de favoritar
interface Props {
  ativo?: boolean
  rotulo?: string
}

const props = withDefaults(defineProps<Props>(), { rotulo: 'Favoritar' })
const emit = defineEmits<{ alternar: [] }>()
</script>

<template>
  <button
    type="button"
    class="coracao"
    :class="{ 'coracao--ativo': ativo }"
    :aria-pressed="ativo"
    :aria-label="rotulo"
    :title="rotulo"
    @click.stop.prevent="emit('alternar')"
  >
    <AppIcone name="coracao" :size="18" :preenchido="ativo" />
  </button>
</template>

<style scoped lang="scss">
.coracao {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 253, 248, 0.92);
  color: $tinta-600;
  box-shadow: 0 4px 12px rgba(51, 35, 26, 0.18);
  transition: transform 0.15s ease, color 0.15s ease, background 0.15s ease;

  &:hover {
    transform: scale(1.08);
    color: $vermelho-500;
  }

  svg {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &--ativo {
    color: $vermelho-500;

    svg {
      transform: scale(1.15);
      animation: heart-pop 0.35s ease;
    }
  }
}

@keyframes heart-pop {
  0% { transform: scale(0.6); }
  60% { transform: scale(1.35); }
  100% { transform: scale(1.15); }
}
</style>
