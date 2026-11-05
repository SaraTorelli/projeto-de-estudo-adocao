// Regras de domínio sobre a raça na store, nos composables e nos componentes.

import type { Raca, RacaId, FaixaPorte, FaixaIdade, SexoCao } from '~/tipos/api'

// Remove acentos/pontuação para buscas tolerantes ("pastor alemao" acha "Pastor Alemão")
export function normalizarTexto(valor: string): string {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Tradução de temperamentos (a API devolve os termos em inglês)
export const DICIONARIO_TEMPERAMENTO: Record<string, string> = {
  active: 'Ativo',
  affectionate: 'Afetuoso',
  alert: 'Alerta',
  aloof: 'Reservado',
  amiable: 'Amável',
  athletic: 'Atlético',
  bold: 'Ousado',
  brave: 'Corajoso',
  bright: 'Brilhante',
  bubbly: 'Radiante',
  calm: 'Calmo',
  cheerful: 'Alegre',
  charming: 'Encantador',
  clever: 'Esperto',
  clownish: 'Palhaço',
  companionable: 'Companheiro',
  confident: 'Confiante',
  courageous: 'Corajoso',
  cuddly: 'Dengoso',
  curious: 'Curioso',
  devoted: 'Devotado',
  dignified: 'Digno',
  docile: 'Dócil',
  easygoing: 'Tranquilo',
  energetic: 'Energético',
  even: 'Equilibrado',
  faithful: 'Fiel',
  fearless: 'Destemido',
  friendly: 'Amigável',
  funloving: 'Divertido',
  gentle: 'Gentil',
  goodnatured: 'Bondoso',
  hardy: 'Robusto',
  independent: 'Independente',
  instinctual: 'Instintivo',
  intelligent: 'Inteligente',
  keen: 'Atento',
  kind: 'Bondoso',
  lively: 'Animado',
  loving: 'Amoroso',
  loyal: 'Leal',
  merry: 'Alegre',
  mischievous: 'Brincalhão',
  obedient: 'Obediente',
  outgoing: 'Sociável',
  patient: 'Paciente',
  playful: 'Divertido',
  pleasant: 'Agradável',
  proud: 'Orgulhoso',
  protective: 'Protetor',
  quick: 'Ágil',
  quiet: 'Silencioso',
  receptive: 'Receptivo',
  reliable: 'Confiável',
  reserved: 'Reservado',
  responsive: 'Responsivo',
  sassy: 'Atrevido',
  sensitive: 'Sensível',
  smart: 'Inteligente',
  sociable: 'Sociável',
  spirited: 'Vigoroso',
  steady: 'Equilibrado',
  strong: 'Forte',
  stubborn: 'Teimoso',
  sweettempered: 'Doce',
  tenacious: 'Persistente',
  territorial: 'Territorial',
  trainable: 'Treinável',
  trustworthy: 'Digno de confiança',
  vigilant: 'Vigilante',
  watchful: 'Atento',
  willful: 'Determinado',
}

export function tagsTemperamento(temperament?: string): string[] {
  if (!temperament) return []
  return temperament
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => {
      const chave = normalizarTexto(t).replace(/[^a-z]/g, '')
      return DICIONARIO_TEMPERAMENTO[chave] ?? t
    })
}

// Perfil de energia/afeto estimado a partir das palavras de temperamento
const ENERGIA_ALTA = 'active energetic playful lively spirited athletic mischievous keen quick excitable willful bubbly clownish'
const ENERGIA_BAIXA = 'calm docile gentle quiet easygoing patient steady sweettempered dignified independent aloof reserved'

const AFETO_ALTO = 'affectionate loving loyal devoted faithful sweettempered companionable cuddly gentle kind trustworthy reliable'
const AFETO_BAIXO = 'aloof reserved independent dignified territorial protective fearless stubborn'

function pontuacaoCaracteristica(temperament: string | undefined, altas: string, baixas: string): number {
  if (!temperament) return 0
  const palavras = temperament
    .split(',')
    .map((w) => normalizarTexto(w).replace(/[^a-z]/g, ''))
    .filter(Boolean)

  if (!palavras.length) return 0
  const conjuntoAltas = new Set(altas.split(' '))
  const conjuntoBaixos = new Set(baixas.split(' '))

  const total = palavras.reduce((acc, w) => {
    if (conjuntoAltas.has(w)) return acc + 2
    if (conjuntoBaixos.has(w)) return acc - 1.5
    return acc + 0.5
  }, 0)

  return total / palavras.length
}

export type NivelCaracteristica = 'alta' | 'moderada' | 'baixa'

