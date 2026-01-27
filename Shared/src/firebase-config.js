/**
 * @file firebase-config.js
 * @description Configuração centralizada do Firebase para o ecossistema Oeste Saúde.
 *              Inicializa o aplicativo Firebase e exporta as instâncias de Auth e Realtime Database.
 *              Este arquivo deve ser importado antes de qualquer outro serviço Firebase.
 */

// Importa o SDK do Firebase (deve ser carregado via CDN no HTML)
// <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"></script>

// Importa as constantes para obter a configuração do Firebase
// Certifique-se de que constants.js seja carregado antes deste arquivo no HTML
// Ex: <script src="./constants.js"></script>
//     <script src="./firebase-config.js"></script>

// Verifica se o objeto global 'firebase' está disponível
if (typeof firebase === 'undefined') {
    console.error('❌ Firebase SDK não carregado. Certifique-se de incluir os scripts do Firebase no HTML.');
    // Lança um erro para interromper a execução se o SDK não estiver presente
    throw new Error('Firebase SDK não carregado.');
}

/**
 * Objeto de configuração do Firebase.
 * ATENÇÃO: Substitua os valores abaixo pelas suas credenciais do Firebase.
 * Você pode obter isso no Console do Firebase -> Configurações do Projeto -> Seus apps.
 * É recomendado carregar essas configurações de um arquivo de ambiente ou de `constants.js`.
 */

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

// Verifica se o Firebase já foi inicializado para evitar erros
if (!firebase.apps.length) {
    // Inicializa o Firebase com a configuração fornecida
    firebase.initializeApp(firebaseConfig);
    console.log('🚀 Firebase inicializado com sucesso!');
} else {
    console.log('✅ Firebase já estava inicializado.');
}

// Exporta as instâncias de autenticação e banco de dados para uso em outros módulos
const auth = firebase.auth();
const database = firebase.database();

// Exporta o objeto firebase e suas instâncias para acesso global
// Isso permite que outros módulos importem e usem 'auth' e 'database' diretamente.
export { firebase, auth, database };

console.log('✅ firebase-config.js carregado.');