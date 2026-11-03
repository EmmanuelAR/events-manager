import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`site-shell ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/assets/logos/grokbot-favicon-thumbnailtool.svg"
            alt="Grok Bot"
            width={34}
            height={34}
            className={styles.logo}
            priority
          />
          <span className={styles.brandText}>
            <strong>SpaceXSI Community</strong>
            <span>Costa Rica</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
