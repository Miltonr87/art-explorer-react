import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import { Sidebar } from '../Sidebar';
import museumLogoLight from '../../assets/logos/art-collection.png';
import homeIcon from '../../assets/icons/home-icon.svg';
import bookmarkIcon from '../../assets/icons/bookmark-light-orange-icon.svg';
import burgerIcon from '../../assets/icons/burger-icon.svg';
import { ROUTES } from '../../constants';
import { useSparkNavigation } from '../../hooks/useSparkNavigation';
import { Sparkle } from '../Sparkle';

interface HeaderProps {
  isHomePage: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({ isHomePage }) => {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isVisible: sparkLogo, triggerSpark: sparkAndGoLogo } =
    useSparkNavigation();
  const { isVisible: sparkHome, triggerSpark: sparkAndGoHome } =
    useSparkNavigation();
  const { isVisible: sparkFav, triggerSpark: sparkAndGoFav } =
    useSparkNavigation();

  const handleSparkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetPath: string,
    trigger: (path: string) => void,
  ) => {
    event.preventDefault();
    trigger(targetPath);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = '';
  };

  useDetectOutsideClick({
    ref: sidebarRef,
    isOpen: isSidebarOpen,
    onClose: handleCloseSidebar,
  });

  return (
    <header className="header">
      <div className="wrapper">
        <Link
          to={ROUTES.home}
          onClick={e => handleSparkClick(e, ROUTES.home, sparkAndGoLogo)}
          className="header__navlist__link"
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <img
            style={{ width: 120, height: 120 }}
            src={museumLogoLight}
            alt="Art Collection Logo"
          />
          {sparkLogo && <Sparkle />}
        </Link>

        <nav className="header__nav">
          <ul className="header__navlist">
            {!isHomePage && (
              <li>
                <Link
                  to={ROUTES.home}
                  onClick={e =>
                    handleSparkClick(e, ROUTES.home, sparkAndGoHome)
                  }
                  className="header__navlist__link"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={homeIcon}
                    alt="Home icon"
                    style={{ width: 58, height: 58 }}
                  />
                  {sparkHome && <Sparkle />}
                  <span style={{ marginLeft: '6px' }}>Home</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to={ROUTES.favorites}
                onClick={e =>
                  handleSparkClick(e, ROUTES.favorites, sparkAndGoFav)
                }
                className="header__navlist__link"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={bookmarkIcon}
                  alt="Bookmark icon"
                  style={{ width: 58, height: 58 }}
                />
                {sparkFav && <Sparkle />}
                <span style={{ marginLeft: '6px' }}>Favorites Gallery</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button onClick={handleOpenSidebar} className="button button-burger">
          <img src={burgerIcon} alt="Menu icon" />
        </button>
      </div>

      <Sidebar
        isHomePage={isHomePage}
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </header>
  );
};

export const Header = memo(HeaderComponent);
