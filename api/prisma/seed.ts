import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Create adapter and pass in the connection string
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// 2. Pass the adapter when instantiating PrismaClient
const prisma = new PrismaClient({ adapter });


async function main() {
  // 1. Create Genres
  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const science = await prisma.genre.create({ data: { name: 'Science' } });
  const history = await prisma.genre.create({ data: { name: 'History' } });
  const tech = await prisma.genre.create({ data: { name: 'Technology' } });

  // 2. Create Books (15 total, distributed across genres)
  await prisma.book.createMany({
    data: [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genreId: fiction.id },
      { title: '1984', author: 'George Orwell', genreId: fiction.id },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', genreId: fiction.id },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', genreId: fiction.id },
      
      { title: 'A Brief History of Time', author: 'Stephen Hawking', genreId: science.id },
      { title: 'Cosmos', author: 'Carl Sagan', genreId: science.id },
      { title: 'The Selfish Gene', author: 'Richard Dawkins', genreId: science.id },
      { title: 'Silent Spring', author: 'Rachel Carson', genreId: science.id },
      
      { title: 'Sapiens', author: 'Yuval Noah Harari', genreId: history.id },
      { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genreId: history.id },
      { title: 'The Silk Roads', author: 'Peter Frankopan', genreId: history.id },
      { title: 'SPQR', author: 'Mary Beard', genreId: history.id },
      
      { title: 'Clean Code', author: 'Robert C. Martin', genreId: tech.id },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genreId: tech.id },
      { title: 'Design Patterns', author: 'Erich Gamma', genreId: tech.id },
    ],
  });

  // 3. Create sample users
  await prisma.user.create({
    data: { name: 'Admin Librarian', email: 'librarian@example.com', role: Role.LIBRARIAN },
  });
  
  await prisma.user.create({
    data: { name: 'John Patron', email: 'john@example.com', role: Role.PATRON },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });