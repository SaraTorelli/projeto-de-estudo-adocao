<script setup lang="ts">
// Card de citação com texto em script
interface Props {
  citacao: string
}

defineProps<Props>()
</script>

<template>
  <article class="citacao">
    <AppIcone name="coracao" :size="26" preenchido class="citacao__icone" />
    <p class="citacao__texto">{{ citacao }}</p>
    <p class="citacao__corpo"><slot /></p>
  </article>
</template>

<style scoped lang="scss">
.citacao {
  background: linear-gradient(150deg, rgba(176, 96, 48, 0.12), rgba(176, 96, 48, 0.04));
  border: 1px solid rgba(176, 96, 48, 0.25);
  border-radius: $raio-grande;
  padding: 22px;

  &__icone {
    color: $terracota-500;
    margin-bottom: 8px;
  }

  &__texto {
    font-family: $fonte-script;
    font-size: 1.5rem;
    line-height: 1.2;
    color: $terracota-600;
  }

  &__corpo {
    margin-top: 10px;
    font-size: 0.86rem;
    line-height: 1.6;
    color: $tinta-600;
  }
}
</style>
