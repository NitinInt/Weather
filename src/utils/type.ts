import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

export function createStyledList<T>() {
  return styled(FlatList as new (props: FlatListProps<T>) => FlatList<T>)``;
}
