import { api } from "./api";

export async function getPosts() {
  try {
    const response = await api.get("/posts", {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      },
    });

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao buscar os posts')
  }
}

export async function getPostById(id: string) {
  try {
    const response = await api.get(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      },
    });

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao buscar post')
  }
}

export async function createPost(data: { title: string, description: string }) {
  try {
    const payload = { ...data }

    const response = await api.post('/posts', payload);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao criar post')
  }
}

export async function updatePost(id: string, data: { title: string, description: string }) {
  try {
    const payload = {
      ...data
    }

    const response = await api.put(`/posts/${id}`, payload);

    return response

  } catch (error) {
    console.error('Erro interno na API', error);

    throw new Error('Erro ao atualizar post')
  }
}

export async function deletePost(id: string) {
  try {
    await api.delete(`/posts/${id}`);

  } catch (error) {
    console.log(api.defaults.headers);

    console.error('Erro interno na API', error);

    throw new Error('Erro ao deletar post')
  }
}
