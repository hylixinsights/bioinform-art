# Formulário de Submissão de Obras

## ✅ O que foi adicionado

### 1. **Botão "+ Nova Obra"** (canto direito da nav)
   - Abre modal com formulário
   - Estilo destacado em rosa/secundário
   - Responsivo em mobile

### 2. **Modal com Formulário**
   Campos inclusos:
   - **Título** (obrigatório)
   - **Artista** (obrigatório)
   - **Descrição** (obrigatório, textarea)
   - **Ano** (obrigatório, 2000-2100)
   - **Imagem** (obrigatório, com preview)
   - **Link do Código** (opcional)
   - **Link do Projeto** (opcional)
   - **Status** (obrigatório: Rascunho ou Publicado)

### 3. **Salvamento Local**
   - Dados salvos em **localStorage** do navegador
   - Imagens convertidas para **base64** (sem upload de servidor)
   - Funciona offline/sem backend

### 4. **Integração com Galeria**
   - Obras submetidas aparecem junto com obras do `data/obras.json`
   - Filtros funcionam normalmente (Todas/Publicadas/Rascunhos)
   - ID único por timestamp

## 🚀 Como usar

1. **Abrir o site** → Clique em "+ Nova Obra"
2. **Preencher formulário** → Todos os campos obrigatórios
3. **Enviar** → Clique em "Submeter Obra"
4. **Confirmar** → Alert de sucesso, galeria atualiza automaticamente

## 💾 Armazenamento

- **localStorage key**: `bioinform_obras_locais`
- **Persistência**: Dados ficam salvos mesmo depois de fechar/reabrir o navegador
- **Limite**: ~5-10MB por origem (dependendo do navegador)

## 📱 Responsivo?

Sim! Testado em:
- ✅ Desktop (full size modal)
- ✅ Tablet (modal 95% width)
- ✅ Mobile (teclado adapta, layout em coluna)

## 🔄 Próximos passos

1. **Editor visual** → Editar/deletar obras submetidas
2. **Exportar JSON** → Baixar obras como arquivo para copiar pro data/obras.json
3. **Supabase** → Sincronizar localStorage com backend
4. **Página individual** → View detalhada por obra (modal/página dedicada)

## 📝 Estrutura da Obra (localStorage)

```json
{
  "id": 1720346400000,
  "titulo": "Minha Obra",
  "artista": "Meu Nome",
  "descricao": "Descrição aqui",
  "imagem": "data:image/jpeg;base64,...",
  "ano": 2024,
  "link_codigo": "https://github.com/...",
  "link_projeto": null,
  "status": "rascunho"
}
```

## ⚠️ Limitações (por enquanto)

- Imagens em base64 podem ficar pesadas no localStorage
- Sem sincronização entre abas/dispositivos
- Sem backup automático
- Sem autenticação (qualquer um pode submeter)

→ Tudo será resolvido na fase Supabase! 🎯
