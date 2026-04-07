function mudarAba(numero) {
    console.log(`%c📑 Mudando para aba ${numero}`, 'color: #0066cc; font-weight: bold;');
    
    // Esconder todas as abas
    document.querySelectorAll('.oeste-tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.oeste-tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Mostrar aba selecionada
    const tabElement = document.getElementById(`tab${numero}`);
    const btnElement = document.getElementById(`tab${numero}Btn`);
    
    if (tabElement) tabElement.classList.add('active');
    if (btnElement) btnElement.classList.add('active');

    // Ações específicas por aba
    if (numero === 0) {
        // ABA 0: REGIÃO
        gerarFaixasInline();
        gerarBotoesRegiao();
    }

    if (numero === 1) {
        // ABA 1: DADOS DO CLIENTE
        carregarCidades();  // ⭐ ADICIONE ESTA LINHA
        atualizarStatusValidacao();
    }
    if (numero === 2) {
        // ABA 2: TIPO DE PLANO
        if (!selectedRegion) {
            showTutorialModal(1); // ⭐ Mostra tutorial de dados obrigatórios
            mudarAba(0);
            return;
        }
        gerarBotoesTipo();
    }

    if (numero === 3) {
        // ABA 3: CONFIGURAÇÃO
        if (!selectedType) {
            showTutorialModal(1); // ⭐ Mostra tutorial de dados obrigatórios
            mudarAba(2);
            return;
        }
        atualizarPlanosCheckboxes();
        atualizarTaxaAdmSection();
        atualizarDescontosAdicionaisSection();
        atualizarPlanoOdontologicoSection();
    }

    if (numero === 4) {
        // ABA 4: FAIXAS ETÁRIAS
        gerarFaixasInline();
    }

    if (numero === 5) {
        // ABA 5: RESULTADO
        // Renderizar resultado já foi feito em gerarComparacao()
    }
}

/**
 * Gerar botões de região
 */
function gerarBotoesRegiao() {
    const container = document.getElementById('botoesRegiaoContainer');
    if (!container) {
        console.warn('⚠️ Container de regiões não encontrado');
        return;
    }
    
    container.innerHTML = '';

    const colunas = {
        'Oeste': {
            titulo: 'Oeste Saúde',
            classe: 'regiao-oeste',
            regioes: ['Oeste Paulista (SP)', 'Dourados (MS)']
        },
        'Corpe': {
            titulo: 'Corpe',
            classe: 'regiao-corpe',
            regioes: ['Corpe (SP)', 'Corpe (MS)', 'Corpe (DRD)']
        },
        'Lancers': {
            titulo: 'Lancers',
            classe: 'regiao-lancers',
            regioes: ['Lancers (SP)', 'Lancers (MS)', 'Lancers (DRD)']
        }
    };

    Object.values(colunas).forEach(coluna => {
        const colunaDiv = document.createElement('div');
        colunaDiv.className = 'regiao-coluna';

        const titulo = document.createElement('div');
        titulo.className = 'regiao-coluna-titulo';
        titulo.textContent = coluna.titulo;
        colunaDiv.appendChild(titulo);

        coluna.regioes.forEach(regiao => {
            const btn = document.createElement('button');
            btn.className = `btn-regiao-colorido ${coluna.classe}`;
            btn.textContent = regiao;
            btn.onclick = (e) => selecionarRegiao(regiao, e.target);
            colunaDiv.appendChild(btn);
        });

        container.appendChild(colunaDiv);
    });
}

function selecionarRegiao(regiao, btn) {
    console.log(`%c🌍 Região selecionada: ${regiao}`, 'color: #16a34a; font-weight: bold;');
    
    selectedRegion = regiao;
    selectedType = '';
    
    // Remover seleção anterior
    document.querySelectorAll('#botoesRegiaoContainer .btn-regiao-colorido').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    // ⭐ MOSTRAR INDICATIVO DE REGIÃO SELECIONADA
    const indicativo = document.getElementById('indicativoRegiaoSelecionada');
    const nomeRegiao = document.getElementById('nomeRegiaoSelecionada');
    
    if (indicativo && nomeRegiao) {
        nomeRegiao.textContent = regiao;
        indicativo.classList.remove('hidden');
        console.log('%c✅ Indicativo de região exibido', 'color: #16a34a; font-weight: bold;');
    }
    
    // ⭐ CARREGAR CIDADES QUANDO A REGIÃO É SELECIONADA
    carregarCidades();
    
    // ⭐ AUTO-AVANÇAR PARA ABA DE DADOS DO CLIENTE
    setTimeout(() => {
        console.log('%c⚡ Auto-avançando para dados do cliente...', 'color: #00A8B0; font-weight: bold;');
        mudarAba(1);
    }, 400); // Pequeno delay para animação suave
}

/**
 * Gerar botões de tipo
 */
function gerarBotoesTipo() {
    const container = document.getElementById('botoestipoContainer');
    if (!container) {
        console.warn('⚠️ Container de tipos não encontrado');
        return;
    }
    
    if (!selectedRegion) {
        console.warn('⚠️ Nenhuma região selecionada');
        return;
    }

    const regiao = APP_DATA.regioes[selectedRegion];
    if (!regiao) {
        console.warn('⚠️ Região não encontrada em APP_DATA');
        return;
    }

    const tipos = Object.keys(regiao.tipos);
    
    container.innerHTML = '';
    tipos.forEach(tipo => {
        const btn = document.createElement('button');
        btn.className = 'btn-tipo';
        btn.setAttribute('data-tipo', tipo);
        btn.textContent = tipo;
        btn.onclick = (e) => selecionarTipo(tipo, e.target);
        container.appendChild(btn);
    });
}
// Também chamar quando mudar de aba
const abas = document.querySelectorAll('[data-tab]');
abas.forEach(aba => {
    aba.addEventListener('click', () => {
        setTimeout(() => {
            carregarCidades();
        }, 100);
    });
});
        
/**
 * Selecionar tipo de plano
 */
function selecionarTipo(tipo, btn) {
    console.log(`%c📋 Tipo selecionado: ${tipo}`, 'color: #16a34a; font-weight: bold;');
    
    selectedType = tipo;
    
    // Remover seleção anterior
    document.querySelectorAll('#botoestipoContainer .btn-tipo').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    // Habilitar botão de próximo
    const btnProximo = document.getElementById('btnProximoTipo');
    if (btnProximo) {
        btnProximo.disabled = false;
        btnProximo.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Atualizar seções
    atualizarDescontosAdicionaisSection();
    atualizarPlanoOdontologicoSection();
}

/**
 * Validar dados obrigatórios do cliente
 */
function validarDadosCliente() {
    const nome = document.getElementById('nomeCliente')?.value.trim() || '';
    const email = document.getElementById('emailCliente')?.value.trim() || '';
    const telefone = document.getElementById('telefonecliente')?.value.trim() || '';
    const cidade = document.getElementById('cidade')?.value?.trim() || ''; // ⭐ ADICIONAR

    // Validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regexEmail.test(email);

    // Validar telefone (mínimo 10 dígitos)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const telefoneValido = telefoneLimpo.length >= 10;

    // ⭐ VALIDAR CIDADE
    const cidadeValida = cidade.length > 0;

    // ⭐ INCLUIR CIDADE NA VALIDAÇÃO GERAL
    const todosPreenchidos = nome.length > 0 && emailValido && telefoneValido && cidadeValida;

    console.log('%c📋 Validação de Dados do Cliente:', 'color: #0066cc; font-weight: bold;');
    console.log('Nome:', nome.length > 0 ? '✅' : '❌');
    console.log('Email:', emailValido ? '✅' : '❌');
    console.log('Telefone:', telefoneValido ? '✅' : '❌');
    console.log('Cidade:', cidadeValida ? '✅' : '❌'); // ⭐ ADICIONAR

    return {
        valido: todosPreenchidos,
        nome: nome.length > 0,
        email: emailValido,
        telefone: telefoneValido,
        cidade: cidadeValida // ⭐ ADICIONAR
    };
}

function atualizarStatusValidacao() {

    const validacao = validarDadosCliente();
    const btnSelecionarTipo = document.getElementById('btnSelecionarTipo');
    const avisoValidacao = document.getElementById('avisoValidacaoDados');

    if (btnSelecionarTipo) {
        if (validacao.valido) {
            btnSelecionarTipo.disabled = false;
            btnSelecionarTipo.classList.remove('opacity-50', 'cursor-not-allowed');
            if (avisoValidacao) avisoValidacao.classList.add('hidden');
        } else {
            btnSelecionarTipo.disabled = true;
            btnSelecionarTipo.classList.add('opacity-50', 'cursor-not-allowed');
            
            // ⭐ Mostrar tutorial ao clicar no botão desabilitado
            btnSelecionarTipo.addEventListener('click', (e) => {
                if (btnSelecionarTipo.disabled) {
                    e.preventDefault();
                    showTutorialModal(1); // ⭐ Mostra tutorial de dados obrigatórios
                }
            }, { once: true });
            
            if (avisoValidacao) {
                avisoValidacao.classList.remove('hidden');
                
                // Atualizar mensagem de erro
                let mensagens = [];
                if (!validacao.nome) mensagens.push('Nome do cliente');
                if (!validacao.email) mensagens.push('Email válido');
                if (!validacao.telefone) mensagens.push('Telefone válido');
                if (!validacao.cidade) mensagens.push('Cidade'); // ⭐ ADICIONAR
                
                avisoValidacao.innerHTML = `
                    <p class="text-sm font-bold text-red-800">
                        <i class="fas fa-exclamation-circle"></i>
                        Preencha os dados obrigatórios:
                    </p>
                    <ul class="text-xs text-red-700 mt-2 ml-4">
                        ${mensagens.map(m => `<li>• ${m}</li>`).join('')}
                    </ul>
                `;
            }
        }
    }
}
// ===== CARREGAR CIDADES QUANDO REGIÃO É SELECIONADA =====
function carregarCidades() {
    try {
        const regiao = selectedRegion; // Região já selecionada
        const selectCidade = document.getElementById('cidade');
        
        console.log('%c🏙️ Carregando cidades para:', 'color: #0066cc; font-weight: bold;', regiao);
        
        if (!selectCidade) {
            console.warn('⚠️ Elemento #cidade não encontrado!');
            return;
        }
        
        if (!CIDADES_POR_REGIAO) {
            console.error('❌ CIDADES_POR_REGIAO não está definido!');
            return;
        }
        
        // ⭐ SEMPRE LIMPAR E RECARREGAR (REMOVA A VERIFICAÇÃO ANTERIOR)
        selectCidade.innerHTML = '<option value="">Selecione uma cidade...</option>';
        
        // Adicionar cidades da região
        if (CIDADES_POR_REGIAO[regiao]) {
            CIDADES_POR_REGIAO[regiao].forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade;
                option.textContent = cidade;
                selectCidade.appendChild(option);
            });
            console.log(`%c✅ ${CIDADES_POR_REGIAO[regiao].length} cidades carregadas para ${regiao}`, 'color: #16a34a; font-weight: bold;');
        } else {
            console.warn('⚠️ Nenhuma cidade encontrada para a região:', regiao);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar cidades:', error);
    }
}
    // ===== EVENT LISTENER PARA O SELECT DE CIDADE =====
document.addEventListener('DOMContentLoaded', () => {
    const selectCidade = document.getElementById('cidade');
    
    if (selectCidade) {
        selectCidade.addEventListener('change', () => {
            console.log('%c🏙️ Cidade selecionada:', 'color: #0066cc; font-weight: bold;', selectCidade.value);
            
            // ⭐ ATUALIZAR STATUS DE VALIDAÇÃO QUANDO CIDADE MUDA
            atualizarStatusValidacao();
        });
    }
});
console.log('%c✅ Navigation carregado', 'color: #16a34a; font-weight: bold;');

// Event listener para o botão "Nova Cotação"
document.addEventListener('DOMContentLoaded', () => {
    const btnNovaComparacao = document.getElementById('btnNovaComparacao');
    if (btnNovaComparacao) {
        btnNovaComparacao.addEventListener('click', () => {
            console.log('%c🔄 Botão "Nova Cotação" clicado', 'color: #00A8B0; font-weight: bold;');
            novaComparacao();
        });
    }
});
// showLogoutModal.js

/**
 * Exibe um modal de logout elegante com opções de cancelar ou confirmar.
 * Após a confirmação, exibe uma mensagem de despedida e redireciona para a página de login.
 *
 * Requer FontAwesome para os ícones (ex: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">)
 */
function showLogoutModal() {
    console.log('showLogoutModal: Iniciando exibição do modal de logout.');

    // Evita criar múltiplos modais se já existir um
    if (document.getElementById('logoutModalOverlay')) {
        console.log('showLogoutModal: Modal de logout já existe, abortando criação.');
        return;
    }

    // 1. Cria o overlay (fundo escuro)
    const overlay = document.createElement('div');
    overlay.id = 'logoutModalOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0; /* Para animação de entrada */
        transition: opacity 0.3s ease-in-out;
    `;

    // 2. Cria o card do modal
    const modalCard = document.createElement('div');
    modalCard.id = 'logoutModalCard';
    modalCard.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 400px;
        width: 90%;
        transform: translateY(-20px); /* Para animação de entrada */
        transition: transform 0.3s ease-in-out;
    `;

    // 3. Ícone de logout
    const icon = document.createElement('i');
    icon.className = 'fas fa-sign-out-alt'; // Ícone FontAwesome
    icon.style.cssText = `
        font-size: 48px;
        color: #00A8B0; /* Cor turqueza */
        margin-bottom: 20px;
    `;

    // 4. Mensagem principal
    const mainMessage = document.createElement('p');
    mainMessage.id = 'logoutMainMessage';
    mainMessage.textContent = 'Tem certeza que deseja sair?';
    mainMessage.style.cssText = `
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 25px;
    `;

    // 5. Container para os botões
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 15px;
    `;

    // Botão "Cancelar"
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.style.cssText = `
        padding: 12px 25px;
        border: 2px solid #ccc;
        border-radius: 8px;
        background-color: transparent;
        color: #555;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    `;
    cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#f0f0f0';
    cancelButton.onmouseout = () => cancelButton.style.backgroundColor = 'transparent';

    // Botão "Sair"
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Sair';
    logoutButton.style.cssText = `
        padding: 12px 25px;
        border: none;
        border-radius: 8px;
        background-color: #00A8B0; /* Cor turqueza */
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
    `;
    logoutButton.onmouseover = () => logoutButton.style.backgroundColor = '#008B94'; // Turqueza mais escuro no hover
    logoutButton.onmouseout = () => logoutButton.style.backgroundColor = '#00A8B0';

    // Adiciona os botões ao container
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(logoutButton);

    // Adiciona os elementos ao card do modal
    modalCard.appendChild(icon);
    modalCard.appendChild(mainMessage);
    modalCard.appendChild(buttonContainer);
    overlay.appendChild(modalCard);
    document.body.appendChild(overlay);

    // Animação suave de entrada
    setTimeout(() => {
        overlay.style.opacity = '1';
        modalCard.style.transform = 'translateY(0)';
    }, 10); // Pequeno atraso para garantir que o CSS inicial seja aplicado antes da transição

    // Função para fechar o modal
    const closeModal = () => {
        console.log('showLogoutModal: Fechando modal.');
        overlay.style.opacity = '0';
        modalCard.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.getElementById('logoutModalOverlay')) {
                document.body.removeChild(overlay);
            }
        }, 300); // Tempo igual à duração da transição CSS
    };

    // Ação do botão "Cancelar"
    cancelButton.addEventListener('click', () => {
        console.log('showLogoutModal: Botão "Cancelar" clicado.');
        closeModal();
    });

    // Ação do botão "Sair"
    logoutButton.addEventListener('click', () => {
        console.log('showLogoutModal: Botão "Sair" clicado. Iniciando processo de logout...');
        
        // Simula o processo de logout (ex: limpar sessão, chamar API)
        // Para este exemplo, vamos apenas mudar a mensagem e redirecionar.

        // Altera o conteúdo do modal para a mensagem de despedida
        icon.className = 'fas fa-check-circle'; // Ícone de sucesso
        icon.style.color = '#16a34a'; // Cor verde
        mainMessage.textContent = 'Até logo! Você foi desconectado com sucesso.';
        buttonContainer.innerHTML = ''; // Remove os botões

        // Opcional: Adicionar um spinner ou barra de progresso se o logout demorar
        // Em seguida, redireciona após um pequeno atraso para o usuário ler a mensagem
        setTimeout(() => {
            console.log('showLogoutModal: Redirecionando para /login.');
            window.location.href = '/login'; // Redireciona para a página de login
        }, 1500); // Tempo para o usuário ler a mensagem de despedida
    });

    // Fecha o modal se clicar fora dele (no overlay)
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            console.log('showLogoutModal: Clicou fora do modal, fechando.');
            closeModal();
        }
    });

}


