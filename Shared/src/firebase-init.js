// ===== INICIALIZAÇÃO FIREBASE =====

console.log('%c🔧 Inicializando Firebase...', 'color: #0066cc; font-weight: bold; font-size: 14px;');
    
    // Suas credenciais (SUBSTITUA COM AS SUAS!)
    const firebaseConfig = {
        apiKey: "AIzaSyDt3CJaa8lcBHjdUuqes__K9U0BdP6nIHU", // Chave da API do seu projeto Firebase
        authDomain: "oestesaudedashboard.firebaseapp.com", // Domínio de autenticação
        databaseURL: "https://oestesaudedashboard-default-rtdb.firebaseio.com", // URL do Realtime Database
        projectId: "oestesaudedashboard", // ID do seu projeto
        storageBucket: "Soestesaudedashboard.firebasestorage.app", // Bucket de armazenamento
        messagingSenderId: "306356893563", // ID do remetente de mensagens
        appId: "1:306356893563:web:337828b262cd9593f76fde", // ID do aplicativo
        measurementId: "G-VHJQFPJ6X0" // ID de medição (opcional, para Analytics)
    };
    
try {
    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    
    console.log('%c✅ Firebase inicializado com sucesso!', 'color: #16a34a; font-weight: bold;');
    console.log('%c✅ firebase.auth disponível!', 'color: #16a34a; font-weight: bold;');
    console.log('%c✅ firebase.database disponível!', 'color: #16a34a; font-weight: bold;');
    
} catch (error) {
    console.error('%c❌ Erro ao inicializar Firebase:', 'color: #dc2626; font-weight: bold;', error);
}