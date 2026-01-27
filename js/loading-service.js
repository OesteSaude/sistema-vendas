// ===== SERVIÇO DE LOADING =====

const LOADING_SERVICE = {
    overlay: null,
    spinner: null,
    textElement: null,

    /**
     * Inicializar o serviço
     */
    init() {
        this.overlay = document.getElementById('loadingOverlay');
        if (!this.overlay) {
            console.warn('⚠️ loadingOverlay não encontrado no HTML');
        }
    },

    /**
     * Mostrar loading com mensagem customizável
     */
    show(mensagem = 'Carregando...', tipo = 'default') {
        if (!this.overlay) this.init();

        this.overlay.classList.remove('hidden', 'success', 'error');
        this.overlay.classList.add(tipo);

        const spinner = this.overlay.querySelector('.loading-spinner');
        if (spinner) {
            spinner.classList.remove('success', 'error');
            if (tipo !== 'default') spinner.classList.add(tipo);
        }

        const textElement = this.overlay.querySelector('p');
        if (textElement) {
            textElement.textContent = mensagem;
        }

        console.log('%c⏳ Loading iniciado:', 'color: #0066cc; font-weight: bold;', mensagem);
    },

    /**
     * Esconder loading
     */
    hide() {
        if (!this.overlay) return;
        this.overlay.classList.add('hidden');
        console.log('%c✅ Loading finalizado', 'color: #16a34a; font-weight: bold;');
    },

    /**
     * Mostrar sucesso
     */
    success(mensagem = 'Sucesso!') {
        this.show(mensagem, 'success');
        setTimeout(() => this.hide(), 1500);
    },

    /**
     * Mostrar erro
     */
    error(mensagem = 'Erro ao processar!') {
        this.show(mensagem, 'error');
        setTimeout(() => this.hide(), 2000);
    },

    /**
     * Executar função com loading automático
     */
    async execute(funcao, mensagem = 'Processando...') {
        try {
            this.show(mensagem);
            const resultado = await funcao();
            this.hide();
            return resultado;
        } catch (erro) {
            this.error('Erro ao processar: ' + erro.message);
            throw erro;
        }
    }
};

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', () => LOADING_SERVICE.init());

console.log('%c✅ LOADING_SERVICE carregado', 'color: #16a34a; font-weight: bold;');