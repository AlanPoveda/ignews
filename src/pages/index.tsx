import Head from 'next/head'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
    <Head>
      <title>ignews</title>
    </Head>

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>🙋🏽‍♂️ Hey, welcome</span>
        <h1>New about the <span>React</span> world</h1>
        <p>
          Get access to all the publications <br/>
          <span> for $1.90 month </span>
        </p>
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />

    </main>

    
    </>
    
  )
}
