<script setup lang="ts">
// Página de erro (404 e 500) 
// Em erros inesperados (500) a causa mais comum é uma aba aberta enquanto o
// servidor reiniciou (ou cache velho do navegador): a cura é uma recarga REAL
// do navegador — navegar por dentro da SPA falharia de novo ao buscar chunks antigos.
const props = defineProps<{ error: { statusCode?: number; message?: string } }>()

const paginaNaoEncontrada = computed(() => props.error?.statusCode === 404)

function recarregar() {
  window.location.reload()
}

function irParaInicio() {
  window.location.href = '/'
}
</script>

<template>
  <div class="pagina-erro">
    <div class="pagina-erro__cartao">
      <span class="pagina-erro__pata"><AppIcone name="pata" :size="42" /></span>
      <p class="pagina-erro__codigo">{{ error?.statusCode ?? 'Erro' }}</p>
      <h1>{{ paginaNaoEncontrada ? 'Este osso se perdeu!' : 'Ops, algo deu errado.' }}</h1>
      <p class="pagina-erro__texto">
        {{
          paginaNaoEncontrada
            ? 'Não encontramos a página que você procurou. Talvez ela tenha sido adotada por outra rota.'
            : 'Tivemos um problema inesperado por aqui. Na maioria das vezes uma recarga simples resolve.'
        }}
      </p>
      <div class="pagina-erro__acoes">
        <template v-if="paginaNaoEncontrada">
          <BaseBotao to="/" size="grande"><AppIcone name="casa" :size="16" /> Voltar ao início</BaseBotao>
          <BaseBotao to="/resultados" variante="contorno" size="grande">Ver nossos cães</BaseBotao>
        </template>
        <template v-else>
          <BaseBotao size="grande" @click="recarregar">
            <AppIcone name="rotacionar" :size="16" /> Recarregar a página
          </BaseBotao>
          <BaseBotao variante="contorno" size="grande" @click="irParaInicio">Voltar ao início</BaseBotao>
        </template>
      </div>
      <p v-if="!paginaNaoEncontrada" class="pagina-erro__dica">
        Ainda com erro? Confira se o terminal com <strong>npm run dev</strong> continua rodando
        e tente uma recarga forte (<strong>Ctrl+Shift+R</strong>). Mais ajuda em
        <strong>SOLUCAO-DE-PROBLEMAS.md</strong>.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagina-erro {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 40px;
  @include marca-agua-patas(0.05);
}

.pagina-erro__cartao {
  max-width: 520px;
  text-align: center;
  @include superficie-card;
  padding: 56px 40px;
}

.pagina-erro__pata {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: inline-grid;
  place-items: center;
  background: rgba(176, 96, 48, 0.1);
  color: $terracota-500;
  margin-bottom: 18px;
}

.pagina-erro__codigo {
  font: 700 0.85rem/1 $fonte-sans;
  letter-spacing: 0.2em;
  color: $terracota-500;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(1.7rem, 4vw, 2.3rem);
  margin: 10px 0 12px;
}

.pagina-erro__texto {
  color: $tinta-600;
  margin-bottom: 26px;
}

.pagina-erro__acoes {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pagina-erro__dica {
  margin: 24px 0 0;
  padding: 14px 18px;
  border-radius: $raio-medio;
  background: $creme-100;
  border: 1px dashed $linha-300;
  font-size: 0.85rem;
  color: $tinta-600;

  strong {
    color: $marrom-700;
  }
}
</style>
