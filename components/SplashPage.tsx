import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator';
import { DashboardPage } from './DashboardPage';
import { THEMES, API_TYPES } from '../constants';

const SplashStyles = styled(View)`
  height: 100vh;
  display: flex;
  width: 100%;
  justify-content: center;
`;

type ApiDataType = {
  id: number;
  type: keyof typeof API_TYPES;
  name: string;
  icon: string;
  state: string;
};

const SplashPage = ({ currentTheme }) => {
  const [data, setData] = useState([] as ApiDataType[]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data, set data, set loading
  // cWM -- for layout effect (to prevent the flickers)
  // if you're changing the layout / styles
  // useLayoutEffect

  // cDU, cDM, cWU
  useEffect(() => {
    // fetch from dummy API
    fetch('https://my-json-server.typicode.com/elomt/demo/components')
      .then(data => data.json())
      .then(data => {
        console.log('⚡🚨: SplashPage -> data', data);
        setData(data);
      });
    // get a response from the API?
    // e.g. is the thing on or off
    setLoading(false);
    return () => {
      // cleanup / teardown / unmount
    };
  }, []); // empty array means no dependencies = only runs once (on mount)
  // no dependencies array = cDU (runs every time)

  return (
    <SplashStyles
      style={{ backgroundColor: THEMES[currentTheme].PAGE_BACKGROUND }}
      data-styled="SplashStyles"
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        // DONE!?
        <DashboardPage dataArray={data} currentTheme={currentTheme} />
      )}
    </SplashStyles>
  );
};

export default SplashPage;
