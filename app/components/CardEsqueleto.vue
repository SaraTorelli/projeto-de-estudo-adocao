<template>
  <!-- Esqueleto do card enquanto a API responde  mantém o layout estável -->
  <div class="esqueleto" aria-hidden="true">
    <div class="esqueleto__foto brilho" />
    <div class="esqueleto__corpo">
      <div class="esqueleto__linha brilho" style="width: 55%" />
      <div class="esqueleto__linha brilho" style="width: 80%" />
      <div class="esqueleto__linha brilho" style="width: 70%" />
      <div class="esqueleto__botao brilho" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.esqueleto {
  @include superficie-card;
  overflow: hidden;

  &__foto {
    height: 190px;
  }

  &__corpo {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__linha {
    height: 12px;
    border-radius: $raio-pill;
  }

  &__botao {
    height: 38px;
    border-radius: $raio-pill;
    margin-top: 10px;
  }
}

.brilho {
  background: linear-gradient(90deg, $creme-200 25%, #f7efe2 50%, $creme-200 75%);
  background-size: 200% 100%;
  animation: brilho 1.4s infinite linear;
}

@keyframes brilho {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
