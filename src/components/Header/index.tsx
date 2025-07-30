import { memo } from 'react';
import homeIcon from '../../assets/icons/home-icon.svg';
import bookmarkIcon from '../../assets/icons/bookmark-icon.svg';

interface HeaderProps {
  isHomePage: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({ isHomePage }) => {
  return (
    <header>
      <p>🎨 Art Collection </p>
      <nav>
        <ul>
          {!isHomePage && (
            <li>
              <img src={homeIcon} alt="Home icon" />
              <span>Home</span>
            </li>
          )}

          <li>
            <img src={bookmarkIcon} alt="Home icon" />
            <span>Favorites</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export const Header = memo(HeaderComponent);
