// ===== CONSTANTES DO COMPARISON =====
const GOOGLE_SHEET_URL = CONSTANTS?.GOOGLE_SHEET_URL || 'https://script.google.com/macros/s/AKfycbw_1wfvXinx1w3RvR9ji364C38nAvR5rQ4kP-EtOFv-Vsy6brCSLLKaf8iDbS3wTV8JiQ/exec';

console.log('%c✅ GOOGLE_SHEET_URL carregado:', 'color: #16a34a; font-weight: bold;', GOOGLE_SHEET_URL);

        async function carregarValoresPlanos() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            try {
                console.log('📥 Carregando valores...');
                loadingOverlay.classList.remove('hidden');
                const response = await fetch(GOOGLE_SHEET_URL + '?action=valores&t=' + new Date().getTime(), {
                    method: 'GET',
                    cache: 'no-cache'
                });
                const result = await response.json();
                if (result.status === 'success') {
                    valoresPlanosBase = result.data;
                    valoresCarregados = true;
                    console.log('✅ Valores carregados com sucesso!');
                    loadingOverlay.classList.add('hidden');
                    return true;
                } else {
                    throw new Error(result.message || 'Erro ao carregar valores');
                }
            } catch (error) {
                console.error('❌ Erro ao carregar valores:', error);
                loadingOverlay.classList.add('hidden');
                alert('❌ Erro ao carregar valores da planilha. Verifique sua conexão e tente novamente.');
                return false;
            }
        }

        function obterValorPlano(regiao, tipo, plano, faixaChave) {
            if (!valoresCarregados) {
           console.warn('⚠️ Valores ainda não foram carregados!');
             return 0;
    }
    
    // ⭐ NOVA REGRA: Plano Odontológico tem valor fixo
            if (plano === 'Plano Odontológico') {
            return 25.00; // R$ 25,00 por pessoa
           }
    
    // Regra específica para "Infantil Tabela Fixa"
    if (plano.includes('Infantil Tabela Fixa') && faixaChave !== 'f1') return null;

    if (valoresPlanosBase[regiao] && valoresPlanosBase[regiao][tipo] && valoresPlanosBase[regiao][tipo][plano]) {
        const valor = valoresPlanosBase[regiao][tipo][plano][faixaChave];
        return parseFloat(valor) || 0;
    }
    
    console.warn(`⚠️ Valor não encontrado para: ${regiao}, ${tipo}, ${plano}, ${faixaChave}`);
    return 0;
}

/**
 * ===== COMPARAÇÃO COM VALIDAÇÕES =====
 */
