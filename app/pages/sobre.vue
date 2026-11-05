<script setup lang="ts">
// Sobre nós: história, valores, números e como fazemos a diferença
useHead({ title: 'Sobre nós | Patinhas que Transformam' })

const VALORES = [
  { icone: 'pata', titulo: 'Respeito', texto: 'Valorizamos cada vida e suas individualidades.' },
  { icone: 'coracao', titulo: 'Acolhimento', texto: 'Oferecemos cuidado, carinho e um novo começo.' },
  { icone: 'casa', titulo: 'Responsabilidade', texto: 'Promovemos a adoção consciente e o bem-estar animal.' },
  { icone: 'escudo', titulo: 'Transparência', texto: 'Mantemos um relacionamento aberto e honesto com nossa comunidade.' },
] as const

const NUMEROS = [
  { icone: 'pata', valor: '250+', rotulo: 'adoções realizadas' },
  { icone: 'pata', valor: '120', rotulo: 'cães resgatados' },
  { icone: 'pessoas', valor: '40', rotulo: 'voluntários ativos' },
  { icone: 'coracao', valor: '98%', rotulo: 'lares acompanhados' },
] as const

const DIFERENCA = [
  { titulo: 'Resgatamos', texto: 'Atuamos no resgate de cães em situação de abandono ou maus-tratos e vulnerabilidade.', image: '/images/diferenca-1.jpg' },
  { titulo: 'Cuidamos', texto: 'Oferecemos atendimento veterinário, alimentação, abrigo e muito carinho para que se recuperem física e emocionalmente.', image: '/images/diferenca-2.jpg' },
  { titulo: 'Conectamos', texto: 'Encontramos famílias amorosas e responsáveis, acompanhando de perto a adaptação e o bem-estar de cada cão adotado.', image: '/images/diferenca-3.jpg' },
] as const
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="destaque-sobre">
      <div class="container destaque-sobre__grade">
        <div>
          <p class="script">Conheça nossa história <AppIcone name="pata" :size="17" /></p>
          <h1>Cuidamos de cada pata com amor, respeito e propósito.</h1>
          <p class="destaque-sobre__frase">
            Somos um projeto dedicado a conectar cães resgatados com famílias amorosas,
            transformando vidas e construindo um futuro mais justo e cheio de oportunidades para eles.
          </p>
          <div class="destaque-sobre__acoes">
            <BaseBotao to="/resultados" size="grande">
              <AppIcone name="pata" :size="16" /> Conheça nossos cães
            </BaseBotao>
            <BaseBotao href="mailto:contato@patinhasquetransformam.org" variante="contorno" size="grande">
              <AppIcone name="coracao" :size="15" /> Seja voluntário
            </BaseBotao>
          </div>
        </div>
        <div class="destaque-sobre__midia">
          <img src="/images/sobre-hero.jpg" alt="Cão marrom sorrindo deitado na grama" />
          <span>Mais vidas felizes<br />por aqui <AppIcone name="coracao" :size="13" preenchido /></span>
        </div>
      </div>
    </section>

    <!-- História -->
    <section class="historia container">
      <div class="historia__midia">
        <img src="/images/sobre-historia.jpg" alt="Voluntária abraçando um cão resgatado" />
        <span>Cães também transformam pessoas</span>
      </div>
      <div>
        <span class="sobretitulo">Sobre nós</span>
        <h2>Nossa história</h2>
        <p>
          O Patinhas que Transformam nasceu do amor pelos animais e da vontade de fazer a
          diferença. Somos um projeto independente que atua no resgate, cuidado e na busca por
          lares responsáveis para cães em situação de abandono e vulnerabilidade.
        </p>
        <p>
          Acreditamos que cada cão merece uma segunda chance. Por isso, trabalhamos com
          dedicação para oferecer cuidados veterinários, acolhimento e todo o suporte necessário
          até que encontrem uma família amorosa, onde possam viver com dignidade, segurança e
          muito amor.
        </p>
      </div>
    </section>

    <!-- Valores -->
    <section class="valores container">
      <TituloSecao sobretitulo="O que nos guia" titulo="Nossos valores" />
      <div class="valores__grade">
        <div v-for="valor in VALORES" :key="valor.titulo" class="valor">
          <span class="valor__icone"><AppIcone :name="valor.icone as any" :size="22" /></span>
          <strong>{{ valor.titulo }}</strong>
          <p>{{ valor.texto }}</p>
        </div>
      </div>
    </section>

    <!-- Números -->
    <section class="numeros">
      <div class="container">
        <TituloSecao sobretitulo="Nosso impacto" titulo="Números que transformam vidas" />
        <div class="numeros__grade">
          <div v-for="stat in NUMEROS" :key="stat.rotulo" class="numero">
            <span class="numero__icone"><AppIcone :name="stat.icone as any" :size="20" /></span>
            <strong>{{ stat.valor }}</strong>
            <span class="numero__rotulo">{{ stat.rotulo }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Diferença -->
    <section class="diferencas container">
      <TituloSecao sobretitulo="Como trabalhamos" titulo="Como fazemos a diferença" />
      <div class="diferencas__grade">
        <article v-for="(item, i) in DIFERENCA" :key="item.titulo" class="cartao-diferencial">
          <div class="cartao-diferencial__midia">
            <img :src="item.image" :alt="`Voluntário ${item.titulo.toLowerCase()}`" loading="lazy" />
            <span class="cartao-diferencial__numero">{{ i + 1 }}</span>
          </div>
          <div>
            <h3>{{ item.titulo }}</h3>
            <p>{{ item.texto }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- CTA -->
    <section class="faixa-acao">
      <div class="container faixa-acao__grade">
        <img src="/images/cta-notfound.jpg" alt="Beagle deitado relaxado no chão de casa" />
        <div>
          <p class="script">Juntos podemos ir mais longe</p>
          <h2>Faça parte dessa transformação.</h2>
          <p class="faixa-acao__texto">
            Seja adotando, sendo voluntário ou fazendo uma doação, você ajuda a construir um
            futuro mais feliz para muitos cães.
          </p>
          <div class="faixa-acao__acoes">
            <BaseBotao to="/resultados" size="grande"><AppIcone name="pata" :size="16" /> Quero adotar</BaseBotao>
            <BaseBotao to="/quero-ajudar" variante="contorno" size="grande"><AppIcone name="coracao" :size="15" /> Quero ajudar</BaseBotao>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/paginas/sobre';
</style>
