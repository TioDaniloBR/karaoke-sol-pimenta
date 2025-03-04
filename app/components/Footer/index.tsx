import tpIcon from "~/images/2tp-light.png";

export const Footer = () => {
  return (
    <footer className="text-secondary text-center w-full bg-body fixed bottom-0 p-2">
      <p className="flex gap-2 items-center justify-center w-full text-white">
        Desenvolvido por 2tp tecnologia
        <img className="w-16" src={tpIcon} alt="2tp tecnologia" />
      </p>
    </footer>
  );
};
