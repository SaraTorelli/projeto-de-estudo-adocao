<script setup lang="ts">
// Formulário de adoção em 4 etapas (dados, lar, rotina e revisão).
// Ao enviar, a adoção é registrada na store e o cão passa a "Adotado".
const route = useRoute()
const store = useCaesStore()

useRacas()

// id da rota comparado como texto: a API pode devolver id numérico ou como string,
// e a conversão com Number() quebrava a busca da ficha (404 em todo clique)
const idNaRota = computed(() => String(route.params.id ?? ''))
const raca = computed(() => store.racas.find((b) => String(b.id) === idNaRota.value))

useHead(() => ({
  title: raca.value ? `Adotar ${raca.value.name} | Patinhas que Transformam` : 'Formulário de adoção',
}))

watchEffect(() => {
  if (store.estadoRequisicao === 'sucesso' && store.racas.length > 0 && !raca.value) {
    throw createError({ statusCode: 404, message: 'Cão não encontrado', fatal: true })
  }
})

const ETAPAS = [
  { titulo: 'Seus dados', dica: 'Conte um pouco sobre você' },
  { titulo: 'Perfil do lar', dica: 'Sobre o seu ambiente' },
  { titulo: 'Rotina e compromisso', dica: 'Como será o dia a dia com ele' },
  { titulo: 'Enviar solicitação', dica: 'Revise e envie' },
] as const

const atual = ref(1)
const tentado = ref(false)
const enviado = ref(false)

const form = reactive({
  // passo 1: seus dados
  nome: '', email: '', telefone: '', cidade: '', estado: '',
  idade: '', quintal: '', outrosAnimais: '', adotouAntes: '',
  rotina: '', motivacao: '',
  // passo 2: perfil do lar
  moraEm: '', moradiaE: '', telas: '', petFicara: '',
  moradores: '', criancas: '', concordam: '', idosos: '',
  tempoSozinho: '', responsavel: '', passeios: '', descanso: '', adaptacaoCasa: '',
  // passo 3: rotina e compromissos
  tempoDisponivel: '', frequenciaPasseios: '', adaptacao: '', expectativa: '',
  custos: '', posAdocao: '',
  // passo 4: contato e confirmação
  contatoVia: 'whatsapp', melhorHorario: '', observacoes: '',
  confirmoDados: false, autorizoProcesso: false, ciencia: false,
  // passo 3: compromisso com a adoção responsável (separado do `ciencia` do passo 4)
  compromisso: false,
})

// validação mínima por etapa: campos essenciais para dar continuidade
const VALIDACOES_ETAPA: Record<number, () => boolean> = {
  1: () => Boolean(form.nome && form.email.includes('@') && form.telefone && form.cidade && form.estado),
  2: () => Boolean(form.moraEm && form.moradiaE && form.petFicara),
  3: () => Boolean(form.tempoDisponivel),
  4: () => Boolean(form.contatoVia && form.melhorHorario && form.confirmoDados && form.autorizoProcesso && form.ciencia),
}

const etapaValida = computed(() => VALIDACOES_ETAPA[atual.value]?.() ?? false)

