// ===== CONFIGURAÇÃO DO COTADOR =====
// ⭐ Variáveis globais (SEM declarar vendedorLogado aqui!)

let selectedRegion = '';
let selectedType = '';
let nomeCliente = '';
let emailCliente = '';
let telefonecliente = '';
let planosSelecionados = [];
let faixasSelecionadas = new Map();
let comparacaoAtual = {};
let valoresPlanosBase = {};
let valoresCarregados = false;
let cotacaoAtualID = null;

console.log('%c✅ CONFIG carregado', 'color: #16a34a; font-weight: bold;');

/**
 * Validar dados do cliente
 */
function validarDadosCliente() {
    const nome = document.getElementById('nomeCliente')?.value.trim() || '';
    const email = document.getElementById('emailCliente')?.value.trim() || '';
    const telefone = document.getElementById('telefonecliente')?.value.trim() || '';

    // Validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regexEmail.test(email);

    // Validar telefone (mínimo 10 dígitos)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const telefoneValido = telefoneLimpo.length >= 10;

    const todosPreenchidos = nome.length > 0 && emailValido && telefoneValido;

    console.log('%c📋 Validação de Dados do Cliente:', 'color: #0066cc; font-weight: bold;');
    console.log('Nome:', nome.length > 0 ? '✅' : '❌');
    console.log('Email:', emailValido ? '✅' : '❌');
    console.log('Telefone:', telefoneValido ? '✅' : '❌');

    return {
        valido: todosPreenchidos,
        nome: nome.length > 0,
        email: emailValido,
        telefone: telefoneValido
    };
}

/**
 * Atualizar status de validação em tempo real
 */
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
            
            if (avisoValidacao) {
                avisoValidacao.classList.remove('hidden');
                
                // Atualizar mensagem de erro
                let mensagens = [];
                if (!validacao.nome) mensagens.push('Nome do cliente');
                if (!validacao.email) mensagens.push('Email válido');
                if (!validacao.telefone) mensagens.push('Telefone válido');
                
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