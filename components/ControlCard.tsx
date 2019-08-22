import styled from 'styled-components/native';
import { View, Text, TouchableHighlight } from 'react-native';
import { CONTROLS, ICON_NAME_MAP } from '../constants';
import { animated, useSpring } from 'react-spring/native';
import { Icon } from 'react-native-elements';
import React, { useState } from 'react';

const mapObjectToArrayOfObjects = obj =>
  Object.entries(obj).map(([key, val]) => {
    return { [key]: val };
  });

// TOGGLE INDICATOR
const TOGGLE_WIDTH = 150;
const ToggleContainer = styled(View)`
  overflow: hidden;
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

type ToggleIndicatorProps = { active: boolean };

export const ToggleIndicator = ({ active }: ToggleIndicatorProps) => {
  const springLeftRight = useSpring({
    translateX: active ? TOGGLE_WIDTH * 0.5 : -TOGGLE_WIDTH * 0.5,
  });

  return (
    <ToggleContainer>
      <FlexStyles
        style={{ transform: mapObjectToArrayOfObjects(springLeftRight) }}
      >
        <TextOn>On</TextOn>
        <MiddleSwitch />
        <TextOff> Off</TextOff>
      </FlexStyles>
    </ToggleContainer>
  );
};

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
  background-color: hsla(0, 0%, 40%, 1);
`;

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

  const [isBeingPressed, setIsBeingPressed] = useState(false);
  const shrinkOnPress = useSpring({
    scale: isBeingPressed ? 1 : 0,
    config: { tension: 125, clamp: true, mass: 0.5, friction: 10 },
  });

  const handlePress = () => {
    setIsBeingPressed(!isBeingPressed);

    setActive(!active);

    // setTimeout(() => {
    //   setIsBeingPressed(false);
    // }, 100);

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
    <TouchableHighlight onPress={handlePress} underlayColor={'hsla(0,0%,0%,0)'}>
      <AnimatedCard
        style={{
          transform: !isBeingPressed
            ? mapObjectToArrayOfObjects(styleProps)
            : [
                {
                  // https://www.react-spring.io/docs/hooks/basics "View Interpolation"
                  scale: shrinkOnPress.scale.interpolate((scaleAmt: number) => {
                    // take a value between 0 and 1
                    // 0 -> 1
                    // return a value between 1, 0.95, 1

                    // -0.5 -> 0 -> 0.5
                    const scaleLessHalf = scaleAmt - 0.5;

                    // 0.5 -> 0 -> 0.5
                    const absHalfScale = Math.abs(scaleLessHalf);

                    // 1 -> 0 -> 1
                    const step1 = absHalfScale / 0.5;

                    // 0.05 -> 0 -> 0.05
                    const step2 = step1 * 0.05;

                    // 1 -> 0.95 -> 1
                    const step3 = step2 + 0.95;

                    return step3;
                  }),
                },
              ],
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
        <ToggleIndicator active={active} />
      </AnimatedCard>
    </TouchableHighlight>
  );
};
