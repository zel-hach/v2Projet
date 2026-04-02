import { Avatar, Modal, Button, TextInput, Group, Stack, Divider } from '@mantine/core';
import { RiCameraAiFill } from 'react-icons/ri';
import { darkModalClassNames, darkModalOverlayProps } from './darkModal';

export type EditUserForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
};

type EditUserModalProps = {
  opened: boolean;
  onClose: () => void;
  form: EditUserForm;
  onFormChange: (next: EditUserForm) => void;
  imagePreview: string | null;
  /** Image déjà enregistrée sur le serveur (URL absolue). */
  existingImageUrl?: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  videoPreview: string | null;
  existingVideoUrl?: string | null;
  onVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting?: boolean;
  submitError?: string | null;
  /** Erreur locale (ex. vidéo trop longue / trop lourde). */
  videoError?: string | null;
};

const inputStyles = {
  label: { color: '#cbd5e1' },
  input: { background: '#1e293b', color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
} as const;

export function EditUserModal({
  opened,
  onClose,
  form,
  onFormChange,
  imagePreview,
  existingImageUrl,
  onImageChange,
  videoPreview,
  existingVideoUrl,
  onVideoChange,
  onSubmit,
  submitting,
  submitError,
  videoError,
}: EditUserModalProps) {
  const displayImage = imagePreview || existingImageUrl || null;
  const displayVideo = videoPreview || existingVideoUrl || null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withinPortal
      zIndex={9999}
      title={<span className="text-xl font-bold text-white">Mettre à jour l’utilisateur</span>}
      overlayProps={darkModalOverlayProps}
      classNames={darkModalClassNames}
    >
      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <Group justify="center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border border-white/20 flex items-center justify-center">
                {displayImage ? (
                  <img src={displayImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Avatar style={{ width: '10rem', height: '10rem' }} />
                )}
              </div>
              <label className="absolute -bottom-2 right-2 cursor-pointer px-2 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow">
                <RiCameraAiFill />
                <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
              </label>
            </div>
          </Group>

          <Divider label="Informations" labelPosition="center" />

          <Group grow>
            <TextInput
              label="Prénom"
              value={form.first_name}
              onChange={(e) => onFormChange({ ...form, first_name: e.target.value })}
              styles={inputStyles}
            />
            <TextInput
              label="Nom"
              value={form.last_name}
              onChange={(e) => onFormChange({ ...form, last_name: e.target.value })}
              styles={inputStyles}
            />
          </Group>

          <TextInput
            label="Email"
            value={form.email}
            onChange={(e) => onFormChange({ ...form, email: e.target.value })}
            styles={inputStyles}
          />

          <Group grow>
            <TextInput
              label="Téléphone"
              value={form.phone}
              onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
              styles={inputStyles}
            />
            <TextInput
              label="Ville"
              value={form.city}
              onChange={(e) => onFormChange({ ...form, city: e.target.value })}
              styles={inputStyles}
            />
          </Group>

          <Divider label="Médias" labelPosition="center" />

          <div>
            <div className="text-sm text-slate-300 mb-2">Vidéo (optionnel)</div>
            <input
              type="file"
              accept="video/*"
              onChange={onVideoChange}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white"
            />
            {displayVideo ? (
              <video src={displayVideo} className="mt-3 w-full rounded-lg border border-white/10" controls />
            ) : null}
            {videoError ? (
              <div className="mt-2 text-sm text-red-300" role="alert">
                {videoError}
              </div>
            ) : null}
          </div>

          {submitError ? (
            <div className="text-sm text-red-300">
              {submitError}
            </div>
          ) : null}

          <Group justify="flex-end" mt="xs">
            <Button variant="default" type="button" onClick={onClose} disabled={submitting}>
              Annuler
            </Button>
            <Button type="submit" color="orange" loading={submitting} disabled={Boolean(videoError)}>
              Enregistrer
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
