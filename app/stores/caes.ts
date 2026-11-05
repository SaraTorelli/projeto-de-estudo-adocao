// Store central do portal: cache da listagem da API, filtros/busca persistidos
// e o CRUD local de status (favoritar / adotar) de cada cão.
import { defineStore } from 'pinia'
import type { Raca, RacaId, EstadoRequisicao, StatusCao, FaixaPorte, FaixaIdade, SexoCao, AbaStatus } from '~/tipos/api'

const CHAVE_ARMAZENAMENTO = 'patinhas:portal-v2'
const TAMANHOS_PAGINA = [8, 12, 16, 24]

// Adoções pré-registradas para a listagem já nascer com histórico real.
// Sobrescritas sem conflito pelo estado persistido do visitante (spread abaixo).
const ADOCOES_PRE_REGISTRADAS: Record<string, StatusCao> = {
  3: { favoritado: false, adotado: true, nomeTutor: 'Família Nunes', contatoTutor: '(11) 91234-5678', adotadoEm: '2026-09-14T14:30:00.000Z' },
  8: { favoritado: false, adotado: true, nomeTutor: 'Família Andrade', contatoTutor: 'familia.andrade@email.com', adotadoEm: '2026-09-20T09:00:00.000Z' },
  15: { favoritado: false, adotado: true, nomeTutor: 'Família Costa', contatoTutor: '(11) 93456-7890', adotadoEm: '2026-09-27T16:45:00.000Z' },
  24: { favoritado: false, adotado: true, nomeTutor: 'Família Moraes', contatoTutor: '(11) 97777-1234', adotadoEm: '2026-09-29T11:15:00.000Z' },
}

interface EstadoPersistido {
  statusPorId: Record<string, StatusCao>
  termoBusca: string
  itensPorPagina: number
}

function carregarPersistido(): EstadoPersistido {
  const padrao: EstadoPersistido = { statusPorId: {}, termoBusca: '', itensPorPagina: 8 }
  if (!import.meta.client) return padrao
  try {
    const raw = localStorage.getItem(CHAVE_ARMAZENAMENTO)
    return raw ? { ...padrao, ...JSON.parse(raw) } : padrao
  } catch {
    return padrao
  }
}

