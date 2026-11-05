<script setup lang="ts">
// Página de resultados: compõe busca, filtros de categoria/porte, abas de
// status e paginação, isolada da home, mas compartilhando a mesma store
useHead({ title: 'Nossos Cães | Patinhas que Transformam' })

const { store, carregando, erro } = useRacas()

const fraseHero = 'Cada um tem uma história.<br />Todos merecem um final feliz.'

// contador da pesquisa
const contadorTexto = computed(() =>
  store.totalFiltrado === 1 ? '1 cão encontrado' : `${store.totalFiltrado} cães encontrados`
)
</script>

<template>
  <div>
    <!-- Hero da listagem ) -->
    <section class="destaque-listagem">
      <div class="container destaque-listagem__grade">
        <div>
          <p class="script" v-html="fraseHero" />
          <h1>Nossos Cães</h1>
          <p class="destaque-listagem__frase">
            Conheça os cães que esperam por um lar. Cada um deles é um especial e único amor
            pronto para transformar a sua vida.
          </p>
        </div>
        <div class="destaque-listagem__midia">
          <img src="/images/hero-listing.jpg" alt="Cão sorrindo esperando uma família" />
          <span>Uma dessas patinhas<br />é o seu match <AppIcone name="coracao" :size="13" preenchido /></span>
        </div>
      </div>
    </section>

    <section class="resultados container" aria-label="Resultados da busca">
      <p v-if="!carregando && !erro" class="resultados__status" role="status">
        <strong>{{ contadorTexto }}</strong>
        <template v-if="store.termoBusca"> para a busca “{{ store.termoBusca }}”</template>
      </p>

      <BarraFiltros />

      <CarregandoPata v-if="carregando" />

      <template v-else-if="erro">
        <EstadoVazio titulo="Tivemos um problema com a API" :texto="store.erroRequisicao">
          <BaseBotao @click="store.buscarRacas(true)">
            <AppIcone name="rotacionar" :size="14" /> Tentar novamente
          </BaseBotao>
        </EstadoVazio>
      </template>

      <template v-else>
        <GradeRacas :racas="store.racasPaginadas" />

        <EstadoVazio
          v-if="store.totalFiltrado === 0"
          :titulo="store.termoBusca ? 'Nenhum cão encontrado...' : 'Nada por aqui (ainda!)'"
          :texto="store.abaStatus === 'favoritos'
            ? 'Você ainda não favoritou nenhum cão. Toque no coração dos cards para criar sua lista.'
            : store.abaStatus === 'adotados'
              ? 'Nenhuma adoção registrada até o momento. Que tal começar agora?'
              : 'Não encontramos cães com esses filtros. Tente ajustar a busca.'"
        >
          <BaseBotao variante="suave" @click="store.limparFiltros()">
            <AppIcone name="rotacionar" :size="14" /> Limpar filtros
          </BaseBotao>
        </EstadoVazio>

        <AppPaginacao
          v-else
          :pagina="store.pagina"
          :itens-por-pagina="store.itensPorPagina"
          :total="store.totalFiltrado"
          @update:pagina="store.definirPagina($event)"
          @update:itens-por-pagina="store.definirItensPorPagina($event)"
        />
      </template>
    </section>

    <!-- CTA final -->
    <section class="faixa-vazia">
      <div class="container faixa-vazia__grade">
        <img src="/images/cta-notfound.jpg" alt="Beagle deitado tranquilamente no chão" />
        <div>
          <p class="script">Não achou o seu novo amigo?</p>
          <h2>Novos cães chegam<br />para adoção toda semana.</h2>
          <p class="faixa-vazia__texto">
            Enquanto isso, saiba como funciona o processo de adoção e se prepare para receber
            esse amor.
          </p>
          <BaseBotao to="/como-adotar" size="grande">
            <AppIcone name="pata" :size="16" /> Entenda o processo
          </BaseBotao>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.script {
  @include texto-manuscrito(clamp(1.4rem, 2.4vw, 1.8rem));
}

.destaque-listagem {
  padding: 46px 0 34px;
  @include marca-agua-patas(0.05);

  &__grade {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 44px;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  h1 {
    font-size: clamp(2.2rem, 4.5vw, 3.2rem);
    font-weight: 800;
    margin: 8px 0 12px;
  }

  &__frase {
    max-width: 460px;
  }

  &__midia {
    position: relative;

    img {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      border-radius: $raio-extra;
      box-shadow: $sombra-2;
    }

    span {
      position: absolute;
      right: 16px;
      bottom: 16px;
      background: rgba(253, 250, 244, 0.94);
      color: $terracota-600;
      font-family: $fonte-script;
      font-size: 1.2rem;
      line-height: 1.15;
      padding: 8px 16px;
      border-radius: $raio-pill;
      box-shadow: $sombra-1;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }
}

.resultados {
  padding-bottom: 56px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__status {
    font-size: 0.88rem;
    color: $tinta-600;
    text-align: right;

    strong {
      color: $terracota-600;
      font-weight: 700;
    }
  }
}

.faixa-vazia {
  background: $creme-150;
  border-top: 1px solid $linha-200;
  padding: 64px 0;

  &__grade {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: $raio-extra;
      box-shadow: $sombra-2;
    }
  }

  h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    margin: 6px 0 12px;
  }

  &__texto {
    margin-bottom: 22px;
    max-width: 440px;
  }
}
</style>
