// ===== FORMATADORES DE DADOS =====

const FORMATTERS = {
    /**
     * Formata um valor numérico para o formato de moeda BRL.
     */
    formatCurrency(value) {
        if (value === null || typeof value === 'undefined' || isNaN(value)) {
            return '';
        }
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

    /**
     * Formata um objeto Date ou timestamp para uma string de data e hora.
     */
    formatDateTime(dateInput) {
        let date;
        if (dateInput instanceof Date) {
            date = dateInput;
        } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
            date = new Date(dateInput);
        } else {
            return '';
        }

        if (isNaN(date.getTime())) {
            return '';
        }

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return date.toLocaleString('pt-BR', options);
    },

    /**
     * Formata um número de telefone para o padrão (XX) XXXXX-XXXX.
     */
    formatPhoneNumber(phoneNumber) {
        if (typeof phoneNumber !== 'string') {
            return '';
        }
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        const matchShort = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (matchShort) {
            return `(${matchShort[1]}) ${matchShort[2]}-${matchShort[3]}`;
        }
        return phoneNumber;
    },

    /**
     * Formata uma string para ter a primeira letra de cada palavra em maiúscula.
     */
    capitalizeWords(text) {
        if (typeof text !== 'string' || text.length === 0) {
            return '';
        }
        return text.toLowerCase().split(' ').map(word => {
            if (word.length === 0) return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
};

console.log('%c✅ FORMATTERS carregado', 'color: #16a34a; font-weight: bold;');