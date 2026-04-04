/** Modales tableau utilisateurs : fond blanc, texte slate, bordures orange. */
export const dashboardModalClassNames = {
  content: 'rounded-2xl border border-orange-900/20 bg-white shadow-[0_20px_50px_rgba(7,8,20,0.12)]',
  header: 'border-b border-orange-900/15 bg-orange-200/50 px-6 py-4',
  body: 'bg-white px-6 py-4 text-slate-900',
} as const;

export const dashboardModalOverlayProps = { backgroundOpacity: 0.4, blur: 4 } as const;
