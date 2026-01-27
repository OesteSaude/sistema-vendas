// ===== SERVIÇO DE BANCO DE DADOS =====

const DATABASE_SERVICE = {

    /**
     * Adiciona uma nova cotação ao banco de dados.
     * @param {string} uid - O UID do usuário (vendedor) que está adicionando a cotação.
     * @param {object} quotationData - Os dados da cotação a serem salvos.
     * @returns {Promise<string>} A chave gerada para a nova cotação.
     */
    async addQuotation(uid, quotationData) {
        console.log('%c➕ DATABASE_SERVICE: Adicionando cotação...', 'color: #0066cc; font-weight: bold;', { uid, quotationData });
        try {
            const newQuotationRef = firebase.database().ref(`quotations/${uid}`).push();
            await newQuotationRef.set(quotationData);
            console.log('%c✅ DATABASE_SERVICE: Cotação adicionada com sucesso!', 'color: #16a34a; font-weight: bold;', newQuotationRef.key);
            return newQuotationRef.key;
        } catch (error) {
            console.error('%c❌ DATABASE_SERVICE: Erro ao adicionar cotação:', 'color: #dc2626; font-weight: bold;', error);
            throw error;
        }
    },

    /**
     * Obtém todas as cotações de um usuário.
     * @param {string} uid - O UID do usuário (vendedor).
     * @returns {Promise<object | null>} Um objeto contendo as cotações (chave:valor) ou null.
     */
    async getQuotations(uid) {
        console.log('%c🔍 DATABASE_SERVICE: Obtendo cotações...', 'color: #0066cc; font-weight: bold;', { uid });
        try {
            const snapshot = await firebase.database().ref(`quotations/${uid}`).get();
            const quotations = snapshot.val();
            console.log('%c✅ DATABASE_SERVICE: Cotações obtidas:', 'color: #16a34a; font-weight: bold;', quotations);
            return quotations;
        } catch (error) {
            console.error('%c❌ DATABASE_SERVICE: Erro ao obter cotações:', 'color: #dc2626; font-weight: bold;', error);
            throw error;
        }
    },

    /**
     * Atualiza uma cotação existente.
     * @param {string} uid - O UID do usuário (vendedor) proprietário da cotação.
     * @param {string} quotationId - O ID da cotação a ser atualizada.
     * @param {object} updates - Um objeto com os campos a serem atualizados.
     * @returns {Promise<void>}
     */
    async updateQuotation(uid, quotationId, updates) {
        console.log('%c✏️ DATABASE_SERVICE: Atualizando cotação...', 'color: #0066cc; font-weight: bold;', { uid, quotationId, updates });
        try {
            await firebase.database().ref(`quotations/${uid}/${quotationId}`).update(updates);
            console.log('%c✅ DATABASE_SERVICE: Cotação atualizada com sucesso!', 'color: #16a34a; font-weight: bold;', quotationId);
        } catch (error) {
            console.error('%c❌ DATABASE_SERVICE: Erro ao atualizar cotação:', 'color: #dc2626; font-weight: bold;', error);
            throw error;
        }
    },

    /**
     * Deleta uma cotação.
     * @param {string} uid - O UID do usuário (vendedor) proprietário da cotação.
     * @param {string} quotationId - O ID da cotação a ser deletada.
     * @returns {Promise<void>}
     */
    async deleteQuotation(uid, quotationId) {
        console.log('%c🗑️ DATABASE_SERVICE: Deletando cotação...', 'color: #0066cc; font-weight: bold;', { uid, quotationId });
        try {
            await firebase.database().ref(`quotations/${uid}/${quotationId}`).remove();
            console.log('%c✅ DATABASE_SERVICE: Cotação deletada com sucesso!', 'color: #16a34a; font-weight: bold;', quotationId);
        } catch (error) {
            console.error('%c❌ DATABASE_SERVICE: Erro ao deletar cotação:', 'color: #dc2626; font-weight: bold;', error);
            throw error;
        }
    },

    /**
     * Configura um listener em tempo real para as cotações de um usuário.
     * @param {string} uid - O UID do usuário (vendedor).
     * @param {function(object | null): void} callback - A função a ser chamada com os dados atualizados.
     * @returns {function(): void} Uma função para desvincular o listener.
     */
    listenForQuotations(uid, callback) {
        console.log('%c👂 DATABASE_SERVICE: Configurando listener para cotações...', 'color: #0066cc; font-weight: bold;', { uid });
        const ref = firebase.database().ref(`quotations/${uid}`);
        const listener = ref.on('value', (snapshot) => {
            const quotations = snapshot.val();
            console.log('%c🔄 DATABASE_SERVICE: Cotações atualizadas:', 'color: #0066cc; font-weight: bold;', quotations);
            callback(quotations);
        }, (error) => {
            console.error('%c❌ DATABASE_SERVICE: Erro no listener de cotações:', 'color: #dc2626; font-weight: bold;', error);
        });
        return () => {
            console.log('%c🛑 DATABASE_SERVICE: Desvinculando listener de cotações.', 'color: #ea580c; font-weight: bold;', { uid });
            ref.off('value', listener);
        };
    },

    /**
     * Obtém o perfil de um usuário.
     * @param {string} uid - O UID do usuário.
     * @returns {Promise<object | null>} O objeto de perfil do usuário ou null.
     */
    async getUserProfile(uid) {
        console.log('%c👤 DATABASE_SERVICE: Obtendo perfil do usuário...', 'color: #0066cc; font-weight: bold;', { uid });
        try {
            const snapshot = await firebase.database().ref(`users/${uid}`).get();
            const profile = snapshot.val();
            console.log('%c✅ DATABASE_SERVICE: Perfil do usuário obtido:', 'color: #16a34a; font-weight: bold;', profile);
            return profile;
        } catch (error) {
            console.error('%c❌ DATABASE_SERVICE: Erro ao obter perfil do usuário:', 'color: #dc2626; font-weight: bold;', error);
            throw error;
        }
    }
};

console.log('%c✅ DATABASE_SERVICE carregado', 'color: #16a34a; font-weight: bold;');