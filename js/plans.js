        function atualizarPlanosCheckboxes() {
                    const container = document.getElementById('planosCheckboxesContainer');
                    container.innerHTML = '';
                    // ⭐ REMOVA ESTA LINHA: planosSelecionados = [];
                    document.getElementById('planosCount').textContent = planosSelecionados.length;

                    if (!selectedRegion || !selectedType) return;

                    const regiao = APP_DATA.regioes[selectedRegion];
                    const planos = regiao.tipos[selectedType] || [];
                    
                    planos.forEach(plano => {
                        const label = document.createElement('label');
                        label.className = 'plano-checkbox-label';
                        
                        // ⭐ ADICIONE ISTO: Verificar se o plano já estava selecionado
                        const jaEstaChecked = planosSelecionados.includes(plano);
                        
                        label.innerHTML = `
                            <input type="checkbox" class="checkbox-plano" value="${plano}" ${jaEstaChecked ? 'checked' : ''} onchange="atualizarPlanosComparacao()">
                            <span>${plano}</span>
                        `;
                        container.appendChild(label);
                    });
                    
                    console.log('%c✅ Checkboxes de planos atualizados', 'color: #16a34a; font-weight: bold;');
                }

                function atualizarPlanosComparacao() {
                    planosSelecionados = Array.from(document.querySelectorAll('#planosCheckboxesContainer .checkbox-plano:checked')).map(cb => cb.value);
                    document.getElementById('planosCount').textContent = planosSelecionados.length;
                    
                    console.log('%c📋 Planos selecionados:', 'color: #0066cc; font-weight: bold;', planosSelecionados);
                }

                function avancarParaAba2() {
            // ⭐ ATUALIZAR PLANOS ANTES DE VALIDAR
            atualizarPlanosComparacao();
            
            console.log('%c🔍 Validando planos...', 'color: #0066cc; font-weight: bold;');
            console.log('Planos selecionados:', planosSelecionados);
            console.log('Quantidade:', planosSelecionados.length);
            
            // ⭐ VALIDAÇÃO 1: Verificar se tem planos selecionados
            if (!planosSelecionados || planosSelecionados.length === 0) {
                console.warn('%c❌ Nenhum plano selecionado', 'color: #dc2626; font-weight: bold;');
                abrirModalAvisoPlanos(); // ⭐ ABRIR MODAL AO INVÉS DE alert()
                return;
            }
            
            // ⭐ VALIDAÇÃO 2: Verificar limite de planos
            if (planosSelecionados.length > 4) {
                alert('⚠️ Selecione no máximo 4 planos!');
                return;
            }
            
            console.log('%c✅ Planos validados:', 'color: #16a34a; font-weight: bold;', planosSelecionados);
            
            // ⭐ VALIDAÇÃO 3: Verificar taxa administradora
            const regiao = APP_DATA.regioes[selectedRegion];
            if (regiao.requerTaxa) {
                const taxaAdmInput = document.getElementById('taxaAdm').value;
                if (taxaAdmInput === '' || taxaAdmInput === null) {
                    alert('⚠️ Taxa de Administradora é obrigatória para Corpe e Lancers!');
                    return;
                }
            }
            
            // ===== NOVA LÓGICA: DETECTAR SE É APENAS INFANTIL =====
            const apenasInfantil = planosSelecionados.length === 1 && planosSelecionados[0].includes('Infantil Tabela Fixa');
            
            if (apenasInfantil) {
                console.log('%c🍼 PLANO INFANTIL DETECTADO - PULANDO FAIXAS ETÁRIAS', 'color: #16a34a; font-weight: bold; font-size: 14px;');
                
                faixasSelecionadas.clear();
                faixasSelecionadas.set(1, 1);
                
                console.log('%c✅ Faixa 0-18 anos pré-configurada automaticamente', 'color: #16a34a; font-weight: bold;');
                
                gerarComparacao();
                return;
            }
            
            faixasSelecionadas.clear();
            console.log('%c🗑️ Faixas anteriores limpas', 'color: #ea580c; font-weight: bold;');
            
            mudarAba(4);
        }

        
/**
 * Abrir modal de aviso - planos não selecionados
 */
function abrirModalAvisoPlanos() {
    console.log('%c⚠️ Abrindo modal de aviso - planos não selecionados', 'color: #ea580c; font-weight: bold;');
    document.getElementById('modalAvisoPlanos').classList.remove('hidden');
}

/**
 * Fechar modal de aviso
 */
function fecharModalAvisoPlanos() {
    console.log('%c✅ Fechando modal de aviso', 'color: #16a34a; font-weight: bold;');
    document.getElementById('modalAvisoPlanos').classList.add('hidden');
}

/**
 * ===== TUTORIAL COM CARDS INTERATIVOS =====
 */

let tutorialAtualCard = 0;

