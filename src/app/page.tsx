import Image from 'next/image';
import styles from './page.module.css';
// import StrudelMusic from '@/components/StrudelMusic';
import StrudelEmbedded from '@/components/StrudelEmbedded';
// import SuperdoughSynth from '@/components/SuperdoughSynth';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/title-image.svg"
          alt="Project logo"
          width={100}
          height={100}
          priority
        />
        <StrudelEmbedded />
        {/* <StrudelMusic /> */}
        {/* <SuperdoughSynth /> */}
      </main>
    </div>
  );
}
