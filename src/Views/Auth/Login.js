import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from "react-native-phone-number-input";
import colors from '../../utils/colors';
import OTPInput from '../../Components/OTPInput';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [formattedValue, setFormattedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);
  const [isPinReady, setIsPinReady] = useState(false);



  // Handle the button press
  async function signInWithPhoneNumber() {
    if (phoneInput.current?.isValidNumber(phoneNumber)) {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      console.log(confirmation);
      setConfirm(confirmation);
      setLoading(false);
    } else {
      ToastAndroid.show(`${formattedValue} Entered phone number is not valid`, ToastAndroid.LONG);
    }
  }

  async function confirmCode() {
    try {
      setLoading(true);
      await confirm.confirm(code);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(`Error :- ${error?.message}`, ToastAndroid.LONG)
      console.log('Invalid code.', error);
    }
  }
  return (
    <View style={styles.main}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.title}>Lets sign you in</Text>
        <Text style={styles.subtitle}>Buy some products and get rewards</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="IN"
          layout="first"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          textInputProps={{
            keyboardType: "phone-pad"
          }}
          containerStyle={styles.phoneInput}
          textInputStyle={styles.phoneInput}
        />

        {!confirm && (
          <View style={{ marginVertical: 20, backgroundColor: colors[loading ? "textLightGrey" : "secondary"] }}>
            {loading ? <ActivityIndicator size={"large"} color={colors.primary} /> : <Button
              color={colors.secondary}
              title="Send OTP"
              disabled={!phoneInput.current?.isValidNumber(phoneNumber)}
              onPress={signInWithPhoneNumber}
            />}
          </View>
        )}
        {!!confirm && (
          <>
            <View style={{ marginTop: 20 }}>
              <OTPInput
                code={code}
                setCode={setCode}
                maximumLength={6}
                setIsPinReady={setIsPinReady}
              />
            </View>
            <View style={{ marginVertical: 20, backgroundColor: colors[loading ? "textLightGrey" : "secondary"] }}>
              {loading ? <ActivityIndicator size={"large"} color={colors.primary} /> : <Button
                color={colors.secondary}
                title="Verify OTP"
                disabled={!isPinReady}
                onPress={confirmCode}
              />}
            </View>
          </>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  phoneInput: {
    width: "100%",
    height: 50
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "bold",
    fontSize: 36
  },
  subtitle: {
    color: colors.textLightGrey,
    fontSize: 18
  }
});
