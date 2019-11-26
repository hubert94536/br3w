
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import BluetoothSerial from 'react-native-bluetooth-serial';
import MultiSwitch from '../MultiSwitch';
import ArduinoHelper from '../utils/ArduinoHelper'
  // Create CustomButton to use later
  export const CustomButton = (props) => {

    const { style = {}, onPress } = props;
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style]}>
          <SettingsImage source={require('../assets/images/settings.png')} />
        </TouchableOpacity>
    );
};


export default class Display extends React.Component {
    constructor(props) {
      super(props);
    }

    _storeData = async () => {
      try {
        await AsyncStorage.setItem('temperature', this.state.temperature);
      } catch (error) {
        console.log(error);
        console.error("Failed to persist temperature");
      }
      try {
        await AsyncStorage.setItem('amount', this.state.amount);
      } catch (error) {
        console.log(error);
        console.error("Failed to persist amount");
      }
      try {
        await AsyncStorage.setItem('roast', JSON.stringify(this.state.roast));
      } catch (error) {
        console.log(error);
        console.error("Failed to persist strength");
      }
    }

    render() {
      const { navigation } = this.props;
      const {navigate} = navigation;
      //move this to progress page
      m_temperature = navigation.getParam('temperature', 92)
      m_amount = navigation.getParam('amount', 8)
      m_isLight = navigation.getParam('roast', true)
      
      BluetoothSerial.readFromDevice()
        .then((res) => {
          console.log("read from arduino" + res);
        })
        
        return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
              {/* <Header /> */}
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}

              <View style={styles.body}>
              {/* Create a SettingsButton */}
              {/* <SettingsButton
                title=""
                onPress={() => {
                    console.log("Navigate to settings")
                    navigate('Settings', {temperature: m_temperature, amount: m_amount, roast: m_isLight})}}
                >
                </SettingsButton> */}

                <TitleText>BR3W</TitleText>

                <View style={styles.bodyText}>
                  <TouchableOpacity
                    onPress={() => {
                      navigate('temperatureScreen', {temperature: m_temperature, roast: m_isLight, amount: m_amount})
                    }}
                    >
                    <DefaultText>Temperature: {m_temperature + " \u00B0C" } </DefaultText>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => {
                      navigate('amountScreen', {temperature: m_temperature, amount: m_amount, roast: m_isLight})
                    }}
                    >
                    <DefaultText>Amount of Coffee: {m_amount} oz</DefaultText>
                  </TouchableOpacity>

                  <MultiSwitch
                    currentStatus={'Open'}
                    disableScroll={value => {
                      console.log('scrollEnabled', value);
                      this.scrollView.setNativeProps({
                          scrollEnabled: value
                      });
                   }}
                    isParentScrollEnabled={true}
                    onStatusChanged={text => {
                      text == "Light" ? m_islight = true : m_isLight = false;
                    }}
                  />
                </View>
                <TouchableOpacity
                title="start"
                onPress={() => {
                  BluetoothSerial.write(ArduinoHelper.send_value(m_temperature, m_amount, m_isLight))
                  .then(() => {
                      console.log("Start coffee, sent ", ArduinoHelper.send_value(m_temperature, m_amount, m_isLight))
                  {/*console.log("isLight: ", this.state.isLight) */}
                  {/* navigate('progressBar', {temperature: this.state.temperature, amount: this.state.amount, time_rem: this.state.time_rem})*/}
                      navigate('progressBar', {temperature: m_temperature, amount: m_amount, roast: m_isLight})
                  })
                }}
                >
                  <StartImage source={require('../../br3w/assets/images/coffeeArt.png')} />
                </TouchableOpacity>
              </View>
          </SafeAreaView>
        </>
      );
    };
  };

  //Styled Components
  // Hierarchy Summary:
  //     Text > DefaultText > TitleText
  //     CustomButton > SettingsButton
  const DefaultText = styled(Text)`
    color: #562f29;
    font-size: 24;
    font-family: Futura;
    margin: 20px 0px;
    align-self: center;
    `
  const TitleText = styled(DefaultText)`
    color: #bc846b;
    font-size: 80;
    position: relative;
  `
  const SettingsImage = styled(Image)`
     width: 75px;
     height: 75px;
     align-self: center;
  `
  const SettingsButton = styled(CustomButton)`
      display: flex;
      height: 75px;
      width: 75px;
      border-radius: 25px;
      margin-top: 15px;
      align-self: flex-end;
      margin-right: 15px;
      opacity: 1;
  `
  const StartImage = styled(Image)`
   width: 75px;
   height: 75px;
   align-self: center;
  `

  const styles = StyleSheet.create({
    engine: {
      position: 'absolute',
      right: 0,
    },

    body: {
      backgroundColor: "#fffff4",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },

    bodyText: {
      display: "flex",
      marginBottom: 20,
    },

    button: {
      display: 'flex',
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0,
    },

    textButton: {
      display: 'flex',
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Cochin",
    },

    title: {
      fontSize: 96,
      color: "#ffffff",
      fontWeight: "normal",
    },

    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },

    highlight: {
      fontWeight: '700',
    },

    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },

    container: {
      display: "flex",
      flex: 1,
      fontFamily: "breve2",
    },
  });
