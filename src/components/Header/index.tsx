import { SignInButton } from "../SignInButton";
import Link from "next/link";
import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ignews " />
                <nav>
                    <Link href="/">
                        <a className={styles.active} href="">
                            Home
                        </a>
                    </Link>
                    <Link href="/posts" prefetch>
                        <a>Posts</a>
                    </Link>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
