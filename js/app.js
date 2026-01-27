// ===== INICIALIZAÇÃO DO COTADOR =====
(function() {
    console.log('%c🔍 Inicializando Cotador...', 'color: #0066cc; font-weight: bold; font-size: 14px;');
    
    // ⭐ NOVO - Aguardar Firebase estar pronto
    setTimeout(() => {
        if (typeof AUTH_SERVICE === 'undefined') {
            console.error('%c❌ Erro: AUTH_SERVICE não está carregado!', 'color: #dc2626; font-weight: bold;');
            alert('❌ Erro ao carregar serviços. Recarregue a página.');
            return;
        }
        
        if (typeof verificarCacheVendedor === 'function') {
            verificarCacheVendedor();
        } else {
            console.error('%c❌ Erro: A função verificarCacheVendedor não está definida.', 'color: #dc2626; font-weight: bold;');
            document.getElementById('loginScreen').classList.remove('hidden');
            document.getElementById('dashboard').classList.add('hidden');
        }
    }, 500);  // ⭐ Aumentado para 500ms para Firebase inicializar
})();