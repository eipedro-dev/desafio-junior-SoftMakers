import { Pet, PetInput } from '@/types/pet';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = Array.isArray(body?.message)
      ? body.message.join('\n')
      : (body?.message ?? 'Erro inesperado');
    throw new Error(message);
  }

  // o DELETE do Nest responde sem corpo
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const petsApi = {
  list: () => request<Pet[]>('/pets'),
  get: (id: string) => request<Pet>(`/pets/${id}`),
  create: (data: PetInput) =>
    request<Pet>('/pets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<PetInput>) =>
    request<Pet>(`/pets/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: string) => request<void>(`/pets/${id}`, { method: 'DELETE' }),
};