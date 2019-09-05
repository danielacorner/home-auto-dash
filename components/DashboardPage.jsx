import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { animated, useTrail } from 'react-spring/native';
import { ControlCard } from './ControlCard';
import { CONTROLS } from '../constants';

const DashStyles = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

// TODO: create express server skeleton

// ? once we have the API data, create a type map for custom controls
export const DashboardPage = ({ dataArray, currentTheme }) => {
  const AnimatedDashStyles = animated(DashStyles);
  // useState for mounted, setMounted (false)
  const [mounted, setMounted] = useState(false);

  // useEffect, deps [] (useMount) => setMounted(true)

  // cDM cDU cWU                // (cWM is DEPRECATED!!!)
  useEffect(() => {
    if (dataArray.length > 0) {
      // if we mount BEFORE we have data,
      // the transform is pre-applied
      // so we wait for data first...
      // deps: [dataArray] = "re-run every time dataArray changes"
      setMounted(!mounted);
    }
    return () => {
      // cleanup
    };
  }, [dataArray]);

  // https://www.react-spring.io/docs/hooks/use-trail
  // DONE TODO: useTrail
  const transformsTrail = useTrail(dataArray.length, {
    scale: mounted ? 1 : 0,
    translateY: mounted ? 0 : -150,
    config: {
      tension: 350,
      clamp: false,
      friction: 26,
      mass: 1.5,
    },
  });
  // const stylesTrail = useTrail(dataArray.length, { })

  return (
    <AnimatedDashStyles>
      {transformsTrail.map((styleProps, idx) => {
        const type = CONTROLS.BUTTON;
        return (
          // make a function to call on control ... onChange, onPress
          <ControlCard
            key={dataArray[idx].id}
            type={type}
            text={dataArray[idx].name}
            currentTheme={currentTheme}
            styleProps={styleProps}
            icon={dataArray[idx].icon}
          />
        );
      })}
    </AnimatedDashStyles>
  );
};
