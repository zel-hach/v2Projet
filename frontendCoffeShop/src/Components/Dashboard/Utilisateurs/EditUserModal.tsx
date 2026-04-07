import { forwardRef, useEffect, useState } from 'react';
import { Loader, Modal, Button, TextInput, Select } from '@mantine/core';
import { RiCameraAiFill } from 'react-icons/ri';
import { appendCloudinaryUploadFields, cloudinaryUploadUrl } from '../../../data/cloudinaryConfig';
import { dashboardModalClassNames, dashboardModalOverlayProps } from './modalTheme';
import { UserAvatarCircle } from './UserAvatarCircle';

export type EditUserForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
};

type EditUserModalProps = {
  opened: boolean;
  onClose: () => void;
  form: EditUserForm;
  onFormChange: (next: EditUserForm) => void;
  profileSelectData: { value: string; label: string }[];
  imagePreview: string | null;
  existingImageUrl?: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  videoPreview: string | null;
  existingVideoUrl?: string | null;
  onVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Appelé après upload Cloudinary réussi (URL à envoyer au backend en `urlVideo`). */
  onCloudinaryVideoUrl?: (secureUrl: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting?: boolean;
  submitError?: string | null;
  videoError?: string | null;
};

/** Largeur / hauteur fixes — pas de défilement dans la modale. */
export const EDIT_MODAL_WIDTH = 640;
export const EDIT_MODAL_HEIGHT = 820;

const ModalBodyNoScroll = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function ModalBodyNoScroll({ children, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          ...style,
          overflow: 'hidden',
          maxHeight: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    );
  }
);

const inputStyles = {
  label: { color: '#334155' },
  input: {
    background: '#ffffff',
    color: '#0f172a',
    borderColor: 'rgba(194, 65, 12, 0.2)',
  },
} as const;

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <div className="h-px flex-1 bg-orange-900/15" />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>
      <div className="h-px flex-1 bg-orange-900/15" />
    </div>
  );
}


