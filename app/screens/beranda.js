import React from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import TouchableScale from 'react-native-touchable-scale';


import { Colors, H1, H2, SPACING, width, H3, SPAN, height, } from '../../config/ui-config';
import { casesApi, statisticsApi } from '../../config/api';
import Spacer from '../components/spacer';

const axios = require('axios').default;

export default function BerandaScreen({ navigation }) {
  const [cases, setCases] = React.useState([]);
  const [global, setGlobal] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  // const [setData, setDatas] = React.useState(null);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [modalVisibility, setModelVisibility] = React.useState(false);

  React.useEffect(() => {
    InitializePage();
  }, []);

  function refreshPage() {
    setIsRefreshing(true);
    setCases([]);
    InitializePage();
  }

  function InitializePage() {
    axios.get(casesApi).then((res) => {
      setCases(
        res.data.sort((a, b) => -a.confirmed + b.confirmed).slice(0, 126)
      );
    });
    axios.get(statisticsApi).then((res) => {
      setIsRefreshing(false);
      setGlobal(res.data);
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl onRefresh={refreshPage} refreshing={isRefreshing} />
        }
      >
        <View style={styles.header}>
          <Text
            style={{
              fontSize: H1,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: SPACING,
            }}
          >
            Selamat Datang Hella
          </Text>
        </View>

        <SaldoCard />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Layanan Kami:</Text>
          <Text style={styles.subTitle}>{new Date().toDateString()}</Text>
        </View>

        <View style={styles.confirmedCasesContainer}>
          <TouchableOpacity
            style={styles.caseContainer}
            onPress={() => navigation.navigate('kiloan')}>
            <Image
              source={require('./../../assets/kiloan-icon.png')}
              fadeDuration={0}
              style={{ width: 50, height: 50 }}
            />
            <Text>Kiloan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caseContainer} >
            <Image
              source={require('./../../assets/satuan-icon.png')}
              fadeDuration={0}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ color: 'white', }}>menu 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caseContainer} >
            <Image
              source={require('./../../assets/bedding-icon.png')}
              fadeDuration={0}
              style={{ width: 50, height: 50 }}
            />
            <Text>menu 3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caseContainer} >
            <Image
              source={require('./../../assets/bedding-icon.png')}
              fadeDuration={0}
              style={{ width: 50, height: 50 }}
            />
            <Text>menu 4</Text>
          </TouchableOpacity>
        </View>
        <Spacer />
      </ScrollView >
    </View >
  );
}




function SaldoCard() {
  return (
    <View style={styles.analyticsCard}>
      <View style={{ flex: 3 }}>
        <Text
          style={[
            styles.title,
            { fontSize: H2, color: Colors.dark, fontWeight: 'bold' },
          ]}
        >
          Saldo :
        </Text>
        <View style={styles.analyticsCardItems}>
          <Text style={{ color: 'green', fontWeight: 'bold', fontSize: H1 }}>
            0
          </Text>
        </View>
      </View>

      <TouchableOpacity style={{ flex: 1 }}
        onPress={() => alert(
          'Fitur Belum Ada !!!'
        )}>
        <Image
          source={require('./../../assets/Topup-icon.png')}
          fadeDuration={0}
          style={{ width: 70, height: 70, margin: 6 }}
        />
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    position: 'absolute',
    height: 200,
    justifyContent: 'center',
    padding: SPACING,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: SPACING * 2,
    borderBottomLeftRadius: SPACING * 2,
  },
  analyticsCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 150,
    padding: SPACING,
    margin: SPACING,
    borderRadius: SPACING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  analyticsCardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING,
  },
  titleContainer: {
    marginHorizontal: SPACING,
  },
  title: {
    fontSize: H2,
    color: Colors.dark,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: SPAN,

    color: Colors.darkGrey,
  },
  confirmedCasesContainer: {
    paddingHorizontal: SPACING * 2.5,
    paddingVertical: SPACING * 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  caseContainer: {
    padding: SPACING * 1.5,
    // elevation: 5,
    width: (width - SPACING * 2 - SPACING) * 0.4,
    backgroundColor: '#64B8CB',
    borderRadius: SPACING,
    marginVertical: SPACING * 0.5,
  },

  searchContainer: {
    marginVertical: SPACING,
    width,
    paddingHorizontal: SPACING * 1,
  },

  icon: {
    position: 'absolute',
    right: SPACING * 3,
    top: 18,
  },

  indicator: {
    width: 1.5 * SPACING,
    height: 4,
    position: 'absolute',
    top: 10,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: Colors.lightGrey,
  },
});
