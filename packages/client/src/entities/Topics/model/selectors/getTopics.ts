import { ITopicsSchema } from '../types';

export const getTopics = (state: IStateSchema): ITopicsSchema => state.topics;
