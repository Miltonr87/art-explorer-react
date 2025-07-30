import { PageLayout } from '../../components/PageLayout';

export const HomePage: React.FC = () => {
  return (
    <PageLayout isHomePage={true}>
      <p>Main page</p>
    </PageLayout>
  );
};
