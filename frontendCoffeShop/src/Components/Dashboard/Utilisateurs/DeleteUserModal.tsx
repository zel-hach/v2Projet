import { Modal, Button, Group, Stack } from '@mantine/core';
import type { CoffeeUser } from '../../../data/coffeeUsers';
import { dashboardModalClassNames, dashboardModalOverlayProps } from './modalTheme';
import { UserAvatarCircle } from './UserAvatarCircle';

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
  return (
    <Modal
      opened={opened && !!user}
      onClose={onClose}
      centered
      withinPortal
      zIndex={9999}
      title={<span className="text-xl font-bold text-slate-900">Supprimer utilisateur</span>}
      overlayProps={dashboardModalOverlayProps}
      classNames={{
        ...dashboardModalClassNames,
        close: 'text-slate-600 hover:bg-orange-100/80',
      }}
    >
      {user ? (
        <Stack gap="md">
          <div className="flex items-start gap-3 rounded-xl border border-orange-900/20 bg-orange-200/50 p-4">
            <UserAvatarCircle
              imageUrl={user.imageUrl}
              firstName={user.first_name}
              lastName={user.last_name}
              className="size-14"
              initialsClassName="text-lg"
            />
            <div className="min-w-0 flex-1 text-sm text-slate-900">
              <p>
                Voulez-vous vraiment supprimer{' '}
                <span className="font-semibold text-slate-900">
                  {user.first_name} {user.last_name}
                </span>{' '}
                ?
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Cette action est <span className="font-semibold text-red-600">irréversible</span>.
              </p>
            </div>
          </div>

          <Group justify="flex-end" mt="xs">
            <Button
              variant="default"
              onClick={onClose}
              className="border-0 bg-blue-50 text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100"
            >
              Annuler
            </Button>
            <Button
              color="red"
              loading={loading}
              onClick={() => onConfirmDelete(user)}
              className="ring-1 ring-red-200"
            >
              Supprimer
            </Button>
          </Group>
        </Stack>
      ) : null}
    </Modal>
  );
}
