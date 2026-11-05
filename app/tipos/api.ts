export interface Medida {
  imperial: string
  metric: string
}

// A API pode devolver o id como número OU como texto
export type RacaId = number | string

export interface Raca {
  id: RacaId
  name: string
  temperament?: string
  origin?: string
  life_span?: string
  breed_group?: string
  bred_for?: string
  weight?: Medida
  height?: Medida
  image?: { id?: string; url: string; width?: number; height?: number }
  reference_image_id?: string
}

export interface ApiImagem {
  id: string
  url: string
  width: number
  height: number
  breeds?: Raca[]
}

// Estado local de cada cão na store (CRUD de favoritos e adoções)
export interface StatusCao {
  favoritado: boolean
  adotado: boolean
  nomeTutor?: string
  contatoTutor?: string
  adotadoEm?: string
}

export type AbaStatus = 'todos' | 'disponiveis' | 'favoritos' | 'adotados'
export type FaixaPorte = 'pequeno' | 'medio' | 'grande'
export type FaixaIdade = 'filhote' | 'jovem' | 'adulto' | 'senior'
export type SexoCao = 'macho' | 'femea'
export type EstadoRequisicao = 'parado' | 'carregando' | 'sucesso' | 'erro'
