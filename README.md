# Construa um SaaS AI Companion com Next.js 13, React, Tailwind, Prisma, Stripe | Tutorial Completo 2023

Características:

- Design de vento favorável
- Animações e efeitos Tailwind
- Capacidade de resposta total
- Autenticação de funcionário (e-mail, Google, mais de 9 logins sociais)
- Validação e tratamento do formulário do cliente usando react-hook-form
- Tratamento de erros do servidor usando react-toast
- Ferramenta de geração de imagens (Open AI)
- Ferramenta de geração de vídeo (Replicar AI)
- Ferramenta de geração de conversas (Open AI)
- Ferramenta de geração de música (Replicar AI)
- Estado de carregamento da página
- Assinatura mensal Stripe
- Nível gratuito com limitação de API
- Como escrever rotas POST, DELETE e GET em manipuladores de rotas (app/api)
- Como buscar dados nos componentes de reação do servidor acessando diretamente o banco de dados (SEM API! como Magic!)
- Como lidar com relações entre componentes Servidor e Filho!
- Como reutilizar layouts
- Estrutura de pastas no Next 13 App Router

### Pré-requisitos

**Node versão 18.x.x**

### Clonando o repositório

```shell
clone do git https://github.com/AntonioErdeljac/next13-ai-saas.git
```

### Instalar pacotes

```shell
npm i
```

### Configuração do arquivo .env

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Instalação prisma

Adicionar banco de dados MySQL (usei PlanetScale)

```shell
npx prisma db push

```

Categorias:
```shell
node scripts/seed.ts
```

### Iniciar aplicação

```shell
npm run dev
```

## Comando disponíveis 

Running commands with npm `npm run [command]`

| command         | desrição                             |
| :-------------- | :----------------------------------- |
| `dev`           |Inicia desenvolvimento do aplicativo  |
