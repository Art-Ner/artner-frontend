import {
  fetchArtistConcertHistory,
  fetchArtistFilmography,
  fetchArtistProfile,
} from '@/slices/artists/queries';

export default async function ArtistPortfolioPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;
  const [profile, filmography, history] = await Promise.all([
    fetchArtistProfile(artistId),
    fetchArtistFilmography(artistId),
    fetchArtistConcertHistory(artistId),
  ]);

  return (
    <main className="p-6 space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">
          {profile?.username ?? `Artist ${artistId}`}
        </h1>
        <div className="text-muted-foreground">{profile?.headline}</div>
      </section>

      <section>
        <h2 className="font-medium">소개</h2>
        <p className="whitespace-pre-wrap">{profile?.bio}</p>
      </section>

      <section>
        <h2 className="font-medium">필모그래피</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(filmography, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="font-medium">공연 이력</h2>
        <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(history, null, 2)}
        </pre>
      </section>
    </main>
  );
}
