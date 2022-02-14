import { GetStaticProps } from "next";
import Head from "next/head";
import Link from 'next/link';
import { RichText } from "prismic-dom";
import styles from "../post.module.scss";
import { getPrismicClient } from "../../../services/prismic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";



//types
interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
}

export default function PostPreview({ post }: PostPreviewProps) {
    const {data: session} = useSession()
    const router = useRouter()

    //Ele verifica se esta logdo e redireciona para o post total
    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])
   


    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{ __html: post.content }} />

                    <div className={styles.continueReading}>
                        Wanna continue reading? 
                        <Link href="/"><a href="">Subscribe now 🧐</a></Link>
                    </div>
                </article>
            </main>
        </>
    );
}

//Quais posts vc quer gerar durante a build. Só funciona com páginas dinâmicas
export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}


//static
export const getStaticProps: GetStaticProps = async ({
    params,
}) => {

    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID<any>("post", String(slug), {});

   

    const post = {
        slug: response.uid,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      };

    return {
        props: {
            post,
        },
        redirect: 60 * 60
    };
};
