// vendors.js

// 
// FUNÇÕES DE GERENCIAMENTO DE VENDEDORES
// Este arquivo contém a lógica para criar novos vendedores no Firebase.
// 

console.log('%c📦 Carregando módulo de vendedores...', 'color: #8b5cf6; font-weight: bold;');

// Assumimos que 'firebase' e 'LOADING_SERVICE' são carregados globalmente
// pelo seu 'config.js' e outro script de utilitários, respectivamente.

/**
 * Aguarda a inicialização dos serviços de autenticação e database do Firebase.
 * Isso garante que `firebase.auth()` e `firebase.database()` estejam disponíveis.
 * @returns {Promise<void>} Uma promessa que resolve quando os serviços estão prontos.
 */
async function waitForFirebaseServices() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50; // Tenta por até 5 segundos (50 * 100ms)
        const intervalTime = 100; // Verifica a cada 100ms

        const checkServices = () => {
            // Verifica se o objeto global 'firebase' existe e se seus módulos 'auth' e 'database' estão disponíveis
            if (typeof firebase !== 'undefined' && firebase.auth && firebase.database) {
                console.log('%c✅ Firebase Auth e Database disponíveis para vendedores!', 'color: #16a34a;');
                resolve();
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(checkServices, intervalTime);
            } else {
                console.error('%c❌ Firebase Auth ou Database não disponíveis após 5 segundos!', 'color: #dc2626; font-weight: bold;');
                reject(new Error('Firebase Auth ou Database não inicializados. Verifique a ordem de carregamento dos scripts.'));
            }
        };
        checkServices();
    });
}

/**
 * Retorna a senha padrão para novos vendedores.
 * Mantém o nome da função original para compatibilidade, mas agora retorna uma senha fixa.
 * @returns {string} A senha padrão "Senha123!".
 */
function gerarSenhaAleatoria() {
    return 'Senha123!';
}

/**
 * Valida o formato de um email.
 * @param {string} email O email a ser validado.
 * @returns {boolean} True se o email for válido, false caso contrário.
 */
function validarEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Valida o formato de um telefone brasileiro (ex: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX).
 * Aceita formatos com ou sem parênteses, espaços e hífens.
 * @param {string} telefone O telefone a ser validado.
 * @returns {boolean} True se o telefone for válido, false caso contrário.
 */
function validarTelefone(telefone) {
    // Remove todos os caracteres não numéricos
    const digitos = telefone.replace(/\D/g, '');
    // Regex para 10 ou 11 dígitos (com DDD)
    // (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
    const re = /^\(?([0-9]{2})\)?\s?([0-9]{4,5})-?([0-9]{4})$/;
    return re.test(telefone) && (digitos.length === 10 || digitos.length === 11);
}

/**
 * Abre um modal elegante para criar um novo vendedor.
 * O modal inclui campos para Nome, Email e Telefone, e exibe a senha padrão.
 */
