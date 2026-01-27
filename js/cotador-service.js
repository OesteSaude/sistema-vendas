// ===== SERVIÇO DE INTEGRAÇÃO DO COTADOR COM FIREBASE =====

const COTADOR_SERVICE = {
    
    /**
     * Envia uma cotação para o Firebase
     * @param {Object} dados - Dados da cotação
     * @returns {Promise<Object>} { sucesso: boolean, id: string, erro: string }
     */
    async enviarCotacao(dados) {
        try {
            console.log('%c📋 Validando dados da cotação...', 'color: #0066cc; font-weight: bold;');
            
            // ⭐ VALIDAR DADOS
            const validacao = this.validarDados(dados);
            if (!validacao.valido) {
                throw new Error(validacao.erro);
            }
            
            console.log('%c✅ Dados validados com sucesso!', 'color: #16a34a; font-weight: bold;');
            
            // ⭐ GERAR ID ÚNICO
            const id = this.gerarID();
            console.log('%c🆔 ID gerado:', 'color: #0066cc; font-weight: bold;', id);
            
            // ⭐ FORMATAR DADOS PARA FIREBASE
            const cotacaoFormatada = this.formatarParaFirebase(dados, id);
            
            console.log('%c💾 Salvando no Firebase...', 'color: #0066cc; font-weight: bold;');
            
            // ⭐ SALVAR NO FIREBASE
            await DATABASE_SERVICE.salvarCotacao(id, cotacaoFormatada);
            
            console.log('%c✅ Cotação salva com sucesso!', 'color: #16a34a; font-weight: bold; font-size: 14px;');
            
            return {
                sucesso: true,
                id: id,
                erro: null
            };
            
        } catch (error) {
            console.error('%c❌ Erro ao enviar cotação:', 'color: #dc2626; font-weight: bold;', error);
            return {
                sucesso: false,
                id: null,
                erro: error.message
            };
        }
    },
    
    /**
     * Valida os dados da cotação
     * @param {Object} dados - Dados a validar
     * @returns {Object} { valido: boolean, erro: string }
     */
    validarDados(dados) {
        // Validar campos obrigatórios
        if (!dados.vendedora || !dados.vendedoraUID) {
            return { valido: false, erro: 'Vendedora não identificada' };
        }
        
        if (!dados.nomeCliente || dados.nomeCliente.trim() === '') {
            return { valido: false, erro: 'Nome do cliente é obrigatório' };
        }
        
        if (!dados.emailCliente || dados.emailCliente.trim() === '') {
            return { valido: false, erro: 'Email do cliente é obrigatório' };
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dados.emailCliente)) {
            return { valido: false, erro: 'Email inválido' };
        }
        
        if (!dados.telefonecliente || dados.telefonecliente.trim() === '') {
            return { valido: false, erro: 'Telefone do cliente é obrigatório' };
        }
        
        if (!dados.regiao || dados.regiao.trim() === '') {
            return { valido: false, erro: 'Região não selecionada' };
        }
        
        if (!dados.tipo || dados.tipo.trim() === '') {
            return { valido: false, erro: 'Tipo de plano não selecionado' };
        }
        
        if (!dados.planos || dados.planos.length === 0) {
            return { valido: false, erro: 'Nenhum plano selecionado' };
        }
        
        if (!dados.faixas || dados.faixas.length === 0) {
            return { valido: false, erro: 'Nenhuma faixa etária selecionada' };
        }
        
        if (!dados.comparacao || !dados.comparacao.resultados) {
            return { valido: false, erro: 'Comparação não gerada' };
        }
        
        return { valido: true, erro: null };
    },
    
    /**
     * Gera um ID único (UUID v4)
     * @returns {string} ID único
     */
    gerarID() {
        return crypto.randomUUID();
    },
    
    /**
     * Formata os dados para o padrão do Firebase
     * @param {Object} dados - Dados brutos
     * @param {string} id - ID da cotação
     * @returns {Object} Dados formatados
     */
    formatarParaFirebase(dados, id) {
        // Calcular total
        let totalGeral = 0;
        if (dados.comparacao && dados.comparacao.resultados) {
            dados.comparacao.resultados.forEach(r => {
                if (!r.plano.includes('Odontológico')) {
                    totalGeral += r.valorFinal;
                }
            });
        }
        
        return {
            // Identificação
            ID: id,
            uidVendedora: dados.vendedoraUID,
            Vendedora: dados.vendedora,
            
            // Data e hora
            'Data/Hora': new Date().toLocaleString('pt-BR'),
            timestamp: new Date().getTime(),
            
            // Cliente
            'Nome Cliente': dados.nomeCliente,
            'Email Cliente': dados.emailCliente,
            'Telefone Cliente': dados.telefonecliente,
            
            // Cotação
            Região: dados.regiao,
            Tipo: dados.tipo,
            Planos: dados.planos,
            
            // Faixas etárias
            'Faixas Etárias': dados.faixas.map(f => ({
                nome: f.info.nome,
                chave: f.info.chave,
                quantidade: f.qtd
            })),
            
            // Valores
            Valores: this.formatarValores(dados.comparacao),
            Total: FORMATTERS.formatarMoeda(totalGeral),
            TotalNumerico: totalGeral,
            
            // Status
            Status: 'Pendente',
            'Plano Contratado': '',
            'Motivo da Negativa': '',
            'Data Conclusão': '',
            'Data da Negativa': ''
        };
    },
    
    /**
     * Formata os valores da comparação
     * @param {Object} comparacao - Dados da comparação
     * @returns {Object} Valores formatados
     */
    formatarValores(comparacao) {
        const valores = {};
        
        if (!comparacao || !comparacao.resultados) {
            return valores;
        }
        
        comparacao.resultados.forEach(resultado => {
            const plano = resultado.plano;
            
            // Pular odontológico
            if (plano.includes('Odontológico')) {
                return;
            }
            
            valores[plano] = {};
            
            // Adicionar cada faixa etária
            comparacao.faixas.forEach(faixa => {
                const valorUnitario = obterValorPlano(
                    comparacao.regiao,
                    comparacao.tipo,
                    plano,
                    faixa.chave
                );
                
                if (valorUnitario !== null && valorUnitario > 0) {
                    valores[plano][faixa.nome] = FORMATTERS.formatarMoeda(valorUnitario);
                }
            });
            
            // Adicionar subtotal
            valores[plano]['SUBTOTAL'] = FORMATTERS.formatarMoeda(resultado.subtotal);
        });
        
        return valores;
    }
};