function gerarComparacao() {
    const nomeCliente = document.getElementById('nomeCliente')?.value?.trim() || '';
    const cidade = document.getElementById('cidade')?.value?.trim() || '';
    console.log('%c🏙️ Cidade capturada:', 'color: #0066cc; font-weight: bold;', cidade);
    if (!cidade) {
        alert('⚠️ Selecione uma cidade!');
        return;
    }
    if (faixasSelecionadas.size === 0) {
        showTutorialModal(2);
        return;
    }
    const faixasComQuantidade = [];
    let totalPessoas = 0;
    faixasSelecionadas.forEach((_, numero) => {
        const qtdInput = document.getElementById(`qtd${numero}`);
        const qtd = qtdInput ? (parseInt(qtdInput.value) || 0) : faixasSelecionadas.get(numero);
        if (qtd > 0) {
            faixasComQuantidade.push({ ...obterFaixaInfo(numero), qtd: qtd });
            totalPessoas += qtd;
        }
    });
    if (faixasComQuantidade.length === 0) {
        showTutorialModal(2);
        return;
    }
    if (selectedType === 'Familiar' && totalPessoas < 2) {
        console.log('%c⚠️ Validação de Familiar falhou!', 'color: #ea580c; font-weight: bold;');
        console.log('Total de pessoas:', totalPessoas);
        document.getElementById('totalPessoasModal').textContent = totalPessoas;
        document.getElementById('modalValidacaoFamiliar').classList.remove('hidden');
        return;
    }
    if (!planosSelecionados || planosSelecionados.length === 0) {
        showTutorialModal(3);
        return;
    }
    console.log('%c✅ Validações passaram!', 'color: #16a34a; font-weight: bold;');
    console.log('Total de pessoas:', totalPessoas);
    console.log('Tipo:', selectedType);
    const taxaAdmInput = document.getElementById('taxaAdm')?.value?.trim() || '';
    const taxaAdmValor = (APP_DATA.regioes[selectedRegion].requerTaxa && taxaAdmInput) ? parseFloat(taxaAdmInput) || 0 : 0;
    let descontoAdicionalTipo = document.querySelector('input[name="descontoAdicional"]:checked')?.value || 'Nenhum';
    let descontoAdicionalPercentual = 0;
    if (descontoAdicionalTipo === 'OAB') {
        descontoAdicionalPercentual = 15;
    } else if (descontoAdicionalTipo === 'Estudante') {
        descontoAdicionalPercentual = 20;
    }
    let resultados = planosSelecionados.map(plano => {
        const subtotal = faixasComQuantidade.reduce((acc, f) => {
            const valor = obterValorPlano(selectedRegion, selectedType, plano, f.chave);
            return acc + (valor !== null ? (f.qtd * valor) : 0);
        }, 0);
        let descontoFamiliar = 0;
        let descontoAdicional = 0;
        if (descontoAdicionalTipo === 'Promo50') {
            descontoAdicional = subtotal * 0.5;
        } else if (descontoAdicionalPercentual > 0) {
            descontoAdicional = subtotal * (descontoAdicionalPercentual / 100);
        } else if (selectedRegion === 'Oeste Paulista (SP)' && selectedType === 'Familiar' && !plano.includes('Ouro')) {
            descontoFamiliar = subtotal * 0.10;
        }
        const valorFinal = subtotal - descontoFamiliar - descontoAdicional + taxaAdmValor;
        return { plano, subtotal, descontoFamiliar, descontoAdicional, descontoAdicionalTipo, taxaAdm: taxaAdmValor, valorFinal };
    });
    const incluirOdonto = document.getElementById('incluirPlanoOdontologico')?.checked || false;
    if (incluirOdonto) {
        const valorOdontoTotal = calcularPlanoOdontologico();
        resultados.push({
            plano: 'Plano Odontológico',
            subtotal: valorOdontoTotal,
            descontoFamiliar: 0,
            descontoAdicional: 0,
            descontoAdicionalTipo: 'Nenhum',
            taxaAdm: 0,
            valorFinal: valorOdontoTotal
        });
    }
    const ordemPlanos = ['Premium IV', 'Premium III', 'Premium II', 'Premium I', 'Ouro'];
    resultados.sort((a, b) => {
        if (a.plano.includes('Odontológico') && !b.plano.includes('Odontológico')) return 1;
        if (!a.plano.includes('Odontológico') && b.plano.includes('Odontológico')) return -1;
        const getOrdem = (plano) => {
            for (let i = 0; i < ordemPlanos.length; i++) {
                if (plano.includes(ordemPlanos[i])) return i;
            }
            return 999;
        };
        return getOrdem(a.plano) - getOrdem(b.plano);
    });
    comparacaoAtual = {
        vendedor: vendedorLogado,
        regiao: selectedRegion,
        cidade: cidade,
        tipo: selectedType,
        cliente: nomeCliente,
        planos: planosSelecionados,
        faixas: faixasComQuantidade,
        resultados,
        taxaAdm: taxaAdmValor,
        descontoAdicionalPercentual,
        descontoAdicionalTipo,
        incluirOdonto: incluirOdonto,
        totalPessoas: totalPessoas
    };
    salvarCotacaoNoLog();
    renderizarResultado();
    mudarAba(5);
}

/**
 * Fechar modal de validação e limpar faixas
 */
function fecharModalValidacao() {
    console.log('%c⏸️ Usuário voltou para adicionar mais pessoas', 'color: #ea580c; font-weight: bold;');
    
    // ⭐ LIMPAR TODAS AS FAIXAS SELECIONADAS
    faixasSelecionadas.clear();
    
    // ⭐ LIMPAR INPUTS DE QUANTIDADE
    for (let i = 1; i <= 10; i++) {
        const qtdInput = document.getElementById(`qtd${i}`);
        const checkbox = document.getElementById(`faixa${i}`);
        
        if (qtdInput) {
            qtdInput.value = 1;
            qtdInput.disabled = true;
        }
        
        if (checkbox) {
            checkbox.checked = false;
        }
    }
    
    // ⭐ REMOVER AVISO DE VALIDAÇÃO
    const avisoAnterior = document.getElementById('avisoFamiliar');
    if (avisoAnterior) avisoAnterior.remove();
    
    console.log('%c🗑️ Faixas limpas - vendedor pode adicionar novamente', 'color: #16a34a; font-weight: bold;');
    
    // ⭐ FECHAR MODAL
    document.getElementById('modalValidacaoFamiliar').classList.add('hidden');
    
    // ⭐ MANTER NA ABA 4 (FAIXAS ETÁRIAS)
    mudarAba(4);
}

