import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const userIds = [
  "f2b1fa33-14a8-4f73-9ee8-cbe478a180b4",
  "daf871c9-c79e-4de8-be17-b13c56516c99",
  "351568b3-1cec-499e-9268-4339fd81f751",
];

async function main() {
  for (const userId of userIds) {
    const createdProject = await prisma.project.create({
      data: {
        user_id: userId,
        name: capitalize(faker.word.noun()),
      },
    });

    for (let i = 1; i <= 2; i++) {
      await prisma.task.create({
        data: {
          user_id: userId,
          project_id: i % 2 === 0 ? createdProject.id : null,
          name: `${capitalize(faker.word.verb())} ${faker.word.noun()}`,
          description: faker.lorem.sentence(),
          due_date: faker.date.future(),
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
