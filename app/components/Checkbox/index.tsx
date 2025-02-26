import { useId } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "~/utils";
import checkIcon from "~/images/check.png";

type Props = {
  label: string;
} & React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

export const Checkbox = ({ label, className, ...props }: Props) => {
  const id = useId();
  return (
    <div className={cn("flex gap-x-2", className)}>
      <RadixCheckbox.Root
        className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary transition"
        id={id}
        {...props}
      >
        <RadixCheckbox.Indicator>
          <img src={checkIcon} alt="Check" className="w-4 h-4" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
