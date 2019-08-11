import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, Button } from "react-native";
import { THEMES } from "../constants";
import { Icon } from "react-native-elements";
import { animated, useSpring, useTrail } from "react-spring/native";

const useSpringVisible = () => {
  const [entered, setEntered] = useState(false);
  const springVisible = useSpring({ opacity: entered ? 1 : 0 });
  // set entered on mount
  useEffect(() => {
    if (!entered) {
      setEntered(true);
    }
  }, []);
  return { entered, springVisible };
};

const CustomControl = ({ onPress, title, className }) => (
  <Button {...{ title, onPress, className }} />
);

const CONTROLS = {
  BUTTON: "button"
};

const CardStyles = styled(View)`
  margin: 16px;
  width: 200;
  height: 200;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  .control {
  }
`;

const Card = ({ type = CONTROLS.BUTTON, onPress, text, currentTheme }) => {
  console.log("🌈: Card -> currentTheme", currentTheme);
  console.log("🌈: Card -> THEMES", THEMES);
  console.log("🌈: Card -> THEMES", THEMES[currentTheme]);
  return (
    <Card
      style={{
        backgroundColor: THEMES[currentTheme].CARD_BACKGROUND
      }}
    >
      <Icon name="highlight" size={64} />
      <Text>{text}</Text>
      <CustomControl
        className="control"
        {...{ type, onPress, title: "howdydo" }}
      />
    </Card>
  );
};
// text + icon + [control];

const DashStyles = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

// ? once we have the API data, create a type map for custom controls
export const DashboardPage = ({ dataArray, currentTheme }) => {
  fetch("https://my-json-server.typicode.com/elomt/demo/components")
    .then(data => data.json())
    .then(data => {
      // whether you think you can,
      // or you think you can't,
      // you're right

      console.log("🌈: DashboardPage -> data", data);
    });
  const { entered, springVisible } = useSpringVisible();

  const AnimatedDashStyles = animated(DashStyles);

  const trail = useTrail(dataArray.length, {
    translateY: entered ? 0 : -50
  });

  // useTrail
  // https://www.react-spring.io/docs/hooks/use-trail

  const AnimatedCardWrapper = animated(View);
  return (
    <AnimatedDashStyles style={springVisible}>
      {trail.map((translateAnimation, idx) => {
        const onPress = () => console.log("HEY");
        const type = CONTROLS.BUTTON;
        return (
          // make a function to call on control ... onChange, onPress
          <AnimatedCardWrapper
            key={dataArray[idx].id}
            style={{ transform: [translateAnimation] }}
          >
            <Card
              {...{
                type,
                onPress,
                text: dataArray[idx].text,
                currentTheme
              }}
            />
          </AnimatedCardWrapper>
        );
      })}
    </AnimatedDashStyles>
  );
};
