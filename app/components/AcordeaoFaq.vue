<script setup lang="ts">
//perguntas frequentes com transição de altura.
interface Faq {
  pergunta: string
  resposta: string
}

defineProps<{ itens: Faq[] }>()

// Nenhuma pergunta aberta inicialmente
const openIndex = ref<number | null>(null)

function alternar(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <div class="acordeao">
    <div v-for="(item, i) in itens" :key="item.pergunta" class="acordeao__item">
      <button
        type="button"
        class="acordeao__pergunta"
        :aria-expanded="openIndex === i"
        @click="alternar(i)"
      >
        {{ item.pergunta }}
        <span class="acordeao__icone" :class="{ 'acordeao__icone--aberto': openIndex === i }">
          <AppIcone name="seta-baixo" :size="16" />
        </span>
      </button>
      <Transition name="dobravel">
        <p v-if="openIndex === i" class="acordeao__resposta">{{ item.resposta }}</p>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.acordeao {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item {
    background: $creme-50;
    border: 1px solid $linha-200;
    border-radius: $raio-medio;
    overflow: hidden;
  }

  &__pergunta {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    text-align: left;
    padding: 15px 18px;
    font: 600 0.92rem/1.4 $fonte-sans;
    color: $marrom-900;

    &:hover {
      background: rgba(95, 55, 34, 0.04);
    }
  }

  &__icone {
    color: $terracota-500;
    transition: transform 0.2s ease;

    &--aberto {
      transform: rotate(180deg);
    }
  }

  &__resposta {
    padding: 0 18px 16px;
    font-size: 0.87rem;
    line-height: 1.65;
  }
}

.dobravel-enter-active,
.dobravel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dobravel-enter-from,
.dobravel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
