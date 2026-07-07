# Bioinform.art - Guia de Uso

## Estrutura de Arquivos

```
bioinform.art/
├── index.html          (só cria uma vez!)
├── styles.css          (design)
├── app.js              (lógica)
├── data/
│   └── obras.json      (AQUI você adiciona obras)
├── imagens/
│   ├── obra1.jpg
│   ├── obra2.jpg
│   └── ...
└── INSTRUCOES.md       (este arquivo)
```

## Como Adicionar uma Obra

### 1. Upload da imagem
- Coloque a imagem na pasta `imagens/`
- Nome sugerido: `obra1.jpg`, `obra2.jpg`, etc.

### 2. Editar `data/obras.json`
Adicione uma entrada como esta:

```json
{
  "id": 6,
  "titulo": "Título da Obra",
  "artista": "Seu Nome",
  "descricao": "Descrição breve da obra",
  "imagem": "imagens/obra6.jpg",
  "ano": 2024,
  "link_codigo": "https://github.com/seu-usuario/repo",
  "link_projeto": "https://seu-site.com/projeto",
  "status": "publicado"
}
```

### 3. Pronto!
Salve o arquivo e recarregue o navegador. O card aparecerá automaticamente.

## Campos Explicados

- **id**: número único (1, 2, 3...)
- **titulo**: nome da obra
- **artista**: seu nome (ou deixe em branco)
- **descricao**: texto curto explicando a obra
- **imagem**: caminho para a imagem (importante: `imagens/` com acento!)
- **ano**: ano de criação
- **link_codigo**: URL para GitHub, GitLab, etc. (opcional, use `null` se não houver)
- **link_projeto**: URL para ver o projeto ao vivo (opcional, use `null` se não houver)
- **status**: `"publicado"` ou `"rascunho"`

## Filtros

Os filtros no topo funcionam automaticamente:
- **Todas**: mostra tudo
- **Publicadas**: mostra apenas obras com `"status": "publicado"`
- **Rascunhos**: mostra apenas `"status": "rascunho"`

## Dicas

- Use `"status": "rascunho"` para obras que ainda não estão prontas
- Deixe `link_codigo` e `link_projeto` como `null` se não houver link
- Imagens em formato JPG, PNG ou WebP funcionam bem
- Tamanhos: prefira imagens de ~800x600px ou mais
- Não altere `index.html`, `styles.css` ou `app.js`

## Exemplo Completo

```json
[
  {
    "id": 1,
    "titulo": "Abstrações Genômicas",
    "artista": "Seu Nome",
    "descricao": "Visualização de padrões em sequências de DNA",
    "imagem": "imagens/trabalho1.jpg",
    "ano": 2024,
    "link_codigo": "https://github.com/usuario/repo",
    "link_projeto": "https://exemplo.com/projeto",
    "status": "publicado"
  }
]
```

## Problemas?

- **Imagem não aparece**: verifique se o arquivo existe em `imagens/` com o nome correto
- **JSON inválido**: use um validador JSON online (jsonlint.com)
- **Página em branco**: abra o console (F12) e veja se tem erro
