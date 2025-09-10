import ReviewsClient from './reviewsClient';

type Props = { params: Promise<{ artistId: string }> };

export default async function ArtistReviewsPage({ params }: Props) {
  const { artistId } = await params;
  return <ReviewsClient artistId={artistId} />;
}
