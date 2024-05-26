import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import classes from './GameOverModal.module.scss';
import { EAppRoutes } from '@/shared/types';
import { IGameOverModalProps } from './GameOverModal.interfaces';
import { TEXTS } from './GameOverModal.constants';

export const GameOverModal: React.FC<IGameOverModalProps> = ({ onClose, score }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const handleClose = (): void => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };
  const NavigateToMain = (): void => {
    navigate(EAppRoutes.Main);
  };
  return (
    <Modal
      centered
      open={visible}
      maskClosable={false}
      onCancel={handleClose}
      footer={null}
      closeIcon={null}
      className={classes.gameOverModal}
    >
      <div className={classes.gameOverModal__wrapper}>
        <h1 className={classes.gameOverModal__title}>Конец игры!</h1>
        <p className={classes.gameOverModal__score}>
          {TEXTS.score} <span className={classes.gameOverModal__scoreValue}> {score} </span>
        </p>

        <p>{TEXTS.tryAgain}</p>
        <Button type="primary" onClick={handleClose}>
          {TEXTS.tryAgainButton}
        </Button>

        <Button type="link" onClick={NavigateToMain}>
          {TEXTS.backButton}
        </Button>
      </div>
    </Modal>
  );
};