export function nivelEnergia(raca: Raca): NivelCaracteristica {
  const pontuacao = pontuacaoCaracteristica(raca.temperament, ENERGIA_ALTA, ENERGIA_BAIXA)
  if (pontuacao >= 0.75) return 'alta'
  if (pontuacao >= 0.1) return 'moderada'
  return 'baixa'
}

export function nivelAfeto(raca: Raca): NivelCaracteristica {
  const pontuacao = pontuacaoCaracteristica(raca.temperament, AFETO_ALTO, AFETO_BAIXO)
  if (pontuacao >= 0.7) return 'alta'
  if (pontuacao >= 0.2) return 'moderada'
  return 'baixa'
}

export const ROTULOS_NIVEL: Record<NivelCaracteristica, string> = {
  alta: 'Alta',
  moderada: 'Moderada',
  baixa: 'Baixa',
}

// Porte estimado pela média do peso métrico informado pela API
export function faixaPorte(raca: Raca): FaixaPorte {
  const metric = raca.weight?.metric ?? ''
  const numeros = metric
    .split('-')
    .map((n) => Number.parseFloat(n))
    .filter((n) => !Number.isNaN(n))

  const media = numeros.length ? numeros.reduce((a, b) => a + b, 0) / numeros.length : 0
  if (media <= 9) return 'pequeno'
  if (media < 25) return 'medio'
  return 'grande'
}

export const ROTULOS_PORTE: Record<FaixaPorte, string> = {
  pequeno: 'Pequeno',
  medio: 'Médio',
  grande: 'Grande',
}

// "10 - 12" -> "10 a 12 anos"
export function formatarExpectativaVida(lifeSpan?: string): string {
  const numeros = (lifeSpan ?? '')
    .split('-')
    .map((n) => n.trim())
    .filter(Boolean)
  if (numeros.length === 0) return 'Não informado'
  if (numeros.length === 1) return `${numeros[0]} anos`
  return `${numeros[0]} a ${numeros[1]} anos`
}

// Média da expectativa de vida, para ordenações futuras e exibição curta
export function mediaExpectativaVida(lifeSpan?: string): number | null {
  const numeros = (lifeSpan ?? '')
    .split('-')
    .map((n) => Number.parseFloat(n))
    .filter((n) => !Number.isNaN(n))
  return numeros.length ? numeros.reduce((a, b) => a + b, 0) / numeros.length : null
}

const DICIONARIO_PAISES: Record<string, string> = {
  germany: 'Alemanha',
  england: 'Inglaterra',
  scotland: 'Escócia',
  wales: 'País de Gales',
  ireland: 'Irlanda',
  'united kingdom': 'Reino Unido',
  france: 'França',
  canada: 'Canadá',
  china: 'China',
  tibet: 'Tibete',
  japan: 'Japão',
  mexico: 'México',
  russia: 'Rússia',
  'russia (siberia)': 'Rússia (Sibéria)',
  switzerland: 'Suíça',
  'switzerland, italy': 'Suíça e Itália',
  italy: 'Itália',
  croatia: 'Croácia',
  malta: 'Malta',
  belgium: 'Bélgica',
  spain: 'Espanha',
  portugal: 'Portugal',
  hungary: 'Hungria',
  turkey: 'Turquia',
  australia: 'Austrália',
  'united states': 'Estados Unidos',
  usa: 'Estados Unidos',
  egypt: 'Egito',
  greece: 'Grécia',
  netherlands: 'Holanda',
  poland: 'Polônia',
  norway: 'Noruega',
  denmark: 'Dinamarca',
  argentina: 'Argentina',
  brazil: 'Brasil',
  africa: 'África',
  madagascar: 'Madagascar',
  'central africa': 'África Central',
  'south africa': 'África do Sul',
}

// "Germany, France" -> "Alemanha e França"
export function formatarOrigem(origin?: string): string {
  if (!origin) return 'Não informado'
  const partes = origin
    .split(',')
    .map((p) => DICIONARIO_PAISES[normalizarTexto(p)] ?? p.trim())
    .filter(Boolean)

  if (partes.length === 0) return 'Não informado'
  if (partes.length === 1) return partes[0] ?? 'Não informado'
  return `${partes.slice(0, -1).join(', ')} e ${partes[partes.length - 1]}`
}

const DICIONARIO_GRUPOS: Record<string, string> = {
  'sporting group': 'Esportivos',
  'working group': 'Trabalho',
  'toy group': 'Toy',
  'herding group': 'Pastoreio',
  'hound group': 'Caça',
  'terrier group': 'Terrier',
  'non-sporting group': 'Não esportivos',
  'mixed breed': 'Sem raça definida',
}

