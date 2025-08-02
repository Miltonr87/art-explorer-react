import { ReactNode } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHomePage?: boolean;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  isHomePage = false,
  className = '',
  ...rest
}) => {
  return (
    <div className={`${className}`} {...rest}>
      <Header isHomePage={isHomePage} />
      <main>
        <div className="wrapper">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
