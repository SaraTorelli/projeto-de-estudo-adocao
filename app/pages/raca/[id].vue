<script setup lang="ts">
// Detalhes da raça: dados completos, favoritar e adotar
// com tratamento para cão já adotado ou já favoritado
import type { ApiImagem } from '~/tipos/api'

const route = useRoute()
const store = useCaesStore()
const { $api } = useNuxtApp()

const { erro, erroMensagem } = useRacas()


const idNaRota = computed(() => String(route.params.id ?? ''))
const raca = computed(() => store.racas.find((b) => String(b.id) === idNaRota.value))

useHead(() => ({
  title: raca.value
    ? `${raca.value.name} | Patinhas que Transformam`
    : 'Detalhes do cão | Patinhas que Transformam',
}))

const atributos = useAtributosRaca(raca)
const { tags } = useFormatarTemperamento(() => raca.value?.temperament)
const status = computed(() => store.statusDe(raca.value ? raca.value.id : idNaRota.value))

// se a listagem terminou de carregar (com cães) e o id não existe, devolve 404
watchEffect(() => {
  if (store.estadoRequisicao === 'sucesso' && store.racas.length > 0 && !raca.value) {
    throw createError({ statusCode: 404, message: 'Cão não encontrado', fatal: true })
  }
})

// galeria extra só existe no consumo da API 
const galeria = ref<ApiImagem[]>([])
const galeriaCarregando = ref(false)
const fotoAtiva = ref('')

watch(
  raca,
  async (value) => {
    if (!value) return
    const fallback = value.image?.url || '/images/placeholder.jpg'
    fotoAtiva.value = fallback

    if (unref($api.modoDemo)) {
      galeria.value = []
      return
    }

    galeriaCarregando.value = true
    try {
      const images = await $api.buscarImagensRaca(value.id, 4)
      galeria.value = images.filter((img) => img.url)
    } catch {
      galeria.value = [] 
    } finally {
      galeriaCarregando.value = false
    }
  },
  { immediate: true }
)

function selecionarFoto(url: string) {
  fotoAtiva.value = url
}
</script>