export const useCaesStore = defineStore('caes', {
  state: () => {
    const salvo = carregarPersistido()
    return {
      racas: [] as Raca[],
      estadoRequisicao: 'parado' as EstadoRequisicao,
      erroRequisicao: '',
      // busca e filtros (sobrevivem à navegação entre as telas)
      termoBusca: salvo.termoBusca,
      filtroCategoria: '' as string,
      filtroPorte: '' as FaixaPorte | '',
      filtroIdade: '' as FaixaIdade | '',
      filtroSexo: '' as SexoCao | '',
      abaStatus: 'todos' as AbaStatus,
      pagina: 1,
      itensPorPagina: salvo.itensPorPagina,
      // CRUD local de status por id da raça 
      statusPorId: { ...ADOCOES_PRE_REGISTRADAS, ...salvo.statusPorId },
    }
  },

  getters: {
    categorias(estado): string[] {
      const grupos = new Set(estado.racas.map((b) => formatarGrupoRaca(b.breed_group)))
      return [...grupos].sort((a, b) => a.localeCompare(b, 'pt-BR'))
    },

    // chaves sempre como texto: funciona com id numérico ou string da API
    statusDe(estado) {
      return (id: RacaId): StatusCao =>
        estado.statusPorId[String(id)] ?? { favoritado: false, adotado: false }
    },

    // aplica busca + categoria + porte + idade + sexo 
    passamFiltros(estado): Raca[] {
      const termo = normalizarTexto(estado.termoBusca)

      return estado.racas.filter((raca) => {
        if (estado.filtroCategoria && formatarGrupoRaca(raca.breed_group) !== estado.filtroCategoria)
          return false
        if (estado.filtroPorte && faixaPorte(raca) !== estado.filtroPorte) return false
        if (estado.filtroIdade && faixaIdadeCao(raca) !== estado.filtroIdade) return false
        if (estado.filtroSexo && sexoDoCao(raca) !== estado.filtroSexo) return false
        if (termo && !textoBuscaRaca(raca).includes(termo)) return false
        return true
      })
    },

    // listagem final = filtros + aba de status ativa
    racasFiltradas(estado): Raca[] {
      return this.passamFiltros.filter((raca) => {
        const status = estado.statusPorId[raca.id] ?? { favoritado: false, adotado: false }

        if (estado.abaStatus === 'disponiveis' && status.adotado) return false
        if (estado.abaStatus === 'favoritos' && !status.favoritado) return false
        if (estado.abaStatus === 'adotados' && !status.adotado) return false

        return true
      })
    },

    totalFiltrado(): number {
      return this.racasFiltradas.length
    },

    totalPaginas(): number {
      return Math.max(1, Math.ceil(this.totalFiltrado / this.itensPorPagina))
    },

    racasPaginadas(): Raca[] {
      const inicio = (this.pagina - 1) * this.itensPorPagina
      return this.racasFiltradas.slice(inicio, inicio + this.itensPorPagina)
    },

    // vitrine da home: primeiros cães ainda sem adoção registrada
    racasEmDestaque(estado): Raca[] {
      return estado.racas.filter((raca) => !estado.statusPorId[raca.id]?.adotado).slice(0, 4)
    },
  },

  actions: {
    async buscarRacas(forcar = false) {
      if (!forcar && (this.estadoRequisicao === 'sucesso' || this.estadoRequisicao === 'carregando')) return

      const { $api } = useNuxtApp()
      this.estadoRequisicao = 'carregando'
      this.erroRequisicao = ''

      try {
        this.racas = await $api.buscarRacas()
        this.estadoRequisicao = 'sucesso'
      } catch {
        this.estadoRequisicao = 'erro'
        this.erroRequisicao =
          'Não foi possível carregar os cães agora. Verifique sua conexão e tente novamente.'
      }
    },

    definirBusca(termo: string) {
      this.termoBusca = termo
      this.pagina = 1
      this.persistir()
    },

    definirCategoria(categoria: string) {
      this.filtroCategoria = categoria
      this.pagina = 1
    },

    definirPorte(porte: FaixaPorte | '') {
      this.filtroPorte = porte
      this.pagina = 1
    },

    definirIdade(idade: FaixaIdade | '') {
      this.filtroIdade = idade
      this.pagina = 1
    },

    definirSexo(sexo: SexoCao | '') {
      this.filtroSexo = sexo
      this.pagina = 1
    },

    definirAba(aba: AbaStatus) {
      this.abaStatus = aba
      this.pagina = 1
    },

    definirPagina(pagina: number) {
      this.pagina = Math.min(Math.max(1, pagina), this.totalPaginas)
    },

    definirItensPorPagina(tamanho: number) {
      this.itensPorPagina = tamanho
      this.pagina = 1
      this.persistir()
    },

    limparFiltros() {
      this.termoBusca = ''
      this.filtroCategoria = ''
      this.filtroPorte = ''
      this.filtroIdade = ''
      this.filtroSexo = ''
      this.abaStatus = 'todos'
      this.pagina = 1
      this.persistir()
    },

    // alterna o estado de favorito do cão 
    alternarFavorito(id: RacaId) {
      const atual = this.statusDe(id)
      this.statusPorId[String(id)] = { ...atual, favoritado: !atual.favoritado }
      this.persistir()
    },

    // registra a adoção a partir do formulário de adotar
    adotar(id: RacaId, tutor: { nome: string; contato: string }) {
      const atual = this.statusDe(id)
      this.statusPorId[String(id)] = {
        ...atual,
        adotado: true,
        nomeTutor: tutor.nome,
        contatoTutor: tutor.contato,
        adotadoEm: new Date().toISOString(),
      }
      this.persistir()
    },

    persistir() {
      if (!import.meta.client) return
      try {
        const payload: EstadoPersistido = {
          statusPorId: this.statusPorId,
          termoBusca: this.termoBusca,
          itensPorPagina: this.itensPorPagina,
        }
        localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(payload))
      } catch {
      }
    },
  },
})

export { TAMANHOS_PAGINA }
