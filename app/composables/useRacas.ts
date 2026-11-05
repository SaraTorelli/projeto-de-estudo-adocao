// Composable wrapper das requests: garante que a listagem seja carregada
// uma única vez e expõe o estado de carregando/erro para as páginas.
export function useRacas() {
  const store = useCaesStore()
  const { $api } = useNuxtApp()

  if (store.estadoRequisicao === 'parado') {
    store.buscarRacas()
  }

  const carregando = computed(() => store.estadoRequisicao === 'carregando')
  const erro = computed(() => store.estadoRequisicao === 'erro')
  const erroMensagem = computed(() => store.erroRequisicao)
  // modoDemo é um Ref no plugin (pode ligar em tempo de execução se a API falhar)
  const modoDemo = computed(() => unref($api.modoDemo) === true)

  return { store, carregando, erro, erroMensagem, modoDemo }
}
