import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { HeaderBar, Loading } from '../../../../components';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JamOperasional = ({ navigation }) => {
  const [visibleSeninOpen, setVisibleSeninOpen] = useState(false);
  const onDismissSeninOpen = useCallback(() => {
    setVisibleSeninOpen(false);
  }, [setVisibleSeninOpen]);

  const [visibleSeninClose, setVisibleSeninClose] = useState(false);
  const onDismissSeninClose = useCallback(() => {
    setVisibleSeninClose(false);
  }, [setVisibleSeninClose]);

  const [visibleSabtuOpen, setVisibleSabtuOpen] = useState(false);
  const onDismissSabtuOpen = useCallback(() => {
    setVisibleSabtuOpen(false);
  }, [setVisibleSabtuOpen]);

  const [visibleSabtuClose, setVisibleSabtuClose] = useState(false);
  const onDismissSabtuClose = useCallback(() => {
    setVisibleSabtuClose(false);
  }, [setVisibleSabtuClose]);

  const [loading, setLoading] = useState(false)
  const [senin, setSenin] = useState({
    openHour: '00',
    openMinute: '00',
    closeHour: '00',
    closeMinute: '00',
  });
  const [sabtu, setSabtu] = useState({
    openHour: '00',
    openMinute: '00',
    closeHour: '00',
    closeMinute: '00',
  })

  const onConfirmSeninOpen = useCallback(
    ({ hours, minutes }) => {
      // hours = hours < 10 ? `0${hours}` : hours
      // minutes = minutes < 10 ? `0${minutes}` : minutes
      setSenin({
        ...senin,
        openHour: hours,
        openMinute: minutes
      })
      console.log(senin)
      setVisibleSeninOpen(false);
      console.log({ hours, minutes }, 'senin open');
    },
    [setVisibleSeninOpen],
  );

  const onConfirmSeninClose = useCallback(
    ({ hours, minutes }) => {
      // hours = hours < 10 ? `0${hours}` : hours
      // minutes = minutes < 10 ? `0${minutes}` : minutes
      setSenin({
        ...senin,
        closeHour: hours,
        closeMinute: minutes
      })
      console.log(senin)
      setVisibleSeninClose(false);
      console.log({ hours, minutes }, 'senin close');
    },
    [setVisibleSeninClose],
  );

  const onConfirmSabtuOpen = useCallback(
    ({ hours, minutes }) => {
      // hours = hours < 10 ? `0${hours}` : hours
      // minutes = minutes < 10 ? `0${minutes}` : minutes
      setSabtu({
        ...sabtu,
        openHour: hours,
        openMinute: minutes
      })
      console.log(sabtu)
      setVisibleSabtuOpen(false);
      console.log({ hours, minutes }, 'sabtu open');
    },
    [setVisibleSabtuOpen],
  );

  const onConfirmSabtuClose = useCallback(
    ({ hours, minutes }) => {
      // hours = hours < 10 ? `0${hours}` : hours
      // minutes = minutes < 10 ? `0${minutes}` : minutes
      setSabtu({
        ...sabtu,
        closeHour: hours,
        closeMinute: minutes
      })
      console.log(sabtu)
      setVisibleSabtuClose(false);
      console.log({ hours, minutes }, 'sabtu close');
    },
    [setVisibleSabtuClose],
  );

  const fetchOperationalHourApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/operationalhour`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setSenin({
          openHour: responseJson.senin.open.substring(0, 2),
          openMinute: responseJson.senin.open.substring(3, 5),
          closeHour: responseJson.senin.close.substring(0, 2),
          closeMinute: responseJson.senin.close.substring(3, 5),
        })
        setSabtu({
          openHour: responseJson.sabtu.open.substring(0, 2),
          openMinute: responseJson.sabtu.open.substring(3, 5),
          closeHour: responseJson.sabtu.close.substring(0, 2),
          closeMinute: responseJson.sabtu.close.substring(3, 5),
        })
        setLoading(false)
      });
  }

  useEffect(() => {
    setLoading(true)
    fetchOperationalHourApi()
  }, [])

  return (
    loading ? <Loading />
      : <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderBar
          navigation={navigation}
          screenName="KelolaOutlet"
          title="Jam Operasional"
        />
        <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Senin - Jumat</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleSeninOpen}
                onDismiss={onDismissSeninOpen}
                onConfirm={onConfirmSeninOpen}
                hours={senin.openHour} // default: current hours
                minutes={senin.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleSeninOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {senin.openHour} : {senin.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleSeninClose}
                onDismiss={onDismissSeninClose}
                onConfirm={onConfirmSeninClose}
                hours={senin.closeHour} // default: current hours
                minutes={senin.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleSeninClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {senin.closeHour} : {senin.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sabtu Minggu */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Sabtu - Minggu</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleSabtuOpen}
                onDismiss={onDismissSabtuOpen}
                onConfirm={onConfirmSabtuOpen}
                hours={sabtu.openHour} // default: current hours
                minutes={sabtu.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleSabtuOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {sabtu.openHour} : {sabtu.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleSabtuClose}
                onDismiss={onDismissSabtuClose}
                onConfirm={onConfirmSabtuClose}
                hours={sabtu.closeHour} // default: current hours
                minutes={sabtu.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleSabtuClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {sabtu.closeHour} : {sabtu.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('simpan')}>
            <Text style={styles.textLogin}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

export default JamOperasional;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    marginTop: 10,
  },
  inputTime: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
  },
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
