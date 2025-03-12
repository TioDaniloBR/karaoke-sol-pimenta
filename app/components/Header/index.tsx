import { Link } from "@remix-run/react";
import logo from "~/images/logo.png";
import playlistIcon from "~/images/favorite.png";
import shareIcon from "~/images/share.png";

export const Header = () => {
  return (
    <header className="bg-body py-5 px-4 flex justify-center">
      <div>
        <img className="w-36" src={logo} alt="Sol e Pimenta Lounge Bar" />
      </div>
      <div className="flex gap-4 absolute right-3">
        <Link to="/playlist" className="inline-block bg-white rounded-full">
          <img className="w-8" src={playlistIcon} alt="Sua playlist" />
        </Link>
        <button className="h-8 w-8">
          <img src={shareIcon} alt="Clique para compartilhar nossa aplicação" />
        </button>
      </div>
    </header>
  );
};
