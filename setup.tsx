import {Text, Platform, StyleSheet} from 'react-native';

declare global {
  namespace NodeJS {
    interface Global {
      __ANDROID__: boolean;
      __IOS__: boolean;
      __WEB__: boolean;
    }
  }
}

/** Platform Select start */
if (Platform.OS === 'android') {
  global.__ANDROID__ = true;
  global.__IOS__ = false;
  global.__WEB__ = false;
} else if (Platform.OS === 'ios') {
  global.__IOS__ = true;
  global.__ANDROID__ = false;
  global.__WEB__ = false;
} else {
  global.__WEB__ = true;
  global.__IOS__ = false;
  global.__ANDROID__ = false;
}
/** Platform Select end */

/** Text Global start*/
if (global.__ANDROID__) {
  const globalText = StyleSheet.create({
    textStyle: {fontFamily: '', color: '#666666'},
  });
  // @ts-ignore
  const sourceRender = Text.render;
  // @ts-ignore
  Text.render = render = (props, ref) => {
    return sourceRender.apply(this, [
      {...props, style: [globalText.textStyle, props.style]},
      ref,
    ]);
  };
}
/** Text Global end*/
