// Transforma a string "Active, Energetic, Independent" da API
// em um array de tags já traduzidas para exibição.
export function useFormatarTemperamento(temperamento: MaybeRefOrGetter<string | undefined>) {
  const tags = computed(() => tagsTemperamento(toValue(temperamento)))
  // Versão resumida para os cards, evitando poluição visual
  const resumo = computed(() => tags.value.slice(0, 3))
  return { tags, resumo }
}
