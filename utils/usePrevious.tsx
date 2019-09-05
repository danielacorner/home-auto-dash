import { useRef, useEffect } from 'react';

// usePrevious -- instead of previous props

// https://reactjs.org/docs/hooks-faq.html
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// TODO:
// react-spring transition
// https://www.react-spring.io/docs/hooks/use-transition
// "toggle between components"
//
// TODO: try to get something with a previous state transitioning
// const [toggle, set] = useState(false)
// const transitions = useTransition(toggle, null, {
//   from: { position: 'absolute', opacity: 0 },
//   enter: { opacity: 1 },
//   leave: { opacity: 0 },
// })
// return transitions.map(({ item, key, props }) =>
//   item
//     ? <animated.div style={props}>😄</animated.div>
//     : <animated.div style={props}>🤪</animated.div>
// )
