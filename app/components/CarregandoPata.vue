<script setup lang="ts">
// Estado de carregamento: pata quicando + texto amigável
interface Props {
  texto?: string
  compacto?: boolean
}

withDefaults(defineProps<Props>(), { texto: 'Buscando patinhas...' })
</script>

<template>
  <div class="carregando" :class="{ 'carregando--compacto': compacto }" role="status" :aria-label="texto">
    <div class="carregando__pata">
      <AppIcone name="pata" :size="compacto ? 26 : 40" />
    </div>
    <p v-if="!compacto">{{ texto }}</p>
  </div>
</template>

<style scoped lang="scss">
.carregando {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 72px 24px;
  color: $marrom-700;

  p {
    font-family: $fonte-script;
    font-size: 1.3rem;
    color: $terracota-500;
  }

  &__pata {
    animation: paw-hop 0.9s ease-in-out infinite;
    display: grid;
    place-items: center;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: rgba(176, 96, 48, 0.1);
  }

  &--compacto {
    flex-direction: row;
    gap: 10px;
    padding: 10px;

    & .carregando__pata {
      width: 40px;
      height: 40px;
    }
  }
}

@keyframes paw-hop {
  0%,
  100% {
    transform: translateY(0) rotate(-6deg);
  }
  50% {
    transform: translateY(-10px) rotate(6deg);
  }
}
</style>
