import { Modal, Button, Textarea, Group, Stack } from '@mantine/core';
import type { CoffeeUser } from '../../../data/coffeeUsers';
import { normalizePhoneForWhatsApp } from './userHelpers';
import { darkModalClassNames, darkModalOverlayProps } from './darkModal';

type WhatsAppModalProps = {
  opened: boolean;
  onClose: () => void;
  user: CoffeeUser | null;
  message: string;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  loading?: boolean;
};

const textareaStyles = {
  input: { background: '#1e293b', color: 'white', borderColor: 'rgba(255,255,255,0.08)' },
} as const;

export function WhatsAppModal({
  opened,
  onClose,
  user,
  message,
  onMessageChange,
  onSend,
  loading,
}: WhatsAppModalProps) {
  const phoneOk = user ? Boolean(normalizePhoneForWhatsApp(user.phone ?? '')) : false;

  return (
    <Modal
      opened={opened && !!user}
      onClose={onClose}
      centered
      withinPortal
      zIndex={9999}
      title={<span className="text-xl font-bold text-white">Envoyer un message WhatsApp</span>}
      overlayProps={darkModalOverlayProps}
      classNames={darkModalClassNames}
    >
      {user ? (
        <Stack gap="sm">
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            minRows={5}
            placeholder="Votre message…"
            styles={textareaStyles}
          />

          <Group justify="flex-end" mt="xs">
            <Button variant="default" onClick={onClose}>
              Annuler
            </Button>
            <Button color="orange" onClick={onSend} loading={loading} disabled={!phoneOk || !message.trim()}>
              Envoyer
            </Button>
          </Group>
        </Stack>
      ) : null}
    </Modal>
  );
}
