/** Shared Mantine Modal styling for Utilisateurs modals */
export const darkModalClassNames = {
  content: 'bg-slate-900 rounded-2xl border border-white/10',
  header: 'bg-slate-900 border-b border-white/10 px-6 py-4',
  body: 'px-6 py-4 text-gray-300',
} as const;

export const darkModalOverlayProps = { backgroundOpacity: 0.3, blur: 3 } as const;
