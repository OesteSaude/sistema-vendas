       async function copiarParaWhatsApp() {
    if (!comparacaoAtual.resultados) {
        alert('⚠️ Gere a comparação primeiro!');
        return;
    }

    const btn = document.getElementById('btnWhatsAppText');
    const originalText = btn.textContent;

    try {
        btn.textContent = 'Copiando...';

        // 1. O alvo agora é o card completo
        const elementoAlvo = document.getElementById('previewCard');

        // 2. Tiramos o print
        const canvas = await html2canvas(elementoAlvo, {
            scale: 3,
            backgroundColor: '#ffffff',
            useCORS: true,
            logging: false,
            // ESSA LINHA É A CHAVE: Ela remove os botões da imagem final
            ignoreElements: (el) => el.classList.contains('no-print') || el.tagName === 'BUTTON'
        });

        canvas.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                btn.textContent = '✅ Copiado!';
                setTimeout(() => { btn.textContent = originalText; }, 2000);
            } catch (err) {
                console.error('Erro ao copiar:', err);
                alert('❌ Erro ao copiar imagem.');
                btn.textContent = originalText;
            }
        }, 'image/png');

    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao gerar captura.');
        btn.textContent = originalText;
    }
}

function imprimirPDF() {
    console.log('%c🖨️ INICIANDO VALIDAÇÃO DE IMPRESSÃO', 'color: #0066cc; font-weight: bold; font-size: 14px;');
    console.log('%ccomparacaoAtual:', 'color: #0066cc; font-weight: bold;', comparacaoAtual);
    console.log('%ccomparacaoAtual.resultados:', 'color: #0066cc; font-weight: bold;', comparacaoAtual.resultados);
    
    if (!comparacaoAtual.resultados) {
        console.error('%c❌ comparacaoAtual.resultados está vazio!', 'color: #dc2626; font-weight: bold;');
        alert('⚠️ Gere a comparação primeiro!');
        return;
    }

    const imageUrl = obterImagemPlanos(selectedRegion, selectedType, planosSelecionados);
    
    // ⭐ VERIFICAR E CRIAR ELEMENTOS SE NÃO EXISTIREM
    let printImageContainer = document.getElementById('printImageContainer');
    let printImage = document.getElementById('imagemExplicativa');
    
    if (!printImageContainer) {
        printImageContainer = document.createElement('div');
        printImageContainer.id = 'printImageContainer';
        printImageContainer.style.cssText = 'display: none;';
        document.body.appendChild(printImageContainer);
    }
    printImageContainer.style.cssText = `
        display: none;
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    `;
    
    if (!printImage) {
        printImage = document.createElement('img');
        printImage.id = 'imagemExplicativa';
        printImageContainer.appendChild(printImage);
    }

    console.log('%c🖨️ INICIANDO IMPRESSÃO', 'color: #0066cc; font-weight: bold; font-size: 14px;');
    console.log('%cURL da imagem:', 'color: #0066cc; font-weight: bold;', imageUrl);

    if (imageUrl) {
        console.log('%c⏳ Carregando imagem...', 'color: #ea580c; font-weight: bold;');
        
        // Cria uma nova imagem para garantir carregamento
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            console.log('%c✅ Imagem carregada com sucesso!', 'color: #16a34a; font-weight: bold;');

                printImage.style.cssText = `
                        display: none;
                        page-break-before: always;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                `;
            
            // Define a imagem no elemento
            printImage.src = imageUrl;
            printImageContainer.style.display = 'block';
            
            // Aguarda um pouco para garantir que a imagem foi renderizada
            setTimeout(() => {
                // Verifica se o plano odontológico foi selecionado
                const incluirOdonto = document.getElementById('incluirPlanoOdontologico')?.checked || false;
                
                if (incluirOdonto) {
                    console.log('%c📄 Adicionando página do Plano Odontológico...', 'color: #0066cc; font-weight: bold;');
                    
                    // Cria container para a página do odontológico
                    const odontoPrintContainer = document.createElement('div');
                    odontoPrintContainer.id = 'odontoPrintContainer';
                    odontoPrintContainer.style.cssText = `
                        display: none;
                        page-break-before: always;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    `;
                    
                    const odontoPrintImage = document.createElement('img');
                    odontoPrintImage.id = 'odontoPrintImage';
                    odontoPrintImage.src = 'https://i.imgur.com/MfDm9Rx.jpeg';
                    odontoPrintImage.style.cssText = `
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                    `;
                    
                    odontoPrintContainer.appendChild(odontoPrintImage);
                    document.body.appendChild(odontoPrintContainer);
                    
                    // Aguarda carregamento da imagem do odontológico
                    odontoPrintImage.onload = () => {
                        console.log('%c✅ Imagem do Plano Odontológico carregada!', 'color: #16a34a; font-weight: bold;');
                        odontoPrintContainer.style.display = 'block';
                        
                        setTimeout(() => {
                            console.log('%c🖨️ Enviando para impressão...', 'color: #0066cc; font-weight: bold;');
                            window.print();
                            
                            // Esconde as imagens após impressão
                            setTimeout(() => {
                                printImageContainer.style.display = 'none';
                                odontoPrintContainer.style.display = 'none';
                                odontoPrintContainer.remove();
                            }, 500);
                        }, 500);
                    };
                    
                    odontoPrintImage.onerror = () => {
                        console.error('%c❌ Erro ao carregar imagem do Plano Odontológico', 'color: #dc2626; font-weight: bold;');
                        console.log('%c🖨️ Continuando impressão sem a imagem do odontológico...', 'color: #0066cc; font-weight: bold;');
                        
                        setTimeout(() => {
                            console.log('%c🖨️ Enviando para impressão...', 'color: #0066cc; font-weight: bold;');
                            window.print();
                            
                            setTimeout(() => {
                                printImageContainer.style.display = 'none';
                                odontoPrintContainer.remove();
                            }, 500);
                        }, 500);
                    };
                } else {
                    console.log('%c🖨️ Enviando para impressão...', 'color: #0066cc; font-weight: bold;');
                    window.print();
                    
                    // Esconde a imagem após impressão
                    setTimeout(() => {
                        printImageContainer.style.display = 'none';
                    }, 500);
                }
            }, 500);
        };
        
        img.onerror = () => {
            console.error('%c❌ ERRO ao carregar imagem!', 'color: #dc2626; font-weight: bold;');
            console.log('%cURL que falhou:', 'color: #dc2626; font-weight: bold;', imageUrl);
            alert('❌ Não foi possível carregar a imagem explicativa. A impressão continuará sem ela.');
            window.print();
            printImageContainer.style.display = 'none';
        };
        
        // Inicia o carregamento
        img.src = imageUrl;
        
    } else {
        console.warn('%c⚠️ Nenhuma imagem encontrada para esta combinação de planos', 'color: #ea580c; font-weight: bold;');
        window.print();
    }
}
/**
 * Salvar cotação no Google Sheets via Apps Script
 */
