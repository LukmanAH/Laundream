import React from 'react';
import {Text, View} from 'react-native';
import {HeaderBar} from '../../../components';

const JamOperasional = ({navigation}) => {
  return (
    <View>
      <HeaderBar
        navigation={navigation}
        screenName="KelolaOutlet"
        title="Jam Operasional"
      />
      <Text>Jam Operasional</Text>
    </View>
  );
};

export default JamOperasional;
