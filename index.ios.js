import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  View
} from 'react-native';
import Api from './src/api';

class weather_map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
          annotations={[this.state.pin]}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude,
      }
    })
    Api(region.latitude, region.longitude)
     .then((data) => {
       console.log(data);
       this.setState(data);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }

});

AppRegistry.registerComponent('weather_map', () => weather_map);
