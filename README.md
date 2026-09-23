# El Botiquín de Keiko

Landing page estática do ebook **El Botiquín de Keiko**.

## Publicar no GitHub Pages

1. Crie um repositório vazio no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório.
3. Faça o primeiro `push` para a branch `main`.
4. No GitHub, abra **Settings → Pages**.
5. Em **Build and deployment**, selecione **GitHub Actions**.
6. O GitHub exibirá a URL pública em alguns minutos.

Não há etapa de build: a landing funciona como site estático.

## Atualizações futuras

Depois de alterar qualquer arquivo nesta pasta, publique com:

```powershell
git add .
git commit -m "Atualiza landing"
git push
```

Cada `git push` para a branch `main` dispara o deploy automático. A página pública é atualizada sem reenviar arquivos manualmente.

## Checkout

Todos os botões de compra apontam para:

`https://pay.hotmart.com/B107729661U`
