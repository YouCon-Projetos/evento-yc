## Deploy (regra obrigatória, não improvise)

Este projeto **não usa a integração Git da Vercel**. O deploy roda por GitHub
Actions, pelo arquivo `.github/workflows/deploy.yml`.

**Nunca faça, mesmo que pareça o caminho natural:**

- `vercel git connect`, `vercel link` para religar o Git, ou conectar o repo
  pelo painel da Vercel em Settings > Git.
- Sugerir que o usuário reconecte o repositório na Vercel.
- Trocar o workflow por deploy via integração nativa.

O motivo: o plano Hobby recusa repositório privado que pertence a uma
organização do GitHub. A integração nativa não funciona aqui e tentar religá-la
só queima tempo.

**O commit tem que ser assinado com `EMAIL`.** A Vercel identifica o autor pelo
e-mail do commit, não pelo login do GitHub, que é sempre `guimunizramos`.
E-mail errado faz o deploy voltar `BLOCKED` com "the commit author doesn't have
permission to create deployments for this project". Antes de commitar, confirme
com `git config user.email`.

**Ao mexer no workflow:** `corepack enable` vem antes do `actions/setup-node`.
Invertido, quebra com "Unable to locate executable file: pnpm".

**Ao verificar um deploy:** workflow verde no GitHub não é prova. Confirme o
estado na Vercel, `READY` é sucesso e `BLOCKED` quase sempre é e-mail errado.

Para configurar isso num repo novo, use a skill `deploy-actions-vercel`.