/**
 * Mudar para plano Individual
 */
function mudarParaIndividual() {
    console.log('%c🔄 Alterando para plano Individual...', 'color: #ea580c; font-weight: bold;');
    
    selectedType = 'Individual';
    
    // ⭐ LIMPAR PLANOS SELECIONADOS
    planosSelecionados = [];
    console.log('%c🗑️ Planos anteriores removidos', 'color: #ea580c; font-weight: bold;');
    
    // ⭐ LIMPAR FAIXAS SELECIONADAS
    faixasSelecionadas.clear();
    console.log('%c🗑️ Faixas anteriores removidas', 'color: #ea580c; font-weight: bold;');
    
    // ⭐ LIMPAR INPUTS DE QUANTIDADE
    for (let i = 1; i <= 10; i++) {
        const qtdInput = document.getElementById(`qtd${i}`);
        const checkbox = document.getElementById(`faixa${i}`);
        
        if (qtdInput) {
            qtdInput.value = 1;
            qtdInput.disabled = true;
        }
        
        if (checkbox) {
            checkbox.checked = false;
        }
    }
    
    // ⭐ REMOVER AVISO DE VALIDAÇÃO FAMILIAR
    const avisoAnterior = document.getElementById('avisoFamiliar');
    if (avisoAnterior) avisoAnterior.remove();
    
    // ⭐ ATUALIZAR SEÇÕES
    atualizarDescontosAdicionaisSection();
    atualizarPlanoOdontologicoSection();
    
    // ⭐ RECARREGAR PLANOS COM A FUNÇÃO CORRETA
    atualizarPlanosCheckboxes();
    
    // ⭐ ATUALIZAR CONTADOR DE PLANOS
    document.getElementById('planosCount').textContent = 0;
    
    // ⭐ FECHAR MODAL
    document.getElementById('modalValidacaoFamiliar').classList.add('hidden');
    
    LOADING_SERVICE.success('✅ Tipo alterado para Individual! Selecione os planos novamente.');
    
    // ⭐ VOLTAR PARA ABA 3 (CONFIGURAÇÃO) PARA RESELECIONAR PLANOS
    mudarAba(3);
}
	
	    function normalizarNomePlanoExibicao(plano, tipo) {
            // NOVA REGRA: Converter "Infantil Tabela Fixa" para "Premium III (40%) INFANTIL" para exibição
            if (plano.includes('Infantil Tabela Fixa')) {
                return 'Premium III (40%)';
            }

            // Normaliza nomes de Exclusivo para exibição
            if (plano.includes('Exclusivo III Individual')) {
                return 'Exclusivo III (40%)';
            }
            if (plano.includes('Exclusivo III Familiar')) {
                return 'Exclusivo III (40%)';
            }
            if (plano.includes('Exclusivo III Empresarial')) {
                return 'Exclusivo Empresarial III (40%)';
            }
            
            // Se for Empresarial, adiciona "Empresarial" ao Premium
            // IMPORTANTE: Verificar de IV para I (maior para menor)
            if (tipo && tipo.includes('Empresarial')) {
                if (plano.includes('Premium IV')) {
                    return 'Premium Empresarial IV (50%)';
                }
                if (plano.includes('Premium III')) {
                    return 'Premium Empresarial III (40%)';
                }
                if (plano.includes('Premium II')) {
                    return 'Premium Empresarial II (30%)';
                }
                if (plano.includes('Premium I')) {
                    return 'Premium Empresarial I (20%)';
                }
            }
            
            // Retorna o plano original se não for Exclusivo ou Empresarial
            return plano;
        }
        
