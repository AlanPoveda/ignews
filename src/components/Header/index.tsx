import { SignInButton } from "../SignInButton";
import Link from "next/link";
import styles from "./styles.module.scss";
import { ActiveLinks } from "../ActiveLink";
export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ignews " />
                <nav>
                    <ActiveLinks activeClass={styles.active} href='/'>
                        <a>
                            Home
                        </a>
                    </ActiveLinks>
                    <ActiveLinks activeClass={styles.active} href='/posts'>
                        <a>Posts</a>
                    </ActiveLinks>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
