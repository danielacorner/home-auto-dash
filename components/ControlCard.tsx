import styled from 'styled-components/native';
import { View, Text, TouchableHighlight } from 'react-native';
import { animated, useSpring } from 'react-spring/native';
import { Icon } from 'react-native-elements';
import React, { useState } from 'react';
import { ToggleIndicator, TOGGLE_WIDTH } from './ToggleIndicator';
import { postData } from '../utils/apiCalls';
import { API_TYPES } from '../constants';

export const mapObjectToArrayOfObjects = obj =>
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
const AnimatedView = animated(View);
const AnimatedLightDivStyles = animated(LightDivStyles);
const AnimatedCard = animated(CardStyles);

type ControlCardProps = {
  type: keyof typeof API_TYPES;
  text: string;
  currentTheme: string;
  styleProps: any;
};

export const ControlCard = ({
  type = 'bulb',
  text,
  currentTheme,
  styleProps,
}: ControlCardProps) => {
  const [active, setActive] = useState(false);
  const [isBeingPressed, setIsBeingPressed] = useState(false);

  const {
    // TODO: put springs in relevant components
    springShrinkOnPress,
    springLightStyles,
    springTransformGrow,
    springLeftRight,
  } = getSprings(active, isBeingPressed);

  const handlePress = async () => {
    setIsBeingPressed(!isBeingPressed);
    setActive(!active);
    const REACT_APP_SERVER_URL = 'http://localhost:8080'; // TODO
    const response = await postData(`${REACT_APP_SERVER_URL}/lights`, {
      state: 'on',
    });
    console.log('⚡🚨: handlePress -> response', response);
  };

  return (
    <TouchableHighlight onPress={handlePress} underlayColor={'hsla(0,0%,0%,0)'}>
      <AnimatedCard
        style={{
          transform: !isBeingPressed
            ? mapObjectToArrayOfObjects(styleProps)
            : getTransformPushInOut(springShrinkOnPress),
          // backgroundColor: THEMES[currentTheme].CARD_BACKGROUND,
        }}
      >
        {type === 'bulb' ? (
          <LightSwitchCard
            springLightStyles={springLightStyles}
            active={active}
            springTransformGrow={springTransformGrow}
            type={type}
            text={text}
            springLeftRight={springLeftRight}
          />
        ) : type === 'speaker' ? (
          <SpeakerCard type={type} />
        ) : null}
      </AnimatedCard>
    </TouchableHighlight>
  );
};

// TODO: extract to file Cards.tsx

type SpeakerCardProps = { type: keyof typeof API_TYPES };

function SpeakerCard({ type }: SpeakerCardProps) {
  return <Icon name={API_TYPES[type].icon} size={72} />;
}

type LightSwitchCardProps = {
  springLightStyles: any;
  active: boolean;
  springTransformGrow: any;
  type: string;
  text: string;
  springLeftRight: any;
};

function LightSwitchCard({
  springLightStyles,
  active,
  springTransformGrow,
  type,
  text,
  springLeftRight,
}: LightSwitchCardProps) {
  return (
    <>
      <AnimatedLightDivStyles style={springLightStyles} active={active} />
      <AnimatedView
        style={{
          transform: mapObjectToArrayOfObjects(springTransformGrow),
        }}
      >
        <Icon name={API_TYPES[type].icon} size={72} />
      </AnimatedView>
      <Text> {text} </Text>
      <ToggleIndicator spring={springLeftRight} />
    </>
  );
}

function getSprings(active: boolean, isBeingPressed: boolean) {
  const springLightStyles = useSpring({
    backgroundColor: active ? 'hsla(57,95%,50%,1)' : 'hsla(0,0%,20%,1)',
  });
  const springTransformGrow = useSpring({
    scale: active ? 1 : 0.8,
    config: { tension: 340 },
  });
  const springShrinkOnPress = useSpring({
    scale: isBeingPressed ? 1 : 0,
    config: { tension: 125, clamp: true, mass: 0.5, friction: 10 },
  });
  const springLeftRight = useSpring({
    translateX: active ? TOGGLE_WIDTH * 0.25 : -TOGGLE_WIDTH * 0.25,
    config: { tension: 1000, mass: 2, friction: 10 },
  });
  return {
    springShrinkOnPress,
    springLightStyles,
    springTransformGrow,
    springLeftRight,
  };
}

function getTransformPushInOut(shrinkOnPress) {
  return [
    {
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
  ];
}