function abrirModalCriarVendedor() {
    console.log('%c✨ Abrindo modal de criação de vendedor...', 'color: #3b82f6;');

    // Remove qualquer modal existente para evitar duplicatas
    const existingModal = document.getElementById('criarVendedorModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Cria o elemento do overlay do modal
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'criarVendedorModal';
    modalOverlay.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300';
    modalOverlay.style.opacity = '0'; // Começa invisível para transição

    // Cria o elemento do conteúdo do modal
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform scale-95 transition-transform duration-300';
    modalContent.style.transform = 'scale(0.95)'; // Começa menor para transição

    // Conteúdo HTML do modal
    modalContent.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
            <i class="fas fa-user-plus text-blue-800 mr-2"></i> Criar Novo Vendedor
        </h2>

        <div class="mb-4">
            <label for="vendedorNome" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-signature mr-1"></i> Nome Completo
            </label>
            <input 
                type="text" 
                id="vendedorNome" 
                placeholder="Nome completo" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                oninput="this.value = this.value.toUpperCase()"
                required
            />
        </div>

        <div class="mb-4">
            <label for="vendedorEmail" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-envelope mr-1"></i> Email
            </label>
            <input 
                type="email" 
                id="vendedorEmail" 
                placeholder="email@exemplo.com" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="mb-6">
            <label for="vendedorTelefone" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-phone mr-1"></i> Telefone
            </label>
            <input 
                type="tel" 
                id="vendedorTelefone" 
                placeholder="(XX) XXXXX-XXXX" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-center">
            <p class="text-xs text-yellow-800 font-medium">
                <strong>⚠️ Senha Padrão:</strong> Senha123! O vendedor deverá alterá-la no primeiro acesso.
            </p>
        </div>

        <div class="flex justify-center gap-4 mt-8">
            <button id="cancelarCriarVendedor" class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition-colors">
                Cancelar
            </button>
            <button id="confirmarCriarVendedor" class="w-full oeste-btn-primary text-white rounded-lg hover:oeste-btn-primary  font-semibold transition-colors">
                <i class="fas fa-check mr-2"></i> Criar Vendedor
            </button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Adiciona transições de opacidade e escala
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10); // Pequeno delay para a transição CSS

    // Event Listeners para os botões
    document.getElementById('cancelarCriarVendedor').addEventListener('click', () => {
        console.log('%c🚫 Criação de vendedor cancelada.', 'color: #ef4444;');
        modalOverlay.remove(); // Remove o modal do DOM
    });

    document.getElementById('confirmarCriarVendedor').addEventListener('click', criarNovoVendedor);

    // Fechar modal ao clicar fora do conteúdo
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            console.log('%c🚫 Criação de vendedor cancelada (clique fora).', 'color: #ef4444;');
            modalOverlay.remove();
        }
    });
}

/**
 * Cria um novo vendedor no Firebase Authentication e salva seus dados no Firebase Realtime Database.
 * Realiza validações de campos e exibe mensagens de feedback.
 */
