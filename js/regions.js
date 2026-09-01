        function atualizarTaxaAdmSection() {
            const regiao = APP_DATA.regioes[selectedRegion];
            const taxaSection = document.getElementById('taxaAdmSection');
            if (regiao && regiao.requerTaxa) {
                taxaSection.classList.remove('hidden');
            } else {
                taxaSection.classList.add('hidden');
                document.getElementById('taxaAdm').value = '';
            }
        }

        function atualizarDescontosAdicionaisSection() {
            const descontosSection = document.getElementById('descontosAdicionaisSection');
            const radioOAB = document.querySelector('input[name="descontoAdicional"][value="OAB"]');
            const radioEstudante = document.querySelector('input[name="descontoAdicional"][value="Estudante"]');
            const radioPromo50 = document.querySelector('input[name="descontoAdicional"][value="Promo50"]');
            const radioNenhum = document.querySelector('input[name="descontoAdicional"][value="Nenhum"]');

            if (selectedRegion === 'Oeste Paulista (SP)') {
                descontosSection.classList.remove('hidden');

                if (selectedType === 'Individual') {
                    radioOAB.parentElement.style.display = 'inline-flex';
                    radioEstudante.parentElement.style.display = 'inline-flex';
                } else if (selectedType === 'Familiar') {
                    radioOAB.parentElement.style.display = 'inline-flex';
                    radioEstudante.parentElement.style.display = 'none';
                    radioEstudante.checked = false;
                } else {
                    radioOAB.parentElement.style.display = 'none';
                    radioEstudante.parentElement.style.display = 'none';
                    radioOAB.checked = false;
                    radioEstudante.checked = false;
                }

                // Promo 50% SEMPRE visível em Oeste Paulista
                radioPromo50.parentElement.style.display = 'inline-flex';
                radioNenhum.checked = true;
            } else {
                descontosSection.classList.add('hidden');
                radioOAB.checked = false;
                radioEstudante.checked = false;
                radioNenhum.checked = true;
            }

            // Promo 50% SEMPRE visível em TODOS os contextos (fora do if também)
            if (radioPromo50) {
                radioPromo50.parentElement.style.display = 'inline-flex';
            }
        }

        function handleDescontoRadioChange(value) {
            console.log('Desconto selecionado:', value);
        }

        function atualizarPlanoOdontologicoSection() {
            const odontoSection = document.getElementById('planoOdontologicoSection');
            const incluirOdontoCheckbox = document.getElementById('incluirPlanoOdontologico');

            if (selectedType.includes('Empresarial')) {
                odontoSection.classList.remove('hidden');
            } else {
                odontoSection.classList.add('hidden');
                incluirOdontoCheckbox.checked = false; // Desmarca se não for Empresarial
            }
        }

        function calcularPlanoOdontologico() {
            // Verifica se o checkbox existe e está marcado
            const checkbox = document.getElementById('incluirPlanoOdontologico');
            if (!checkbox || !checkbox.checked) {
                console.log('%c⚠️ Plano Odontológico não selecionado', 'color: #ea580c; font-weight: bold;');
                return 0;
            }

            console.log('%c✅ Plano Odontológico selecionado', 'color: #16a34a; font-weight: bold;');

            // Calcula a quantidade TOTAL de pessoas de todas as faixas etárias
            let totalPessoas = 0;
            
            faixasSelecionadas.forEach((_, numero) => {
                const qtdInput = document.getElementById(`qtd${numero}`);
                if (qtdInput) {
                    const qtd = parseInt(qtdInput.value) || 0;
                    totalPessoas += qtd;
                    console.log(`Faixa ${numero}: ${qtd} pessoas`);
                }
            });

            const valorOdonto = totalPessoas * 25;
            console.log('%cTotal de pessoas:', 'color: #0066cc; font-weight: bold;', totalPessoas);
            console.log('%cValor Odontológico:', 'color: #0066cc; font-weight: bold;', `R$ ${valorOdonto.toFixed(2)}`);
            
            return valorOdonto;
        }
