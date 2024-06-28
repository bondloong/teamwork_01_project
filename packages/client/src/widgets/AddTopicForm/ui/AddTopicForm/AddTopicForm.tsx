import { ReactElement, useState } from 'react';
import { Button } from 'antd';
import { TEXTS } from './AddTopicForm.constants';
import { ICommonFormProps, ADD_TOPIC_INPUTS, addTopicSchema } from '../../model';
import { Form } from '../Form';
import { TInputValues } from '@/shared/hooks/useForm';
import classes from './AddTopicForm.module.scss';
import { EInputNames } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';
import { TAddTopicPayload, addTopic, getTopics } from '@/entities/Topics';
import { useSelector } from 'react-redux';

export const AddTopicForm = ({ closeModal }: ICommonFormProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [mainError, setMainError] = useState<string | null>();
  const { topicAuthor } = useSelector(getTopics);

  const handleSubmit = (values: TInputValues<typeof ADD_TOPIC_INPUTS>): void => {
    const title = values[EInputNames.Title];
    const content = values[EInputNames.Content];

    const payload: TAddTopicPayload = {
      title,
      content,
      authorId: String(topicAuthor?.id),
    };

    dispatch(addTopic(payload)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        closeModal();
        alert('Topic added!');
      } else {
        setMainError(TEXTS.unknownError);
      }
    });
  };

  return (
    <Form
      inputs={ADD_TOPIC_INPUTS}
      validationSchema={addTopicSchema}
      onSubmit={handleSubmit}
      mainError={mainError}
    >
      <div className={classes.buttonsContainer}>
        <Button type="primary" htmlType="submit">
          {TEXTS.submitButton}
        </Button>
      </div>
    </Form>
  );
};
