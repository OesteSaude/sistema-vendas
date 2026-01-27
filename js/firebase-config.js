// ===== CONFIGURAÇÃO FIREBASE (VERSÃO SIMPLIFICADA) =====

console.log('%c🔧 Carregando configuração Firebase...', 'color: #0066cc; font-weight: bold;');

// Aguardar Firebase estar disponível
let tentativas = 0;
const maxTentativas = 50;

function inicializarFirebase() {
    tentativas++;
    
    if (typeof firebase === 'undefined') {
        if (tentativas < maxTentativas) {
            console.log(`%c⏳ Aguardando Firebase... (tentativa ${tentativas}/${maxTentativas})`, 'color: #ea580c;');
            setTimeout(inicializarFirebase, 100);
        } else {
            console.error('%c❌ Firebase não carregou após 5 segundos!', 'color: #dc2626; font-weight: bold;');
        }
        return;
    }
    
    // Firebase está disponível!
    console.log('%c✅ Firebase SDK carregado!', 'color: #16a34a; font-weight: bold;');
    
    // Suas credenciais do Firebase
    const firebaseConfig = {
        apiKey: "SUA_API_KEY_AQUI",
        authDomain: "seu-projeto.firebaseapp.com",
        databaseURL: "https://seu-projeto.firebaseio.com",
        projectId: "seu-projeto",
        storageBucket: "seu-projeto.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef123456"
    };
    
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('%c✅ Firebase inicializado com sucesso!', 'color: #16a34a; font-weight: bold;');
        
        // Verificar se Auth e Database carregaram
        setTimeout(() => {
            if (firebase.auth) {
                console.log('%c✅ firebase.auth disponível!', 'color: #16a34a; font-weight: bold;');
            } else {
                console.error('%c❌ firebase.auth NÃO disponível!', 'color: #dc2626; font-weight: bold;');
            }
            
            if (firebase.database) {
                console.log('%c✅ firebase.database disponível!', 'color: #16a34a; font-weight: bold;');
            } else {
                console.error('%c❌ firebase.database NÃO disponível!', 'color: #dc2626; font-weight: bold;');
            }
        }, 500);
        
    } catch (error) {
        console.error('%c❌ Erro ao inicializar Firebase:', 'color: #dc2626; font-weight: bold;', error);
    }
}

// Iniciar quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFirebase);
} else {
    inicializarFirebase();
}