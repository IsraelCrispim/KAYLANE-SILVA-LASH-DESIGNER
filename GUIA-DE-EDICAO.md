# Site Kaylane Silva — Guia de edição

Este pacote contém o projeto completo do site de **Kaylane Silva — Lash Designer**.

## Tecnologias utilizadas

- React e TypeScript (`.tsx` / `.ts`)
- HTML semântico dentro dos componentes React
- CSS e SASS/SCSS
- Bootstrap 5 (grid responsivo)
- JavaScript para menu, animações, vídeos, FAQ e formulário
- Vinext/Vite para desenvolvimento e geração da versão final

## Onde editar cada informação

### Nome, logo, Instagram e WhatsApp

Arquivo: `components/lash/LashLanding.tsx`

No início do arquivo estão:

- `WHATSAPP_NUMBER`: número no formato internacional, sem espaços ou símbolos;
- `INSTAGRAM_URL`: endereço completo do Instagram;
- função `whatsappUrl`: cria todos os links com mensagens personalizadas;
- componente `Brand`: controla logo, nome e subtítulo.

### Serviços, perguntas, galeria e depoimentos

Arquivo: `data/site.ts`

As listas estão separadas em:

- `services`;
- `recommendations`;
- `faqs`;
- `gallery`;
- `testimonials`.

### Cores, tamanhos e aparência

- `styles/scss/_variables.scss`: variáveis do Bootstrap;
- `styles/scss/site.scss`: estilo completo e responsividade;
- `app/globals.css`: cores globais e configurações básicas.

### Título do navegador e compartilhamento

Arquivo: `app/layout.tsx`

Edite título, descrição, palavras-chave e informações para redes sociais.

### Imagens e logo

Pasta: `public/assets/`

A logo atual está em `public/assets/kaylane-silva-logo.png`.

## Como executar no computador

É necessário instalar o Node.js 22 ou superior.

No terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Observações

- As fotos e os vídeos demonstrativos são carregados de endereços externos do Pexels.
- O projeto foi organizado por componentes, dados, estilos e arquivos públicos para facilitar futuras alterações.
- A pasta `node_modules` não acompanha o ZIP porque é recriada automaticamente pelo comando `npm install`.
