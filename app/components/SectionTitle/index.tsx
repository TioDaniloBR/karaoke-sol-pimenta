export const SectionTitle = ({ children }: React.ComponentProps<"h2">) => {
  return (
    <h2 className="relative my-3">
      <span className="block w-full bg-secondary h-[1px] absolute bottom-1/2"></span>
      <span className="relative ml-8 bg-body px-2">{children}</span>
    </h2>
  );
};
