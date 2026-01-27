// ===== SERVIÇO DE AUTENTICAÇÃO =====

let currentUser = null;

const AUTH_SERVICE = {
    /**
     * Realiza o login de um usuário com email e senha.
     */
    async login(email, password) {
        console.log('%c🔐 Tentando login...', 'color: #0066cc; font-weight: bold;', { email });
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            currentUser = userCredential.user;
            console.log('%c✅ Login realizado com sucesso!', 'color: #16a34a; font-weight: bold;', {
                email: currentUser.email,
                uid: currentUser.uid
            });
            return { success: true, user: currentUser };
        } catch (error) {
            console.error('%c❌ Erro ao fazer login:', 'color: #dc2626; font-weight: bold;', error);
            let message = 'Erro desconhecido ao fazer login.';
            switch (error.code) {
                case 'auth/user-not-found':
                    message = 'Usuário não encontrado. Verifique o email.';
                    break;
                case 'auth/wrong-password':
                    message = 'Senha incorreta.';
                    break;
                case 'auth/invalid-email':
                    message = 'Formato de email inválido.';
                    break;
                case 'auth/too-many-requests':
                    message = 'Muitas tentativas de login. Tente novamente mais tarde.';
                    break;
                default:
                    message = `Erro: ${error.message}`;
            }
            return { success: false, error: message };
        }
    },

    /**
     * Realiza o logout do usuário atual.
     */
    async logout() {
        console.log('%c🔓 Fazendo logout...', 'color: #ea580c; font-weight: bold;');
        try {
            await firebase.auth().signOut();
            currentUser = null;
            console.log('%c✅ Logout realizado com sucesso.', 'color: #16a34a; font-weight: bold;');
            return { success: true };
        } catch (error) {
            console.error('%c❌ Erro ao fazer logout:', 'color: #dc2626; font-weight: bold;', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Retorna o objeto do usuário atualmente logado.
     */
    getCurrentUser() {
        return currentUser;
    },

    /**
     * Verifica se há um usuário autenticado.
     */
    isAuthenticated() {
        return currentUser !== null;
    },

    /**
     * Monitora as mudanças no estado de autenticação do usuário.
     */
    onAuthStateChanged(callback) {
        console.log('%c👁️ Monitorando estado de autenticação...', 'color: #0066cc; font-weight: bold;');
        firebase.auth().onAuthStateChanged((user) => {
            currentUser = user;
            if (user) {
                console.log('%c✅ Usuário autenticado:', 'color: #16a34a; font-weight: bold;', user.email);
            } else {
                console.log('%c❌ Usuário desautenticado.', 'color: #dc2626; font-weight: bold;');
            }
            callback(user);
        });
    },

    /**
     * Obter perfil do usuário
     */
    async getUserProfile(uid) {
        try {
            const ref = firebase.database().ref(`users/${uid}`);
            const snapshot = await ref.get();
            return snapshot.val();
        } catch (error) {
            console.error('%c❌ Erro ao obter perfil:', 'color: #dc2626; font-weight: bold;', error);
            return null;
        }
    },

    /**
     * Inicializar listener de autenticação
     */
    initAuthListener(callback) {
        firebase.auth().onAuthStateChanged(callback);
    }
};

console.log('%c✅ AUTH_SERVICE carregado', 'color: #16a34a; font-weight: bold;');