export function EditUserModal({
  opened,
  onClose,
  form,
  onFormChange,
  profileSelectData,
  imagePreview,
  existingImageUrl,
  onImageChange,
  videoPreview,
  existingVideoUrl,
  onVideoChange: _onVideoChange,
  onCloudinaryVideoUrl,
  onSubmit,
  submitting,
  submitError,
  videoError,
}: EditUserModalProps) {
  const displayImage = imagePreview || existingImageUrl || null;
  const [videoUrlFromUpload, setVideoUrlFromUpload] = useState<string | null>(null);
  const [videoUploadPending, setVideoUploadPending] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
  const displayVideo = videoPreview || existingVideoUrl || videoUrlFromUpload || null;

  useEffect(() => {
    if (!opened) {
      setVideoUrlFromUpload(null);
      setVideoUploadPending(false);
      setVideoUploadError(null);
    }
  }, [opened]);


  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    appendCloudinaryUploadFields(formData);

    const res = await fetch(cloudinaryUploadUrl('video'), {
      method: 'POST',
      body: formData,
    });

    const data = (await res.json()) as { secure_url?: string; error?: { message?: string } };
    if (!res.ok || !data.secure_url) {
      throw new Error(data.error?.message || 'Échec du téléversement');
    }
    return data.secure_url;
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0] ?? null;
    if (!file) return;
    setVideoUploadError(null);
    setVideoUploadPending(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setVideoUrlFromUpload(uploadedUrl);
      onCloudinaryVideoUrl?.(uploadedUrl);
    } catch (err) {
      const msg =
        err instanceof Error && err.message ? err.message : 'Impossible d’envoyer la vidéo. Réessayez.';
      setVideoUploadError(msg);
      input.value = '';
    } finally {
      setVideoUploadPending(false);
    }
  };
  
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered={false}
      withinPortal
      zIndex={9999}
      padding={0}
      lockScroll
      yOffset="0.5rem"
      xOffset="0.5rem"
      scrollAreaComponent={ModalBodyNoScroll}
      title={<span className="text-lg font-bold text-slate-900">Mettre à jour l’utilisateur</span>}
      overlayProps={dashboardModalOverlayProps}
      transitionProps={{ transition: 'fade-down', duration: 180 }}
      classNames={{
        ...dashboardModalClassNames,
        close: 'text-slate-600 hover:bg-orange-100/80',
        content: `${dashboardModalClassNames.content} !overflow-hidden !p-0`,
        body: `${dashboardModalClassNames.body} !overflow-hidden !p-0 !max-h-none`,
        header: `${dashboardModalClassNames.header} !shrink-0 !py-3 !px-5`,
      }}
      styles={{
        inner: {
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 'max(0.25rem, env(safe-area-inset-top))',
          paddingBottom: '0.5rem',
          paddingInline: 'max(0.5rem, env(safe-area-inset-left))',
        },
        content: {
          width: `min(${EDIT_MODAL_WIDTH}px, calc(100vw - 1rem))`,
          height: `min(${EDIT_MODAL_HEIGHT}px, calc(100dvh - max(0.5rem, env(safe-area-inset-top)) - 0.75rem))`,
          maxWidth: EDIT_MODAL_WIDTH,
          maxHeight: `min(${EDIT_MODAL_HEIGHT}px, calc(100dvh - max(0.5rem, env(safe-area-inset-top)) - 0.75rem))`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
        body: {
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'none',
        },
      }}
    >
      <form
        onSubmit={onSubmit}
        className="flex h-full min-h-0 flex-col overflow-hidden bg-white"
      >
        <div className="flex shrink-0 flex-col items-center gap-2 border-b border-orange-900/10 bg-white px-5 pb-3 pt-3">
          <div className="relative">
            <UserAvatarCircle
              imageUrl={displayImage}
              firstName={form.first_name}
              lastName={form.last_name}
              className="h-36 w-36"
              initialsClassName="text-3xl"
            />
            <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-lg bg-[#FF5722] p-2 text-white shadow transition hover:bg-orange-600">
              <RiCameraAiFill className="size-4" />
              <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
            </label>
          </div>
          <p className="text-center text-[11px] text-slate-500">Cliquez sur l’icône pour changer la photo</p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-5 py-2">
          <SectionDivider label="Informations" />
          <div className="grid min-h-0 shrink-0 grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2">
            <TextInput
              size="xs"
              label="Prénom"
              value={form.first_name}
              onChange={(e) => onFormChange({ ...form, first_name: e.target.value })}
              styles={inputStyles}
            />
            <TextInput
              size="xs"
              label="Nom"
              value={form.last_name}
              onChange={(e) => onFormChange({ ...form, last_name: e.target.value })}
              styles={inputStyles}
            />
            <div className="sm:col-span-2">
              <TextInput
                size="xs"
                label="Email"
                value={form.email}
                onChange={(e) => onFormChange({ ...form, email: e.target.value })}
                styles={inputStyles}
              />
            </div>
            <TextInput
              size="xs"
              label="Téléphone"
              value={form.phone}
              onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
              styles={inputStyles}
            />
            <TextInput
              size="xs"
              label="Ville"
              value={form.city}
              onChange={(e) => onFormChange({ ...form, city: e.target.value })}
              styles={inputStyles}
            />
            <div className="sm:col-span-2">
              <Select
                size="xs"
                label="Profil visiteur"
                placeholder="Choisir…"
                data={profileSelectData}
                value={form.status || null}
                onChange={(v) => onFormChange({ ...form, status: v ?? '' })}
                searchable
                clearable
                styles={{
                  ...inputStyles,
                  input: { ...inputStyles.input, height: 'auto', minHeight: 30 },
                  dropdown: { background: '#ffffff', borderColor: 'rgba(194, 65, 12, 0.2)' },
                  option: { color: '#0f172a' },
                }}
              />
            </div>
          </div>
          {submitError ? <div className="shrink-0 text-xs text-red-600">{submitError}</div> : null}
        </div>

        <div className="shrink-0 border-t border-orange-900/20 bg-orange-200/50 px-5 py-3">
          <SectionDivider label="Vidéo (optionnel)" />
          <input
            type="file"
            accept="video/*"
            onChange={handleFile}
            disabled={videoUploadPending}
            className="mt-2 w-full rounded-lg border border-orange-900/20 bg-white px-2 py-1.5 text-xs text-slate-900 file:mr-2 file:rounded file:border-0 file:bg-blue-50 file:px-2 file:py-1 file:text-xs file:font-medium file:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          />
          {videoUploadPending ? (
            <div
              className="mt-2 flex items-center gap-2 rounded-lg border border-orange-900/20 bg-white/90 px-3 py-2 text-xs text-slate-700"
              role="status"
              aria-live="polite"
            >
              <Loader size="sm" color="orange" />
              <span>Envoi de la vidéo en cours… Merci de patienter.</span>
            </div>
          ) : null}
          {displayVideo && !videoUploadPending ? (
            <video
              src={displayVideo}
              className="mt-2 h-40 w-full rounded-lg border border-orange-900/20 bg-black/5 object-contain"
              controls
            />
          ) : null}
          {videoUploadError ? (
            <div className="mt-1 text-xs text-red-600" role="alert">
              {videoUploadError}
            </div>
          ) : null}
          {videoError ? (
            <div className="mt-1 text-xs text-red-600" role="alert">
              {videoError}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-orange-900/15 bg-white px-5 py-3">
          <Button
            variant="default"
            type="button"
            size="xs"
            onClick={onClose}
            disabled={submitting || videoUploadPending}
            className="border-0 bg-blue-50 text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            size="xs"
            color="orange"
            loading={submitting}
            disabled={Boolean(videoError) || videoUploadPending}
            className="bg-[#FF5722]"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
