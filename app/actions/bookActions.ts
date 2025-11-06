'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBook(formData: FormData) {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const isbn = formData.get('isbn') as string;
  const year = formData.get('year') as string;
  const genre = formData.get('genre') as string;
  const rating = formData.get('rating') as string;

  await prisma.book.create({
    data: {
      title,
      author,
      isbn: isbn || null,
      year: year ? parseInt(year) : null,
      genre: genre || null,
      rating: rating ? parseFloat(rating) : null,
    },
  });

  revalidatePath('/');
}

export async function updateBook(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const isbn = formData.get('isbn') as string;
  const year = formData.get('year') as string;
  const genre = formData.get('genre') as string;
  const rating = formData.get('rating') as string;

  await prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      isbn: isbn || null,
      year: year ? parseInt(year) : null,
      genre: genre || null,
      rating: rating ? parseFloat(rating) : null,
    },
  });

  revalidatePath('/');
}

export async function deleteBook(id: string) {
  await prisma.book.delete({
    where: { id },
  });

  revalidatePath('/');
}
