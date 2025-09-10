import ConversationClient from './conversationClient';

type Props = { params: Promise<{ conversationId: string }> };

export default async function ConversationDetailPage({ params }: Props) {
  const { conversationId } = await params;
  return <ConversationClient conversationId={conversationId} />;
}
