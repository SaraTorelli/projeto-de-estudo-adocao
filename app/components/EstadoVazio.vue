<script setup lang="ts">
// Estado vazio reutilizado (busca sem resultado, abas sem favoritos etc.)
interface Props {
  titulo: string
  texto?: string
}

defineProps<Props>()
</script>

<template>
  <div class="vazio">
    <div class="vazio__icone"><AppIcone name="pata" :size="34" /></div>
    <h3>{{ titulo }}</h3>
    <p v-if="texto">{{ texto }}</p>
    <div class="vazio__acoes"><slot /></div>
  </div>
</template>

<style scoped lang="scss">
.vazio {
  grid-column: 1 / -1;
  text-align: center;
  padding: 48px 24px;
  background: rgba(255, 253, 248, 0.7);
  border: 1.5px dashed $linha-300;
  border-radius: $raio-grande;

  &__icone {
    width: 72px;
    height: 72px;
    margin: 0 auto 16px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(176, 96, 48, 0.1);
    color: $terracota-500;
  }

  h3 {
    font-size: 1.3rem;
  }

  p {
    max-width: 420px;
    margin: 10px auto 0;
    font-size: 0.92rem;
  }

  &__acoes {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 12px;
  }
}
</style>
