import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import classes from './GameOverModal.module.scss';
import { EAppRoutes } from '@/shared/types';
import { IGameOverModalProps } from './GameOverModal.interfaces';
import { TEXTS } from './GameOverModal.constants';

export const GameOverModal: React.FC<IGameOverModalProps> = ({ onClose, score }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = useCallback((): void => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const navigateMain = useCallback((): void => {
    navigate(EAppRoutes.Main);
  }, [navigate]);

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
        <h1 className={classes.gameOverModal__title}>{TEXTS.gameEnded}</h1>
        <p className={classes.gameOverModal__score}>
          {TEXTS.score} <span className={classes.gameOverModal__scoreValue}>{score}</span>
        </p>

        <p>{TEXTS.tryAgain}</p>
        <Button type="primary" onClick={handleClose}>
          {TEXTS.tryAgainButton}
        </Button>

        <Button type="link" onClick={navigateMain}>
          {TEXTS.backButton}
        </Button>
      </div>
    </Modal>
  );
};
