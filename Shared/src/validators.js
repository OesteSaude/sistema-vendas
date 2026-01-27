// ===== VALIDADORES DE DADOS =====

const VALIDATORS = {
    /**
     * Valida se uma string é um formato de email válido.
     */
    isValidEmail(email) {
        if (typeof email !== 'string') {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Valida se uma string é um formato de número de telefone válido.
     */
    isValidPhoneNumber(phoneNumber) {
        if (typeof phoneNumber !== 'string') {
            return false;
        }
        const cleaned = phoneNumber.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    },

    /**
     * Verifica se um valor é vazio.
     */
    isFieldEmpty(value) {
        if (value === null || typeof value === 'undefined') {
            return true;
        }
        if (typeof value === 'string') {
            return value.trim() === '';
        }
        return false;
    },

    /**
     * Valida se um número está dentro de um intervalo específico.
     */
    isNumberInRange(value, min, max) {
        if (typeof value !== 'number' || isNaN(value)) {
            return false;
        }
        return value >= min && value <= max;
    },

    /**
     * Valida se um array não está vazio.
     */
    isArrayNotEmpty(arr) {
        return Array.isArray(arr) && arr.length > 0;
    }
};

console.log('%c✅ VALIDATORS carregado', 'color: #16a34a; font-weight: bold;');
function validarCidade() {
    const cidade = document.getElementById('cidade')?.value?.trim() || '';
    const cidadeError = document.getElementById('cidadeError');
    
    if (!cidade) {
        cidadeError.textContent = '⚠️ Selecione uma cidade';
        return false;
    }
    
    cidadeError.textContent = '';
    console.log('✅ Cidade validada:', cidade);
    return true;
}