import PurchaseClient from './purchaseClient';

type Props = { params: Promise<{ performanceId: string }> };

export default async function PurchasePage({ params }: Props) {
  const { performanceId } = await params;
  return <PurchaseClient performanceId={performanceId} />;
}
