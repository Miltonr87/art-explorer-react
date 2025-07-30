import { memo } from 'react';
const FooterComponent: React.FC = () => {
  return (
    <footer>
      <div>
        <p>🎨 Art Collection </p>
        <p>Assign Teste</p>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
