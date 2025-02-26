import { useId } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "~/utils";

type Props = {
  label: string;
} & React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

export const Checkbox = ({ label, className, ...props }: Props) => {
  const id = useId();
  return (
    <div className={cn("flex gap-x-2", className)}>
      <RadixCheckbox.Root
        className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition"
        id={id}
        {...props}
      >
        <RadixCheckbox.Indicator>
          <Check className="text-white w-4 h-4" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
