import { useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import { Artist } from "~/models/Artist";
import { ArtistTile } from "../ArtistTile";
import { Link } from "@remix-run/react";

type Props = {
  loading: boolean;
  artists: Artist[];
};

export const ArtistList = ({ loading, artists }: Props) => {
  const [columnCount, setColumnCount] = useState(300);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    setColumnCount(window.innerWidth > 768 ? 2 : 1);
    setWidth(window.innerWidth > 768 ? 600 : 304);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const Row = ({ style, rowIndex, columnIndex }: GridChildComponentProps) => {
    const artist = artists[rowIndex * 2 + columnIndex];
    return (
      <div style={style}>
        <Link to={`/artist/${artist.id}`} key={artist.id}>
          <ArtistTile artist={artist} />
        </Link>
      </div>
    );
  };

  return (
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
  );
};
