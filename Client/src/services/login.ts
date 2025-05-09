import { URL } from '../../constants';
export const TOKEN_KEY = "auth_token";


export const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return { success: false, message: 'Credenciais inválidas. Tente novamente.' };
        }

        const data = await response.json();
        const access_token = data.access_token;
        console.log(access_token);

        if (access_token) {
            localStorage.setItem(TOKEN_KEY, access_token);
            return { success: true, message: 'Login realizado com sucesso.' };
        }

        return { success: false, message: 'Token de acesso não encontrado.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Erro ao conectar ao servidor. Tente novamente mais tarde.' };
    }
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);