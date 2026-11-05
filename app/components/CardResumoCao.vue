<script setup lang="ts">
// Card lateral do formulário: foto do cão, status, metadados e resumo
import type { Raca } from '~/tipos/api'

const props = defineProps<{ raca: Raca }>()
const store = useCaesStore()

const { rotuloPorte, rotuloVida, rotuloOrigem, rotuloEnergia } = useAtributosRaca(() => props.raca)
const status = computed(() => store.statusDe(props.raca.id))
const photo = computed(() => props.raca.image?.url || '/images/placeholder.jpg')
</script>

<template>
  <article class="resumo">
    <div class="resumo__midia">
      <img :src="photo" :alt="`Foto de um ${raca.name}`" />
      <SeloStatus :variante="status.adotado ? 'sucesso' : 'marrom'" class="resumo__selo">
        {{ status.adotado ? 'Adotado' : 'Disponível' }}
      </SeloStatus>
      <BotaoFavorito
        class="resumo__coracao"
        :ativo="status.favoritado"
        :rotulo="status.favoritado ? 'Remover dos favoritos' : 'Favoritar'"
        @alternar="store.alternarFavorito(raca.id)"
      />
    </div>

    <div class="resumo__corpo">
      <h3>{{ raca.name }}</h3>
      <ul class="resumo__meta">
        <li><AppIcone name="regua" :size="14" /> {{ rotuloPorte }} porte</li>
        <li><AppIcone name="relogio" :size="14" /> {{ rotuloVida }}</li>
        <li><AppIcone name="mapa" :size="14" /> {{ rotuloOrigem }}</li>
        <li><AppIcone name="raio" :size="14" /> Energia {{ rotuloEnergia.toLowerCase() }}</li>
      </ul>
      <p class="resumo__texto">{{ descricaoRaca(raca) }}</p>
      <slot />
    </div>
  </article>
</template>

<style scoped lang="scss">
.resumo {
  @include superficie-card;
  overflow: hidden;

  &__midia {
    position: relative;

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  }

  &__selo {
    position: absolute;
    left: 14px;
    bottom: 14px;
  }

  &__coracao {
    position: absolute;
    top: 14px;
    right: 14px;
  }

  &__corpo {
    padding: 20px;
  }

  h3 {
    font-size: 1.55rem;
    font-style: italic;
  }

  &__meta {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    margin: 14px 0;
    padding: 0;

    li {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font: 600 0.8rem/1.3 $fonte-sans;
      color: $tinta-700;
    }
  }

  &__texto {
    font-size: 0.86rem;
    line-height: 1.65;
  }
}
</style>