function renderizarResultado() {
	const { vendedor, regiao, tipo, cliente, faixas, resultados, taxaAdm } = comparacaoAtual;
	
	const CORES_ADM = {
		'CORPE': '#DC2626',
		'LANCERS': '#EA580C'
	};
	
	const dadosContato = VENDEDOR_SERVICE.obterDadosVendedorLocal(vendedor);
	
	nomeClienteInput = document.getElementById('nomeCliente')?.value || 'Não informado';
	
	console.log('%c👤 Dados do vendedor:', 'color: #0066cc; font-weight: bold;');
	console.log('Nome:', dadosContato.nome);
	console.log('Email:', dadosContato.email);
	console.log('Telefone:', dadosContato.telefone);
	
	document.getElementById('previewVendedor').textContent = dadosContato.nome;
	document.getElementById('previewTelefone').textContent = dadosContato.telefone;
	document.getElementById('previewEmail').textContent = dadosContato.email;
    document.getElementById('previewResultadoRegiao').textContent = regiao;
    document.getElementById('resultadoCidade').textContent = comparacaoAtual.cidade;
    document.getElementById('previewResultadoTipo').textContent = tipo;
    document.getElementById('previewResultadoCliente').textContent = nomeClienteInput;
    document.getElementById('previewResultadoClientePrint').textContent = cliente ? `Cliente: ${cliente}` : '';

    const agora = new Date();
    document.getElementById('dataComparacao').textContent = agora.toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
    }) + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const resultadosSemOdonto = resultados.filter(r => !r.plano.includes('Odontológico'));
    const menorValor = resultadosSemOdonto.length > 0 ? Math.min(...resultadosSemOdonto.map(r => r.valorFinal)) : Math.min(...resultados.map(r => r.valorFinal));
    
    let tabelaHTML = '<table><thead><tr>';
    tabelaHTML += '<th>Faixa Etária</th><th>Qtd</th>';
    tabelaHTML += resultados.map(r => {
        const isOdonto = r.plano.includes('Odontológico');
        const classe = isOdonto ? 'class="col-odontologico"' : '';
        return `<th ${classe}>${normalizarNomePlanoExibicao(r.plano, tipo)}</th>`;
    }).join('');
    tabelaHTML += '</tr></thead><tbody>';

    const faixasOrdenadas = faixas.sort((a, b) => {
        const ordemFaixas = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10'];
        return ordemFaixas.indexOf(a.chave) - ordemFaixas.indexOf(b.chave);
    });

    faixasOrdenadas.forEach(f => {
        tabelaHTML += '<tr>';
        tabelaHTML += `<td>${f.nome}</td><td>${f.qtd}</td>`;
        tabelaHTML += resultados.map(r => {
            const isOdonto = r.plano.includes('Odontológico');
            const classe = isOdonto ? 'class="col-odontologico"' : '';
            const valorUnitario = obterValorPlano(regiao, tipo, r.plano, f.chave);
            return `<td ${classe}>${formatarMoeda(valorUnitario)}</td>`;
        }).join('');
        tabelaHTML += '</tr>';
    });

    /*tabelaHTML += '<tr class="row-subtotal"><td colspan="2">SUBTOTAL</td>';
    tabelaHTML += resultados.map(r => {
        const isOdonto = r.plano.includes('Odontológico');
        const classe = isOdonto ? 'class="col-odontologico"' : '';
        return `<td ${classe}>${formatarMoeda(r.subtotal)}</td>`;
    }).join('');
    tabelaHTML += '</tr>';*/

    if (taxaAdm > 0) {
        const adm = regiao.includes('Corpe') ? 'CORPE' : (regiao.includes('Lancers') ? 'LANCERS' : '');
        const corTaxa = CORES_ADM[adm];
        tabelaHTML += `<tr class="row-taxa" style="background-color: ${corTaxa}; color: white;"><td colspan="2">TAXA ADMINISTRADORA - ${adm}</td>`;
        tabelaHTML += resultados.map(r => {
            const isOdonto = r.plano.includes('Odontológico');
            const classe = isOdonto ? 'class="col-odontologico"' : '';
            return `<td ${classe}>+ ${formatarMoeda(r.taxaAdm)}</td>`;
        }).join('');
        tabelaHTML += '</tr>';
    }

    tabelaHTML += '<tr class="row-valor-antes"><td colspan="2">VALOR TOTAL</td>';
    tabelaHTML += resultados.map(r => {
        const isOdonto = r.plano.includes('Odontológico');
        const classe = isOdonto ? 'class="col-odontologico"' : '';
        const valorAntes = r.subtotal + r.taxaAdm;
        return `<td ${classe}>${formatarMoeda(valorAntes)}</td>`;
    }).join('');
    tabelaHTML += '</tr>';

    if (resultados.some(r => r.descontoFamiliar > 0)) {
        tabelaHTML += '<tr class="row-desconto"><td colspan="2">- DESCONTO FAMILIAR (10%)</td>';
        tabelaHTML += resultados.map(r => {
            const isOdonto = r.plano.includes('Odontológico');
            const classe = isOdonto ? 'class="col-odontologico"' : '';
            return `<td ${classe}>- ${formatarMoeda(r.descontoFamiliar)}</td>`;
        }).join('');
        tabelaHTML += '</tr>';
    }

    if (resultados.some(r => r.descontoAdicional > 0)) {
        const primeiroResultadoComDesconto = resultados.find(r => r.descontoAdicional > 0);
        let nomeDesconto = '';
        
        if (primeiroResultadoComDesconto.descontoAdicionalTipo === 'OAB') {
            nomeDesconto = 'DESCONTO OAB (15%)';
        } else if (primeiroResultadoComDesconto.descontoAdicionalTipo === 'Estudante') {
            nomeDesconto = 'DESCONTO ESTUDANTE (20%)';
        } else if (primeiroResultadoComDesconto.descontoAdicionalTipo === 'Promo50') {
            nomeDesconto = 'DESCONTO PROMO 50%';
        } else {
            nomeDesconto = 'DESCONTO ADICIONAL';
        }
        
        tabelaHTML += `<tr class="row-desconto"><td colspan="2">- ${nomeDesconto}</td>`;
        tabelaHTML += resultados.map(r => {
            const isOdonto = r.plano.includes('Odontológico');
            const classe = isOdonto ? 'class="col-odontologico"' : '';
            return `<td ${classe}>- ${formatarMoeda(r.descontoAdicional)}</td>`;
        }).join('');
        tabelaHTML += '</tr>';
    }

    tabelaHTML += '<tr class="row-total"><td colspan="2">VALOR COM DESCONTO</td>';
    tabelaHTML += resultados.map(r => {
        const isOdonto = r.plano.includes('Odontológico');
        const isMelhor = r.valorFinal === menorValor && !isOdonto;
        const classe = isOdonto ? 'class="col-odontologico' + (isMelhor ? ' melhor-valor' : '') + '"' : (isMelhor ? 'class="melhor-valor"' : '');
        return `<td ${classe}>${formatarMoeda(r.valorFinal)}</td>`;
    }).join('');
    tabelaHTML += '</tr>';

    tabelaHTML += '</tbody></table>';

    tabelaHTML += `
            <div style="margin-top: 16px; padding: 12px; background: #fef3c7; border: 2px solid #fbbf24; border-radius: 8px; text-align: center;">
                    <p style="font-size: 14px; font-weight: 700; color: #92400e; margin: 0;">
                        <i class="fas fa-star" style="color: #fbbf24; margin-right: 8px;"></i>
                        Melhor Custo-Benefício
                    </p>
                </div>
                <p style="font-size: 11px; color: #6b7280; padding: 20px; text-align: center; margin-top: 5px; margin-bottom: 12px; font-style: italic; font-family: sans-serif;">
                    *Proposta válida por 20 dias.
                </p>
            `;

    document.getElementById('tabelaComparativa').innerHTML = tabelaHTML;
    setTimeout(() => {
        mostrarModalCRM();
    }, 500);
}

