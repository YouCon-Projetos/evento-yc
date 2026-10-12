## Deploy (regra obrigatória, não improvise)

Publica-se **só pelo Mac**, com `~/Scripts/publicar.sh` rodado na pasta do
projeto, no ramo `main` e sem nada por commitar. Ele envia o commit ao GitHub e
publica exatamente esse commit na Vercel, com a conta certa e build remoto
(conta e projeto em `~/Scripts/projetos-vercel.tsv`).

**Nunca faça, mesmo que pareça o caminho natural:**

- GitHub Actions, para nada. Desde 12/10/2026 ele fica **desligado** em todos os
  repositórios: foi o uso dele que levou à suspensão da conta do GitHub (15/09 a
  10/10/2026).
- Ligar o repositório à Vercel pelo Git (`vercel git connect`, Settings > Git).
  O GitHub só guarda o código; quem publica é o Mac.
- Publicar o que não está no `main` do GitHub. Deploy de base velha desfaz o
  trabalho de outra sessão sem erro nenhum, e o `publicar.sh` recusa.

Detalhes e o porquê: skill `regras-vercel`.
