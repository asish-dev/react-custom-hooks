import styles from './Layout.module.scss';

export const metadata = {
  title: 'My Hooks - asish',
  description: 'A set of custom hooks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.AppLayout}>
      <header className={styles.Header}>Hooks</header>
      {children}
    </div>
  );
}
