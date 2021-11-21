import React, {useState, useCallback} from 'react';
import {SafeAreaView, TouchableOpacity, View, StyleSheet} from 'react-native';
import {HeaderBar} from '../../../../components';

import {Button, Text} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';
import {ThemeProvider} from '@react-navigation/native';
import SIZES, { ColorPrimary } from '../../../../utils/constanta';

const JamOperasional = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  const onConfirm = useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      console.log({hours, minutes});
      setHours(hours);
      setMinutes(minutes);
    },
    [setVisible],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaOutlet"
        title="Jam Operasional"
      />
      <View style={{alignItems: 'center', paddingHorizontal: 16}}>
        <View style={styles.wrapper}>
          <Text>Senin - Jumat</Text>
          <View>
            <Text>Jam Buka</Text>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12} // default: current hours
              minutes={14} // default: current minutes
              label="Pilih Jam" // optional, default 'Select time'
              cancelLabel="Cancel" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              locale="en" // optional, default is automically detected by your system
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.inputTime}>
              <Text>
                {hours} : {minutes}{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Jam Tutup</Text>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12} // default: current hours
              minutes={14} // default: current minutes
              label="Pilih Jam" // optional, default 'Select time'
              cancelLabel="Cancel" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              locale="en" // optional, default is automically detected by your system
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.inputTime}>
              <Text>
                {hours} : {minutes}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
{/* Sabtu Minggu */}
        <View style={styles.wrapper}>
          <Text>Sabtu - Minggu</Text>
          <View>
            <Text>Jam Buka</Text>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12} // default: current hours
              minutes={14} // default: current minutes
              label="Pilih Jam" // optional, default 'Select time'
              cancelLabel="Cancel" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              locale="en" // optional, default is automically detected by your system
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.inputTime}>
              <Text>
                {hours} : {minutes}{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Jam Tutup</Text>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12} // default: current hours
              minutes={14} // default: current minutes
              label="Pilih Jam" // optional, default 'Select time'
              cancelLabel="Cancel" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              locale="en" // optional, default is automically detected by your system
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.inputTime}>
              <Text>
                {hours} : {minutes}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('simpan')}>
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
    borderRadius:8
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
    color:'white'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
