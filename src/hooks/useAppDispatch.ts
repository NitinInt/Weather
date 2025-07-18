import {useDispatch} from 'react-redux';

import {AppDispatch} from '@Weather/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
