import tpIcon from "~/images/2TP-logo.png";

export const Footer = () => {
  return (
    <footer className="text-secondary text-center w-full bg-body fixed bottom-0 p-2">
      <p className="flex gap-2 items-center justify-center w-full">
        Desenvolvido por 2tp tecnologia
        <img className="w-16" src={tpIcon} alt="2tp tecnologia" />
      </p>
    </footer>
  );
};