export function formatarGrupoRaca(grupo?: string): string {
  if (!grupo) return 'Outros'
  return DICIONARIO_GRUPOS[normalizarTexto(grupo)] ?? grupo.replace(/ group$/i, '')
}

// "25 - 34" -> "25 a 34 kg"
export function formatarMedida(measure: string | undefined, unit: string): string {
  if (!measure) return 'Não informado'
  return `${measure.replace(/\s*-\s*/g, ' a ')} ${unit}`
}


// Idade e sexo do cão: a API publica dados de RAÇA (sem indivíduo), então
// derivei esses atributos de forma determinística a partir do id. Assim
// cada cão mantém sempre a mesma idade/sexo entre sessões e telas.


export function chaveEstavelDoId(id: RacaId): number {
  if (typeof id === 'number') return id
  const numero = Number(id)
  if (Number.isFinite(numero)) return numero
  const texto = String(id)
  return [...texto].reduce((acc, letra) => (acc * 31 + letra.charCodeAt(0)) % 100000, 7)
}

// Idade individual estável: 1 a 11 anos distribuídos pelo id
export function idadeEmAnos(raca: Raca): number {
  return ((chaveEstavelDoId(raca.id) * 7) % 11) + 1
}

export function faixaIdadeCao(raca: Raca): FaixaIdade {
  const anos = idadeEmAnos(raca)
  if (anos <= 1) return 'filhote'
  if (anos <= 3) return 'jovem'
  if (anos <= 7) return 'adulto'
  return 'senior'
}

export const ROTULOS_IDADE: Record<FaixaIdade, string> = {
  filhote: 'Filhote',
  jovem: 'Jovem',
  adulto: 'Adulto',
  senior: 'Sênior',
}

export function rotuloIdadeCao(raca: Raca): string {
  const anos = idadeEmAnos(raca)
  return anos === 1 ? '1 ano' : `${anos} anos`
}

export function sexoDoCao(raca: Raca): SexoCao {
  return chaveEstavelDoId(raca.id) % 2 === 0 ? 'femea' : 'macho'
}

export const ROTULOS_SEXO: Record<SexoCao, string> = {
  macho: 'Macho',
  femea: 'Fêmea',
}

// Apelidos em português para busca (a API devolve os nomes em inglês)
const APELIDOS_RACA_PT: Record<string, string> = {
  'german shepherd': 'pastor alemão',
  'labrador retriever': 'labrador',
  'golden retriever': 'golden',
  'french bulldog': 'bulldog francês',
  'standard poodle': 'poodle caniche',
  pug: 'carlino',
  'siberian husky': 'husky siberiano',
  dachshund: 'salsicha teckel',
  'yorkshire terrier': 'yorkie',
  'bernese mountain dog': 'boiadeiro bernês',
  'cocker spaniel': 'cocker',
  'miniature schnauzer': 'schnauzer miniatura',
  doberman: 'dobermann',
  'basset hound': 'basset',
  maltese: 'maltês',
  'saint bernard': 'são bernardo',
  dalmatian: 'dálmata',
  'pembroke welsh corgi': 'corgi',
  'shetland sheepdog': 'pastor de shetland',
  'great dane': 'dinamarquês dog alemão',
  'pomeranian': 'spitz alemão lulu',
  'chow chow': 'chow',
}

// Monta o "texto de busca" da raça: nome original + temperamento bruto,
// temperamento traduzido e apelidos em PT
export function textoBuscaRaca(raca: Raca): string {
  const alias = APELIDOS_RACA_PT[normalizarTexto(raca.name)] ?? ''
  return normalizarTexto(
    [raca.name, raca.temperament ?? '', tagsTemperamento(raca.temperament).join(' '), alias].join(' ')
  )
}

// Monta uma descrição em português a partir dos campos da API
export function descricaoRaca(raca: Raca): string {
  const tags = tagsTemperamento(raca.temperament)
    .slice(0, 3)
    .map((t) => t.toLowerCase())
  const porte = ROTULOS_PORTE[faixaPorte(raca)].toLowerCase()
  const vida = formatarExpectativaVida(raca.life_span)

  const partes: string[] = []
  partes.push(
    `${raca.name} é um cão de porte ${porte}${raca.origin ? `, originário de ${formatarOrigem(raca.origin)}` : ''}.`
  )
  if (tags.length) {
    partes.push(
      `Seu temperamento é ${tags.join(', ')}, o que o torna uma companhia marcante para o dia a dia.`
    )
  }
  partes.push(
    `Com expectativa de vida de ${vida}, convive muito bem em lares que ofereçam rotina, cuidado e carinho compatíveis com sua energia.`
  )
  return partes.join(' ')
}
