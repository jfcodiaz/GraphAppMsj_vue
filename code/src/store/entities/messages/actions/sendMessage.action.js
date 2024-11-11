import MessageRepository from '@/repositories/MessageRepository';

export default async ({ state }, text) => {
  await MessageRepository.sendMessage({
    userId: state.user.id,
    text,
  });
};
