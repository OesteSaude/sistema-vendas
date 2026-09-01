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
    const cidade = document.getElementById('cidade')?.value.trim() || '';

    const cidadeValida = cidade.length > 0;

    // Nome é opcional, então não entra na regra de "válido"
    const todosPreenchidos = cidadeValida;

    console.log('%c📋 Validação de Dados do Cliente:', 'color: #0066cc; font-weight: bold;');
    console.log('Nome (opcional):', nome.length > 0 ? '✅' : '➖');
    console.log('Cidade:', cidadeValida ? '✅' : '❌');

    return {
        valido: todosPreenchidos,
        nome: true, // nunca bloqueia o avanço
        cidade: cidadeValida
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

            if (avisoValidacao) {
                avisoValidacao.classList.remove('hidden');

                avisoValidacao.innerHTML = `
                    <p class="text-sm font-bold text-red-800">
                        <i class="fas fa-exclamation-circle"></i>
                        Preencha os dados obrigatórios:
                    </p>
                    <ul class="text-xs text-red-700 mt-2 ml-4">
                        <li>• Cidade</li>
                    </ul>
                `;
            }
        }
    }
}