<script setup lang="ts">
// Card de cão
import type { Raca } from '~/tipos/api'

const props = defineProps<{ raca: Raca }>()
const store = useCaesStore()

const { rotuloPorte, rotuloVida, rotuloOrigem } = useAtributosRaca(() => props.raca)
const { resumo } = useFormatarTemperamento(() => props.raca.temperament)

const rotuloIdade = computed(() => rotuloIdadeCao(props.raca))
const rotuloSexo = computed(() => ROTULOS_SEXO[sexoDoCao(props.raca)])

const status = computed(() => store.statusDe(props.raca.id))
const photo = computed(() => props.raca.image?.url || '/images/placeholder.jpg')
</script>

<template>
  <article class="cartao" :class="{ 'cartao--adotado': status.adotado }">
    <div class="cartao__midia">
      <NuxtLink :to="`/raca/${raca.id}`" :aria-label="`Ver detalhes de ${raca.name}`">
        <img :src="photo" :alt="`Foto de um ${raca.name}`" loading="lazy" width="320" height="220" />
      </NuxtLink>

      <div class="cartao__selos">
        <SeloStatus v-if="status.adotado" variante="sucesso">
          <AppIcone name="casa" :size="12" /> Adotado
        </SeloStatus>
        <SeloStatus v-else-if="status.favoritado" variante="coracao">
          <AppIcone name="coracao" :size="12" preenchido /> Favorito
        </SeloStatus>
      </div>

      <BotaoFavorito
        class="cartao__coracao"
        :ativo="status.favoritado"
        :rotulo="status.favoritado ? 'Remover dos favoritos' : 'Favoritar'"
        @alternar="store.alternarFavorito(raca.id)"
      />
    </div>

    <div class="cartao__corpo">
      <NuxtLink :to="`/raca/${raca.id}`" class="cartao__nome">{{ raca.name }}</NuxtLink>

      <ul v-if="resumo.length" class="cartao__etiquetas">
        <li v-for="tag in resumo" :key="tag">{{ tag }}</li>
      </ul>

      <ul class="cartao__meta">
        <li><AppIcone name="regua" :size="13" /> {{ rotuloPorte }}</li>
        <li><AppIcone name="relogio" :size="13" /> {{ rotuloVida }}</li>
        <li><AppIcone name="faisca" :size="13" /> {{ rotuloIdade }}</li>
        <li><AppIcone name="pessoa" :size="13" /> {{ rotuloSexo }}</li>
        <li><AppIcone name="mapa" :size="13" /> {{ rotuloOrigem }}</li>
      </ul>

      <BaseBotao :to="`/raca/${raca.id}`" variante="contorno" size="pequeno" bloco class="cartao__acao">
        Saiba mais
        <AppIcone name="avancar" :size="14" />
      </BaseBotao>
    </div>
  </article>
</template>

<style scoped lang="scss">
.cartao {
  @include superficie-card;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $sombra-2;

    img {
      transform: scale(1.05);
    }
  }

  &--adotado {
    opacity: 0.92;
  }

  &__midia {
    position: relative;

    img {
      width: 100%;
      aspect-ratio: 32 / 22;
      object-fit: cover;
      transition: transform 0.35s ease;
    }
  }

  &__selos {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }

  &__coracao {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  &__corpo {
    padding: 16px 18px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  &__nome {
    font-family: $fonte-serif;
    font-weight: 700;
    font-size: 1.18rem;
    color: $marrom-900;
    width: fit-content;

    &:hover {
      color: $terracota-500;
    }
  }

  &__etiquetas {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0;
    padding: 0;

    li {
      background: $creme-200;
      color: $marrom-500;
      font: 600 0.72rem/1 $fonte-sans;
      padding: 5px 10px;
      border-radius: $raio-pill;
    }
  }

  &__meta {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin: 0;
    padding: 10px 0 0;
    border-top: 1px dashed $linha-200;

    li {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.76rem;
      font-weight: 500;
      color: $tinta-400;
    }
  }

  &__acao {
    margin-top: auto;
  }
}
</style>
