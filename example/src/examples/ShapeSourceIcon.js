import React from 'react';
import { Alert } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../styles/sheet';
import exampleIcon from '../assets/example.png';
import pinIcon from '../assets/pin.png';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

const styles = {
  icon: {
    iconImage: ['get', 'icon'],

    iconSize: [
      'match',
      ['get', 'icon'],
      'example',
      1.2,
      'airport-15',
      1.2,
      /* default */ 1,
    ],
  },
};

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        name: 'Test Icon 1',
        icon: 'example',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.20611157485, 52.180961084201, 873.1],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        name: 'Test Icon 2',
        icon: 'airport-15',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.205908, 52.180802, 873.2],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        name: 'Test Icon 3',
        icon: 'pin',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.206562, 52.180703, 873.3],
      },
    },
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4553',
      properties: {
        name: 'Test Icon 4',
        icon: 'pin3',
      },
      geometry: {
        type: 'Point',
        coordinates: [-117.206862, 52.180804, 873.4],
      },
    },
  ],
};

class ShapeSourceIcon extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  state = {
    images: {
      example: exampleIcon,
    },
  };

  onPressMarker(feature) {
    Alert.alert(
      feature.properties.name,
      JSON.stringify(feature.geometry.coordinates),
    );
  }

  render() {
    const {images} = this.state;

    return (
      <Page {...this.props}>
        <MapboxGL.MapView style={sheet.matchParent}>
          <MapboxGL.Camera
            zoomLevel={17}
            centerCoordinate={[-117.20611157485, 52.180961084261]}
          />
          <MapboxGL.Images
            nativeAssetImages={['pin']}
            images={images}
            onImageMissing={(imageKey) =>
              this.setState({
                images: {...this.state.images, [imageKey]: pinIcon},
              })
            }
          />
          <MapboxGL.ShapeSource
            id="exampleShapeSource"
            shape={featureCollection}
            onPress={(e) => this.onPressMarker(e.features[0])}>
            <MapboxGL.SymbolLayer id="exampleIconName" style={styles.icon} />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </Page>
    );
  }
}

export default ShapeSourceIcon;