function avancar() {
  tentado.value = true
  if (!etapaValida.value) return
  tentado.value = false
  atual.value = Math.min(4, atual.value + 1)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function voltar() {
  tentado.value = false
  atual.value = Math.max(1, atual.value - 1)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function enviar() {
  tentado.value = true
  if (!etapaValida.value || !raca.value) return
  store.adotar(raca.value.id, { nome: form.nome, contato: form.contatoVia === 'email' ? form.email : form.telefone })
  enviado.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// resumo do passo 4: apenas campos preenchidos aparecem na revisão
const RESUMO = computed(() => [
  { group: 'Resumo do cadastro', icone: 'pessoa', items: [
    ['Nome completo', form.nome], ['E-mail', form.email], ['Telefone', form.telefone],
    ['Cidade', `${form.cidade}${form.estado ? ` / ${form.estado}` : ''}`],
    ['Idade', form.idade],
  ] as [string, string][] },
  { group: 'Resumo do perfil do lar', icone: 'casa', items: [
    ['Você mora em', form.moraEm], ['A moradia é', form.moradiaE], ['Seu pet ficará', form.petFicara],
    ['Moram com você', form.moradores], ['Há crianças?', form.criancas], ['Tempo sozinho por dia', form.tempoSozinho],
  ] as [string, string][] },
  { group: 'Resumo da rotina e compromissos', icone: 'relogio', items: [
    ['Tempo disponível', form.tempoDisponivel], ['Passeios', form.frequenciaPasseios],
    ['Custos com o pet', form.custos], ['Aceita acompanhamento pós-adoção', form.posAdocao],
  ] as [string, string][] },
])

const ETAPAS_DEPOIS = [
  { titulo: 'Análise da solicitação', texto: 'Nossa equipe vai avaliar todas as informações com muito cuidado.' },
  { titulo: 'Contato da equipe', texto: 'Entraremos em contato para conversar e tirar suas dúvidas.' },
  { titulo: 'Encontro com o pet', texto: 'Se tudo estiver certo, agendamos um encontro para conhecer o futuro amigo de peito.' },
] as const

const SIM_NAO = [
  { valor: 'sim', rotulo: 'Sim' },
  { valor: 'não', rotulo: 'Não' },
]

const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((uf) => ({ valor: uf, rotulo: uf }))
const MORADIA = [
  { valor: 'casa', rotulo: 'Casa' }, { valor: 'apartamento', rotulo: 'Apartamento' },
  { valor: 'sítio/chácara', rotulo: 'Sítio / Chácara' },
]
const FREQUENCIA = [
  { valor: '1x/dia', rotulo: 'Todos os dias' }, { valor: '3-4x/semana', rotulo: '3 a 4 vezes por semana' },
  { valor: 'fins de semana', rotulo: 'Aos fins de semana' },
]
const HORARIOS = [
  { valor: 'manhã', rotulo: 'Pela manhã (8h às 12h)' },
  { valor: 'tarde', rotulo: 'Período da tarde (13h às 18h)' },
  { valor: 'noite', rotulo: 'Noite (18h às 21h)' },
]
</script>

<template>
  <div>
    <CarregandoPata v-if="store.estadoRequisicao === 'carregando' || store.estadoRequisicao === 'parado'" />

    <!-- A listagem falhou ou veio vazia  estado com orientação (em vez de tela em branco) -->
    <section v-else-if="!raca" class="container">
      <EstadoVazio
        :titulo="store.estadoRequisicao === 'erro' ? 'Não foi possível carregar a ficha deste cãozinho' : 'Não encontramos este cãozinho'"
        :texto="store.estadoRequisicao === 'erro'
          ? (store.erroRequisicao || 'Verifique sua conexão e tente novamente.')
          : 'A listagem veio vazia agora. Tente recarregar ou conhecer os outros cães disponíveis.'"
      >
        <BaseBotao variante="contorno" @click="store.buscarRacas(true)">
          <AppIcone name="rotacionar" :size="16" /> Tentar de novo
        </BaseBotao>
        <BaseBotao to="/resultados" variante="suave">Ver outros cães</BaseBotao>
      </EstadoVazio>
    </section>

    <template v-else-if="raca">
      <!-- Hero -->
      <section class="destaque-formulario">
        <div class="container destaque-formulario__grade">
          <div>
            <p class="script">Estamos a um passo<br />de um novo começo.</p>
            <h1>Formulário<br />de Adoção</h1>
            <p class="destaque-formulario__frase">
              Preencha suas informações para que nossa equipe possa conhecer você melhor,
              encontrar o melhor match e dar continuidade ao processo de adoção.
            </p>
          </div>
          <div class="destaque-formulario__midia">
            <img src="/images/hero-form.jpg" alt="Cão preto sorrindo em dia de sol" />
            <span>Seu novo começo<br />começa aqui <AppIcone name="coracao" :size="13" preenchido /></span>
          </div>
        </div>
      </section>

      <!-- Sucesso (tem prioridade: acabamos de enviar) -->
      <section v-if="enviado" class="container">
        <div class="sucesso">
          <span class="sucesso__icone"><AppIcone name="confirmar" :size="34" /></span>
          <h2>Solicitação enviada!</h2>
          <p>
            Que alegria! Recebemos o seu interesse em adotar
            <strong>{{ raca.name }}</strong>. Nossa equipe entrará em contato por
            <strong>{{ form.contatoVia === 'whatsapp' ? 'WhatsApp' : form.contatoVia === 'email' ? 'e-mail' : 'telefone' }}</strong>
            no período informado. Fique de olho!
          </p>
          <div class="sucesso__acoes">
            <BaseBotao :to="`/raca/${raca.id}`" variante="contorno">Ver a ficha do {{ raca.name }}</BaseBotao>
            <BaseBotao to="/resultados">Continuar conhecendo cães</BaseBotao>
          </div>
        </div>
      </section>

      <!-- Cão já adotado: bloqueia o fluxo -->
      <section v-else-if="store.statusDe(raca.id).adotado" class="container">
        <EstadoVazio
          class="ja-adotado"
          :titulo="`${raca.name} já encontrou uma família!`"
          texto="Recebemos uma solicitação de adoção para este cão e o processo está em andamento. Temos outros amigos esperando por você."
        >
          <BaseBotao to="/resultados">
            <AppIcone name="pata" :size="15" /> Conhecer outros cães
          </BaseBotao>
        </EstadoVazio>
      </section>

      <!-- Formulário -->
      <section v-else class="adocao container">
        <ProgressoEtapas :etapas="ETAPAS as unknown as { titulo: string; dica: string }[]" :atual="atual" />

        <div class="adocao__layout">
          <form class="adocao__formulario" novalidate @submit.prevent="enviar">
            <!-- PASSO 1 -->
            <template v-if="atual === 1">
              <SecaoFormulario icone="pessoa" titulo="Seus dados" dica="Vamos começar com algumas informações básicas.">
                <BaseCampoTexto v-model="form.nome" rotulo="Nome completo" placeholder="Seu nome completo" required />
                <BaseCampoTexto v-model="form.email" type="email" rotulo="E-mail" placeholder="seu@email.com" required />
                <BaseCampoTexto v-model="form.telefone" type="tel" rotulo="Telefone" placeholder="(00) 00000-0000" required />
                <BaseCampoTexto v-model="form.cidade" rotulo="Cidade" placeholder="Sua cidade" required />
                <BaseSelecao v-model="form.estado" rotulo="Estado" :opcoes="ESTADOS" placeholder="UF" required />
              </SecaoFormulario>

              <SecaoFormulario icone="casa" titulo="Sobre você" dica="Queremos entender um pouco mais sobre o seu perfil." :colunas="2">
                <BaseSelecao v-model="form.idade" rotulo="Idade" :opcoes="['18 - 24 anos', '25 - 34 anos', '35 - 50 anos', '50+ anos'].map((v) => ({ valor: v, rotulo: v }))" />
                <BaseSelecao v-model="form.quintal" rotulo="Possui quintal?" :opcoes="SIM_NAO" />
                <BaseSelecao v-model="form.outrosAnimais" rotulo="Tem outros animais?" :opcoes="SIM_NAO" />
                <BaseSelecao v-model="form.adotouAntes" rotulo="Já adotou antes?" :opcoes="SIM_NAO" />
              </SecaoFormulario>

              <SecaoFormulario icone="relogio" titulo="Sua rotina" dica="Conte um pouco mais sobre o seu dia a dia.">
                <div class="adocao__completo">
                  <BaseAreaTexto v-model="form.rotina" rotulo="Fale um pouco sobre sua rotina" placeholder="Ex.: horários, se trabalha fora, quem mora com você, como será o dia a dia do pet..." />
                </div>
                <div class="adocao__completo">
                  <BaseAreaTexto v-model="form.motivacao" rotulo="Por que deseja adotar?" placeholder="Conte o que te motiva a adotar e o que você espera dessa nova companhia..." />
                </div>
              </SecaoFormulario>
            </template>

            <!-- PASSO 2 -->
            <template v-if="atual === 2">
              <SecaoFormulario icone="casa" titulo="Seu lar" dica="Conte um pouco sobre o seu espaço e ambiente." :colunas="2">
                <BaseSelecao v-model="form.moraEm" rotulo="Você mora em:" :opcoes="MORADIA" required />
                <BaseSelecao v-model="form.moradiaE" rotulo="A moradia é:" :opcoes="[{ valor: 'própria', rotulo: 'Própria' }, { valor: 'alugada', rotulo: 'Alugada' }, { valor: 'com a família', rotulo: 'Com a família' }]" required />
                <BaseSelecao v-model="form.telas" rotulo="Há telas de proteção?" :opcoes="SIM_NAO" />
                <BaseSelecao v-model="form.petFicara" rotulo="Seu pet ficará:" :opcoes="[{ valor: 'dentro de casa', rotulo: 'Dentro de casa' }, { valor: 'no quintal', rotulo: 'No quintal' }, { valor: 'dentro e fora', rotulo: 'Dentro e fora' }]" required />
              </SecaoFormulario>

              <SecaoFormulario icone="pessoas" titulo="Quem mora com você" dica="Um pouco sobre as pessoas e animais que vivem com você." :colunas="2">
                <BaseSelecao v-model="form.moradores" rotulo="Quantas pessoas moram com você?" :opcoes="['1', '2', '3', '4 ou mais'].map((v) => ({ valor: v, rotulo: v }))" />
                <BaseSelecao v-model="form.criancas" rotulo="Há crianças na casa?" :opcoes="SIM_NAO" />
                <BaseSelecao v-model="form.concordam" rotulo="Todos concordam com a adoção?" :opcoes="SIM_NAO" />
                <BaseSelecao v-model="form.idosos" rotulo="Há idosos na residência?" :opcoes="SIM_NAO" />
              </SecaoFormulario>

              <SecaoFormulario icone="escudo" titulo="Segurança e rotina da casa" dica="Como será o cuidado e a rotina do pet no seu dia a dia.">
                <BaseSelecao v-model="form.tempoSozinho" rotulo="Quanto tempo o pet ficará sozinho por dia?" :opcoes="['Menos de 2 horas', '2 a 4 horas', '4 a 8 horas', 'Mais de 8 horas'].map((v) => ({ valor: v, rotulo: v }))" />
                <BaseCampoTexto v-model="form.responsavel" rotulo="Quem será o principal responsável?" placeholder="Ex.: eu, minha família..." />
                <BaseSelecao v-model="form.passeios" rotulo="O animal terá acesso a passeios?" :opcoes="[{ valor: 'sim, diariamente', rotulo: 'Sim, diariamente' }, { valor: 'algumas vezes por semana', rotulo: 'Algumas vezes por semana' }, { valor: 'raramente', rotulo: 'Raramente' }]" />
                <div class="adocao__completo">
                  <BaseCampoTexto v-model="form.descanso" rotulo="Como será o espaço de descanso do pet?" placeholder="Ex.: cama, caminha, local coberto..." />
                </div>
                <div class="adocao__completo">
                  <BaseAreaTexto v-model="form.adaptacaoCasa" rotulo="Descreva como será a adaptação do pet na sua casa" placeholder="Conte como pretende fazer essa adaptação nos primeiros dias..." />
                </div>
              </SecaoFormulario>
            </template>

            <!-- PASSO 3 -->
            <template v-if="atual === 3">
              <SecaoFormulario icone="relogio" titulo="Rotina com o pet" dica="Como você imagina o dia a dia com seu novo amigo?" :colunas="2">
                <BaseSelecao v-model="form.tempoDisponivel" rotulo="Quanto tempo por dia você pretende dedicar ao pet?" :opcoes="['Menos de 1 hora', '1 a 2 horas', 'Mais de 2 horas'].map((v) => ({ valor: v, rotulo: v }))" required />
                <BaseSelecao v-model="form.frequenciaPasseios" rotulo="Frequência de passeios" :opcoes="FREQUENCIA" />
                <div class="adocao__completo">
                  <BaseAreaTexto v-model="form.adaptacao" rotulo="O que você espera da convivência com o pet?" placeholder="Ex.: companhia para passeios, um amigo para a família, mais qualidade de vida..." />
                </div>
              </SecaoFormulario>

              <SecaoFormulario icone="escudo" titulo="Compromisso e expectativas" dica="A adoção é uma decisão importante e queremos garantir um vínculo saudável." :colunas="2">
                <BaseSelecao v-model="form.custos" rotulo="Está preparado para custos com alimentação, consultas e cuidados?" :opcoes="[{ valor: 'sim, estou ciente', rotulo: 'Sim, estou ciente' }, { valor: 'tenho dúvidas', rotulo: 'Tenho dúvidas e gostaria de orientação' }]" />
                <BaseSelecao v-model="form.posAdocao" rotulo="Aceita acompanhamento pós-adoção?" :opcoes="SIM_NAO" />
                <div class="adocao__completo">
                  <BaseAreaTexto v-model="form.expectativa" rotulo="Há algo importante que nossa equipe deva saber?" placeholder="Ex.: já tive pets antes, tenho interesse em adotar um cão mais tranquilo..." />
                </div>
                <div class="adocao__completo">
                  <BaseCaixaSelecao v-model="form.compromisso" rotulo="Entendo que a adoção responsável exige paciência, adaptação e compromisso com o bem-estar do pet, e estou disposto(a) a construir esse vínculo com cuidado." />
                </div>
              </SecaoFormulario>
            </template>

            <!-- PASSO 4 -->
            <template v-if="atual === 4">
              <div v-for="section in RESUMO" :key="section.group" class="revisao">
                <h3><AppIcone :name="section.icone as any" :size="17" /> {{ section.group }}</h3>
                <dl class="revisao__grade">
                  <div v-for="[label, value] in section.items.filter(([, v]) => v)" :key="label" class="revisao__item">
                    <dt>{{ label }}</dt>
                    <dd>{{ value }}</dd>
                  </div>
                </dl>
              </div>

              <SecaoFormulario icone="email" titulo="Contato e confirmação" dica="Informe como podemos entrar em contato e finalize sua solicitação.">
                <div class="adocao__completo">
                  <GrupoPilulasRadio
                    v-model="form.contatoVia"
                    rotulo="Forma de contato preferida"
                    :opcoes="[
                      { valor: 'whatsapp', rotulo: 'WhatsApp', icone: 'mensagem' },
                      { valor: 'email', rotulo: 'E-mail', icone: 'email' },
                      { valor: 'telefone', rotulo: 'Telefone', icone: 'telefone' },
                    ]"
                    required
                  />
                </div>
                <BaseSelecao v-model="form.melhorHorario" rotulo="Melhor horário para contato" :opcoes="HORARIOS" required />
                <div class="adocao__completo">
                  <BaseAreaTexto v-model="form.observacoes" rotulo="Observações finais (opcional)" placeholder="Ex.: informações adicionais que gostaria de compartilhar..." />
                </div>
                <div class="adocao__completo adocao__confirmacoes">
                  <BaseCaixaSelecao v-model="form.confirmoDados" rotulo="Confirmo que as informações fornecidas são verdadeiras." />
                  <BaseCaixaSelecao v-model="form.autorizoProcesso" rotulo="Autorizo o contato da equipe para continuidade do processo." />
                  <BaseCaixaSelecao v-model="form.ciencia" rotulo="Estou ciente de que o envio da solicitação não garante a adoção imediata." />
                </div>
              </SecaoFormulario>
            </template>

            <!-- feedback de validação -->
            <p v-if="tentado && !etapaValida" class="adocao__erro" role="alert">
              <AppIcone name="fechar" :size="14" />
              Preencha os campos obrigatórios marcados com <em>*</em> para continuar.
            </p>

            <div class="adocao__navegacao">
              <BaseBotao variante="suave" size="grande" :disabled="atual === 1" @click="voltar">
                <AppIcone name="voltar" :size="16" /> Voltar
              </BaseBotao>
              <BaseBotao v-if="atual < 4" size="grande" @click="avancar">
                Continuar <AppIcone name="avancar" :size="16" />
              </BaseBotao>
              <BaseBotao v-else type="submit" size="grande">
                Enviar solicitação <AppIcone name="enviar" :size="16" />
              </BaseBotao>
            </div>
          </form>

          <!-- Coluna lateral -->
          <aside class="adocao__lateral">
            <CardResumoCao :raca="raca" />
            <CardEtapas titulo="O que acontece depois?" :etapas="ETAPAS_DEPOIS as unknown as { titulo: string; texto: string }[]">
              Após o envio do formulário, seguimos com estas etapas:
            </CardEtapas>
            <CardCitacao citacao="A adoção transforma duas vidas.">
              Você oferece um lar cheio de amor e recebe, em troca, uma companhia leal, alegre e para toda a vida.
            </CardCitacao>
          </aside>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/paginas/adotar';
</style>