const tutorialCards = [
    {
        numero: 1,
        titulo: '📍 Passo 1: Localize os Planos',
        icone: '📋',
        conteudo: 'Na aba "Configurar Cotação", você verá uma lista de planos disponíveis para a região e tipo selecionados. Cada plano tem um checkbox ao lado.',
        dica: '💡 Os planos mudam conforme você seleciona diferentes regiões e tipos!'
    },
    {
        numero: 2,
        titulo: '✅ Passo 2: Selecione os Planos',
        icone: '☑️',
        conteudo: 'Clique nos checkboxes dos planos que deseja comparar. Você pode escolher de 1 a 4 planos para fazer a comparação.',
        dica: '💡 Quanto mais planos você comparar, melhor você consegue escolher o melhor!'
    },
    {
        numero: 3,
        titulo: '🔢 Passo 3: Acompanhe o Contador',
        icone: '📊',
        conteudo: 'Observe o contador "Planos selecionados: X de 4" que aparece abaixo dos checkboxes. Ele atualiza em tempo real conforme você marca/desmarca os planos.',
        dica: '💡 O contador ajuda você a não esquecer quantos planos já selecionou!'
    },
    {
        numero: 4,
        titulo: '➡️ Passo 4: Avance para Faixas Etárias',
        icone: '🚀',
        conteudo: 'Após selecionar os planos, clique no botão "Próximo: Faixas Etárias" para continuar com a cotação. O sistema só deixará você avançar se tiver selecionado entre 1 e 4 planos.',
        dica: '💡 Se você tentar avançar sem selecionar planos, verá este tutorial novamente!'
    },
    {
        numero: 5,
        titulo: '⭐ Dica Extra: Plano Infantil',
        icone: '🍼',
        conteudo: 'Se você selecionar apenas o plano "Infantil Tabela Fixa", o sistema pulará automaticamente a seleção de faixas etárias e usará a faixa 0-18 anos por padrão.',
        dica: '💡 Isso economiza tempo e torna a cotação mais rápida para planos infantis!'
    }
];

/**
 * Inicializar tutorial com cards
 */
function inicializarTutorialCards() {
    tutorialAtualCard = 0;
    renderizarCardTutorial();
}

/**
 * Renderizar card atual
 */
function renderizarCardTutorial() {
    const container = document.getElementById('tutorialCardsContainer');
    const card = tutorialCards[tutorialAtualCard];
    
    container.innerHTML = `
        <div class="animate-fadeIn">
            <!-- CARD PRINCIPAL -->
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 mb-4">
                <div class="flex items-start gap-4">
                    <div class="text-4xl">${card.icone}</div>
                    <div class="flex-1">
                        <h2 class="text-lg font-bold oeste-text-primary mb-3">${card.titulo}</h2>
                        <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            ${card.conteudo}
                        </p>
                        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                            <p class="text-xs text-yellow-800 font-semibold">
                                ${card.dica}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Atualizar progresso
    atualizarProgressoTutorial();
    atualizarBotoesTutorial();
}

/**
 * Atualizar indicador de progresso
 */
function atualizarProgressoTutorial() {
    const totalCards = tutorialCards.length;
    
    // Atualizar texto
    document.getElementById('tutorialProgressText').textContent = `Passo ${tutorialAtualCard + 1} de ${totalCards}`;
    
    // Atualizar dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (i === tutorialAtualCard) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-oeste-turqueza', 'scale-125');
        } else if (i < tutorialAtualCard) {
            dot.classList.remove('bg-gray-300', 'scale-125');
            dot.classList.add('bg-oeste-turqueza');
        } else {
            dot.classList.remove('bg-oeste-turqueza', 'scale-125');
            dot.classList.add('bg-gray-300');
        }
    }
}

/**
 * Atualizar estado dos botões
 */
function atualizarBotoesTutorial() {
    const totalCards = tutorialCards.length;
    const btnAnterior = document.getElementById('btnTutorialAnterior');
    const btnProximo = document.getElementById('btnTutorialProximo');
    const btnFinalizar = document.getElementById('btnTutorialFinalizar');
    
    // Desabilitar botão anterior no primeiro card
    if (tutorialAtualCard === 0) {
        btnAnterior.disabled = true;
        btnAnterior.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        btnAnterior.disabled = false;
        btnAnterior.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Mostrar botão finalizar no último card
    if (tutorialAtualCard === totalCards - 1) {
        btnProximo.classList.add('hidden');
        btnFinalizar.classList.remove('hidden');
    } else {
        btnProximo.classList.remove('hidden');
        btnFinalizar.classList.add('hidden');
    }
}

/**
 * Avançar para próximo card
 */
function tutorialProximo() {
    if (tutorialAtualCard < tutorialCards.length - 1) {
        tutorialAtualCard++;
        renderizarCardTutorial();
        console.log(`%c📖 Tutorial: Avançando para passo ${tutorialAtualCard + 1}`, 'color: #0066cc; font-weight: bold;');
    }
}

/**
 * Voltar para card anterior
 */
function tutorialAnterior() {
    if (tutorialAtualCard > 0) {
        tutorialAtualCard--;
        renderizarCardTutorial();
        console.log(`%c📖 Tutorial: Voltando para passo ${tutorialAtualCard + 1}`, 'color: #0066cc; font-weight: bold;');
    }
}

/**
 * Abrir modal de tutorial
 */
function abrirTutorialPlanos() {
    console.log('%c🎓 Abrindo tutorial de planos', 'color: #0066cc; font-weight: bold;');
    inicializarTutorialCards();
    document.getElementById('modalTutorialPlanos').classList.remove('hidden');
}

/**
 * Fechar modal de tutorial
 */
function fecharModalTutorialPlanos() {
    console.log('%c✅ Fechando tutorial', 'color: #16a34a; font-weight: bold;');
    document.getElementById('modalTutorialPlanos').classList.add('hidden');
    document.getElementById('modalAvisoPlanos').classList.add('hidden');
}

console.log('%c✅ Plans.js carregado com sucesso', 'color: #16a34a; font-weight: bold;');