// ===== SERVIÇO DE VENDEDORES =====

const VENDEDOR_SERVICE = {
    /**
     * Obter dados do vendedor pelo UID
     * @param {string} uid - O UID do vendedor.
     * @returns {Promise<object|null>} Os dados do vendedor ou null se não encontrado/erro.
     */
    async obterDadosVendedor(uid) {
        try {
            console.log('%c🔍 Buscando dados do vendedor...', 'color: #0066cc; font-weight: bold;', uid);

            // ⭐ CORREÇÃO: Usar o caminho 'users/' no Firebase
            const ref = firebase.database().ref(`users/${uid}`);
            const snapshot = await ref.get();

            if (snapshot.exists()) {
                const dados = snapshot.val();
                console.log('%c✅ Dados do vendedor encontrados:', 'color: #16a34a; font-weight: bold;', dados);
                return dados;
            } else {
                console.warn('%c⚠️ Dados do vendedor não encontrados', 'color: #ea580c; font-weight: bold;');
                return null;
            }
        } catch (erro) {
            console.error('%c❌ Erro ao buscar dados do vendedor:', 'color: #dc2626; font-weight: bold;', erro.message);
            return null;
        }
    },

    /**
     * Salvar/Atualizar dados do vendedor
     * @param {string} uid - O UID do vendedor.
     * @param {object} dados - O objeto de dados a ser salvo.
     * @returns {Promise<boolean>} True se salvo com sucesso, false caso contrário.
     */
    async salvarDadosVendedor(uid, dados) {
        try {
            console.log('%c💾 Salvando dados do vendedor...', 'color: #0066cc; font-weight: bold;', dados);

            // ⭐ CORREÇÃO: Usar o caminho 'users/' no Firebase
            const ref = firebase.database().ref(`users/${uid}`);
            await ref.set(dados);

            console.log('%c✅ Dados salvos com sucesso!', 'color: #16a34a; font-weight: bold;');
            return true;
        } catch (erro) {
            console.error('%c❌ Erro ao salvar dados:', 'color: #dc2626; font-weight: bold;', erro.message);
            return false;
        }
    },

    /**
     * Atualizar apenas alguns campos de um vendedor.
     * @param {string} uid - O UID do vendedor.
     * @param {object} campos - Um objeto contendo os campos a serem atualizados.
     * @returns {Promise<boolean>} True se atualizado com sucesso, false caso contrário.
     */
    async atualizarDadosVendedor(uid, campos) {
        try {
            console.log('%c✏️ Atualizando dados do vendedor...', 'color: #0066cc; font-weight: bold;', campos);

            // ⭐ CORREÇÃO: Usar o caminho 'users/' no Firebase
            const ref = firebase.database().ref(`users/${uid}`);
            await ref.update(campos);

            console.log('%c✅ Dados atualizados com sucesso!', 'color: #16a34a; font-weight: bold;');
            return true;
        } catch (erro) {
            console.error('%c❌ Erro ao atualizar dados:', 'color: #dc2626; font-weight: bold;', erro.message);
            return false;
        }
    }
};

console.log('%c✅ VENDEDOR_SERVICE carregado', 'color: #16a34a; font-weight: bold;');