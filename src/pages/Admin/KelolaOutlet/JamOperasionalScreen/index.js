import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { HeaderBar, Loading } from '../../../../components';
import SIZES, { API, ColorPrimary } from '../../../../utils/constanta';
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
  const [seninOpen, setSeninOpen] = useState({
    openHour: '00',
    openMinute: '00',
  })
  const [seninClose, setSeninClose] = useState({
    closeHour: '00',
    closeMinute: '00',
  });
  const [sabtuOpen, setSabtuOpen] = useState({
    openHour: '00',
    openMinute: '00',
  })
  const [sabtuClose, setSabtuClose] = useState({
    closeHour: '00',
    closeMinute: '00',
  })

  const onConfirmSeninOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setSeninOpen({
        ...seninOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(seninOpen)
      setVisibleSeninOpen(false);
      console.log({ hours, minutes }, 'senin open');
    },
    [setVisibleSeninOpen],
  );

  const onConfirmSeninClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setSeninClose({
        ...seninClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(seninClose)
      setVisibleSeninClose(false);
      console.log({ hours, minutes }, 'senin close');
    },
    [setVisibleSeninClose],
  );

  const onConfirmSabtuOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setSabtuOpen({
        ...sabtuOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(sabtuOpen)
      setVisibleSabtuOpen(false);
      console.log({ hours, minutes }, 'sabtu open');
    },
    [setVisibleSabtuOpen],
  );

  const onConfirmSabtuClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setSabtuClose({
        ...sabtuClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(sabtuClose)
      setVisibleSabtuClose(false);
      console.log({ hours, minutes }, 'sabtu close');
    },
    [setVisibleSabtuClose],
  );

  const fetchOperationalHourApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/operationalhour`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setSeninOpen({
          openHour: responseJson.senin.open.substring(0, 2),
          openMinute: responseJson.senin.open.substring(3, 5),
        })
        setSeninClose({
          closeHour: responseJson.senin.close.substring(0, 2),
          closeMinute: responseJson.senin.close.substring(3, 5),
        })
        setSabtuOpen({
          openHour: responseJson.sabtu.open.substring(0, 2),
          openMinute: responseJson.sabtu.open.substring(3, 5),
        })
        setSabtuClose({
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
                hours={seninOpen.openHour} // default: current hours
                minutes={seninOpen.openMinute} // default: current minutes
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
                  {seninOpen.openHour} : {seninOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleSeninClose}
                onDismiss={onDismissSeninClose}
                onConfirm={onConfirmSeninClose}
                hours={seninClose.closeHour} // default: current hours
                minutes={seninClose.closeMinute} // default: current minutes
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
                  {seninClose.closeHour} : {seninClose.closeMinute}{' '}
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
                hours={sabtuOpen.openHour} // default: current hours
                minutes={sabtuOpen.openMinute} // default: current minutes
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
                  {sabtuOpen.openHour} : {sabtuOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleSabtuClose}
                onDismiss={onDismissSabtuClose}
                onConfirm={onConfirmSabtuClose}
                hours={sabtuClose.closeHour} // default: current hours
                minutes={sabtuClose.closeMinute} // default: current minutes
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
                  {sabtuClose.closeHour} : {sabtuClose.closeMinute}{' '}
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
