import { useParams } from "@remix-run/react";

export default function Artistas() {
  const { artistId } = useParams();
  console.log(artistId);

  return (
    <div>
      <h1>Artistas</h1>
    </div>
  );
}
