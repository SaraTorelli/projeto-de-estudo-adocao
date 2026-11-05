<script setup lang="ts">
// Página institucional: passo a passo, critérios, benefícios e PERGUNTAS
useHead({ title: 'Como Adotar | Patinhas que Transformam' })

const ETAPAS = [
  { icone: 'pata', titulo: 'Conheça nossos cães', texto: 'Veja os perfis, histórias e personalidades dos nossos cães disponíveis para adoção.' },
  { icone: 'mensagem', titulo: 'Entre em contato', texto: 'Preencha o formulário ou fale conosco para iniciar o processo.' },
  { icone: 'calendario', titulo: 'Conversa e visita', texto: 'Conversamos para entender se há compatibilidade e, se possível, agendamos uma visita.' },
  { icone: 'coracao', titulo: 'Adoção responsável', texto: 'Com tudo certo, finalizamos a adoção e acompanhamos os primeiros passos dessa nova jornada.' },
] as const

const CRITERIOS = [
  'Ser maior de 18 anos',
  'Apresentar documento com foto',
  'Comprovar residência fixa',
  'Ter condições de oferecer um ambiente seguro e adequado',
  'Concordar com o acompanhamento pós-adoção',
  'Assinar o termo de adoção responsável',
] as const

const BENEFICIOS = [
  { icone: 'coracao', titulo: 'Salva vidas', texto: 'Você oferece uma segunda chance para um cão que já viveu situações de abandono.' },
  { icone: 'pata', titulo: 'Companhia verdadeira', texto: 'Ganha um amigo leal, carinhoso e sempre ao seu lado.' },
  { icone: 'casa', titulo: 'Impacto positivo', texto: 'Ajuda a reduzir o número de animais em situação de rua.' },
  { icone: 'faisca', titulo: 'Amor incondicional', texto: 'Recebe em troca um amor que transforma o dia a dia.' },
] as const

const PERGUNTAS = [
  { pergunta: 'A adoção tem custo?', resposta: 'A adoção em si é gratuita. Cobramos apenas a taxa de castração e vacinação, quando ainda não foi realizada, para garantir que o cão chegue saudável ao novo lar.' },
  { pergunta: 'Posso adotar um filhote?', resposta: 'Sim! Temos filhotes em algumas épocas do ano. Mas vale lembrar: filhotes exigem muito tempo, paciência e treino. Muitas vezes um adulto se adapta melhor à sua rotina.' },
  { pergunta: 'Como funciona a visita?', resposta: 'Depois da análise do formulário, agendamos um encontro no abrigo (ou videochamada, para adotantes de outras cidades). É o momento de conhecer o cão e ver se há afinidade.' },
  { pergunta: 'O que acontece após a adoção?', resposta: 'Fazemos um acompanhamento nos primeiros meses: visitas, mensagens e orientações para garantir que a adaptação esteja indo bem para todos.' },
  { pergunta: 'E se não der certo, posso devolver?', resposta: 'Pedimos que você nos procure antes de qualquer decisão. Nossa equipe ajuda a resolver problemas de adaptação, e só em último caso o retorno ao abrigo é acertado com a equipe.' },
  { pergunta: 'Vocês fazem acompanhamento depois da adoção?', resposta: 'Sim, realizamos acompanhamento por no mínimo 6 meses, com check-ins periódicos e suporte para dúvidas sobre comportamento e saúde.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="destaque-como">
      <div class="container destaque-como__grade">
        <div>
          <p class="script">Como adotar <AppIcone name="pata" :size="18" /></p>
          <h1>Transforme<br />duas vidas.</h1>
          <p class="destaque-como__frase">
            Adotar é muito mais do que levar um cão para casa. É oferecer uma segunda chance e,
            ao mesmo tempo, receber um amigo para toda a vida.
          </p>
          <BaseBotao to="/resultados" size="grande">
            <AppIcone name="coracao" :size="16" /> Conheça nossos cães
          </BaseBotao>
        </div>
        <div class="destaque-como__midia">
          <img src="/images/como-adotar.jpg" alt="Pessoa acariciando um golden retriever no sol" />
          <span>Um lar muda tudo<br />para eles (e para você) <AppIcone name="coracao" :size="13" preenchido /></span>
        </div>
      </div>
    </section>

    <!-- Passo a passo -->
    <section class="etapas container">
      <TituloSecao
        sobretitulo="Como funciona"
        titulo="O passo a passo da adoção"
        descricao="O processo é simples, seguro e feito com muito cuidado para garantir o bem-estar de todos os envolvidos."
      />
      <ol class="passos-como">
        <li v-for="(step, i) in ETAPAS" :key="step.titulo">
          <span class="passos-como__numero">{{ i + 1 }}</span>
          <span class="passos-como__icone"><AppIcone :name="step.icone" :size="22" /></span>
          <strong>{{ step.titulo }}</strong>
          <p>{{ step.texto }}</p>
          <AppIcone v-if="i < ETAPAS.length - 1" name="avancar" :size="16" class="passos-como__seta" />
        </li>
      </ol>
    </section>

    <!-- Quem pode adotar -->
    <section class="para-quem container">
      <div class="para-quem__midia">
        <img src="/images/sobre-historia.jpg" alt="Mulher abraçando um cão resgatado" />
        <span>Eles só precisam de uma chance <AppIcone name="coracao" :size="13" preenchido /></span>
      </div>
      <div>
        <span class="sobretitulo">Critérios</span>
        <h2>Quem pode adotar?</h2>
        <p>
          Queremos garantir que cada adoção seja segura e responsável. Por isso, pedimos que
          alguns critérios sejam atendidos:
        </p>
        <ul class="para-quem__lista">
          <li v-for="criteria in CRITERIOS" :key="criteria">
            <span class="para-quem__verificacao"><AppIcone name="confirmar" :size="12" /></span>
            {{ criteria }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Benefícios -->
    <section class="beneficios">
      <div class="container">
        <TituloSecao sobretitulo="Por que adotar?" titulo="Benefícios da adoção" />
        <div class="beneficios__grade">
          <div v-for="benefit in BENEFICIOS" :key="benefit.titulo" class="beneficio">
            <span class="beneficio__icone"><AppIcone :name="benefit.icone as any" :size="22" /></span>
            <strong>{{ benefit.titulo }}</strong>
            <p>{{ benefit.texto }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PERGUNTAS + CTA -->
    <section class="perguntas container">
      <div class="perguntas__intro">
        <span class="sobretitulo">Dúvidas frequentes</span>
        <h2>Perguntas comuns</h2>
        <p>Se você ainda tem dúvidas sobre o processo de adoção, separamos algumas das mais frequentes para te ajudar.</p>
        <BaseBotao href="mailto:contato@patinhasquetransformam.org" variante="contorno">
          Fale conosco <AppIcone name="avancar" :size="15" />
        </BaseBotao>
      </div>
      <AcordeaoFaq :itens="PERGUNTAS" class="perguntas__lista" />
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/paginas/como-adotar';
</style>