function mostrarModalCRM() {
    console.log('%c📊 Mostrando modal de CRM...', 'color: #00A8B0; font-weight: bold;');
    console.log('%c📦 comparacaoAtual:', 'color: #0066cc; font-weight: bold;', comparacaoAtual);
    
    if (!comparacaoAtual) {
        console.warn('⚠️ Nenhuma comparação disponível');
        return;
    }
    
    // ⭐ PUXAR DADOS DO CLIENTE DIRETAMENTE DO INPUT
    const nomeCliente = document.getElementById('nomeCliente')?.value || comparacaoAtual.cliente || 'Não informado';
    const emailCliente = document.getElementById('emailCliente')?.value || '-';
    const telefoneCliente = document.getElementById('telefonecliente')?.value || '-';
    
    console.log('%c👤 Dados do cliente:', 'color: #0066cc; font-weight: bold;');
    console.log('Nome:', nomeCliente);
    console.log('Email:', emailCliente);
    console.log('Telefone:', telefoneCliente);
    
    // Preencher dados do cliente
    document.getElementById('crmNomeCliente').textContent = nomeCliente;
    document.getElementById('crmEmailCliente').textContent = emailCliente;
    document.getElementById('crmTelefoneCliente').textContent = telefoneCliente;
    
    // Preencher detalhes da cotação
    document.getElementById('crmRegiao').textContent = comparacaoAtual.regiao;
    document.getElementById('crmCidade').textContent = comparacaoAtual.cidade;
    document.getElementById('crmTipo').textContent = comparacaoAtual.tipo;
    
    // ⭐ ADICIONAR FAIXAS ETÁRIAS - VERSÃO CORRIGIDA
    console.log('%c👥 Iniciando adição de faixas...', 'color: #0066cc; font-weight: bold;');
    
    const faixasList = document.getElementById('crmFaixasList');
    console.log('%c🔍 Elemento crmFaixasList:', 'color: #0066cc; font-weight: bold;', faixasList);
    
    if (faixasList) {
        // Limpar conteúdo anterior
        faixasList.innerHTML = '';
        
        console.log('%c📦 Faixas a processar:', 'color: #0066cc; font-weight: bold;', comparacaoAtual.faixas);
        
        // Verificar se tem faixas
        if (comparacaoAtual.faixas && comparacaoAtual.faixas.length > 0) {
            comparacaoAtual.faixas.forEach((faixa, index) => {
                console.log(`%c📍 Faixa ${index + 1}:`, 'color: #0066cc; font-weight: bold;', faixa);
                
                // Criar elemento da faixa
                const faixaDiv = document.createElement('div');
                faixaDiv.className = 'crm-faixa-item';
                
                const nomeFaixa = faixa.nome || 'Faixa desconhecida';
                const qtdFaixa = faixa.qtd || 0;
                
                // Montar HTML
                faixaDiv.innerHTML = `
                    <span class="crm-faixa-nome">${nomeFaixa}</span>
                    <span class="crm-faixa-qtd">${qtdFaixa} pessoa${qtdFaixa > 1 ? 's' : ''}</span>
                `;
                
                // Adicionar ao DOM
                faixasList.appendChild(faixaDiv);
                
                console.log(`%c✅ Faixa adicionada ao DOM: ${nomeFaixa}`, 'color: #16a34a; font-weight: bold;');
            });
            
            console.log('%c✅ Todas as faixas foram adicionadas!', 'color: #16a34a; font-weight: bold;');
        } else {
            console.warn('%c⚠️ Nenhuma faixa etária encontrada', 'color: #ea580c; font-weight: bold;');
            faixasList.innerHTML = '<p style="color: #ea580c; padding: 12px; text-align: center;">Nenhuma faixa etária selecionada</p>';
        }
    } else {
        console.error('%c❌ ERRO: Elemento crmFaixasList NÃO ENCONTRADO no HTML!', 'color: #dc2626; font-weight: bold;');
        console.error('%c Adicione este elemento no HTML do modal:', 'color: #dc2626; font-weight: bold;');
        console.error('<div class="crm-faixas-list" id="crmFaixasList"></div>');
    }
    
    // Preencher planos selecionados
    const planosList = document.getElementById('crmPlanosList');
    planosList.innerHTML = '';
    
    console.log('%c💰 Planos selecionados:', 'color: #0066cc; font-weight: bold;', comparacaoAtual.resultados);
    
    comparacaoAtual.resultados.forEach(resultado => {
        const planoItem = document.createElement('div');
        planoItem.className = 'crm-plano-item';
        planoItem.innerHTML = `
            <span class="crm-plano-nome">${resultado.plano}</span>
            <span class="crm-plano-valor">${formatarMoeda(resultado.valorFinal)}</span>
        `;
        planosList.appendChild(planoItem);
    });
    
    // Preencher informações de registro
    document.getElementById('crmVendedor').textContent = comparacaoAtual.vendedor;
    
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const horaFormatada = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('crmDataHora').textContent = `${dataFormatada} às ${horaFormatada}`;
    
    // Mostrar modal
    document.getElementById('modalAdicionarCRM').classList.remove('hidden');
    
    console.log('%c✅ Modal de CRM exibido com sucesso!', 'color: #16a34a; font-weight: bold;');

}

// ⭐ Exportar função globalmente
window.carregarValoresPlanos = carregarValoresPlanos;