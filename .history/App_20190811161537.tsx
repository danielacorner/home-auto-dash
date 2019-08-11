import React, { useState, useEffect } from 'react';
import SplashPage from './components/SplashPage';
import { AppLoading, Font } from 'expo';

// TODO: make a styled-components theme-switcher (light, dark)
const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const App = () => {
  const [state, setState] = useState({
    theme: null, // ? how do we use this
    isReady: false,
    currentTheme: THEMES.DARK,
  });
  return <SplashPage {...{ currentTheme: state.currentTheme }} />;
};

export default App;
