# Patinhas que Transformam

Portal de adoção de cães em Nuxt 4 (SPA) + Pinia + SCSS. Usa a TheDogAPI quando
tem chave no `.env`; sem chave, roda em modo demo com 30 raças de um dataset
local no mesmo formato da API. Ou seja: instalar e já funciona.

## Rodando

```
npm install
npm run dev
```

http://localhost:3000

Pra usar a API de verdade: pega uma chave grátis em https://thedogapi.com, coloca
em `NUXT_PUBLIC_API_KEY` no `.env` e reinicia. Build de produção é `npm run build`
seguido de `npm run preview`.

## Como testar

O caminho principal é home → resultados → detalhe → adoção. Sugestão de roteiro:

**Busca e filtros (/resultados)**

- O contador acima do card mostra "30 cães encontrados" e cai pra "1 cão
  encontrado" no singular.
- Digita "beagle" na busca → sobra 1 resultado. Ela entende português: "pastor"
  acha o German Shepherd, "brincalhão" acha raças playful.
- Combina Porte + Idade + Sexo nos selects de baixo. Com filtro ativo aparece
  "Limpar filtros", que zera tudo.
- Troca as abas Todos / Disponíveis / Favoritos / Adotados.
- Paginação em 8 por página: navega entre as páginas e confere o resumo
  "1 a 8 de 30".

**Favoritos e adoção**

- Favorita direto no card ou na ficha — o contador da aba Favoritos sobe na hora.
- Abre um cão disponível e clica em Quero adotar. São 4 etapas: dados, lar,
  rotina e revisão. Tenta avançar sem preencher, a validação bloqueia.
- No passo 4 aparece o resumo de tudo que foi digitado. Enviou, vem a tela
  "Solicitação enviada!".
- Cão adotado sai da aba Disponíveis, entra em Adotados e tentar adotar de novo
  cai numa tela dizendo que já foi adotado.

**Persistência**

- Favoritou ou adotou? Dá F5 e confere que continua lá (localStorage, chave
  `patinhas:portal-v2`).
- Busca "labrador", navega pra home e volta: a busca continua aplicada.

**Resto**

- /como-adotar: FAQ começa fechado e abre no clique.
- /quero-ajudar: botão do PIX copia a chave e mostra "Chave copiada!".
- /sobre, rodapé com newsletter e menu no mobile (encolhe a janela pra 390px
  ou usa o modo device do DevTools).
- Pra zerar o estado do portal, limpa o localStorage do site.

## Notas

- Idade, sexo e porte não vêm da API: são derivados no `app/utils/raca.ts` de
  forma determinística (mesmo cão, sempre a mesma resposta).
- Fontes e favicon são servidos de `public/`, sem CDN em runtime.
