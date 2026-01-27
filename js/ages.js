function gerarFaixasInline() {
    const container = document.getElementById('faixasContainer');
    let html = '';
    for (let i = 1; i <= 10; i++) {
        const info = obterFaixaInfo(i);
        html += `
            <div class="faixa-inline-item">
                <input type="checkbox" id="faixa${i}" data-faixa="${i}" onchange="toggleFaixaInline(${i})">
                <label for="faixa${i}">${info.nome}</label>
                <input 
                    type="number" 
                    id="qtd${i}" 
                    min="0" 
                    value="1" 
                    disabled 
                    class="qtd-input"
                    onchange="atualizarQuantidadeFaixa(${i}, this.value)"
                    oninput="atualizarQuantidadeFaixa(${i}, this.value)"
                >
            </div>
        `;
    }
    container.innerHTML = html;
}

function toggleFaixaInline(numero) {
    const checkbox = document.getElementById(`faixa${numero}`);
    const input = document.getElementById(`qtd${numero}`);
    
    if (checkbox.checked) {
        faixasSelecionadas.set(numero, 1);
        input.disabled = false;
        input.focus();
        console.log(`%c✅ Faixa ${numero} selecionada`, 'color: #16a34a; font-weight: bold;');
    } else {
        faixasSelecionadas.delete(numero);
        input.disabled = true;
        input.value = 1;
        console.log(`%c❌ Faixa ${numero} removida`, 'color: #dc2626; font-weight: bold;');
    }
    
    // ⭐ VALIDAR PLANO FAMILIAR
    validarPlanoFamiliar();
}

/**
 * Atualizar quantidade de uma faixa etária
 */
function atualizarQuantidadeFaixa(numero, novaQuantidade) {
    const qtd = parseInt(novaQuantidade) || 0;
    
    if (qtd > 0) {
        faixasSelecionadas.set(numero, qtd);
        console.log(`%c✏️ Faixa ${numero} atualizada para ${qtd} pessoas`, 'color: #0066cc; font-weight: bold;');
    } else {
        faixasSelecionadas.delete(numero);
        console.log(`%c🗑️ Faixa ${numero} removida`, 'color: #ea580c; font-weight: bold;');
    }
    
    // ⭐ VALIDAR PLANO FAMILIAR
    validarPlanoFamiliar();
}

/**
 * Validar e exibir aviso de plano familiar
 */
function validarPlanoFamiliar() {
    const container = document.getElementById('faixasContainer');
    
    // Remover aviso anterior se existir
    const avisoAnterior = document.getElementById('avisoFamiliar');
    if (avisoAnterior) avisoAnterior.remove();

    if (selectedType === 'Familiar') {
        let totalPessoas = 0;
        faixasSelecionadas.forEach((qtd) => {
            totalPessoas += qtd;
        });

        const aviso = document.createElement('div');
        aviso.id = 'avisoFamiliar';
        aviso.className = totalPessoas < 2 
            ? 'bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4' 
            : 'bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4';
        
        if (totalPessoas < 2) {
            aviso.innerHTML = `
                <p class="text-sm font-bold text-yellow-800">
                    <i class="fas fa-exclamation-triangle"></i>
                    ⚠️ Plano FAMILIAR requer MÍNIMO 2 pessoas!
                </p>
                <p class="text-xs text-yellow-700 mt-2">
                    Pessoas selecionadas: <strong>${totalPessoas}</strong>
                </p>
            `;
        } else {
            aviso.innerHTML = `
                <p class="text-sm font-bold text-green-800">
                    <i class="fas fa-check-circle"></i>
                    ✅ Plano FAMILIAR válido!
                </p>
                <p class="text-xs text-green-700 mt-2">
                    Pessoas selecionadas: <strong>${totalPessoas}</strong>
                </p>
            `;
        }

        container.parentElement.insertBefore(aviso, container);
    }
}