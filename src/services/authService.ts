import { api } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin?: boolean;
}

interface LoginResponse {
  user: User;
  access_token: string;
}

export async function loginService(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post(`/auth/login`, { username, password }, {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      },
    });

    return response.data

  } catch (error: any) {

    if (error.response?.status === 401) {
      throw new Error('Usuário ou senha inválidos');
    }

    throw new Error('Erro ao realizar login. Tente novamente mais tarde.');
  }
};
