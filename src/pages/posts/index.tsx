import styles from './styles.module.scss';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client' 



export default function Posts(){
    return(
        <>
            <Head>
                <title>Post ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>02 de março de 2022</time>
                        <strong>Como criar algo do zero</strong>
                        <p>Parar criar algo do zero, tem que começar pelo zero, então depois disso vai começar, ai para de ser do zero</p>
                    </a>
                    <a href="#">
                        <time>02 de março de 2022</time>
                        <strong>Como criar algo do zero</strong>
                        <p>Parar criar algo do zero, tem que começar pelo zero, então depois disso vai começar, ai para de ser do zero</p>
                    </a>
                    <a href='#'>
                        <time>02 de março de 2022</time>
                        <strong>Como criar algo do zero</strong>
                        <p>Parar criar algo do zero, tem que começar pelo zero, então depois disso vai começar, ai para de ser do zero</p>
                    </a>
                    <a href='#'>
                        <time>02 de março de 2022</time>
                        <strong>Como criar algo do zero</strong>
                        <p>Parar criar algo do zero, tem que começar pelo zero, então depois disso vai começar, ai para de ser do zero</p>
                    </a>
                </div>
            </main>
        </>
    );

}


//Chamada da api apra carregar a página uma unica vez, ainda mais para não consumir a banda
export const getStaticProps: GetStaticProps = async () => {

    const prismic = await getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post' )
    ], {
        fetch: ['title', 'content'],
        pageSize: 100
    })

    console.log(JSON.stringify(response, null, 2))

    return {
        props: {}
    }
}