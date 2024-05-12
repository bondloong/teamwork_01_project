import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import classes from './GameOverModal.module.scss';
import { EAppRoutes } from '@/shared/types';
interface IGameOverModalProps {
  onClose: () => void;
  score: number;
}

export const GameOverModal: React.FC<IGameOverModalProps> = ({ onClose, score }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const handleClose = (): void => {
    setVisible(false);
    onClose();
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
          Ваш счёт: <span className={classes.gameOverModal__scoreValue}> {score} </span>
        </p>

        <p>Хотите начать заново?</p>
        <Button type="primary" onClick={handleClose}>
          Начать заново
        </Button>

        <Button type="link" onClick={NavigateToMain}>
          В главное меню
        </Button>
      </div>
    </Modal>
  );
};
