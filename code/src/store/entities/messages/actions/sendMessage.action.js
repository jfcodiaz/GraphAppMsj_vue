import MessageRepository from '@/repositories/MessageRepository';

export default async ({ state }, messageData) => {
  // Handle both old format (string) and new format (object)
  const text = typeof messageData === 'string' ? messageData : messageData.text;
  const images =
    typeof messageData === 'string' ? [] : messageData.images || [];

  await MessageRepository.sendMessage({
    userId: state.user.id,
    text,
    images,
  });
};
