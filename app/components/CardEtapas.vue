<script setup lang="ts">
// Card "O que acontece depois?"  etapas numeradas do processo de adoção
interface Step {
  titulo: string
  texto: string
}

defineProps<{ titulo: string; etapas: Step[] }>()
</script>

<template>
  <article class="etapas-card">
    <header>
      <span class="etapas-card__icone"><AppIcone name="arquivo" :size="20" /></span>
      <h3>{{ titulo }}</h3>
    </header>
    <p class="etapas-card__intro">
      <slot />
    </p>
    <ol>
      <li v-for="(step, i) in etapas" :key="step.titulo">
        <span class="etapas-card__numero">{{ i + 1 }}</span>
        <div>
          <strong>{{ step.titulo }}</strong>
          <p>{{ step.texto }}</p>
        </div>
      </li>
    </ol>
  </article>
</template>

<style scoped lang="scss">
.etapas-card {
  background: $creme-150;
  border: 1px solid $linha-200;
  border-radius: $raio-grande;
  padding: 22px;

  header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icone {
    width: 40px;
    height: 40px;
    border-radius: $raio-medio;
    display: grid;
    place-items: center;
    background: $marrom-700;
    color: $creme-50;
  }

  h3 {
    font-size: 1.15rem;
  }

  &__intro {
    margin: 10px 0 16px;
    font-size: 0.84rem;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  li {
    display: flex;
    gap: 13px;
    position: relative;
    &:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 13px;
      top: 32px;
      bottom: -18px;
      width: 1.5px;
      background: rgba(176, 96, 48, 0.3);
    }
  }

  &__numero {
    flex-shrink: 0;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: $terracota-500;
    color: $creme-50;
    font: 700 0.8rem/1 $fonte-sans;
  }

  strong {
    display: block;
    font: 700 0.9rem/1.3 $fonte-serif;
    color: $marrom-900;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.5;
    margin-top: 2px;
  }
}
</style>
