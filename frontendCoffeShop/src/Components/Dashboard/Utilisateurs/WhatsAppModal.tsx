import { Alert, Modal, Button, Textarea, Group, Stack } from '@mantine/core';
import type { CoffeeUser } from '../../../data/coffeeUsers';
import { mediaAbsoluteUrl } from '../../../data/usersApi';
import { dashboardModalClassNames, dashboardModalOverlayProps } from './modalTheme';
import { UserAvatarCircle } from './UserAvatarCircle';

type EmailUserModalProps = {
  opened: boolean;
  onClose: () => void;
  user: CoffeeUser | null;
  message: string;
  onMessageChange: (value: string) => void;
  /** Peut être async : le bouton attend la fin avant de relâcher le loader côté parent. */
  onSend: () => void | Promise<void>;
  loading?: boolean;
  sendError?: string | null;
  onDismissSendError?: () => void;
};

const textareaStyles = {
  label: { color: '#334155' },
  input: {
    background: '#ffffff',
    color: '#0f172a',
    borderColor: 'rgba(194, 65, 12, 0.2)',
  },
} as const;

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
}

export function WhatsAppModal({
  opened,
  onClose,
  user,
  message,
  onMessageChange,
  onSend,
  loading,
  sendError,
  onDismissSendError,
}: EmailUserModalProps) {
  const email = user?.email?.trim() ?? '';
  const emailOk = Boolean(user && isValidEmail(email));
  const img = user ? mediaAbsoluteUrl(user.imageUrl ?? null) : null;
  const vid = user ? mediaAbsoluteUrl(user.videoUrl ?? null) : null;

  const handleSend = () => {
    void Promise.resolve(onSend()).catch(() => {
      /* erreurs gérées dans le parent (état error) */
    });
  };

  return (
    <Modal
      opened={opened && !!user}
      onClose={onClose}
      centered
      withinPortal
      zIndex={9999}
      title={<span className="text-xl font-bold text-slate-900">Envoyer un e-mail</span>}
      overlayProps={dashboardModalOverlayProps}
      classNames={{
        ...dashboardModalClassNames,
        close: 'text-slate-600 hover:bg-orange-100/80',
      }}
    >
      {user ? (
        <Stack gap="md">
          <div className="flex items-center gap-3 rounded-xl border border-orange-900/15 bg-orange-200/50 p-4">
            <UserAvatarCircle
              imageUrl={user.imageUrl}
              firstName={user.first_name}
              lastName={user.last_name}
              className="size-14"
              initialsClassName="text-lg"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="truncate text-sm text-slate-600">{email || '— (e-mail requis)'}</p>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            L’e-mail inclura automatiquement la photo et la vidéo du profil lorsqu’elles sont enregistrées
            (liens Cloudinary).
            {img ? (
              <span className="ml-1 font-medium text-orange-800">Photo : oui.</span>
            ) : (
              <span className="ml-1">Photo : non.</span>
            )}
            {vid ? (
              <span className="ml-1 font-medium text-orange-800">Vidéo : oui.</span>
            ) : (
              <span className="ml-1">Vidéo : non.</span>
            )}
          </p>

          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            minRows={5}
            placeholder="Votre message…"
            styles={textareaStyles}
          />

          {sendError ? (
            <Alert
              color="red"
              title="Envoi impossible"
              withCloseButton
              onClose={() => onDismissSendError?.()}
            >
              {sendError}
            </Alert>
          ) : null}

          <Group justify="flex-end" mt="xs">
            <Button
              variant="default"
              onClick={onClose}
              className="border-0 bg-blue-50 text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100"
            >
              Annuler
            </Button>
            <Button
              color="orange"
              onClick={handleSend}
              loading={loading}
              disabled={!emailOk || !message.trim()}
              className="bg-[#FF5722]"
            >
              Envoyer l’e-mail
            </Button>
          </Group>
        </Stack>
      ) : null}
    </Modal>
  );
}
