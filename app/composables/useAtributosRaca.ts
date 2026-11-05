// Agrupa os atributos derivados de cada raça (porte, energia, afeto, origem)
import type { Raca, FaixaPorte } from '~/tipos/api'
import type { NivelCaracteristica } from '~/utils/raca'

export function useAtributosRaca(raca: MaybeRefOrGetter<Raca | undefined>) {
  const obter = () => toValue(raca)

  const porte = computed<FaixaPorte | null>(() => {
    const atual = obter()
    return atual ? faixaPorte(atual) : null
  })
  const energia = computed<NivelCaracteristica | null>(() => {
    const atual = obter()
    return atual ? nivelEnergia(atual) : null
  })
  const afeto = computed<NivelCaracteristica | null>(() => {
    const atual = obter()
    return atual ? nivelAfeto(atual) : null
  })

  const rotuloPorte = computed(() => (porte.value ? ROTULOS_PORTE[porte.value] : 'Não informado'))
  const rotuloEnergia = computed(() => (energia.value ? ROTULOS_NIVEL[energia.value] : 'Não informado'))
  const rotuloAfeto = computed(() => (afeto.value ? ROTULOS_NIVEL[afeto.value] : 'Não informado'))
  const rotuloOrigem = computed(() => formatarOrigem(obter()?.origin))
  const rotuloGrupo = computed(() => formatarGrupoRaca(obter()?.breed_group))
  const rotuloVida = computed(() => formatarExpectativaVida(obter()?.life_span))

  return {
    porte,
    rotuloPorte,
    energia,
    rotuloEnergia,
    afeto,
    rotuloAfeto,
    rotuloOrigem,
    rotuloGrupo,
    rotuloVida,
  }
}
