import { Link } from "@remix-run/react";
import playlistIcon from "~/images/playlist.png";

export const Header = () => {
  return (
    <header className="bg-body text-white py-2 px-4 text-right">
      <Link to="/playlist" className="inline-block bg-white rounded-full">
        <img className="w-8" src={playlistIcon} alt="Sua playlist" />
      </Link>
      <button></button>
    </header>
  );
};
