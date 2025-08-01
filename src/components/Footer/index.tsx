import { memo, useState } from 'react';
import { Sparkle } from '../Sparkle';
import gitHubLogo from '../../assets/logos/github-logo.png';

const FooterComponent: React.FC = () => {
  const [sparkVisible, setSparkVisible] = useState(false);

  const handleSparkClick = () => {
    setSparkVisible(true);

    setTimeout(() => {
      setSparkVisible(false);
      window.open('https://github.com/Miltonr87', '_blank');
    }, 400);
  };

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__link">
          <button
            onClick={handleSparkClick}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Open GitHub profile"
          >
            <img
              src={gitHubLogo}
              alt="Github logo"
              style={{ width: 58, height: 58 }}
            />
            {sparkVisible && <Sparkle />}
          </button>
          <small style={{ marginLeft: '0.5rem' }}>Milton Rodrigues</small>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
