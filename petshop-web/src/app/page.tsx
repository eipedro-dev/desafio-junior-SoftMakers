import Link from 'next/link';
import { petsApi } from '@/lib/api';
import Image from 'next/image';

export default async function HomePage() {
  const pets = await petsApi.list();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 flex-col items-center justify-between">
        <Image src="/img/logo.svg" alt="Logo da SoftPet" width={182} height={48} />
        <div>
          
          <Link
          href="/pets/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Novo pet
        </Link>
        </div>
      </header>

      {pets.length === 0 ? (
        <p className="text-gray-500">Nenhum pet cadastrado ainda.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Nome</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Raça</th>
              <th className="p-2">Idade</th>
              <th className="p-2">Dono</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className="border-b">
                <td className="p-2">{pet.name}</td>
                <td className="p-2">{pet.type === 'dog' ? 'Cachorro' : 'Gato'}</td>
                <td className="p-2">{pet.breed}</td>
                <td className="p-2">{pet.age}</td>
                <td className="p-2">{pet.owner.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}