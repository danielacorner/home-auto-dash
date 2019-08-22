import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import React from 'react';
import { animated, useSpring } from 'react-spring/native';
import { mapObjectToArrayOfObjects } from './ControlCard';

// TOGGLE INDICATOR
const TOGGLE_WIDTH = 150;
const ToggleContainer = styled(View)`
  overflow: hidden;
  background: white;
  border-radius: 4px;
  height: 40px;
  width: ${TOGGLE_WIDTH / 2}px;
  margin-top: 1em;
`;
const FlexStyles = styled(View)`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const MiddleSwitch = styled(View)`
  height: 100%;
  min-width: ${TOGGLE_WIDTH * 0.2}px;
  background: hsla(0, 0%, 97%, 1);
  border-radius: 4px;
  box-shadow: 0px 0px 7px #00000057;
`;
const TextOn = styled(Text)`
  min-width: ${TOGGLE_WIDTH * 0.4}px;
  background-color: hsla(120, 70%, 65%, 1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextOff = styled(Text)`
  min-width: ${TOGGLE_WIDTH * 0.4}px;
  background-color: hsla(0, 0%, 75%, 1);
  color: hsla(0, 0%, 10%, 1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedFlexStyles = animated(FlexStyles);

type ToggleIndicatorProps = { active: boolean };

export const ToggleIndicator = ({ active }: ToggleIndicatorProps) => {
  const springLeftRight = useSpring({
    translateX: active ? TOGGLE_WIDTH * 0.25 : -TOGGLE_WIDTH * 0.25,
  });

  return (
    <ToggleContainer>
      <AnimatedFlexStyles style={{ transform: [springLeftRight] }}>
        <TextOn>On</TextOn>
        <MiddleSwitch />
        <TextOff> Off</TextOff>
      </AnimatedFlexStyles>
    </ToggleContainer>
  );
};
