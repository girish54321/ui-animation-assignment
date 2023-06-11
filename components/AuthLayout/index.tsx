import React, { useEffect } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import Icons from "../../assets/bottomTabIcons";

interface IProps {
  children: React.ReactNode;
  headerText: React.ReactNode;
  keyboardVerticalOffset?: number;
  headerHeight?: number;
}

export const AuthLayout = ({
  children,
  headerText,
  keyboardVerticalOffset,
  headerHeight,
}: IProps) => {
  const firstImageOpacity = useSharedValue(1);
  const secondImageOpacity = useSharedValue(0);
  const firstImageYOffset = useSharedValue(0);
  const secondImageYOffset = useSharedValue(0);
  const imageHight = useSharedValue(0);

  // const opacity = useSharedValue(450)
  const imageOneSize = useSharedValue(100)
  const imageTwoSize = useSharedValue(180)

  const imageOneStyle = useAnimatedStyle(() => {
    return {
      height: imageOneSize.value,
      width: imageOneSize.value,
      marginBottom: 25,
    }
  })
  const imageTwoStyle = useAnimatedStyle(() => {
    return {
      height: imageTwoSize.value,
      width: imageTwoSize.value,
    }
  })

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('Keyboard Shown');
      // console.log();
      imageOneSize.value = withTiming(100, {
        duration: 600,
      })
      imageTwoSize.value = withTiming(180, {
        duration: 600,
      })
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      console.log('Keyboard Hidden');

      imageOneSize.value = withTiming(80, {
        duration: 600,
      })
      imageTwoSize.value = withTiming(250, {
        duration: 600,
      })
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  const secondImageStyles = useAnimatedStyle(() => {
    return {
      opacity: secondImageOpacity.value,
      transform: [{ translateY: secondImageYOffset.value }],
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.Container}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.Container}>
          <Animated.View style={[styles.BannerContainer,]}>
            <ImageBackground
              source={require("../../assets/images/back_ground.png")}
              style={[styles.BannerImage, { alignItems: 'center' }]}
              resizeMode="stretch"
            >
              <Animated.View
                style={{ ...imageOneStyle, alignSelf: 'center', }}  >
                <Icons.BrandIcon height={100} width={100} />
              </Animated.View>
              <Animated.Image source={require('../../assets/images/login_group.png')}
                style={{ ...imageTwoStyle, alignSelf: 'center' }}
              />
              <Header {...{ headerHeight }}>{headerText}</Header>
            </ImageBackground>
          </Animated.View>
          <Animated.View
            style={[
              styles.BannerContainer,
              {
                position: "absolute",
                width: "100%",
              },
              secondImageStyles,
            ]}
          >
            <ImageBackground
              source={require("../../assets/images/login2.png")}
              style={styles.BannerImage}
              resizeMode="stretch"
            >
              <Header {...{ headerHeight }}>{headerText}</Header>
            </ImageBackground>
          </Animated.View>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

interface IHeaderProps {
  children: React.ReactNode;
  headerHeight?: number;
}

const Header: React.FC<IHeaderProps> = ({ headerHeight, children }) => {
  return (
    <View
      style={[
        styles.HeaderContainer,
        headerHeight && {
          top: headerHeight / 2,
        },
      ]}
    >
      <Text style={styles.HeaderText}>{children}</Text>
    </View>
  );
};
