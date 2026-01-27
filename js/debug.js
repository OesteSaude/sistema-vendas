// ===== FERRAMENTA DE DEBUG SIMPLIFICADA =====

const DEBUG_TOOL = {
    init() {
        console.log('%c🚀 [DIAGNÓSTICO] Iniciando...', 'color: #0066cc; font-weight: bold; font-size: 14px;');

        // Verificar Firebase
        const firebaseOk = typeof firebase !== 'undefined' && typeof firebase.auth === 'function';
        console.log(firebaseOk ? '%c✅ Firebase OK' : '%c❌ Firebase ERRO', 'color: ' + (firebaseOk ? '#16a34a' : '#dc2626') + '; font-weight: bold;');

        // Verificar funções principais
        const fazerLoginOk = typeof fazerLogin === 'function';
        console.log(fazerLoginOk ? '%c✅ fazerLogin() OK' : '%c❌ fazerLogin() ERRO', 'color: ' + (fazerLoginOk ? '#16a34a' : '#dc2626') + '; font-weight: bold;');

        const verificarCacheOk = typeof verificarCacheVendedor === 'function';
        console.log(verificarCacheOk ? '%c✅ verificarCacheVendedor() OK' : '%c❌ verificarCacheVendedor() ERRO', 'color: ' + (verificarCacheOk ? '#16a34a' : '#dc2626') + '; font-weight: bold;');

        // Verificar dados
        const appDataOk = typeof APP_DATA !== 'undefined';
        console.log(appDataOk ? '%c✅ APP_DATA OK' : '%c❌ APP_DATA ERRO', 'color: ' + (appDataOk ? '#16a34a' : '#dc2626') + '; font-weight: bold;');

        console.log('%c🚀 [DIAGNÓSTICO] Finalizado!', 'color: #0066cc; font-weight: bold; font-size: 14px;');
    }
};

// Iniciar após 1 segundo
setTimeout(() => DEBUG_TOOL.init(), 1000);