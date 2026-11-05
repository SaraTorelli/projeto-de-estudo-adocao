<script setup lang="ts">
// Página de doações: PIX (com cópia da chave), cartão, doação presencial,
// impacto de cada valor e perguntas frequentes
useHead({ title: 'Quero Ajudar | Patinhas que Transformam' })

const CHAVE_PIX = 'contato@patinhasquetransformam.org'
const copiado = ref(false)

async function copiarChave() {
  try {
    await navigator.clipboard.writeText(CHAVE_PIX)
  } catch {
  }
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2600)
}

const FORMAS = [
  {
    icone: 'raio',
    titulo: 'Doação via PIX',
    texto: 'O caminho mais rápido: o valor cai direto na conta do projeto e vira ração, vacina e cuidado no mesmo dia.',
    destaque: true,
  },
  {
    icone: 'prancheta',
    titulo: 'Cartão de crédito e Débito',
    texto: 'Doe em qualquer valor pelo nosso link seguro. Você pode tornar a doação mensal e acompanhar o impacto de cada mês.',
    destaque: false,
  },
  {
    icone: 'casa',
    titulo: 'Doação presencial',
    texto: 'Ração, cobertores, medicamentos ou brinquedos podem ser entregues no abrigo, de terça a domingo, das 9h às 17h.',
    destaque: false,
  },
] as const

const IMPACTO = [
  { valor: 'R$ 30', texto: 'Vacina e vermífugo de um cão resgatado.' },
  { valor: 'R$ 60', texto: 'Ração de qualidade para um cão durante um mês.' },
  { valor: 'R$ 120', texto: 'Consulta veterinária completa de um novo resgate.' },
  { valor: 'R$ 300', texto: 'Castração + microchip, preparando um cão para a adoção.' },
] as const

const PERGUNTAS = [
  { pergunta: 'Como o dinheiro da doação é utilizado?', resposta: 'Cada centavo é destinado a ração, tratamentos veterinários, castrações, vacinas e manutenção do abrigo. Publicamos um relatório trimestral de prestação de contas na nossa página do Sobre.' },
  { pergunta: 'Posso doar ração ou medicamentos em vez de dinheiro?', resposta: 'Sim! Doações presenciais de ração, areia, cobertores, brinquedos e medicamentos dentro do prazo de validade são super bem-vindas. Confira os itens mais urgentes com a equipe antes de comprar.' },
  { pergunta: 'A doação mensal pode ser cancelada?', resposta: 'Claro. A doação recorrente pelo cartão pode ser pausada ou cancelada a qualquer momento, sem burocracia, direto pelo link de confirmação que você recebe por e-mail.' },
  { pergunta: 'Recebo algum comprovante?', resposta: 'Sim. Enviamos o recibo da sua doação por e-mail, e doações mensais recebem um resumo do impacto gerado no fim de cada trimestre.' },
  { pergunta: 'Posso ser voluntário além de doar?', resposta: 'Com certeza! Temos vagas para passeadores, fotógrafos, transportadores e apoiadores digitais. Envie um e-mail para contato@patinhasquetransformam.org com o assunto "Voluntário".' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="destaque-ajuda">
      <div class="container destaque-ajuda__grade">
        <div>
          <p class="script">Toda doação vira ração, cuidado e carinho.</p>
          <h1>Quero Ajudar</h1>
          <p class="destaque-ajuda__frase">
            O Patinhas que Transformam é mantido 100% por doações. Com a sua ajuda,
            cada resgate ganha uma segunda chance e uma história feliz para contar.
          </p>
          <div class="destaque-ajuda__acoes">
            <BaseBotao href="#doar" size="grande">
              <AppIcone name="coracao" :size="16" /> Fazer uma doação
            </BaseBotao>
            <BaseBotao to="/resultados" variante="contorno" size="grande">Conhecer os cães</BaseBotao>
          </div>
        </div>
        <div class="destaque-ajuda__midia">
          <img src="/images/cta-hand.jpg" alt="Mão humana segurando a patinha de um cão" />
          <span>Sua ajuda vira<br />latidos felizes <AppIcone name="coracao" :size="13" preenchido /></span>
        </div>
      </div>
    </section>

    <!-- Formas de doar -->
    <section id="doar" class="formas container">
      <TituloSecao
        sobretitulo="Escolha a sua"
        titulo="Formas de doar"
        descricao="Do jeito que fizer sentido para você: online, em segundos, ou presencialmente com visitas ao abrigo."
      />

      <div class="formas__grid">
        <article
          v-for="forma in FORMAS"
          :key="forma.titulo"
          class="forma"
          :class="{ 'forma--destaque': forma.destaque }"
        >
          <span class="forma__icon"><AppIcone :name="forma.icone" :size="22" /></span>
          <h3>{{ forma.titulo }}</h3>
          <p>{{ forma.texto }}</p>

          <!-- Bloco PIX: chave com botão de copiar -->
          <div v-if="forma.destaque" class="forma__pix">
            <span class="forma__pix-label">Chave PIX (e-mail)</span>
            <div class="forma__pix-row">
              <code>{{ CHAVE_PIX }}</code>
              <button
                type="button"
                class="forma__copiar"
                :class="{ 'forma__copiar--ok': copiado }"
                @click="copiarChave()"
              >
                <AppIcone :name="copiado ? 'confirmar' : 'prancheta'" :size="14" />
                {{ copiado ? 'Chave copiada!' : 'Copiar' }}
              </button>
            </div>
            <p class="forma__favorecido">
              Favorecido: <strong>Patinhas que Transformam</strong>, São Paulo, SP
            </p>
          </div>

          <BaseBotao
            v-else-if="forma.icone === 'prancheta'"
            href="https://www.example.com/doe-com-seguranca"
            target="_blank"
            variante="contorno"
            size="pequeno"
          >
            Doar com cartão <AppIcone name="avancar" :size="14" />
          </BaseBotao>
        </article>
      </div>
    </section>

    <!-- Impacto -->
    <section class="impacto">
      <div class="container">
        <TituloSecao
          sobretitulo="O que a sua doação realiza"
          titulo="Cada valor tem destino certo"
        />
        <div class="impacto__grid">
          <div v-for="item in IMPACTO" :key="item.valor" class="impacto__card">
            <strong>{{ item.valor }}</strong>
            <p>{{ item.texto }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ + CTA -->
    <section class="duvidas-ajuda container">
      <div class="duvidas-ajuda__intro">
        <span class="sobretitulo">Dúvidas frequentes</span>
        <h2>Como doar</h2>
        <p>
          Transparência é tudo para a gente. Se a sua dúvida não estiver aqui,
          fale direto com a nossa equipe.
        </p>
        <BaseBotao href="mailto:contato@patinhasquetransformam.org" variante="contorno">
          Fale conosco <AppIcone name="avancar" :size="15" />
        </BaseBotao>
      </div>
      <AcordeaoFaq :itens="PERGUNTAS" class="duvidas-ajuda__lista" />
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/paginas/quero-ajudar';
</style>
