// Formata a expectativa de vida da API ("12 - 15") 
// e expõe a média em anos para exibições curtas.
export function useExpectativaVida(lifeSpan: MaybeRefOrGetter<string | undefined>) {
  const rotulo = computed(() => formatarExpectativaVida(toValue(lifeSpan)))
  const media = computed(() => mediaExpectativaVida(toValue(lifeSpan)))
  return { rotulo, media }
}
