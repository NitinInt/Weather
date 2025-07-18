import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {RootState} from '@Weather/store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
