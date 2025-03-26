import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import {login as loginService} from '../services/login';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Container, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const providers = [{ id: 'credentials', name: 'Email e senha' }];

export default function Login() {
    const navigate = useNavigate();
    const theme = useTheme();
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
        <AppProvider theme={theme}>
          <SignInPage
            slotProps={{
              emailField: { label: 'Digite seu email', placeholder:'email@gmail.com' },
              passwordField: { label: 'Digite sua senha', placeholder:'********', type: 'password' },
              submitButton: { children: 'Acessar' },
              rememberMe: { label: 'Lembrar-me' },  
            }}
            localeText={{signInSubtitle: 'Faça login para acessar o sistema',signInTitle: 'Login'}}
            signIn={signInWithNavigate}
            providers={providers}
          />
        </AppProvider>
      </Container>
    );
  }