async function criarNovoVendedor() {
    console.log('%c🚀 Iniciando criação de novo vendedor...', 'color: #0066cc; font-weight: bold;');

    try {
        // Garante que os serviços Firebase Auth e Database estejam prontos antes de prosseguir
        await waitForFirebaseServices();

        // Coleta os valores dos campos do formulário
        const nomeVendedor = document.getElementById('vendedorNome').value.trim();
        const emailVendedor = document.getElementById('vendedorEmail').value.trim();
        const telefoneVendedor = document.getElementById('vendedorTelefone').value.trim();

        // --- Validação dos campos do lado do cliente ---
        if (!nomeVendedor) {
            LOADING_SERVICE.error('❌ Por favor, insira o nome completo do vendedor.');
            return;
        }
        if (!emailVendedor || !validarEmail(emailVendedor)) {
            LOADING_SERVICE.error('❌ Por favor, insira um email válido para o vendedor.');
            return;
        }
        if (!telefoneVendedor || !validarTelefone(telefoneVendedor)) {
            LOADING_SERVICE.error('❌ Por favor, insira um telefone válido (ex: (XX) XXXXX-XXXX).');
            return;
        }

        // ⭐ VALIDAR DOMÍNIO DO EMAIL
        if (!emailVendedor.endsWith('@oestesaude.com.br')) {
            mostrarModalDominioInvalido(emailVendedor);
            return;
        }

        // ⭐ FORMATAR DADOS
        const nomeFormatado = formatarNome(nomeVendedor);
        const telefoneFormatado = formatarTelefone(telefoneVendedor);

        LOADING_SERVICE.show('⏳ Criando vendedor...', 'default'); // Exibe mensagem de carregamento

        // ⭐ CHAMAR FUNÇÃO QUE CRIA NO FIREBASE
        await criarVendedorNoFirebase(emailVendedor, nomeFormatado, telefoneFormatado);

        // ⭐ FECHAR MODAL
        const modal = document.getElementById('criarVendedorModal');
        if (modal) {
            modal.remove();
        }

        console.log('%c🎉 Vendedor criado e modal fechado!', 'color: #22c55e; font-weight: bold;');

        // ⭐ MOSTRAR TELA DE SUCESSO
        LOADING_SERVICE.hide();
        mostrarSuccessScreenVendedor();

    } catch (error) {
        console.error('%c❌ Erro ao criar vendedor:', 'color: #dc2626; font-weight: bold;', error);
        let errorMessage = 'Erro desconhecido ao criar vendedor. Tente novamente.';

        // Trata erros específicos do Firebase Authentication
        if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Este email já está em uso por outra conta.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'O formato do email é inválido.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'A senha é muito fraca (mínimo 6 caracteres).';
                    break;
                default:
                    errorMessage = `Erro de autenticação: ${error.message}`;
            }
        } else {
            errorMessage = error.message;
        }
        LOADING_SERVICE.error(`❌ ${errorMessage}`);
    } finally {
        LOADING_SERVICE.hide();
    }
}
async function salvarVendedorPendente(email, nome, telefone) {
    try {
        const database = firebase.database();
        const ref = database.ref('vendedoresPendentes').push();
        
        await ref.set({
            email: email,
            nome: nome,
            telefone: telefone,
            dataSolicitacao: new Date().toISOString(),
            status: 'pendente'
        });
        
        console.log('✅ Vendedor pendente salvo:', email);
    } catch (erro) {
        console.error('❌ Erro ao salvar vendedor pendente:', erro);
        throw erro;
    }
}
async function criarVendedorNoFirebase(email, nomeFormatado, telefoneFormatado) {
    try {
        const auth = firebase.auth();
        const database = firebase.database();
        
        // Criar usuário no Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, 'Senha123!');
        const uid = userCredential.user.uid;
        
        // Salvar dados formatados no Realtime Database
        await database.ref(`users/${uid}`).set({
            email: email,
            nome: nomeFormatado, // ⭐ Nome em CAIXA ALTA
            telefone: telefoneFormatado, // ⭐ Telefone sem símbolos
            tipo: 'vendedor',
            aprovado: true
        });
        
        console.log('✅ Vendedor criado:', email);
        LOADING_SERVICE.success('✅ Vendedor criado com sucesso!');
        
    } catch (erro) {
        console.error('❌ Erro ao criar vendedor:', erro);
        LOADING_SERVICE.error('❌ Erro ao criar vendedor!');
        throw erro;
    }
}
function mostrarModalDominioInvalido(email) {
    // ⭐ Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.id = 'overlayDominioInvalido';
    
    // ⭐ Criar modal
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all';
    modal.innerHTML = `
        <div class="text-center">
            <i class="fas fa-exclamation-circle text-yellow-500 text-5xl mb-4"></i>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Email Inválido</h2>
            <p class="text-gray-600 mb-2">O email <strong>${email}</strong> não é do domínio autorizado.</p>
            <p class="text-gray-600 mb-6">Apenas emails <strong>@oestesaude.com.br</strong> podem ser cadastrados.</p>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p class="text-sm text-gray-700">
                    <i class="fas fa-phone text-blue-600 mr-2"></i>
                    <strong>Entre em contato com o suporte:</strong>
                </p>
                <p class="text-sm text-blue-600 font-semibold mt-2">(18) 99700-4277</p>
                <p class="text-sm text-blue-600 font-semibold">marketing@oestesaude.com.br</p>
            </div>
            
            <button onclick="fecharModalDominioInvalido()" class="w-full oeste-btn-primary py-3 text-base rounded-lg font-semibold">
                <i class="fas fa-check"></i> Entendi
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // ⭐ Fechar ao clicar no overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            fecharModalDominioInvalido();
        }
    });
}

function fecharModalDominioInvalido() {
    const overlay = document.getElementById('overlayDominioInvalido');
    if (overlay) {
        overlay.remove();
    }
}
// ⭐ Formatar nome para CAIXA ALTA
function formatarNome(nome) {
    return nome.trim().toUpperCase();
}

// ⭐ Formatar telefone removendo espaços e símbolos
function formatarTelefone(telefone) {
    return telefone.replace(/\D/g, ''); // Remove tudo que não é número
}
/**
 * Descartar proposta/cotação - Fecha o modal
 */
function descartarPropostaModal() {
    console.log('%c🗑️ Descartando proposta...', 'color: #ea580c; font-weight: bold;');
    
    // ⭐ RESTAURAR DADOS DO comparacaoAtual
    selectedRegion = comparacaoAtual.regiao || '';
    selectedType = comparacaoAtual.tipo || '';
    planosSelecionados = comparacaoAtual.planos || [];
    
    console.log('%c📊 Dados restaurados:', 'color: #0066cc; font-weight: bold;');
    console.log('selectedRegion:', selectedRegion);
    console.log('selectedType:', selectedType);
    console.log('planosSelecionados:', planosSelecionados);
    
    // ⭐ LIMPAR APENAS OS DADOS DO FORMULÁRIO
    faixasSelecionadas.clear();
    nomeCliente = '';
    emailCliente = '';
    telefonecliente = '';
    
    // ⭐ FECHAR MODAL PELO ID
    const modal = document.getElementById('modalAdicionarCRM');
    if (modal) {
        modal.classList.add('hidden');
        console.log('%c✅ Modal fechado!', 'color: #16a34a; font-weight: bold;');
    } else {
        console.error('%c❌ Modal não encontrado!', 'color: #dc2626; font-weight: bold;');
    }
    
    console.log('%c✅ Proposta descartada!', 'color: #16a34a; font-weight: bold;');

}
// ===== TELA DE SUCESSO - CRIAÇÃO DE VENDEDOR =====

let contadorRegressivoInterval = null;

/**
 * Mostrar tela de sucesso ao criar vendedor
 */
function mostrarSuccessScreenVendedor() {
    const successScreen = document.getElementById('successScreenVendedor');
    
    if (!successScreen) {
        console.error('❌ Elemento #successScreenVendedor não encontrado!');
        return;
    }
    
    // ⭐ MOSTRAR A TELA DE SUCESSO
    successScreen.classList.remove('hidden');
    console.log('%c✅ Tela de sucesso exibida', 'color: #16a34a; font-weight: bold;');
    
    // ⭐ INICIAR CONTADOR REGRESSIVO
    iniciarContadorRegressivo();
    
    // ⭐ PERMITIR FECHAR COM ESC
    document.addEventListener('keydown', fecharComESC);
}

/**
 * Iniciar contador regressivo (3, 2, 1...)
 */
function iniciarContadorRegressivo() {
    let contador = 3;
    const contadorElement = document.getElementById('contadorRegressivo');
    
    if (contadorElement) {
        contadorElement.textContent = contador;
    }
    
    // ⭐ LIMPAR INTERVALO ANTERIOR SE EXISTIR
    if (contadorRegressivoInterval) {
        clearInterval(contadorRegressivoInterval);
    }
    
    contadorRegressivoInterval = setInterval(() => {
        contador--;
        
        if (contadorElement) {
            contadorElement.textContent = contador;
        }
        
        // ⭐ QUANDO CHEGAR A 0, REDIRECIONAR
        if (contador <= 0) {
            clearInterval(contadorRegressivoInterval);
            fecharSuccessScreenVendedor();
        }
    }, 1000); // 1 segundo
}

/**
 * Fechar tela de sucesso e redirecionar para login
 */
function fecharSuccessScreenVendedor() {
    const successScreen = document.getElementById('successScreenVendedor');
    
    if (!successScreen) return;
    
    // ⭐ LIMPAR INTERVALO
    if (contadorRegressivoInterval) {
        clearInterval(contadorRegressivoInterval);
    }
    
    // ⭐ REMOVER EVENT LISTENER DE ESC
    document.removeEventListener('keydown', fecharComESC);
    
    // ⭐ ANIMAR SAÍDA
    successScreen.style.transition = 'opacity 0.3s ease-out';
    successScreen.style.opacity = '0';
    
    setTimeout(() => {
        successScreen.classList.add('hidden');
        successScreen.style.opacity = '1'; // Resetar para próxima vez
        
        console.log('%c⚡ Redirecionando para login...', 'color: #00A8B0; font-weight: bold;');
        
        // ⭐ REDIRECIONAR PARA LOGIN
        window.location.href = '/';
    }, 300);
}

/**
 * Fechar com tecla ESC
 */
function fecharComESC(event) {
    if (event.key === 'Escape') {
        console.log('%c🔑 Tecla ESC pressionada', 'color: #0066cc; font-weight: bold;');
        fecharSuccessScreenVendedor();
    }
}

console.log('%c✅ VENDOR-SUCCESS carregado', 'color: #16a34a; font-weight: bold;');



