import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/Checkbox";
import { ArtistTile } from "~/components/ArtistTile";
import { fetchArtists, fetchSongs } from "~/db/repository";
import { getArtists, storeArtists, storeSongs } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Country } from "~/models/Country";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export default function Index() {
  // useEffect(() => {
  //   storeArtists(artistsData);
  //   storeSongs(songs);
  // }, [artistsData, songs]);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [filter, setFilter] = useState(new Set<Country>());

  useEffect(() => {
    getArtists().then(setArtists);
  }, []);

  const Row = ({ style, rowIndex, columnIndex }: GridChildComponentProps) => {
    const artist = artists[rowIndex * 2 + columnIndex];
    return (
      <div style={style}>
        <Link to={`/artist/${artist.name}`} key={artist.name}>
          <ArtistTile artist={artist} />
        </Link>
      </div>
    );
  };

  const [columnCount, setColumnCount] = useState(300);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    setColumnCount(window.innerWidth > 768 ? 2 : 1);
    setWidth(window.innerWidth > 768 ? 600 : 304);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const newFilter = new Set(filter);
    if (checked) {
      newFilter.add(name as Country);
    } else {
      newFilter.delete(name as Country);
    }

    const country =
      newFilter.size === 1 ? Array.from(newFilter.values())[0] : undefined;
    getArtists(country).then(setArtists);
    setFilter(newFilter);
  };

  return (
    <div className="mx-auto max-w-xl">
      <img src={logo} alt="Sol e Pimenta Lounge Bar" />
      <div className="flex">
        <div>
          <Checkbox
            label="Nacionais"
            name={"Nacional" as Country}
            checked={filter.has("Nacional")}
            onChange={handleFilterChange}
          />
          <Checkbox
            label="Internacionais"
            name={"Internacional" as Country}
            checked={filter.has("Internacional")}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="filter">Localizar</label>
          <input name="filter" id="filter" />
        </div>
      </div>
      <AutoSizer disableWidth>
        {({ height }) => (
          <FixedSizeGrid
            columnCount={columnCount}
            columnWidth={288}
            height={height}
            width={width}
            rowCount={artists.length}
            rowHeight={100}
          >
            {Row}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
}
