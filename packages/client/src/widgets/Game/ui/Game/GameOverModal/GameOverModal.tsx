import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app';
import { Modal, Button } from 'antd';
import classes from './GameOverModal.module.scss';
import { EAppRoutes } from '@/shared/types';
import { IGameOverModalProps } from './GameOverModal.interfaces';
import { TEXTS } from './GameOverModal.constants';
import { submitScore } from '@/entities/leaderboard';

export const GameOverModal: React.FC<IGameOverModalProps> = ({ onClose, score }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const teamName = 'teamone';

  const userName = `userName${Math.floor(Math.random() * 1000)}`;
  const handleClose = (): void => {
    setVisible(false);
    onClose?.();
  };
  const NavigateToMain = (): void => {
    navigate(EAppRoutes.Main);
  };
  const NavigateToLeaderboard = (): void => {
    navigate(EAppRoutes.LeaderBoard);
  };
  useEffect(() => {
    const handleSubmit = async (): Promise<void> => {
      dispatch(submitScore({ score, teamName, userName }));
    };
    handleSubmit();
  }, []);
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
          <span className={classes.gameOverModal__leaderboard} onClick={NavigateToLeaderboard}>
            ({TEXTS.leaderboardButton})
          </span>
        </p>

        <p>{TEXTS.tryAgain}</p>
        <Button type="primary" onClick={handleClose}>
          {TEXTS.tryAgainButton}
        </Button>

        <span className={classes.gameOverModal__back} onClick={NavigateToMain}>
          {TEXTS.backButton}
        </span>
      </div>
    </Modal>
  );
};
