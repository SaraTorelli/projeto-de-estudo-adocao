// Cliente único para a TheDogAPI.
// Com chave válida no .env consome a API, sem chave  ou quando a API
// recusa a chave (401/403) ou está fora do ar cai automaticamente no modo
// demonstração (dataset local com o mesmo DTO) para o portal nunca quebrar.
import type { ApiImagem, Raca, RacaId } from '~/tipos/api'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const urlBase = (config.public.apiBaseUrl as string) || 'https://api.thedogapi.com/v1'
  // trim() evita que um espaço colado na chave active o modo API por engano
  const chaveApi = ((config.public.apiKey as string) || '').trim()

  // Reativo: o modo demo pode ser ligado em tempo de execução se a API recusar a chave
  const modoDemo = ref(!chaveApi)
  // Por que o fallback aconteceu ('' quando a API oficial responde normalmente)
  const motivoFallback = ref<'chave-invalida' | 'api-indisponivel' | ''>('')

  const headers = { 'x-api-key': chaveApi }

  async function buscarNoDataset(): Promise<Raca[]> {
    // pequena pausa para o estado de carregando ficar perceptível também no modo demo
    await new Promise((r) => setTimeout(r, 450))
    return $fetch<Raca[]>('/data/racas.demo.json')
  }

  function statusDoErro(erro: unknown): number | undefined {
    const e = erro as Record<string, any>
    return e?.statusCode ?? e?.status ?? e?.response?.status
  }
  function normalizarId(valorBruto: unknown, indice: number): RacaId {
    const numero = Number(valorBruto)
    if (Number.isFinite(numero)) return numero
    if (typeof valorBruto === 'string' && valorBruto.trim()) return valorBruto.trim()
    return `raca-${indice + 1}` // sem id válido: garante um identificador único
  }

  function normalizarRacas(lista: Raca[]): Raca[] {
    return lista
      .filter((raca) => raca && raca.name)
      .map((raca, indice) => ({ ...raca, id: normalizarId(raca.id, indice) }))
  }

  async function buscarRacas(): Promise<Raca[]> {
    if (modoDemo.value) return buscarNoDataset()

    try {
      const lista = await $fetch<Raca[]>('/breeds', { baseURL: urlBase, headers })
      return normalizarRacas(lista)
    } catch (erro) {
      const status = statusDoErro(erro)
      modoDemo.value = true
      motivoFallback.value =
        status === 401 || status === 402 || status === 403 ? 'chave-invalida' : 'api-indisponivel'
      console.warn(
        `[patinhas] A API oficial recusou a chamada (status ${status ?? 'desconhecido'}). ` +
          'Ativando modo demonstração automaticamente — confira NUXT_PUBLIC_API_KEY no .env.'
      )
      return buscarNoDataset()
    }
  }

  async function buscarImagensRaca(racaId: RacaId, limit = 4): Promise<ApiImagem[]> {
    if (modoDemo.value) return []
    try {
      return await $fetch<ApiImagem[]>('/images/search', {
        baseURL: urlBase,
        headers,
        query: { breed_ids: racaId, size: 'small', limit },
      })
    } catch {
      return [] 
    }
  }

  return {
    provide: {
      api: { modoDemo, motivoFallback, buscarRacas, buscarImagensRaca },
    },
  }
})
