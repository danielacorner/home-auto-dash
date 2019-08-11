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
    setEntered(true);
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
  const { entered, springVisible } = useSpringVisible();

  // useTrail
  // https://www.react-spring.io/docs/hooks/use-trail

  const AnimatedCard = animated(CardStyles);
  return (
    <AnimatedCard
      style={{
        backgroundColor: THEMES[currentTheme].CARD_BACKGROUND,
        transform: [springDownTranslateOnEnter]
      }}
    >
      <Icon name="highlight" size={64} />
      <Text>{text}</Text>
      <CustomControl
        className="control"
        {...{ type, onPress, title: "howdydo" }}
      />
    </AnimatedCard>
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
  return (
    <AnimatedDashStyles style={springVisible}>
      {trail.map((props, idx) => {
        const onPress = () => console.log("HEY");
        const type = CONTROLS.BUTTON;
        return (
          // make a function to call on control ... onChange, onPress
          <Card
            key={dataArray[idx].id}
            {...{
              type,
              onPress,
              text: dataArray[idx].text,
              currentTheme
            }}
          />
        );
      })}
    </AnimatedDashStyles>
  );
};
