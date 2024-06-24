import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    // Создание пользователя
    const newUser = await prisma.user.create({
      data: {
        first_name: 'John',
        second_name: 'Doe',
        phone: '1234567890',
        login: 'johndoe',
        avatar: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
      },
    });

    console.log('User created:', newUser);

    // Создание топиков
    const newTopics = await prisma.topic.createMany({
      data: [
        {
          title: 'First Topic',
          content: 'This is the content of the first topic',
          authorId: newUser.id,
        },
        {
          title: 'Second Topic',
          content: 'This is the content of the second topic',
          authorId: newUser.id,
        },
      ],
    });

    console.log('Topics created:', newTopics);

    // Получение первого топика
    const firstTopic = await prisma.topic.findFirst({
      where: { authorId: newUser.id },
      orderBy: { createdAt: 'asc' },
    });

    if (firstTopic) {
      // Создание комментария к первому топику
      const newComment = await prisma.comment.create({
        data: {
          content: 'This is a comment on the first topic',
          authorId: newUser.id,
          topicId: firstTopic.id,
        },
      });

      console.log('Comment created:', newComment);

      // Создание лайка для первого топика
      const newLike = await prisma.likedTopics.create({
        data: {
          userId: newUser.id,
          topicId: firstTopic.id,
        },
      });

      console.log('Topic liked:', newLike);
    }
  } catch (error) {
    console.error('There was an error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
