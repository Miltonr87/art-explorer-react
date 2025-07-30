import { memo } from 'react';
import gitHubLogo from '../../assets/logos/github-logo.png';

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__link">
          <a href="https://github.com/Miltonr87/" target="_blank"></a>
          <small>Milton Rodrigues</small>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
