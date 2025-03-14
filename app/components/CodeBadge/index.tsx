export const CodeBadge = ({ children }: React.PropsWithChildren) => {
  return (
    <span className="w-16 h-8 bg-badge-bg p-2 text-badge-text border border-badge-border rounded-full font-bold tracking-widest flex items-center justify-center shrink-0 text-sm">
      {children}
    </span>
  );
};
