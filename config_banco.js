// ==========================================================================
// CONFIG_BANCO.JS - PAINEL MASTER SAAS (CONTROL PLANE)
// Banco Central de Gestão de Clientes, Assinaturas e Licenciamento
// ==========================================================================

const firebaseConfig = {
    apiKey: "AIzaSyAvaDdhJSFP6WKs8UFRvlQmNGFlc1ZKgFk", // Web API Key do projeto fcgestao-testes
    authDomain: "fcgestao-testes.firebaseapp.com",
    projectId: "fcgestao-testes",
    storageBucket: "fcgestao-testes.firebasestorage.app",
    messagingSenderId: "126917183785",
    appId: "1:126917183785:web:32cdc3fd9b8e1064658f38",
    measurementId: "G-G08C2WPKYP"
};

// Configuração de espelhamento com o banco da loja em produção
const LOJA_PRODUCAO_CONFIG = {
    apiKey: "AIzaSyDIlmd3zUTof-lwxyT7j3UxmenPKs_sMJg",
    authDomain: "lojafc-a31f9.firebaseapp.com",
    projectId: "lojafc-a31f9",
    storageBucket: "lojafc-a31f9.firebasestorage.app",
    messagingSenderId: "221558052645",
    appId: "1:221558052645:web:ed942d019727a472096ccc"
};
window.LOJA_PRODUCAO_CONFIG = LOJA_PRODUCAO_CONFIG;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        console.log("👑 SaaS Master conectado ao banco central: fcgestao-testes");
    } catch(err) {
        console.error("Erro ao inicializar Firebase no SaaS Master:", err);
    }
} else if (typeof firebase === 'undefined') {
    console.error("Firebase SDK não foi carregado antes do config_banco.js");
}