<template>
  <div>
    <CarregandoPata v-if="store.estadoRequisicao === 'carregando' || store.estadoRequisicao === 'parado'" texto="Procurando a ficha do cãozinho..." />

    <!-- A listagem falhou (ex.: sem conexão nem dataset) — estado com retry -->
    <section v-else-if="erro" class="ficha container">
      <EstadoVazio
        titulo="Não foi possível carregar a ficha deste cãozinho"
        :texto="erroMensagem || 'Verifique sua conexão e tente novamente.'"
      >
        <BaseBotao variante="contorno" @click="store.buscarRacas(true)">
          <AppIcone name="rotacionar" :size="16" /> Tentar de novo
        </BaseBotao>
        <BaseBotao to="/resultados" variante="suave">Ver outros cães</BaseBotao>
      </EstadoVazio>
    </section>

    <!-- A listagem veio vazia (API sem raças)  -->
    <section v-else-if="store.estadoRequisicao === 'sucesso' && !raca" class="ficha container">
      <EstadoVazio
        titulo="Não encontramos este cãozinho"
        texto="A listagem veio vazia agora. Tente recarregar ou conhecer os outros cães disponíveis."
      >
        <BaseBotao variante="contorno" @click="store.buscarRacas(true)">
          <AppIcone name="rotacionar" :size="16" /> Tentar de novo
        </BaseBotao>
        <BaseBotao to="/resultados" variante="suave">Ver outros cães</BaseBotao>
      </EstadoVazio>
    </section>

    <section v-else-if="raca" class="ficha container">
      <!-- Trilha de navegação -->
      <nav class="ficha__migalhas" aria-label="Trilha de navegação">
        <NuxtLink to="/">Início</NuxtLink>
        <AppIcone name="seta-direita" :size="12" />
        <NuxtLink to="/resultados">Nossos Cães</NuxtLink>
        <AppIcone name="seta-direita" :size="12" />
        <span aria-current="page">{{ raca.name }}</span>
      </nav>

      <div class="ficha__grade">
        <!-- Galeria -->
        <div class="ficha__galeria">
          <img :src="fotoAtiva" :alt="`Foto de um ${raca.name}`" class="ficha__foto" />
          <div v-if="galeria.length" class="ficha__miniaturas">
            <button
              v-for="img in [{ url: raca.image?.url || '/images/placeholder.jpg' }, ...galeria]"
              :key="img.url"
              type="button"
              :class="{ 'selecionada': fotoAtiva === img.url }"
              @click="selecionarFoto(img.url)"
            >
              <img :src="img.url" alt="" loading="lazy" />
            </button>
          </div>
          <p v-if="galeriaCarregando" class="ficha__galeria-dica">Carregando mais fotos...</p>
        </div>

        <!-- Ficha -->
        <div class="ficha__info">
          <div class="ficha__pilulas">
            <SeloStatus variante="marrom"><AppIcone name="pata" :size="12" /> {{ atributos.rotuloGrupo.value }}</SeloStatus>
            <SeloStatus variante="neutro">
              <AppIcone name="mapa" :size="12" /> {{ atributos.rotuloOrigem.value }}
            </SeloStatus>
            <SeloStatus v-if="status.adotado" variante="sucesso">
              <AppIcone name="casa" :size="12" /> Adotado
            </SeloStatus>
            <SeloStatus v-else-if="status.favoritado" variante="coracao">
              <AppIcone name="coracao" :size="12" preenchido /> Nos seus favoritos
            </SeloStatus>
          </div>

          <h1>{{ raca.name }}</h1>
          <p class="ficha__descricao">{{ descricaoRaca(raca) }}</p>

          <ul v-if="tags.length" class="ficha__etiquetas">
            <li v-for="tag in tags" :key="tag">{{ tag }}</li>
          </ul>

          <dl class="ficha__atributos">
            <div>
              <dt><AppIcone name="regua" :size="14" /> Porte</dt>
              <dd>{{ atributos.rotuloPorte.value }}</dd>
            </div>
            <div>
              <dt><AppIcone name="relogio" :size="14" /> Expectativa de vida</dt>
              <dd>{{ atributos.rotuloVida.value }}</dd>
            </div>
            <div>
              <dt><AppIcone name="raio" :size="14" /> Nível de energia</dt>
              <dd>
                <span class="medidor" :data-level="atributos.energia.value"><i /><i /><i /></span>
                {{ atributos.rotuloEnergia.value }}
              </dd>
            </div>
            <div>
              <dt><AppIcone name="coracao" :size="14" /> Nível de afeto</dt>
              <dd>
                <span class="medidor" :data-level="atributos.afeto.value"><i /><i /><i /></span>
                {{ atributos.rotuloAfeto.value }}
              </dd>
            </div>
            <div>
              <dt><AppIcone name="lapis" :size="14" /> Altura</dt>
              <dd>{{ formatarMedida(raca.height?.metric, 'cm') }}</dd>
            </div>
            <div>
              <dt><AppIcone name="pata" :size="14" /> Peso</dt>
              <dd>{{ formatarMedida(raca.weight?.metric, 'kg') }}</dd>
            </div>
          </dl>

          <div class="ficha__acoes">
            <BaseBotao variante="contorno" size="grande" @click="store.alternarFavorito(raca.id)">
              <AppIcone name="coracao" :size="16" :preenchido="status.favoritado" />
              {{ status.favoritado ? 'Nos favoritos' : 'Favoritar' }}
            </BaseBotao>

            <!-- Cão adotado não entra em novo processo de adoção -->
            <BaseBotao v-if="status.adotado" variante="suave" size="grande" disabled>
              <AppIcone name="casa" :size="16" /> Já adotado
            </BaseBotao>
            <BaseBotao v-else :to="`/adotar/${raca.id}`" size="grande">
              <AppIcone name="coracao" :size="16" preenchido /> Quero adotar
            </BaseBotao>
          </div>

          <p v-if="status.adotado" class="ficha__nota-adotado">
            <AppIcone name="confirmar" :size="14" />
            {{ status.nomeTutor ? `${raca.name} foi adotado por ${status.nomeTutor}.` : `${raca.name} já encontrou uma família!` }}
            Que tal conhecer outros cães que também esperam um lar?
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/paginas/detalhe-raca';
</style>
