// ===== VERIFICAR MODO MANUTENÇÃO =====

// ⭐ FAZER UMA REQUISIÇÃO PARA VERIFICAR SE ESTÁ EM MANUTENÇÃO
async function verificarModuloManutencao() {
    try {
        const response = await fetch('/maintenance-status.json');
        const data = await response.json();
        
        if (data.maintenanceMode === true) {
            console.log('%c🔧 MODO MANUTENÇÃO DETECTADO', 'color: #00A8B0; font-weight: bold; font-size: 16px;');
            window.location.href = '/404.html';
        }
    } catch (error) {
        console.log('Verificação de manutenção falhou (esperado em desenvolvimento)');
    }
}

// ⭐ VERIFICAR A CADA 5 SEGUNDOS
setInterval(verificarModuloManutencao, 5000);

// ⭐ VERIFICAR IMEDIATAMENTE AO CARREGAR
verificarModuloManutencao();

console.log('%c✅ Verificador de manutenção carregado', 'color: #16a34a; font-weight: bold;');
