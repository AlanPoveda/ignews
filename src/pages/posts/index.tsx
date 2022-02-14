import styles from "./styles.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import Link from "next/link";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostProps {
    posts: Post[];
}

export default function Posts({ posts }: PostProps) {
    return (
        <>
            <Head>
                <title>Post ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/posts/preview/${post.slug}`}>
                            <a href={post.slug} key={post.slug}>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}

//Chamada da api apra carregar a página uma unica vez, ainda mais para não consumir a banda
export const getStaticProps: GetStaticProps = async () => {
    const prismic = await getPrismicClient();

    const response = await prismic.query<any>(
        [Prismic.predicates.at("document.type", "post")],
        {
            fetch: ["title", "content"],
            pageSize: 100,
        },
    );

    //Formatar o resultado vindo pela api pelo backend antes de enviar para o component
    const posts = response.results.map((post) => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt:
                post.data.content.find(
                    (content) => content.type === "paragraph",
                )?.text ?? "",
            updatedAt: new Date(post.last_publication_date).toLocaleDateString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                },
            ),
        };
    });

    return {
        props: {
            posts,
        },
    };
};
