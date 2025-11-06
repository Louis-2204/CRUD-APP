import prisma from '@/lib/prisma';

export async function getBooks() {
  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return books;
}

export async function getUniqueAuthors() {
  const books = await prisma.book.findMany({
    where: {
      author: {
        not: '',
      },
    },
    select: {
      author: true,
    },
    distinct: ['author'],
    take: 10,
    orderBy: {
      author: 'asc',
    },
  });
  return books.map((book) => book.author);
}

export async function getUniqueGenres() {
  const books = await prisma.book.findMany({
    where: {
      NOT: {
        genre: null,
      },
    },
    select: {
      genre: true,
    },
    distinct: ['genre'],
    take: 10,
    orderBy: {
      genre: 'asc',
    },
  });
  return books.map((book) => book.genre).filter((genre): genre is string => genre !== null);
}

export async function getUniqueYears() {
  const books = await prisma.book.findMany({
    where: {
      NOT: {
        year: null,
      },
    },
    select: {
      year: true,
    },
    distinct: ['year'],
    orderBy: {
      year: 'desc',
    },
  });
  return books.map((book) => book.year).filter((year): year is number => year !== null);
}
