<script setup lang="ts">
// Header
const rolagado = ref(false)
const menuAberto = ref(false)
const route = useRoute()

const MENU = [
  { to: '/', rotulo: 'Início' },
  { to: '/resultados', rotulo: 'Nossos Cães' },
  { to: '/como-adotar', rotulo: 'Como Adotar' },
  { to: '/sobre', rotulo: 'Sobre' },
]

function aoRolar() {
  rolagado.value = window.scrollY > 8
}

onMounted(() => {
  aoRolar()
  window.addEventListener('scroll', aoRolar, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', aoRolar))

// fecha o menu mobile a cada troca de rota
watch(() => route.fullPath, () => (menuAberto.value = false))
</script>

<template>
  <header class="topo" :class="{ 'topo--rolado': rolagado || menuAberto }">
    <div class="topo__conteudo container">
      <NuxtLink to="/" class="topo__marca" aria-label="Patinhas que Transformam, início">
        <img src="/images/logo.png" alt="Patinhas que Transformam" width="144" height="45" />
      </NuxtLink>

      <nav class="topo__navegacao" aria-label="Navegação principal">
        <NuxtLink v-for="item in MENU" :key="item.to" :to="item.to" class="link-menu">
          {{ item.rotulo }}
        </NuxtLink>
      </nav>

      <div class="topo__acoes">
        <BaseBotao to="/quero-ajudar" size="pequeno" class="topo__acao">
          <AppIcone name="coracao" :size="14" />
          Quero Ajudar
        </BaseBotao>

        <button
          type="button"
          class="topo__botao-menu"
          :aria-expanded="menuAberto"
          aria-label="Abrir menu"
          @click="menuAberto = !menuAberto"
        >
          <AppIcone :name="menuAberto ? 'fechar' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <Transition name="suspenso">
      <nav v-if="menuAberto" class="topo__mobile" aria-label="Menu">
        <NuxtLink v-for="item in MENU" :key="item.to" :to="item.to" class="link-mobile">
          {{ item.rotulo }}
        </NuxtLink>
        <NuxtLink to="/quero-ajudar" class="link-mobile link-mobile--acao">
          <AppIcone name="coracao" :size="14" /> Quero Ajudar
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.topo {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  background: rgba(253, 250, 244, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &--rolado {
    border-color: $linha-200;
    box-shadow: 0 8px 24px -16px rgba(51, 35, 26, 0.25);
  }

  &__conteudo {
    height: $altura-topo;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  &__marca {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  &__navegacao {
    display: flex;
    gap: 26px;

    @media (max-width: 860px) {
      display: none;
    }
  }

  &__acoes {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__acao {
    @media (max-width: 560px) {
      display: none;
    }
  }

  &__botao-menu {
    display: none;
    color: $marrom-700;

    @media (max-width: 860px) {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: $raio-pequeno;
    }
  }
}

.link-menu {
  font: 600 0.9rem/1 $fonte-sans;
  color: $tinta-700;
  padding: 8px 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: $terracota-500;
  }

  &.router-link-active {
    color: $terracota-500;
    border-color: $terracota-500;
  }
}

.topo__mobile {
  display: none;
  flex-direction: column;
  padding: 8px 24px 20px;
  background: $creme-100;
  border-bottom: 1px solid $linha-200;

  @media (max-width: 860px) {
    display: flex;
  }
}

.link-mobile {
  padding: 13px 4px;
  font: 600 1rem/1 $fonte-sans;
  color: $tinta-700;
  border-bottom: 1px solid $linha-200;

  &:last-child {
    border-bottom: none;
  }

  &--acao {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $terracota-500;
  }
}

.suspenso-enter-active,
.suspenso-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.suspenso-enter-from,
.suspenso-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
