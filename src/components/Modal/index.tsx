import { createPortal } from 'react-dom';
import clearIcon from '../../assets/icons/clear-icon.png';

interface ModalProps {
  imageId: string;
  altText: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ imageId, altText, onClose }) => {
  console.log('Modal rendered with imageId:', imageId, 'and altText:', altText);
  const modalRoot = document.getElementById('modal-root');

  return createPortal(
    <div onClick={onClose} className="modal__overlay">
      <div className="modal__header">
        <p className="modal__alt-text">{altText}</p>
        <button onClick={onClose} className="button button-close-modal">
          <img src={clearIcon} alt="Clear icon" />
        </button>
      </div>
      <div onClick={e => e.stopPropagation()} className="modal__content">
        <img
          src={`${imageId}`}
          alt="Zoomed artwork image"
          className="modal__image"
        />
      </div>
    </div>,
    modalRoot as Element,
  );
};
