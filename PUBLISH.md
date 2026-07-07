# Publicar conteúdo (obras.json)

Agora a galeria carrega os cards do arquivo **`obras.json`** (na raiz, ao lado do `index.html`).
Esse arquivo é o conteúdo **público** — o que todo visitante vê.

## Fluxo para editar a galeria

1. Abra o site e clique em **Admin** → faça login
   (usuário `hylix.curator`, senha `Cobalt-isotope-4278`).
2. **Adicione** obras pelo formulário e/ou **exclua** cards (botão *Delete* em cada card).
   Essas mudanças ficam só no **seu navegador** por enquanto.
3. Clique em **Download obras.json** (barra abaixo do formulário).
   Isso baixa a galeria inteira já com suas mudanças.
4. Substitua o `obras.json` do repositório por esse arquivo baixado e faça
   **commit/push** (ou arraste a pasta de novo no Netlify).
5. Assim que o Netlify republicar, as mudanças valem **para todos**.

> **Discard local edits** (na mesma barra) descarta suas mudanças não publicadas
> e recarrega a versão publicada.

## Observações

- Enquanto você não faz commit do `obras.json`, suas edições existem só no seu navegador.
- Depois de publicar, não precisa limpar nada: o site evita cards duplicados
  comparando os IDs.
- **Teste local:** abrir o `index.html` com duplo clique (file://) faz o `fetch`
  do `obras.json` falhar e a galeria fica vazia. Teste no site publicado, ou rode
  um servidor local: `python -m http.server` dentro da pasta e acesse
  `http://localhost:8000`.
- Sempre faça commit de **`index.html` + `obras.json`** juntos.

## Login de admin

Para trocar usuário/senha, edite estas linhas no `<script>` do `index.html`:

```js
const ADMIN_USER='hylix.curator';
const ADMIN_PASS='Cobalt-isotope-4278';
```

Lembre: é um portão do lado do cliente (a senha fica visível no código da página).
Segurança real só com backend (Supabase), fase seguinte.
