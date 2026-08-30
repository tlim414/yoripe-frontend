import { api } from './axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function extractRecipeInfo(getToken: () => Promise<string | null>, imgFile: File) {
  const token = await getToken();

  const formData = new FormData();
  formData.append('image', imgFile);

  const response = await api.post(`${API_URL}/extract-recipe-info/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'nmultipart/form-data',
    },
  });

  return response.data;
}
