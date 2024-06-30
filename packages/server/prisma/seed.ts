import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    // Создание пользователя
    const newUser = await prisma.user.create({
      data: {
        first_name: 'John',
        second_name: 'Doe',
        yandexUserId: '123',
      },
    });

    console.log('User created:', newUser);

    // Создание топиков
    const firstTopic = await prisma.topic.create({
      data: {
        title: 'First Topic',
        content: 'This is the content of the first topic',
        authorId: newUser.id,
        likedUsers: [], // Изначально пустой массив лайков
      },
    });

    console.log('First topic created:', firstTopic);

    const secondTopic = await prisma.topic.create({
      data: {
        title: 'Second Topic',
        content: 'This is the content of the second topic',
        authorId: newUser.id,
        likedUsers: [], // Изначально пустой массив лайков
      },
    });

    console.log('Second topic created:', secondTopic);

    // Создание комментария к первому топику
    const newComment = await prisma.comment.create({
      data: {
        content: 'This is a comment on the first topic',
        authorId: newUser.id,
        topicId: firstTopic.id,
      },
    });

    console.log('Comment created:', newComment);

    // Добавление лайка к первому топику
    const updatedTopic = await prisma.topic.update({
      where: { id: firstTopic.id },
      data: {
        likedUsers: {
          push: newUser.id,
        },
      },
    });

    console.log('Topic liked:', updatedTopic);
  } catch (error) {
    console.error('There was an error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
