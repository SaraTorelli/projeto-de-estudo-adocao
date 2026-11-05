<script setup lang="ts">
// Home: hero institucional + vitrine com 4 cães disponíveis 
// busca, filtros e paginação ficam na página /resultados (Nossos Cães)
useHead({ title: 'Patinhas que Transformam | Adote um amigo para a vida' })

const { store, carregando } = useRacas()

const DIFERENCIAIS = [
  { icone: 'prancheta', titulo: 'Cuidado veterinário', texto: 'Todos os cães passam por avaliação clínica antes de irem para o novo lar.' },
  { icone: 'escudo', titulo: 'Vacinação em dia', texto: 'Vermifugados, vacinados e castrados conforme a idade de cada cão.' },
  { icone: 'casa', titulo: 'Apoio pós-adoção', texto: 'Acompanhamos a adaptação e orientamos a família nos primeiros meses.' },
] as const

const PASSOS = [
  { titulo: 'Conheça nossos cães', texto: 'Veja os perfis, histórias e personalidades disponíveis para adoção.' },
  { titulo: 'Entre em contato', texto: 'Preencha o formulário ou fale conosco para iniciar o processo.' },
  { titulo: 'Conversa e visita', texto: 'Entendemos se há compatibilidade e, quando possível, agendamos uma visita.' },
  { titulo: 'Adoção responsável', texto: 'Com tudo certo, finalizamos a adoção e acompanhamos os primeiros passos.' },
] as const
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="destaque">
      <div class="container destaque__grade">
        <div class="destaque__texto">
          <p class="script">Mais que um lar,<br />a chance de um recomeço.</p>
          <h1>Adote um amigo para a vida.</h1>
          <p class="destaque__frase">
            Cães resgatados, vacinados e prontos para encontrar um lar cheio de amor.
            Conheça cada história e descubra o novo amigo que muda a sua vida.
          </p>
          <div class="destaque__acoes">
            <BaseBotao to="/resultados" size="grande">
              Conheça nossos cães <AppIcone name="avancar" :size="16" />
            </BaseBotao>
            <BaseBotao to="/como-adotar" variante="contorno" size="grande">Como adotar</BaseBotao>
          </div>
        </div>
        <div class="destaque__midia">
          <img src="/images/hero-home.jpg" alt="Cão sorridente sentado em um campo verde" />
          <span class="destaque__nota">Novas histórias<br />começam aqui <AppIcone name="coracao" :size="14" preenchido /></span>
        </div>
      </div>
    </section>

    <!-- Diferenciais -->
    <section class="recursos container">
      <div v-for="feature in DIFERENCIAIS" :key="feature.titulo" class="recurso">
        <span class="recurso__icone"><AppIcone :name="feature.icone" :size="20" /></span>
        <div>
          <strong>{{ feature.titulo }}</strong>
          <p>{{ feature.texto }}</p>
        </div>
      </div>
      <div class="recurso recurso--destaque">
        <strong>Mais que um lar.<br />Para toda a vida.</strong>
        <NuxtLink to="/sobre" class="recurso__link">Conheça nossa história <AppIcone name="avancar" :size="14" /></NuxtLink>
      </div>
    </section>

    <!-- Vitrine: 4 cães disponíveis -->
    <section class="vitrine container" aria-label="Cães disponíveis para adoção">
      <TituloSecao
        sobretitulo="Encontre seu match"
        titulo="Conheça alguns dos nossos cães"
        descricao="Cada um deles tem uma história única e está esperando por uma família. Favorite quem encantou você."
      />

      <CarregandoPata v-if="carregando" />
      <GradeRacas v-else :racas="store.racasEmDestaque" />

      <div class="vitrine__cta">
        <BaseBotao to="/resultados" variante="contorno" size="grande">
          Ver todos os cães <AppIcone name="avancar" :size="16" />
        </BaseBotao>
      </div>
    </section>

    <!-- Como adotar -->
    <section class="faixa-adocao">
      <div class="container faixa-adocao__grade">
        <div class="faixa-adocao__midia">
          <img src="/images/cta-hand.jpg" alt="Mão humana segurando a patinha de um cão" />
          <span class="faixa-adocao__script">Eles confiam em você</span>
        </div>
        <div class="faixa-adocao__texto">
          <TituloSecao
            alinhamento="esquerda"
            sobretitulo="Como adotar"
            titulo="Um novo amigo em quatro passos"
            descricao="O processo é simples, seguro e feito com muito cuidado para garantir o bem-estar de todos os envolvidos."
          />
          <ol class="faixa-adocao__passos">
            <li v-for="(passo, i) in PASSOS" :key="passo.titulo">
              <span class="faixa-adocao__numero">{{ i + 1 }}</span>
              <div>
                <strong>{{ passo.titulo }}</strong>
                <p>{{ passo.texto }}</p>
              </div>
            </li>
          </ol>
          <BaseBotao to="/como-adotar" size="grande">
            Faça a diferença hoje <AppIcone name="avancar" :size="16" />
          </BaseBotao>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/paginas/inicio';
</style>
