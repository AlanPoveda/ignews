import styles from './styles.module.scss';
import Head from 'next/head';




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