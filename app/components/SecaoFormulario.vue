<script setup lang="ts">
// Bloco de seção do formulário
interface Props {
  icone?: string
  titulo: string
  dica?: string
  colunas?: 2 | 3
}

withDefaults(defineProps<Props>(), { colunas: 3 })
</script>

<template>
  <section class="secao-formulario">
    <header class="secao-formulario__cabecalho">
      <span v-if="icone" class="secao-formulario__icone"><AppIcone :name="icone as any" :size="18" /></span>
      <div>
        <h3>{{ titulo }}</h3>
        <p v-if="dica">{{ dica }}</p>
      </div>
    </header>
    <div class="secao-formulario__campos" :style="{ '--colunas': colunas }">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.secao-formulario {
  padding: 26px 0;
  border-top: 1px solid $linha-200;

  &:first-of-type {
    border-top: none;
    padding-top: 4px;
  }

  &__cabecalho {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  &__icone {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: $raio-medio;
    display: grid;
    place-items: center;
    background: rgba(176, 96, 48, 0.1);
    color: $terracota-500;
  }

  h3 {
    font-size: 1.22rem;
  }

  p {
    margin-top: 3px;
    font-size: 0.86rem;
  }

  &__campos {
    display: grid;
    grid-template-columns: repeat(var(--colunas, 3), minmax(0, 1fr));
    align-items: end;
    gap: 16px;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
