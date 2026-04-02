import { Modal, Button, Group, Stack } from '@mantine/core';
import type { CoffeeUser } from '../../../data/coffeeUsers';
import { darkModalClassNames, darkModalOverlayProps } from './darkModal';

type DeleteUserModalProps = {
  opened: boolean;
  onClose: () => void;
  user: CoffeeUser | null;
  onConfirmDelete: (user: CoffeeUser) => void | Promise<void>;
  loading?: boolean;
};

export function DeleteUserModal({
  opened,
  onClose,
  user,
  onConfirmDelete,
  loading,
}: DeleteUserModalProps) {
  const initials =
    user ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() : '';

  return (
    <Modal
      opened={opened && !!user}
      onClose={onClose}
      centered
      withinPortal
      zIndex={9999}
      title={<span className="text-xl font-bold text-white">Supprimer utilisateur</span>}
      overlayProps={darkModalOverlayProps}
      classNames={darkModalClassNames}
    >
      {user ? (
        <Stack gap="md">

          <div className="w-full rounded-xl border border-orange-500 bg-[#1e293b] p-4">
            <div className="text-sm text-white">
              Voulez-vous vraiment supprimer{' '}
              <span className="font-semibold text-white">
                {user.first_name} {user.last_name}
              </span>{' '}
              ?
            </div>
            <div className="mt-2 text-xs text-white">
              Cette action est <span className="font-semibold text-orange-800">irréversible</span>.
            </div>
          </div>

          <Group justify="flex-end" mt="xs">
            <Button variant="default" onClick={onClose}>
              Annuler
            </Button>
            <Button color="orange" loading={loading} onClick={() => onConfirmDelete(user)}>
              Supprimer
            </Button>
          </Group>
        </Stack>
      ) : null}
    </Modal>
  );
}

