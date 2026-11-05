<script setup lang="ts">
// Rodapé 
const email = ref('')
const enviado = ref(false)

function assinar() {
  if (!email.value.includes('@')) return
  enviado.value = true
}

const ano = new Date().getFullYear()
</script>

<template>
  <footer class="rodape">
    <img src="/images/pata-footer.png" alt="" aria-hidden="true" class="rodape__pata" />
    <div class="rodape__principal container">
      <div class="rodape__marca">
        <img src="/images/logo.svg" alt="" width="46" height="46" />
        <strong>Juntos por<br />um futuro mais gentil.</strong>
        <p>Mais que adoções, criamos novos começos. Cuidando de cada pata, hoje e sempre.</p>
        <div class="rodape__social">
          <a href="#" aria-label="Instagram"><AppIcone name="instagram" :size="17" /></a>
          <a href="#" aria-label="Facebook"><AppIcone name="facebook" :size="17" /></a>
          <a href="#" aria-label="YouTube"><AppIcone name="youtube" :size="17" /></a>
        </div>
      </div>

      <div class="rodape__newsletter">
        <strong>Receba novidades e ajude nossa causa:</strong>
        <p>Cadastre seu e-mail e fique por dentro das nossas histórias, eventos e formas de ajudar.</p>
        <form v-if="!enviado" class="rodape__formulario" @submit.prevent="assinar">
          <input v-model="email" type="email" placeholder="Seu melhor e-mail" aria-label="Seu e-mail" required />
          <BaseBotao type="submit" size="pequeno">
            Quero receber
            <AppIcone name="enviar" :size="14" />
          </BaseBotao>
        </form>
        <p v-else class="rodape__ok">
          <AppIcone name="confirmar" :size="16" />
          Obrigado! Em breve você receberá nossas patinhas de notícias.
        </p>
      </div>

      <nav class="rodape__links" aria-label="Links do rodapé">
        <strong>Links rápidos</strong>
        <NuxtLink to="/">Início</NuxtLink>
        <NuxtLink to="/resultados">Nossos cães</NuxtLink>
        <NuxtLink to="/como-adotar">Como adotar</NuxtLink>
        <NuxtLink to="/quero-ajudar">Quero ajudar</NuxtLink>
        <NuxtLink to="/sobre">Sobre nós</NuxtLink>
      </nav>

      <div class="rodape__contato">
        <strong>Contato</strong>
        <span><AppIcone name="email" :size="14" /> contato@patinhasquetransformam.org</span>
        <span><AppIcone name="mapa" :size="14" /> São Paulo, SP</span>
        <span><AppIcone name="telefone" :size="14" /> (11) 98765-4321</span>
      </div>
    </div>

    <div class="rodape__base">
      <div class="container rodape__base-conteudo">
        <span>© {{ ano }} Patinhas que Transformam. Todos os direitos reservados.</span>
        <span class="rodape__lema">
          Porque todo cão merece um lar. <AppIcone name="coracao" :size="13" preenchido />
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.rodape {
  position: relative;
  overflow: hidden;
  margin-top: auto;
  background: $creme-150;
  border-top: 1px solid $linha-200;
}
.rodape__pata {
  position: absolute;
  right: -28px;
  bottom: 64px;
  width: 200px;
  opacity: 0.16;
  transform: rotate(-14deg);
  pointer-events: none;

  @media (max-width: 980px) {
    width: 140px;
    right: -22px;
    bottom: 120px;
  }
}

.rodape__principal {
  display: grid;
  grid-template-columns: 1.2fr 1.4fr 0.8fr 1fr;
  gap: 36px;
  padding: 52px 0 40px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

.rodape__marca {
  img {
    margin-bottom: 12px;
  }

  strong {
    font-family: $fonte-serif;
    font-size: 1.25rem;
    color: $marrom-900;
    line-height: 1.25;
    display: block;
  }

  p {
    margin-top: 10px;
    font-size: 0.86rem;
  }
}

.rodape__social {
  display: flex;
  gap: 10px;
  margin-top: 16px;

  a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: $marrom-700;
    color: $creme-50;
    transition: transform 0.15s ease, background 0.15s ease;

    &:hover {
      transform: translateY(-2px);
      background: $marrom-600;
    }
  }
}

.rodape__newsletter,
.rodape__links,
.rodape__contato {
  strong {
    font-family: $fonte-serif;
    font-size: 1.02rem;
    color: $marrom-900;
    display: block;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.85rem;
    margin-bottom: 14px;
  }
}

.rodape__formulario {
  display: flex;
  gap: 10px;

  input {
    @include superficie-campo;
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 420px) {
    flex-direction: column;
  }
}

.rodape__ok {
  display: flex;
  align-items: center;
  gap: 8px;
  background: $verde-100;
  color: $verde-700;
  font: 600 0.88rem/1.4 $fonte-sans;
  padding: 12px 14px;
  border-radius: $raio-pequeno;
}

.rodape__links {
  display: flex;
  flex-direction: column;
  gap: 9px;

  a {
    font-size: 0.88rem;
    color: $tinta-600;
    width: fit-content;

    &:hover {
      color: $terracota-500;
    }
  }
}

.rodape__contato {
  display: flex;
  flex-direction: column;
  gap: 9px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: $tinta-600;
  }
}

.rodape__base {
  border-top: 1px solid $linha-200;
  background: rgba(255, 253, 248, 0.6);
}

.rodape__base-conteudo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  font-size: 0.78rem;
  color: $tinta-400;

  @media (max-width: 620px) {
    flex-direction: column;
  }
}

.rodape__lema {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: $terracota-500;
}
</style>
