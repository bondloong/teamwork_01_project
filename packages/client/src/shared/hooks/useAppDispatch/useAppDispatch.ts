import { AppDispatch } from '@/app';
import { useDispatch } from 'react-redux';

// Здесь нарушение принципа FSD: shared импортирует из app
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