async function salvarCotacaoNoLog() {
    console.log('%c📊 Salvando cotação no log...', 'color: #0066cc; font-weight: bold;');
    
    try {
        // ⭐ PREPARAR DADOS DA COTAÇÃO
        const dataCotacao = new Date().toLocaleString('pt-BR');
        const vendedora = vendedorLogado || 'Desconhecido';
        const nomeClienteVar = comparacaoAtual.cliente || nomeCliente || '';
        const emailClienteVar = emailCliente || '';
        const telefoneClienteVar = telefonecliente || '';
        const regiao = comparacaoAtual.regiao || selectedRegion || '';
        const tipoPlano = comparacaoAtual.tipo || selectedType || '';
        const planosTexto = comparacaoAtual.planos?.join(', ') || planosSelecionados.join(', ') || '';
        
        // ⭐ FAIXAS ETÁRIAS - CORRIGIDO
        const faixasTexto = Array.from(faixasSelecionadas.entries())
            .map(([numero, faixa]) => {
                const faixaInfo = obterFaixaInfo(numero);
                const qtdInput = document.getElementById(`qtd${numero}`);
                const qtd = qtdInput ? parseInt(qtdInput.value) || 0 : 0;
                return `${faixaInfo.nome}: ${qtd}`;
            })
            .filter(f => !f.includes(': 0')) // Remove faixas com 0 pessoas
            .join(' | ') || '';
        
        console.log('%c📊 Faixas formatadas:', 'color: #0066cc; font-weight: bold;', faixasTexto);
        
        // ⭐ VALORES POR PLANO - CORRIGIDO
        const valoresTexto = comparacaoAtual.resultados
            ?.map(r => {
                const valorFormatado = r.valorFinal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                return `${r.plano}: ${valorFormatado}`;
            })
            .join(' | ') || '';
        
        console.log('%c💰 Valores formatados:', 'color: #0066cc; font-weight: bold;', valoresTexto);
        
        // ⭐ TOTAL - CORRIGIDO
        const valorTotal = comparacaoAtual.resultados
            ?.reduce((acc, r) => acc + r.valorFinal, 0) || 0;
        
        const valorTotalFormatado = valorTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        console.log('%c💵 Total formatado:', 'color: #0066cc; font-weight: bold;', valorTotalFormatado);
        
        // ⭐ GERAR ID ÚNICO
        const idCotacao = `COT-${Date.now()}`;
        
        // ⭐ CONSTRUIR URL COM PARÂMETROS (GET)
        const urlBase = 'https://script.google.com/macros/s/AKfycbwXJjASI44OyzG9W6ONYpNcXdZlRuJszY5FXOIqFcE7cxhOV5C-iAXevFV9G7Wl4sOX/exec';
        const url = new URL(urlBase);
        
        // ⭐ ADICIONAR PARÂMETROS
        url.searchParams.append('tipo', 'adicionarCotacao');
        url.searchParams.append('id', idCotacao);
        url.searchParams.append('vendedora', vendedora);
        url.searchParams.append('dataHora', dataCotacao);
        url.searchParams.append('nomeCliente', nomeClienteVar);
        url.searchParams.append('emailCliente', emailClienteVar);
        url.searchParams.append('telefoneCliente', telefoneClienteVar);
        url.searchParams.append('regiao', regiao);
        url.searchParams.append('tipoPlano', tipoPlano);
        url.searchParams.append('planos', planosTexto);
        url.searchParams.append('faixasEtarias', faixasTexto);
        url.searchParams.append('valores', valoresTexto);
        url.searchParams.append('total', valorTotalFormatado);
        url.searchParams.append('status', 'Pendente');
        
        console.log('%c🔗 URL enviada:', 'color: #0066cc; font-weight: bold;');
        console.log(url.toString());
        
        // ⭐ ENVIAR PARA GOOGLE SHEETS VIA APPS SCRIPT
        const response = await fetch(url.toString(), {
            method: 'GET'
        });
        
        console.log('%c✅ Resposta do servidor:', 'color: #16a34a; font-weight: bold;', response.status);
        
        const responseText = await response.text();
        console.log('%c📋 Resposta completa:', 'color: #0066cc; font-weight: bold;', responseText);
        
        console.log('%c✅ Cotação salva com sucesso!', 'color: #16a34a; font-weight: bold;');
        console.log('ID da cotação:', idCotacao);
        LOADING_SERVICE.success('✅ Cotação registrada no log!');
        
        // ⭐ GUARDAR ID DA COTAÇÃO PARA REFERÊNCIA FUTURA
        comparacaoAtual.idCotacao = idCotacao;
        
    } catch (erro) {
        console.error('%c❌ Erro ao salvar cotação:', 'color: #dc2626; font-weight: bold;', erro);
        LOADING_SERVICE.error('❌ Erro ao registrar cotação no log');
    }
}

