import styled from 'styled-components/native';
import { View, Button, Text } from 'react-native';
import { CONTROLS, API_URL, ICON_NAME_MAP } from '../constants';
import { animated, useSpring } from 'react-spring/native';
import { Icon } from 'react-native-elements';
import React, { useState } from 'react';

const CardStyles = styled(View)`
  margin: 16px;
  width: 200;
  height: 200;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const mapObjectToArrayOfObjects = obj =>
  Object.entries(obj).map(([key, val]) => {
    return { [key]: val };
  });

const LightDivStyles = styled(View)`
  width: 40;
  height: 10;
  border-radius: 16px;
  /* background-color: ${props => {
    return props.active ? 'hsla(57,95%,50%,1)' : 'hsla(0,0%,20%,1)';
  }}; */
`;

type ControlCardProps = {
  type: string;
  controlName: string;
  text: string;
  icon: string;
  currentTheme: string;
  styleProps: any;
};
export const ControlCard = ({
  type = CONTROLS.BUTTON,
  controlName,
  text,
  icon,
  currentTheme,
  styleProps,
}: ControlCardProps) => {
  const AnimatedCard = animated(CardStyles);
  const AnimatedView = animated(View);
  const AnimatedLightDivStyles = animated(LightDivStyles);
  const [active, setActive] = useState(false);
  const lightStyles = useSpring({
    backgroundColor: active ? 'hsla(57,95%,50%,1)' : 'hsla(0,0%,20%,1)',
  });
  const transformGrow = useSpring({
    scale: active ? 1 : 0.8,
    config: { tension: 340 },
  });

  const handlePress = () => {
    setActive(!active);

    // https://csstriggers.com/

    // FLIP
    // First Last Invert Play

    // First: element.getBoundingClientRect() position in the page
    // Last: element.getBoundingClientRect()
    // Invert: transform: back to first position (invert)
    // add a CSS transition
    // Play: set transform: none;
  };

  return (
    <AnimatedCard
      style={{
        transform: mapObjectToArrayOfObjects(styleProps),
        // backgroundColor: THEMES[currentTheme].CARD_BACKGROUND,
      }}
    >
      <AnimatedLightDivStyles style={lightStyles} active={active} />
      <AnimatedView
        style={{
          transform: mapObjectToArrayOfObjects(transformGrow),
          // backgroundColor: THEMES[currentTheme].CARD_BACKGROUND,
        }}
      >
        <Icon name={ICON_NAME_MAP[icon]} size={72} />
      </AnimatedView>
      <Text>{text}</Text>
      <Button
        color={active ? 'hsla(0,50%,50%,1)' : ''}
        onPress={handlePress}
        title={active ? 'ON' : 'OFF'}
      />
    </AnimatedCard>
  );
};
