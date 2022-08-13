import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/redux-store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecor: TypedUseSelectorHook<RootState> = useSelector;
