import logoSmall from "~/images/logo-small.png";
import backIcon from "~/images/back.png";
import { Link } from "@remix-run/react";

export const Header = () => {
  return (
    <header>
      <img src={logoSmall} alt="Sol & Pimenta" />
      <Link to="/" className="flex gap-1 items-center my-5">
        <div>
          <img src={backIcon} alt="Voltar" />
        </div>
        Voltar
      </Link>
    </header>
  );
};
