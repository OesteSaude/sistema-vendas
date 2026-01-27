        const formatarMoeda = (valor) => {
            if (valor === null || isNaN(valor)) return '';
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        };

        const obterFaixaInfo = (numero) => APP_DATA.faixas[numero] || {};
        const obterRegiaoData = (regiao) => APP_DATA.regioes[regiao] || {};

        function gerarChavePlanos(planos) {
            if (!planos || planos.length === 0) return null;

            let hasExclusivo = false;
            let premiumLevels = [];

            planos.forEach(plano => {
                // Remove "Ouro" da análise - trata como Premium normal
                const planoLimpo = plano.replace('Ouro ', '');
                
                // Trata "Infantil Tabela Fixa" como "Premium III" para geração da chave de imagem
                if (planoLimpo.includes('Infantil Tabela Fixa')) {
                    premiumLevels.push('III');
                } else if (planoLimpo.includes('Premium IV')) premiumLevels.push('IV');
                else if (planoLimpo.includes('Premium III')) premiumLevels.push('III');
                else if (planoLimpo.includes('Premium II')) premiumLevels.push('II');
                else if (planoLimpo.includes('Premium I')) premiumLevels.push('I');
                
                // Se tem Exclusivo III, marca como true
                if (planoLimpo.includes('Exclusivo III')) {
                    hasExclusivo = true;
                }
            });

            // REMOVE DUPLICATAS
            premiumLevels = [...new Set(premiumLevels)];

            const orderMap = { 'IV': 4, 'III': 3, 'II': 2, 'I': 1 };
            const sortedPremiumLevels = premiumLevels.sort((a, b) => orderMap[b] - orderMap[a]);

            let prefix = '';
            let suffix = '';

            // Se tem APENAS Exclusivo (sem Premium)
            if (hasExclusivo && sortedPremiumLevels.length === 0) {
                prefix = 'Exclusivo';
                suffix = '(III)';
            }
            // Se tem Exclusivo E Premium
            else if (hasExclusivo && sortedPremiumLevels.length > 0) {
                prefix = 'Premium e Exclusivo';
                // Adiciona III à lista se não estiver
                if (!sortedPremiumLevels.includes('III')) {
                    sortedPremiumLevels.push('III');
                    sortedPremiumLevels.sort((a, b) => orderMap[b] - orderMap[a]);
                }
                // Mantém a ordem: IV, III, II, I
                if (sortedPremiumLevels.length === 1) {
                    suffix = `(${sortedPremiumLevels[0]})`;
                } else if (sortedPremiumLevels.length === 2) {
                    suffix = `(${sortedPremiumLevels[0]} e ${sortedPremiumLevels[1]})`;
                } else {
                    suffix = `(${sortedPremiumLevels.slice(0, -1).join(', ')} e ${sortedPremiumLevels[sortedPremiumLevels.length - 1]})`;
                }
            }
            // Se tem APENAS Premium (sem Exclusivo)
            else if (sortedPremiumLevels.length > 0) {
                prefix = 'Premium';
                if (sortedPremiumLevels.length === 1) {
                    suffix = `(${sortedPremiumLevels[0]})`;
                } else if (sortedPremiumLevels.length === 2) {
                    suffix = `(${sortedPremiumLevels[0]} e ${sortedPremiumLevels[1]})`;
                } else {
                    suffix = `(${sortedPremiumLevels.slice(0, -1).join(', ')} e ${sortedPremiumLevels[sortedPremiumLevels.length - 1]})`;
                }
            } else {
                return null;
            }

            return `${prefix} ${suffix}`.trim();
        }

        function obterImagemPlanos(regiao, tipo, planos) {
            const chave = gerarChavePlanos(planos);
            
            // ===== DEBUG =====
            console.log('%c🔍 DEBUG - GERAÇÃO DE IMAGEM', 'color: #0066cc; font-weight: bold; font-size: 14px;');
            console.log('%cChave gerada:', 'color: #0066cc; font-weight: bold;', chave);
            console.log('%cRegião:', 'color: #0066cc; font-weight: bold;', regiao);
            console.log('%cTipo:', 'color: #0066cc; font-weight: bold;', tipo);
            console.log('%cPlanos selecionados:', 'color: #0066cc; font-weight: bold;', planos);
            
            const regiaoData = obterRegiaoData(regiao);
            
            if (!regiaoData) {
                console.error('%c❌ ERRO: Região não encontrada!', 'color: #dc2626; font-weight: bold;', regiao);
                console.log('%cRegiões disponíveis:', 'color: #dc2626; font-weight: bold;', Object.keys(APP_DATA.regioes));
                return null;
            }
            
            console.log('%c✅ Região encontrada', 'color: #16a34a; font-weight: bold;');
            
            if (!regiaoData.imagens) {
                console.error('%c❌ ERRO: Imagens não existem para a região!', 'color: #dc2626; font-weight: bold;', regiao);
                return null;
            }
            
            console.log('%c✅ Objeto de imagens encontrado', 'color: #16a34a; font-weight: bold;');
            
            // Lógica para o novo tipo "Tabela Referência" puxar a imagem específica
            let tipoParaBusca = tipo;
            if (tipo === "Tabela Referência") {
                // Para "Tabela Referência", a imagem é específica e não depende da chave gerada
                // A chave já foi tratada para ser "Premium (III)" na função gerarChavePlanos
                // Aqui, apenas garantimos que o tipo de busca seja o correto para a imagem
                tipoParaBusca = "Empresarial (30 vidas ou +)"; // Ou outro tipo que contenha a imagem desejada, ajustado para Premium (IV)
                // A imagem para "Premium (IV)" na Oeste Paulista é a mesma para vários tipos, então podemos usar um tipo existente
                // A chave gerada para "Premium III (40%)" será "Premium (III)"
                // Vamos buscar a imagem de "Premium (IV)" para Oeste Paulista, que é a imagem desejada.
                // A imagem para "Premium (IV)" na Oeste Paulista é "https://i.imgur.com/26h9URw.jpeg"
                // Para simplificar, vamos buscar diretamente a imagem de "Premium (IV)" se for "Tabela Referência"
                if (regiao === "Oeste Paulista (SP)") {
                    console.log('%c✅ Tipo "Tabela Referência" detectado. Usando imagem específica.', 'color: #16a34a; font-weight: bold;');
                    return APP_DATA.regioes["Oeste Paulista (SP)"].imagens["Empresarial (30 vidas ou +)"]["Premium (IV)"];
                }
            }


            if (!regiaoData.imagens[tipoParaBusca]) {
                console.error('%c❌ ERRO: Tipo não encontrado!', 'color: #dc2626; font-weight: bold;', tipoParaBusca);
                console.log('%cTipos disponíveis:', 'color: #dc2626; font-weight: bold;', Object.keys(regiaoData.imagens[tipoParaBusca]));
                return null;
            }

            console.log('%c✅ Tipo encontrado', 'color: #16a34a; font-weight: bold;');
            console.log('%cChaves disponíveis para este tipo:', 'color: #0066cc; font-weight: bold;', Object.keys(regiaoData.imagens[tipoParaBusca]));
            
            const imagemDisponivel = regiaoData.imagens[tipoParaBusca][chave];
            
            if (imagemDisponivel) {
                console.log('%c✅ IMAGEM ENCONTRADA!', 'color: #16a34a; font-weight: bold; font-size: 14px;');
                console.log('%cURL da imagem:', 'color: #16a34a; font-weight: bold;', imagemDisponivel);
            } else {
                console.warn('%c⚠️ AVISO: Imagem não encontrada para a chave!', 'color: #ea580c; font-weight: bold;');
                console.log('%cChave procurada:', 'color: #ea580c; font-weight: bold;', chave);
                console.log('%cChaves disponíveis:', 'color: #ea580c; font-weight: bold;', Object.keys(regiaoData.imagens[tipoParaBusca]));
            }
            
            console.log('%c' + '='.repeat(60), 'color: #0066cc;');
            
            return imagemDisponivel || null;
        }

        // ===== TUTORIAL MODAL =====
            function showTutorialModal(tipo) {
                // Define mensagens baseadas no tipo de erro
                const messages = {
                    1: {
                        titulo: '⚠️ Dados Obrigatórios',
                        mensagem: 'Você precisa preencher os dados obrigatórios:\n\n✓ Selecione uma Região\n✓ Selecione um Tipo de Plano\n\nDepois clique em "Avançar"!'
                    },
                    2: {
                        titulo: '⚠️ Faixas Não Selecionadas',
                        mensagem: 'Você precisa selecionar as faixas corretamente:\n\n✓ Escolha pelo menos uma faixa etária\n✓ Verifique os dados de cada faixa\n\nDepois clique em "Avançar"!'
                    },
                    3: {
                        titulo: '⚠️ Planos Não Selecionados',
                        mensagem: 'Você precisa selecionar os planos:\n\n✓ Escolha pelo menos um plano\n✓ Clique no plano para selecioná-lo\n\nDepois clique em "Gerar Comparação"!'
                    }
                };

                const config = messages[tipo];
                
                console.log(`%c📚 TUTORIAL MODAL - ${config.titulo}`, 'color: #00A8B0; font-weight: bold; font-size: 14px;');

                // Criar overlay
                const modal = document.createElement('div');
                modal.id = 'tutorialModal';
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 61, 88, 0.85);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                `;

                // Criar conteúdo do modal
                const modalContent = document.createElement('div');
                modalContent.style.cssText = `
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    animation: slideIn 0.3s ease-out;
                `;

                // Adicionar animação
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @media (max-width: 600px) {
                        #tutorialModal > div {
                            padding: 20px !important;
                            max-width: 95% !important;
                        }
                    }
                `;
                document.head.appendChild(style);

                // Título
                const titulo = document.createElement('h2');
                titulo.textContent = config.titulo;
                titulo.style.cssText = `
                    color: #003D58;
                    margin: 0 0 15px 0;
                    font-size: 20px;
                    font-weight: 700;
                `;

                // Mensagem
                const mensagem = document.createElement('p');
                mensagem.textContent = config.mensagem;
                mensagem.style.cssText = `
                    color: #64748b;
                    margin: 0 0 25px 0;
                    font-size: 14px;
                    line-height: 1.6;
                    white-space: pre-wrap;
                `;

                // Botão fechar
                const btnFechar = document.createElement('button');
                btnFechar.textContent = '✓ Entendi!';
                btnFechar.style.cssText = `
                    background: #00A8B0;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    width: 100%;
                `;

                btnFechar.addEventListener('mouseover', () => {
                    btnFechar.style.background = '#003D58';
                    btnFechar.style.transform = 'translateY(-2px)';
                });

                btnFechar.addEventListener('mouseout', () => {
                    btnFechar.style.background = '#00A8B0';
                    btnFechar.style.transform = 'translateY(0)';
                });

                btnFechar.addEventListener('click', () => {
                    modal.remove();
                    style.remove();
                    console.log('%c✅ Tutorial modal fechado', 'color: #16a34a; font-weight: bold;');
                });

                // Fechar ao clicar no overlay
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                        style.remove();
                    }
                });

                // Montar modal
                modalContent.appendChild(titulo);
                modalContent.appendChild(mensagem);
                modalContent.appendChild(btnFechar);
                modal.appendChild(modalContent);
                document.body.appendChild(modal);
            }

            // ===== NOVA COTAÇÃO =====
            function novaComparacao() {
                console.log('%c🔄 Iniciando nova cotação...', 'color: #00A8B0; font-weight: bold; font-size: 14px;');
                
                // Limpar variáveis globais
                selectedRegion = '';
                selectedType = '';
                nomeCliente = '';
                planosSelecionados = [];
                faixasSelecionados = new Map();
                comparacaoAtual = null;
                
                // Limpar inputs
                document.getElementById('nomeCliente').value = '';
                document.getElementById('emailCliente').value = '';
                document.getElementById('telefonecliente').value = '';
                document.getElementById('taxaAdm').value = '';
                
                // Limpar checkboxes
                document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
                
                // Limpar seleções de botões
                document.querySelectorAll('.btn-regiao-colorido, .btn-tipo').forEach(btn => btn.classList.remove('selected'));
                
                // Limpar inputs de quantidade de faixas
                document.querySelectorAll('input[id^="qtd"]').forEach(input => input.value = '');
                
                // Limpar status de validação
                const avisoValidacao = document.getElementById('avisoValidacaoDados');
                if (avisoValidacao) avisoValidacao.classList.add('hidden');
                
                // Habilitar/desabilitar botões conforme necessário
                const btnProximo = document.getElementById('btnProximoRegiao');
                if (btnProximo) {
                    btnProximo.disabled = true;
                    btnProximo.classList.add('opacity-50', 'cursor-not-allowed');
                }
                
                console.log('%c✅ Cotação limpa com sucesso!', 'color: #16a34a; font-weight: bold;');
                
                // Voltar para a primeira aba
                mudarAba(0);
            }
            // ===== FECHAR MODAIS COM ESC =====
document.addEventListener('keydown', (e) => {
    // Verificar se a tecla pressionada é ESC
    if (e.key === 'Escape') {
        console.log('%c⌨️ ESC pressionado - fechando modais...', 'color: #ea580c; font-weight: bold;');
        
        // Fechar todos os modais abertos
        const modaisAbertos = document.querySelectorAll('.modal:not(.hidden), [class*="modal"]:not(.hidden)');
        
        modaisAbertos.forEach(modal => {
            // Verificar se é um modal que pode ser fechado
            if (modal.id && (
                modal.id.includes('modal') || 
                modal.id.includes('Modal') ||
                modal.classList.contains('modal-crm')
            )) {
                modal.classList.add('hidden');
                console.log(`%c✅ Modal fechado: ${modal.id}`, 'color: #16a34a; font-weight: bold;');
            }
        });
    }
});


console.log('%c✅ Listener de ESC carregado', 'color: #16a34a; font-weight: bold;');
