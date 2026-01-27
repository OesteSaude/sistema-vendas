// ===== CONSTANTES GLOBAIS DO OESTE SAÚDE =====

const CONSTANTS = {
    // URL do Google Apps Script
    GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/AKfycbw_1wfvXinx1w3RvR9ji364C38nAvR5rQ4kP-EtOFv-Vsy6brCSLLKaf8iDbS3wTV8JiQ/exec',

    // Credenciais do Firebase
    FIREBASE_CONFIG: {
        apiKey: "AIzaSyDt3CJaa8lcBHjdUuqes__K9U0BdP6nIHU",
        authDomain: "oestesaudedashboard.firebaseapp.com",
        databaseURL: "https://oestesaudedashboard-default-rtdb.firebaseio.com",
        projectId: "oestesaudedashboard",
        storageBucket: "oestesaudedashboard.firebasestorage.app",
        messagingSenderId: "306356893563",
        appId: "1:306356893563:web:337828b262cd9593f76fde",
        measurementId: "G-VHJQFPJ6X0"
    },

    // Regiões
    REGIOES: ['São Paulo', 'Mato Grosso do Sul', 'Paraná'],

    // Tipos de plano
    TIPOS_PLANO: ['Básico', 'Intermediário', 'Premium'],

    // Faixas etárias
    FAIXAS_ETARIAS: ['0-18', '19-30', '31-45', '46-60', '60+'],

    // Mensagens
    MENSAGENS: {
        SUCESSO: 'Operação realizada com sucesso!',
        ERRO: 'Ocorreu um erro. Tente novamente.',
        CARREGANDO: 'Carregando...'
    }
};

console.log('%c✅ CONSTANTS carregado', 'color: #16a34a; font-weight: bold;');