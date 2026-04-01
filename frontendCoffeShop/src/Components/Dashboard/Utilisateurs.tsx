import { useEffect,useState } from 'react';
import useSWR from 'swr'
import { fetcher, type CoffeeUser } from '../../data/coffeeUsers';
import { Avatar, Modal, Table } from '@mantine/core';


const Utilisateurs = () => {
  const [search, setSearch] = useState('');
  const [coffeeUsers, setCoffeeUsers] = useState<CoffeeUser[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CoffeeUser | null>(null);

  const { data ,isLoading} = useSWR<CoffeeUser[]>(`http://localhost:7000/api/users?emailTerm=${search}`, fetcher);
  useEffect(() => {
    if(data)
      setCoffeeUsers(data);
  }, [data,search]);


  return (

    <>
   
    <section className="w-full min-h-screen overflow-hidden space-y-2 p-4 sm:p-8 lg:ml-64 ">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <h1 className="text-4xl font-semibold text-orange-900">Liste des utilisateurs servis</h1>
    </div>
    <div className='w-full h-1 bg-orange-900/20'></div>
    <section className="overflow-hidden rounded-2xl border border-orange-900/20 bg-white shadow-sm">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-orange-900/15 px-4 py-3 gap-2">
    <label className="block w-full sm:max-w-xs">
      <span className="sr-only">Rechercher</span>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par nom ou email…"
        className="w-full rounded-xl border border-orange-900/20 bg-white px-4 py-2 text-black placeholder:text-black/40 outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
      />
    </label>
    <span className="text-sm text-orange-900/75 whitespace-nowrap">{coffeeUsers.length} résultat(s)</span>
</div>
  
<div className="max-h-[790px] w-full overflow-y-auto no-scrollbar rounded-xl border border-[#e2e8f0]">

  <Table
    highlightOnHover
    className="w-full"
  >
    
    <Table.Thead className="bg-[#f8fafc] sticky top-0 z-20 shadow-sm">
      <Table.Tr>
        <Table.Th className="text-left px-4 py-3 text-[#475569]">Nom</Table.Th>
        <Table.Th className="text-left px-4 py-3 text-[#475569]">Email</Table.Th>
        <Table.Th className="text-left px-4 py-3 text-[#475569]">Numero de telephone</Table.Th>
        <Table.Th className="text-left px-4 py-3 text-[#475569]">Type de café</Table.Th>
        <Table.Th className="text-left px-4 py-3 text-[#475569]">Statut</Table.Th>
        <Table.Th className="text-center px-4 py-3 text-[#475569]">Action</Table.Th>
      </Table.Tr>
    </Table.Thead>

    <Table.Tbody>

    {isLoading && (
      <Table.Tr>
        <Table.Td colSpan={5} className="text-center py-6 text-[#f68716]">
          Chargement...
        </Table.Td>
      </Table.Tr>
    )}

    {!isLoading && coffeeUsers.length === 0 && (
      <Table.Tr>
        <Table.Td colSpan={5} className="text-center py-6 text-[#94a3b8]">
          Aucun utilisateur trouvé
        </Table.Td>
      </Table.Tr>
    )}

    {!isLoading &&
      coffeeUsers.map((user, index) => (
        <Table.Tr
        key={user.id}
        className={`
          transition
          ${index % 2 === 0 ? 'bg-white' : 'bg-[#fff7ed]'}
          hover:bg-[#ffedd5]
        `}
      >
        <Table.Td className="px-4 py-5">
          <div  className='flex gap-2 items-center'>
            <Avatar className='w-10 h-10'></Avatar>
            <p>
              {user.first_name} {user.last_name}
            </p>

          </div>
        </Table.Td>
      
        <Table.Td className="px-4 py-5 text-left">
          {user.email}
        </Table.Td>
      
        <Table.Td className="px-4 py-5 text-left">
          +212 6 67 647 647
          {/* {user.cupsToday} */}
        </Table.Td>

        <Table.Td className="px-4 py-5 text-left">
          Expresso
          {/* {user.coffeeType} */}
        </Table.Td>
      
      
        <Table.Td className="px-4 py-5 text-left text-green-900">
            En cours
          {/* {user.status} */}
        </Table.Td>
        <Table.Td className="px-4 py-5 text-left">
  <div className="flex items-center justify-center gap-2">
    <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition" onClick={() => {setModalOpen(true);  setSelectedUser(user);
}}>
      Edit
    </button>

    <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-orange-100 text-orange-600 hover:bg-orange-200 transition">
      Envoyer
    </button>

    <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition">
      Supprimer
    </button>

  </div>
</Table.Td>
      </Table.Tr>
      ))}

  </Table.Tbody>
</Table>
</div>
    </section>
    <Modal
  opened={modalOpen}
  onClose={() => setModalOpen(false)}
  centered
  withinPortal
  zIndex={9999}
  title={
    <span className="text-xl font-bold text-white">
      Edit User
    </span>
  }
  overlayProps={{
    backgroundOpacity: 0.3,
    blur: 3,
  }}
  styles={{
    content: {
      width: "min(780px, 95vw)",
      minHeight: 320,
    },
  }}
  classNames={{
    content:
      "bg-slate-900 rounded-2xl shadow-2xl border border-white/10",
    header:
      "bg-slate-900 border-b border-white/10 px-6 py-4",
    title: "text-white",
    body: "px-6 py-4 text-gray-300",
  }}
>
  {selectedUser && (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* First Name */}
      <div>
        <label className="text-sm text-gray-400">First Name</label>
        <input
          defaultValue={selectedUser.first_name}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="text-sm text-gray-400">Last Name</label>
        <input
          defaultValue={selectedUser.last_name}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Email */}
      <div className="sm:col-span-2">
        <label className="text-sm text-gray-400">Email</label>
        <input
          defaultValue={selectedUser.email}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm text-gray-400">Phone</label>
        <input
          defaultValue={selectedUser.phone}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* City */}
      <div>
        <label className="text-sm text-gray-400">City</label>
        <input
          defaultValue={selectedUser.city}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Status */}
      <div>
        <label className="text-sm text-gray-400">Status</label>
        <input
          defaultValue={selectedUser.status}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Coffee Type */}
      <div>
        <label className="text-sm text-gray-400">Coffee Type</label>
        <input
          defaultValue={selectedUser.coffeeType}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Cups Today */}
      <div>
        <label className="text-sm text-gray-400">Cups Today</label>
        <input
          defaultValue={selectedUser.cupsToday}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
        />
      </div>

      {/* Buttons */}
      <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
        >
          Save
        </button>
      </div>

    </form>
  )}
</Modal>
  </section>
    </>
  );
};

export default Utilisateurs;
