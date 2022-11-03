import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Switch, ToastAndroid, View, StyleSheet } from 'react-native';
//import { Text } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { HeaderBar, Loading } from '../../../../components';
import SIZES, { API, ColorPrimary } from '../../../../utils/constanta';
import { globalStyles } from '../../../../utils/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JamOperasional = ({ navigation }) => {
  //senin
  const [visibleSeninOpen, setVisibleSeninOpen] = useState(false);
  const onDismissSeninOpen = useCallback(() => {
    setVisibleSeninOpen(false);
  }, [setVisibleSeninOpen]);

  const [visibleSeninClose, setVisibleSeninClose] = useState(false);
  const onDismissSeninClose = useCallback(() => {
    setVisibleSeninClose(false);
  }, [setVisibleSeninClose]);

  //selasa
  const [visibleSelasaOpen, setVisibleSelasaOpen] = useState(false);
  const onDismissSelasaOpen = useCallback(() => {
    setVisibleSelasaOpen(false);
  }, [setVisibleSelasaOpen]);

  const [visibleSelasaClose, setVisibleSelasaClose] = useState(false);
  const onDismissSelasaClose = useCallback(() => {
    setVisibleSelasaClose(false);
  }, [setVisibleSelasaClose]);

  //rabu
  const [visibleRabuOpen, setVisibleRabuOpen] = useState(false);
  const onDismissRabuOpen = useCallback(() => {
    setVisibleRabuOpen(false);
  }, [setVisibleRabuOpen]);

  const [visibleRabuClose, setVisibleRabuClose] = useState(false);
  const onDismissRabuClose = useCallback(() => {
    setVisibleRabuClose(false);
  }, [setVisibleRabuClose]);

  //Kamis
  const [visibleKamisOpen, setVisibleKamisOpen] = useState(false);
  const onDismissKamisOpen = useCallback(() => {
    setVisibleKamisOpen(false);
  }, [setVisibleKamisOpen]);

  const [visibleKamisClose, setVisibleKamisClose] = useState(false);
  const onDismissKamisClose = useCallback(() => {
    setVisibleKamisClose(false);
  }, [setVisibleKamisClose]);

  //Jumat
  const [visibleJumatOpen, setVisibleJumatOpen] = useState(false);
  const onDismissJumatOpen = useCallback(() => {
    setVisibleJumatOpen(false);
  }, [setVisibleJumatOpen]);

  const [visibleJumatClose, setVisibleJumatClose] = useState(false);
  const onDismissJumatClose = useCallback(() => {
    setVisibleJumatClose(false);
  }, [setVisibleJumatClose]);

  //sabtu
  const [visibleSabtuOpen, setVisibleSabtuOpen] = useState(false);
  const onDismissSabtuOpen = useCallback(() => {
    setVisibleSabtuOpen(false);
  }, [setVisibleSabtuOpen]);

  const [visibleSabtuClose, setVisibleSabtuClose] = useState(false);
  const onDismissSabtuClose = useCallback(() => {
    setVisibleSabtuClose(false);
  }, [setVisibleSabtuClose]);

  //Minggu
  const [visibleMingguOpen, setVisibleMingguOpen] = useState(false);
  const onDismissMingguOpen = useCallback(() => {
    setVisibleMingguOpen(false);
  }, [setVisibleMingguOpen]);

  const [visibleMingguClose, setVisibleMingguClose] = useState(false);
  const onDismissMingguClose = useCallback(() => {
    setVisibleMingguClose(false);
  }, [setVisibleMingguClose]);
  
  const [isOpen, setIsOpen] = useState();
  
  const [loading, setLoading] = useState(false)
  const [seninOpen, setSeninOpen] = useState({
    openHour: '00',
    openMinute: '00',
  })
  const [seninClose, setSeninClose] = useState({
    closeHour: '00',
    closeMinute: '00',
  });
  const [selasaOpen, setSelasaOpen] = useState({
    openHour: '00',
    openMinute: '00',
  })
  const [selasaClose, setSelasaClose] = useState({
    closeHour: '00',
    closeMinute: '00',
  });
  const [rabuOpen, setRabuOpen] = useState({
    openHour: '00',
    openMinute: '00',
  })
  const [rabuClose, setRabuClose] = useState({
    closeHour: '00',
    closeMinute: '00',
  });
  const [kamisOpen, setKamisOpen] = useState({
    openHour: '00',
    openMinute: '00',
   })
   const [kamisClose, setKamisClose] = useState({
    closeHour: '00',
    closeMinute: '00',
   });
   const [jumatOpen, setJumatOpen] = useState({
    openHour: '00',
    openMinute: '00',
   })
   const [jumatClose, setJumatClose] = useState({
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
  const [mingguOpen, setMingguOpen] = useState({
    openHour: '00',
    openMinute: '00',
   })
   const [mingguClose, setMingguClose] = useState({
    closeHour: '00',
    closeMinute: '00',
   });

  const editPressed = async () => {
    if (seninOpen && seninClose && sabtuClose && sabtuOpen) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`${API}/api/v1/owner/laundries/${laundryParse.id}/operationalhour`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senin_open: `${seninOpen.openHour}:${seninOpen.openMinute}`,
          senin_close: `${seninClose.closeHour}:${seninClose.closeMinute}`,
          
          selasa_open: `${selasaOpen.openHour}:${selasaOpen.openMinute}`,
          selasa_close: `${selasaClose.closeHour}:${selasaClose.closeMinute}`,

          rabu_open: `${rabuOpen.openHour}:${rabuOpen.openMinute}`,
          rabu_close: `${rabuClose.closeHour}:${rabuClose.closeMinute}`,

          kamis_open: `${kamisOpen.openHour}:${kamisOpen.openMinute}`,
          kamis_close: `${kamisClose.closeHour}:${kamisClose.closeMinute}`,
          
          jumat_open: `${jumatOpen.openHour}:${jumatOpen.openMinute}`,
          jumat_close: `${jumatClose.closeHour}:${jumatClose.closeMinute}`,

          sabtu_open: `${sabtuOpen.openHour}:${sabtuOpen.openMinute}`,
          sabtu_close: `${sabtuClose.closeHour}:${sabtuClose.closeMinute}`,

          minggu_open: `${mingguOpen.openHour}:${mingguOpen.openMinute}`,
          minggu_close: `${mingguClose.closeHour}:${mingguClose.closeMinute}`,

          condition: `${parseInt(isOpen)}`,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == null) {
            navigation.navigate('KelolaOutlet')
            ToastAndroid.show('Berhasil mengubah jam operasional', ToastAndroid.SHORT)
          }else{
            Alert.alert(responseJson.error);
          }
        });
    } else {
      Alert.alert('Masukkan semua field');
    }
  }


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

  const onConfirmSelasaOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setSelasaOpen({
        ...selasaOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(selasaOpen)
      setVisibleSelasaOpen(false);
      console.log({ hours, minutes }, 'selasa open');
    },
    [setVisibleSelasaOpen],
  );

  const onConfirmSelasaClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setSelasaClose({
        ...selasaClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(selasaClose)
      setVisibleSelasaClose(false);
      console.log({ hours, minutes }, 'selasa close');
    },
    [setVisibleSelasaClose],
  );

  const onConfirmRabuOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setRabuOpen({
        ...rabuOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(rabuOpen)
      setVisibleRabuOpen(false);
      console.log({ hours, minutes }, 'rabu open');
    },
    [setVisibleRabuOpen],
  );

  const onConfirmRabuClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setRabuClose({
        ...rabuClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(rabuClose)
      setVisibleRabuClose(false);
      console.log({ hours, minutes }, 'rabu close');
    },
    [setVisibleRabuClose],
  );

  const onConfirmKamisOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setKamisOpen({
        ...kamisOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(kamisOpen)
      setVisibleKamisOpen(false);
      console.log({ hours, minutes }, 'kamis open');
    },
    [setVisibleKamisOpen],
  );

  const onConfirmKamisClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setKamisClose({
        ...kamisClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(kamisClose)
      setVisibleKamisClose(false);
      console.log({ hours, minutes }, 'kamis close');
    },
    [setVisibleKamisClose],
  );

  const onConfirmJumatOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setJumatOpen({
        ...jumatOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(jumatOpen)
      setVisibleJumatOpen(false);
      console.log({ hours, minutes }, 'jumat open');
    },
    [setVisibleJumatOpen],
  );

  const onConfirmJumatClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setJumatClose({
        ...jumatClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(jumatClose)
      setVisibleJumatClose(false);
      console.log({ hours, minutes }, 'jumat close');
    },
    [setVisibleJumatClose],
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

  const onConfirmMingguOpen = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setMingguOpen({
        ...mingguOpen,
        openHour: hours < 10 ? `0${hours}`: `${hours}`,
        openMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(mingguOpen)
      setVisibleMingguOpen(false);
      console.log({ hours, minutes }, 'minggu open');
    },
    [setVisibleMingguOpen],
  );

  const onConfirmMingguClose = useCallback(
    ({ hours, minutes }) => {
      hours = parseInt(hours);
      minutes = parseInt(minutes)
      setMingguClose({
        ...mingguClose,
        closeHour: hours < 10 ? `0${hours}`: `${hours}`,
        closeMinute: minutes < 10 ? `0${minutes}`: `${minutes}`,
      })
      console.log(mingguClose)
      setVisibleMingguClose(false);
      console.log({ hours, minutes }, 'minggu close');
    },
    [setVisibleMingguClose],
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
        setSelasaOpen({
          openHour: responseJson.selasa.open.substring(0, 2),
          openMinute: responseJson.selasa.open.substring(3, 5),
        })
        setSelasaClose({
          closeHour: responseJson.selasa.close.substring(0, 2),
          closeMinute: responseJson.selasa.close.substring(3, 5),
        })
        setRabuOpen({
          openHour: responseJson.selasa.open.substring(0, 2),
          openMinute: responseJson.selasa.open.substring(3, 5),
        })
        setRabuClose({
          closeHour: responseJson.selasa.close.substring(0, 2),
          closeMinute: responseJson.selasa.close.substring(3, 5),
        })
        setKamisOpen({
          openHour: responseJson.kamis.open.substring(0, 2),
          openMinute: responseJson.kamis.open.substring(3, 5),
        })
        setKamisClose({
          closeHour: responseJson.kamis.close.substring(0, 2),
          closeMinute: responseJson.kamis.close.substring(3, 5),
        })
        setJumatOpen({
          openHour: responseJson.jumat.open.substring(0, 2),
          openMinute: responseJson.jumat.open.substring(3, 5),
        })
        setJumatClose({
          closeHour: responseJson.jumat.close.substring(0, 2),
          closeMinute: responseJson.jumat.close.substring(3, 5),
        })
        setMingguOpen({
          openHour: responseJson.minggu.open.substring(0, 2),
          openMinute: responseJson.minggu.open.substring(3, 5),
        })
        setMingguClose({
          closeHour: responseJson.minggu.close.substring(0, 2),
          closeMinute: responseJson.minggu.close.substring(3, 5),
        })
        setSabtuOpen({
          openHour: responseJson.sabtu.open.substring(0, 2),
          openMinute: responseJson.sabtu.open.substring(3, 5),
        })
        setSabtuClose({
          closeHour: responseJson.sabtu.close.substring(0, 2),
          closeMinute: responseJson.sabtu.close.substring(3, 5),
        })
        setIsOpen(responseJson.condition)

        setLoading(false)
      });
      
  }

  const updateCondition= async () => {
    if (isOpen == 1){
      setIsOpen(0)
    }else{
      setIsOpen(1)
    }
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
            <View style={[styles.wrapper,{flexDirection:'row' }]}> 
              
              <Text style={[globalStyles.bodyText2,{ marginRight: 30}]}>Tutup Sementara</Text> 
              <Text style={globalStyles.bodyText}>Tidak</Text>
              <Switch value={isOpen == '0'} onValueChange={updateCondition}/> 
              <Text style={[globalStyles.bodyText]}>Ya</Text> 
            </View>
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Senin</Text>
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

          {/* selasa */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Selasa</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleSelasaOpen}
                onDismiss={onDismissSelasaOpen}
                onConfirm={onConfirmSelasaOpen}
                hours={selasaOpen.openHour} // default: current hours
                minutes={selasaOpen.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleSelasaOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {selasaOpen.openHour} : {selasaOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleSelasaClose}
                onDismiss={onDismissSelasaClose}
                onConfirm={onConfirmSelasaClose}
                hours={selasaClose.closeHour} // default: current hours
                minutes={selasaClose.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleSelasaClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {selasaClose.closeHour} : {selasaClose.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rabu */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Rabu</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleRabuOpen}
                onDismiss={onDismissRabuOpen}
                onConfirm={onConfirmRabuOpen}
                hours={rabuOpen.openHour} // default: current hours
                minutes={rabuOpen.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleRabuOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {rabuOpen.openHour} : {rabuOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleRabuClose}
                onDismiss={onDismissRabuClose}
                onConfirm={onConfirmRabuClose}
                hours={rabuClose.closeHour} // default: current hours
                minutes={rabuClose.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleRabuClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {rabuClose.closeHour} : {rabuClose.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Kamis */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Kamis</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleKamisOpen}
                onDismiss={onDismissKamisOpen}
                onConfirm={onConfirmKamisOpen}
                hours={kamisOpen.openHour} // default: current hours
                minutes={kamisOpen.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleKamisOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {kamisOpen.openHour} : {kamisOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleKamisClose}
                onDismiss={onDismissKamisClose}
                onConfirm={onConfirmKamisClose}
                hours={kamisClose.closeHour} // default: current hours
                minutes={kamisClose.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleKamisClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {kamisClose.closeHour} : {kamisClose.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* jumat */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Jumat</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleJumatOpen}
                onDismiss={onDismissJumatOpen}
                onConfirm={onConfirmJumatOpen}
                hours={jumatOpen.openHour} // default: current hours
                minutes={jumatOpen.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleJumatOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {jumatOpen.openHour} : {jumatOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleJumatClose}
                onDismiss={onDismissJumatClose}
                onConfirm={onConfirmJumatClose}
                hours={jumatClose.closeHour} // default: current hours
                minutes={jumatClose.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleJumatClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {jumatClose.closeHour} : {jumatClose.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sabtu */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Sabtu</Text>
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

          {/* Minggu */}
          <View style={styles.wrapper}>
            <Text style={{ ...globalStyles.bodyText2 }}>Minggu</Text>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Buka</Text>
              <TimePickerModal
                visible={visibleMingguOpen}
                onDismiss={onDismissMingguOpen}
                onConfirm={onConfirmMingguOpen}
                hours={mingguOpen.openHour} // default: current hours
                minutes={mingguOpen.openMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleMingguOpen(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {mingguOpen.openHour} : {mingguOpen.openMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...globalStyles.bodyText }}>Jam Tutup</Text>
              <TimePickerModal
                visible={visibleMingguClose}
                onDismiss={onDismissMingguClose}
                onConfirm={onConfirmMingguClose}
                hours={mingguClose.closeHour} // default: current hours
                minutes={mingguClose.closeMinute} // default: current minutes
                label="Pilih Jam" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="en" // optional, default is automically detected by your system
              />
              <TouchableOpacity
                onPress={() => setVisibleMingguClose(true)}
                style={styles.inputTime}>
                <Text style={{ ...globalStyles.bodyText }}>
                  {mingguClose.closeHour} : {mingguClose.closeMinute}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={editPressed}>
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
