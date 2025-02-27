import { cn } from "~/utils";

type Props = {} & React.ComponentProps<"div">;

export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn("border-primary rounded-3xl border-2 px-6 py-4", className)}
    >
      {children}
    </div>
  );
};
