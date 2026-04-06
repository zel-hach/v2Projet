import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { fetcher, type CoffeeUser, usersListUrl } from '../../data/coffeeUsers';
import { API_BASE_URL } from '../../data/apiConfig';
import { updateUser, mediaAbsoluteUrl } from '../../data/usersApi';
import { EditUserModal, type EditUserForm } from './Utilisateurs/EditUserModal';
import { WhatsAppModal } from './Utilisateurs/WhatsAppModal';
import { DeleteUserModal } from './Utilisateurs/DeleteUserModal';
import { UsersTable } from './Utilisateurs/UsersTable';
import { getUserId } from './Utilisateurs/userHelpers';
import {
  MAX_VIDEO_DURATION_SEC,
  formatDurationSec,
  getVideoDurationSeconds,
  validateVideoSize,
} from '../../data/videoValidation';
import {
  VISITOR_PROFILE_OPTIONS,
  type VisitorListSegment,
} from '../../data/visitorSegments';

const PROFILE_SELECT_DATA = VISITOR_PROFILE_OPTIONS.map((o) => ({
  value: o.value,
  label: `${o.group} · ${o.value}`,
}));

const LIST_TITLES: Record<VisitorListSegment, string> = {
  all: 'Tous les visiteurs',
  investisseur: 'Les investisseurs',
  etudiant: 'Les étudiants',
};

type UtilisateursProps = { listFilter: VisitorListSegment };

