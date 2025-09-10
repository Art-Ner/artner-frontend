import ReviewsClient from './reviewsClient';

type Props = { params: Promise<{ venueId: string }> };

export default async function VenueReviewsPage({ params }: Props) {
  const { venueId } = await params;
  return <ReviewsClient venueId={venueId} />;
}
