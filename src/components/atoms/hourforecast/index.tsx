import styled from 'styled-components/native';

type PropsType = {
  time: string;
  icon: string;
  temperature: string;
};

const HourForecast = ({time, icon, temperature}: PropsType) => {
  return (
    <HourBlock>
      <HourLabel>{time}</HourLabel>
      <Icon>{icon}</Icon>
      <HourTemp>{temperature}</HourTemp>
    </HourBlock>
  );
};

export default HourForecast;

const HourBlock = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const HourLabel = styled.Text`
  color: white;
`;

const Icon = styled.Text`
  font-size: 24px;
  margin: 4px 0;
`;

const HourTemp = styled.Text`
  color: white;
`;