const Utilisateurs = ({ listFilter }: UtilisateursProps) => {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('userRole') === 'admin';

  const [search, setSearch] = useState('');
  const [coffeeUsers, setCoffeeUsers] = useState<CoffeeUser[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CoffeeUser | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [whatsAppStatus, setWhatsAppStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailSendError, setEmailSendError] = useState<string | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoBlobUrlRef = useRef<string | null>(null);
  const emailSendInFlightRef = useRef(false);

  const [form, setForm] = useState<EditUserForm>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    status: '',
  });

  const { data, isLoading, mutate } = useSWR<CoffeeUser[]>(
    usersListUrl(search, listFilter),
    fetcher
  );

  const selectedUserId = useMemo(() => (selectedUser ? getUserId(selectedUser) : null), [selectedUser]);

  const existingImageUrl = useMemo(
    () => mediaAbsoluteUrl(selectedUser?.imageUrl ?? null),
    [selectedUser]
  );
  const existingVideoUrl = useMemo(
    () => mediaAbsoluteUrl(selectedUser?.videoUrl ?? null),
    [selectedUser]
  );

  const resetEditMediaState = () => {
    setImagePreview(null);
    setImageFile(null);
    if (videoBlobUrlRef.current) {
      URL.revokeObjectURL(videoBlobUrlRef.current);
      videoBlobUrlRef.current = null;
    }
    setVideoPreview(null);
    setVideoFile(null);
    setVideoError(null);
  };

  useEffect(() => {
    if (data) setCoffeeUsers(data);
  }, [data]);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email,
        phone: selectedUser.phone ?? '',
        city: selectedUser.city ?? '',
        status: selectedUser.status ?? '',
      });
    }
  }, [selectedUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setImageFile(selected);
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selected = input.files?.[0];
    setVideoError(null);

    const revokeVideoBlob = () => {
      if (videoBlobUrlRef.current) {
        URL.revokeObjectURL(videoBlobUrlRef.current);
        videoBlobUrlRef.current = null;
      }
    };

    if (!selected) {
      revokeVideoBlob();
      setVideoFile(null);
      setVideoPreview(null);
      return;
    }

    const sizeCheck = validateVideoSize(selected);
    console.log('sizeCheck', sizeCheck);
    if (!sizeCheck.ok) {
      console.log('sizeCheck.message', sizeCheck.message);
      setVideoError(sizeCheck.message);
      revokeVideoBlob();
      setVideoFile(null);
      setVideoPreview(null);
      input.value = '';
      return;
    }

    try {
      const durationSec = await getVideoDurationSeconds(selected);
      if (durationSec > MAX_VIDEO_DURATION_SEC) {
        setVideoError(
          `La vidéo est trop longue (maximum ${formatDurationSec(MAX_VIDEO_DURATION_SEC)}). Durée du fichier : ${formatDurationSec(durationSec)}.`
        );
        revokeVideoBlob();
        setVideoFile(null);
        setVideoPreview(null);
        input.value = '';
        return;
      }
    } catch {
      setVideoError('Impossible de lire cette vidéo. Essayez un autre format (MP4, WebM).');
      revokeVideoBlob();
      setVideoFile(null);
      setVideoPreview(null);
      input.value = '';
      return;
    }

    revokeVideoBlob();
    const nextUrl = URL.createObjectURL(selected);
    videoBlobUrlRef.current = nextUrl;
    setVideoFile(selected);
    setVideoPreview(nextUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    if (videoError) return;

    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);
    if (videoFile) formData.append('video', videoFile);
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('city', form.city);
    formData.append('status', form.status ?? '');

    setEditError(null);
    setEditSaving(true);
    try {
      await updateUser(String(selectedUserId), formData);
      setEditModalOpen(false);
      resetEditMediaState();
      await mutate();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Erreur lors de l’enregistrement');
    } finally {
      setEditSaving(false);
    }
  };

  const doDelete = async (user: CoffeeUser) => {
    const id = getUserId(user);
    if (id === undefined || id === null) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error((data as { message?: string }).message || `Erreur ${res.status}`);
    }

    setCoffeeUsers((prev) => prev.filter((u) => getUserId(u) !== id));
    await mutate();
  };

  const openDeleteModal = (user: CoffeeUser) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async (user: CoffeeUser) => {
    try {
      setDeleteLoading(true);
      await doDelete(user);
      setDeleteModalOpen(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openWhatsAppModal = (user: CoffeeUser) => {
    setSelectedUser(user);
    setWhatsAppMessage(`Bonjour ${user.first_name}, `);
    setWhatsAppStatus('idle');
    setEmailSendError(null);
    setWhatsAppModalOpen(true);
  };

  const sendWhatsApp = async () => {
    if (!selectedUser || emailSendInFlightRef.current) return;
    const to = String(selectedUser.email || '').trim();
    if (!to) return;

    emailSendInFlightRef.current = true;
    setWhatsAppStatus('sending');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          to,
          message: whatsAppMessage,
          imageUrl: mediaAbsoluteUrl(selectedUser.imageUrl ?? null),
          videoUrl: mediaAbsoluteUrl(selectedUser.videoUrl ?? null),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          data && typeof data === 'object' && data !== null && typeof (data as { message?: unknown }).message === 'string'
            ? (data as { message: string }).message
            : '';
        throw new Error(msg || `Erreur API (${res.status})`);
      }

      setWhatsAppStatus('sent');
      window.setTimeout(() => {
        setWhatsAppModalOpen(false);
        setWhatsAppStatus('idle');
      }, 900);
    } catch (err) {
      setWhatsAppStatus('error');
      const msg = err instanceof Error ? err.message : String(err);
      setEmailSendError(
        msg.includes('Failed to fetch') || msg === 'NetworkError when attempting to fetch resource.'
          ? `Impossible de joindre l’API (${API_BASE_URL}). Vérifiez que le backend tourne et que VITE_API_URL dans .env correspond à son PORT (souvent 7000).`
          : msg || 'Échec de l’envoi.'
      );
    } finally {
      emailSendInFlightRef.current = false;
    }
  };

  return (
    <>
      <section className="w-full min-h-screen overflow-hidden space-y-2 p-4 sm:p-8 lg:ml-64">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-semibold text-orange-900">{LIST_TITLES[listFilter]}</h1>
        </div>
        <div className="w-full h-1 bg-orange-900/20" />

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
            <span className="text-sm text-orange-900/75 whitespace-nowrap">
              {coffeeUsers.length} résultat(s)
            </span>
          </div>

          <UsersTable
            users={coffeeUsers}
            isLoading={isLoading}
            canDelete={isAdmin}
            onEdit={(user) => {
              setSelectedUser(user);
              setVideoError(null);
              setEditError(null);
              setEditModalOpen(true);
            }}
            onWhatsApp={openWhatsAppModal}
            onDelete={openDeleteModal}
          />
        </section>

        <EditUserModal
          opened={editModalOpen && !!selectedUser}
          onClose={() => {
            setEditModalOpen(false);
            setEditError(null);
            setVideoError(null);
            resetEditMediaState();
          }}
          form={form}
          onFormChange={setForm}
          profileSelectData={PROFILE_SELECT_DATA}
          imagePreview={imagePreview}
          existingImageUrl={existingImageUrl}
          onImageChange={handleImageChange}
          videoPreview={videoPreview}
          existingVideoUrl={existingVideoUrl}
          onVideoChange={handleVideoChange}
          onSubmit={handleSubmit}
          submitting={editSaving}
          submitError={editError}
          videoError={videoError}
        />

        <WhatsAppModal
          opened={whatsAppModalOpen}
          onClose={() => {
            setWhatsAppModalOpen(false);
            setEmailSendError(null);
          }}
          user={selectedUser}
          message={whatsAppMessage}
          onMessageChange={(v) => {
            setWhatsAppMessage(v);
            setEmailSendError(null);
          }}
          // onSend={sendWhatsApp}
          onSend={async() => {
            await sendWhatsApp();
            setEmailSendError(null);
          }}
          sendError={emailSendError}
          onDismissSendError={() => setEmailSendError(null)}
        />

        <DeleteUserModal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          user={selectedUser}
          onConfirmDelete={confirmDelete}
          loading={deleteLoading}
        />
      </section>
    </>
  );
};

export default Utilisateurs;
