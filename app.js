let todasObras = [];
let filtroAtivo = 'todos';
const STORAGE_KEY = 'bioinform_obras_locais';

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarObras();
    configurarFiltros();
    configurarModal();
    configurarFormulario();
});

// ============ MODAL ============
function configurarModal() {
    const modal = document.getElementById('modal-nova-obra');
    const btnNovaObra = document.querySelector('.btn-nova-obra');
    const btnClose = document.querySelector('.modal-close');
    const btnCancelar = document.querySelector('.btn-cancelar');

    // Abrir modal
    btnNovaObra.addEventListener('click', () => {
        modal.classList.add('active');
    });

    // Fechar modal
    const fecharModal = () => {
        modal.classList.remove('active');
        document.getElementById('form-nova-obra').reset();
        document.getElementById('preview-imagem').innerHTML = '';
    };

    btnClose.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });
}

// ============ FORMULÁRIO ============
function configurarFormulario() {
    const form = document.getElementById('form-nova-obra');
    const inputImagem = document.getElementById('imagem');
    const previewImagem = document.getElementById('preview-imagem');

    // Preview de imagem
    inputImagem.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImagem.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Submeter formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capturar dados
        const titulo = document.getElementById('titulo').value.trim();
        const artista = document.getElementById('artista').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
        const ano = parseInt(document.getElementById('ano').value);
        const link_codigo = document.getElementById('link_codigo').value.trim() || null;
        const link_projeto = document.getElementById('link_projeto').value.trim() || null;
        const status = document.getElementById('status').value;
        const fileImagem = inputImagem.files[0];

        // Validar
        if (!fileImagem) {
            alert('Por favor, selecione uma imagem');
            return;
        }

        // Converter imagem para base64
        const reader = new FileReader();
        reader.onload = (event) => {
            const novaObra = {
                id: Date.now(), // ID único baseado em timestamp
                titulo,
                artista,
                descricao,
                imagem: event.target.result, // Base64
                ano,
                link_codigo,
                link_projeto,
                status
            };

            // Salvar em localStorage
            salvarObraLocal(novaObra);

            // Feedback ao usuário
            alert('✅ Obra submetida com sucesso!');

            // Limpar e fechar
            document.getElementById('modal-nova-obra').classList.remove('active');
            form.reset();
            previewImagem.innerHTML = '';

            // Recarregar galeria
            carregarObras();
        };
        reader.readAsDataURL(fileImagem);
    });
}

// Salvar obra em localStorage
function salvarObraLocal(obra) {
    let obrasLocais = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    obrasLocais.push(obra);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obrasLocais));
}

// Carregar obras do JSON e localStorage
async function carregarObras() {
    try {
        // Carregar do JSON
        const response = await fetch('data/obras.json');
        if (!response.ok) throw new Error('Erro ao carregar obras');
        todasObras = await response.json();

        // Carregar do localStorage
        const obrasLocais = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todasObras = [...todasObras, ...obrasLocais];

        renderizarGaleria();
    } catch (erro) {
        console.error('Erro:', erro);
        document.getElementById('vazio').style.display = 'block';
        document.getElementById('vazio').textContent = 'Erro ao carregar as obras. Verifique se data/obras.json existe.';
    }
}

// Configurar botões de filtro
function configurarFiltros() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroAtivo = btn.dataset.filter;
            renderizarGaleria();
        });
    });
}

// Renderizar galeria
function renderizarGaleria() {
    const galeria = document.getElementById('galeria');
    const vazio = document.getElementById('vazio');

    let obrasFiltradas = todasObras;

    if (filtroAtivo !== 'todos') {
        obrasFiltradas = todasObras.filter(obra => obra.status === filtroAtivo);
    }

    if (obrasFiltradas.length === 0) {
        galeria.innerHTML = '';
        vazio.style.display = 'block';
        return;
    }

    vazio.style.display = 'none';
    galeria.innerHTML = obrasFiltradas.map(obra => criarCard(obra)).join('');
}

// Criar card HTML
function criarCard(obra) {
    const statusClass = obra.status === 'publicado' ? 'publicado' : 'rascunho';
    const statusText = obra.status === 'publicado' ? 'Publicada' : 'Rascunho';

    let linksHTML = '';

    if (obra.link_codigo) {
        linksHTML += `<a href="${obra.link_codigo}" target="_blank">Ver Código</a>`;
    }

    if (obra.link_projeto) {
        linksHTML += `<a href="${obra.link_projeto}" target="_blank" class="secondary">Ver Projeto</a>`;
    }

    if (!linksHTML) {
        linksHTML = '<a href="#" onclick="return false;" style="opacity: 0.5; cursor: default;">Sem Links</a>';
    }

    return `
        <div class="card">
            <img src="${obra.imagem}" alt="${obra.titulo}" class="card-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagem não encontrada%3C/text%3E%3C/svg%3E'">
            <div class="card-content">
                <h3 class="card-title">${obra.titulo}</h3>
                <p class="card-artist">${obra.artista || 'Anônimo'}</p>
                <p class="card-descricao">${obra.descricao}</p>
                <div class="card-meta">
                    <span>${obra.ano || 'sem data'}</span>
                    <span class="card-status ${statusClass}">${statusText}</span>
                </div>
                <div class="card-links">
                    ${linksHTML}
                </div>
            </div>
        </div>
    `;
}
