// ===== SALES TRACKING SYSTEM =====

// Objeto para armazenar dados da cotação atual
let cotacaoAtual = {
    vendedora: '',
    dataHora: '',
    cliente: {
        nome: '',
        email: '',
        telefone: ''
    },
    regiao: '',
    tipo: '',
    planos: [],
    faixasEtarias: [],
    valores: {
        individual: {},
        total: 0
    },
    status: 'Pendente'
};

// Função para capturar dados da cotação

function capturarDadosCotacao() {
    cotacaoAtual.vendedora = vendedorLogado;
    cotacaoAtual.dataHora = new Date().toLocaleString('pt-BR');
    cotacaoAtual.regiao = selectedRegion;
    cotacaoAtual.tipo = selectedType;
    
    // Capturar dados do cliente
    cotacaoAtual.cliente.nome = document.getElementById('nomeCliente').value.trim();
    cotacaoAtual.cliente.email = document.getElementById('emailCliente')?.value.trim() || '';
    cotacaoAtual.cliente.telefone = document.getElementById('telefonecliente')?.value.trim() || '';
    
    // ⭐ PUXAR PLANOS DIRETO DE comparacaoAtual.resultados
    cotacaoAtual.planos = [];
    cotacaoAtual.valores.porPlano = {};
    let valorTotalGeral = 0;
    
    if (comparacaoAtual && comparacaoAtual.resultados) {
        comparacaoAtual.resultados.forEach(resultado => {
            const plano = resultado.plano;
            
            // Pular odontológico
            if (plano.includes('Odontológico')) {
                return;
            }
            
            // Adicionar plano à lista
            cotacaoAtual.planos.push(plano);
            cotacaoAtual.valores.porPlano[plano] = {};
            
            // Adicionar cada faixa etária
            comparacaoAtual.faixas.forEach(faixa => {
                const valorUnitario = obterValorPlano(
                    comparacaoAtual.regiao,
                    comparacaoAtual.tipo,
                    plano,
                    faixa.chave
                );
                
                if (valorUnitario !== null && valorUnitario > 0) {
                    const valorTotal = valorUnitario * faixa.qtd;
                    cotacaoAtual.valores.porPlano[plano][faixa.nome] = formatarMoeda(valorTotal);
                }
            });
            
            // Subtotal do plano
            cotacaoAtual.valores.porPlano[plano]['SUBTOTAL'] = formatarMoeda(resultado.subtotal);
            valorTotalGeral += resultado.valorFinal;
        });
        
        cotacaoAtual.valores.total = formatarMoeda(valorTotalGeral);
        cotacaoAtual.faixasEtarias = comparacaoAtual.faixas.map(f => f.nome);
    } else {
        console.warn('⚠️ Nenhuma comparação gerada! Clique em "Gerar Comparação" primeiro.');
    }
    
    console.log('Dados capturados:', cotacaoAtual);
    return cotacaoAtual;
}
// ===== CORRIGIR APENAS A FUNÇÃO enviarCotacaoParaSheets NO sales.js =====

// ✅ Função para gerar UUID v4
function gerarUUIDv4() {
    return crypto.randomUUID();
}

// ===== ENVIAR COTAÇÃO PARA FIREBASE =====

async function enviarCotacaoParaSheets() {
    try {
        console.log('%c📤 Enviando cotação para Firebase...', 'color: #0066cc; font-weight: bold; font-size: 14px;');
        
        // ⭐ NOVO - Usar COTADOR_SERVICE
        const resultado = await COTADOR_SERVICE.enviarCotacao({
            vendedora: vendedorLogado,
            vendedoraUID: vendedorUID,
            nomeCliente: document.getElementById('nomeCliente').value,
            emailCliente: document.getElementById('emailCliente').value,
            telefonecliente: document.getElementById('telefonecliente').value,
            regiao: selectedRegion,
            tipo: selectedType,
            planos: planosSelecionados,
            faixas: Array.from(faixasSelecionadas.entries()).map(([numero, qtd]) => ({
                numero,
                qtd,
                info: obterFaixaInfo(numero)
            })),
            comparacao: comparacaoAtual
        });
        
        if (resultado.sucesso) {
            console.log('%c✅ Cotação salva com sucesso!', 'color: #16a34a; font-weight: bold; font-size: 14px;');
            console.log('%c🆔 ID da cotação:', 'color: #16a34a; font-weight: bold;', resultado.id);
            
            alert('✅ Cotação salva com sucesso!');
            
            // Limpar formulário
            limparFormulario();
            
            return true;
        } else {
            throw new Error(resultado.erro || 'Erro ao salvar cotação');
        }
    } catch (error) {
        console.error('%c❌ Erro ao enviar cotação:', 'color: #dc2626; font-weight: bold;', error);
        alert(`❌ Erro ao salvar cotação: ${error.message}`);
        return false;
    }
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('emailCliente').value = '';
    document.getElementById('telefonecliente').value = '';
    document.querySelectorAll('input[name="plano"]').forEach(el => el.checked = false);
    voltarParaRegiao();
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('emailCliente').value = '';
    document.getElementById('telefonecliente').value = '';
    document.querySelectorAll('input[name="plano"]').forEach(el => el.checked = false);
    voltarParaRegiao();
}

// Função para exportar cotação como PDF (opcional)
function exportarCotacaoPDF() {
    const dados = capturarDadosCotacao();
    
    let conteudo = `
    COTAÇÃO - OESTE SAÚDE
    =====================
    
    Vendedora: ${dados.vendedora}
    Data/Hora: ${dados.dataHora}
    
    CLIENTE:
    Nome: ${dados.cliente.nome}
    Email: ${dados.cliente.email}
    Telefone: ${dados.cliente.telefone}
    
    COTAÇÃO:
    Região: ${dados.regiao}
    Tipo: ${dados.tipo}
    Planos: ${dados.planos.join(', ')}
    
    VALORES:
    ${Object.entries(dados.valores.individual).map(([faixa, valor]) => 
        `${faixa}: ${valor}`
    ).join('\n')}
    
    TOTAL: ${dados.valores.total}
    `;
    
    // Aqui você pode usar uma biblioteca como jsPDF para gerar PDF
    console.log(conteudo);
}