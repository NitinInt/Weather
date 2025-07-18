import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import {WithDisplayName} from '@Weather/components/types';

import {createStyledList} from '../../../utils/type';

export type DropDownPropsType<T extends WithDisplayName> = {
  filteredResults: T[];
  handleSelect: (item: T) => void;
};

const DropDownList = <T extends WithDisplayName>({
  filteredResults,
  handleSelect,
}: DropDownPropsType<T>) => {
  const List = createStyledList<T>();
  return (
    <DropdownArea>
      <List
        data={filteredResults}
        keyExtractor={item => JSON.stringify(item)}
        renderItem={({item}: {item: T}) => (
          <DropdownItem
            onPress={() => {
              handleSelect(item);
            }}>
            <DropdownText>{item.displayName}</DropdownText>
          </DropdownItem>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </DropdownArea>
  );
};
export default memo(DropDownList) as unknown as typeof DropDownList;

const DropdownArea = styled.View`
  background-color: transparent;
  flex: 1;
  width: 100%;
  height: 800px;
  padding: 10px 0;
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 16px;
`;

const DropdownText = styled.Text`
  color: white;
  font-size: 16px;
`;
