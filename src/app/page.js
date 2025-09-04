import { CardPost } from "@/components/CardPost";
import logger from "@/logger";

import styles from './page.module.css';
import Link from "next/link";



async function getAllPosts(page, per_page) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=${per_page}`);
  if (!response.ok) {
    logger.error('Ops, alguma coisa ocorreu mal');
    return [];
  }
  logger.info('Posts obtidos com sucesso');
  return response.json();
}

export default async function Home({ searchParams }) {

  const currentPage = searchParams?.page || 1;

  const { data: posts, prev, next } = await getAllPosts(currentPage, searchParams.per_page || 6);

  return (
    <main className={styles.grid}>
      {posts && posts.map(post => {
        return <CardPost key={post.id} post={post} />;
      })}
      {prev && <Link href={`?page=${prev}`}>Anterior</Link>}
      {next && <Link href={`?page=${next}`}>Próximo</Link>}
    </main>
  )
}
