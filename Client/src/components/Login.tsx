import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login as loginService } from '../services/login';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Container } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const providers = [{ id: 'credentials', name: 'Email e senha' }];

// Definir o tema personalizado com cores roxas
const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#722E8E', // Cor principal roxa
    },
    secondary: {
      main: '#9C27B0', // Cor secundária roxa
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const signInWithNavigate = async (provider: AuthProvider, formData?: FormData): Promise<AuthResponse> => {
    try {
      const email = formData?.get('email') as string;
      const password = formData?.get('password') as string;

      if (!email || !password) {
        return { success: 'false' };
      }

      const result = await loginService(email, password);

      if (result.success) {
        enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
        navigate('/');
        return { success: 'true' };
      } else {
        return { type: 'CredentialsSignin', error: 'Invalid credentials.' };
      }
    } catch (error) {
      return { type: 'CredentialsSignin', error: 'Invalid credentials.' };
    }
  };

  return (
    <Container className="login">
      <ThemeProvider theme={purpleTheme}>
        <AppProvider theme={purpleTheme}>
          <SignInPage
            slotProps={{
              emailField: { label: 'Digite seu email', placeholder: 'email@gmail.com' },
              passwordField: { label: 'Digite sua senha', placeholder: '********', type: 'password' },
              submitButton: { children: 'Acessar' },
              rememberMe: { label: 'Lembrar-me' },
            }}
            localeText={{ signInSubtitle: 'Faça login para acessar o sistema', signInTitle: 'Login' }}
            signIn={signInWithNavigate}
            providers={providers}
          />
        </AppProvider>
      </ThemeProvider>
    </Container>
  );
}