import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, Button } from "react-native";
import { THEMES } from "../constants";
import { Icon } from "react-native-elements";
import { animated, useSpring } from "react-spring/native";

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

const Card = ({
  type = CONTROLS.BUTTON,
  onPress,
  text,
  currentTheme,
  isEntered
}) => {
  const springDownOnEnter = useSpring({
    transform: `translateY: ${!isEntered ? 100 : 0}`
  });
  const AnimatedCard = animated(CardStyles);
  return (
    <AnimatedCard
      style={{
        backgroundColor: THEMES[currentTheme].CARD_BACKGROUND,
        ...springDownOnEnter
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
  // TODO: make a sweet spring animation when they load! ♨

  const [enteredCardIdxs, setEnteredCardIdxs] = useState([]);

  fetch("https://my-json-server.typicode.com/elomt/demo/components")
    .then(data => data.json())
    .then(data => {
      // whether you think you can,
      // or you think you can't,
      // you're right

      console.log("🌈: DashboardPage -> data", data);
    });

  // TODO: set up context
  // const {currentTheme} = useContext
  useEffect(() => {
    setTimeout(() => {
      setEnteredCardIdxs([0, 1, 2, 3]);
    }, 500);
    // dataArray.forEach((card, idx) => {
    //   setTimeout(() => {
    //     setEnteredCardIdxs([...enteredCardIdxs, idx]);
    //   }, idx * 1000);
    // });
  }, []);

  return (
    <DashStyles>
      {dataArray.map(({ id, text }, idx) => {
        console.log("TCL: DashboardPage -> text", text);
        const onPress = () => console.log("HEY");
        const type = CONTROLS.BUTTON;
        return (
          // make a function to call on control ... onChange, onPress
          <Card
            key={id}
            {...{
              type,
              onPress,
              text,
              currentTheme,
              isEntered: enteredCardIdxs.includes(idx)
            }}
          />
        );
      })}
    </DashStyles>
  );
};
