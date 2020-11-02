import React from 'react';
import {Alert} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import sheet from '../styles/sheet';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

// Note: Only seems to crash with multiple elements in icon array!
const mapIcons = {
  aIcon:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGEAYAAAAhvj7HAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABGAAAARgBq8Lz7AAAE4UlEQVR42u2dTWhcVRiG7512tBNI2kxptU1ji7/0T8WFRNKo7UKjJI2ltNFFoW4EF/4tbJtV68aNuBJdNcGCCFIXUiWFklARhohC/SEVU9G0o4RWdGw7JZMwmRkX71uQYpJL7jnnOzP3ezYvZ/Odc97vyz1nzv1JECiKoiiKoiiKoiiKoiiK4h2h9ABcU6sFQRAErWitmIRm+6kt0OZ2aHoUWu6EFvPQwiz1FHRmQwgn/5aen7JEUBgrX4V2/wodPAutXaDWzGilAj2+C/r0JPtvl/ZBuQUkJvUo9PE10NFOswURV0c+gna9z/GulvYtMcDwsA/aM82/8EE/CiOqVgegvVs4n2ekfW04YOzWK9BLL/qReFOaXwXddkLa57qFl+6HoEfO+5FYV3r4DOe/RToP3sPN4mpobo8fCZTS3A1oyw3pvHgHjFk3S8MabMmJveehH+vfkc6TODTiZT8SUy+6Tuy8JyXVMS+119H64wmpcdQnU2u5dN/tumfnBcPN3CNonT4HDftdj6POmYMM8/wp9YD0gKzBXwE/+XFpbxQd2CidV+PwnOGQHwY3qm79xXYerS9JmEjYjdbwrO3+ks1wN/3ea6sH63erMYHeLFqn9G6uE3Yvx93zzyumI1srGG7G1qI1x918OGarP+W/VD+Epk+gcKpfmopseUnqfBuqheKW1EHojqrxyHYHfrTJbnxlYY52mI5ofEnigdJ2tK7+aNsSJQqr9mNpunYybiRLV5gOLRSveKzXVCRLBbPvFVdWKFHYVzQVydiShKUoWINWdQPDn3PoijI/X0DCA3xY/epSAxkumEwGrelpKWeUhcjkUTAzS76VYHhJan1B1hBlYbKx9zKGCya7UsoKJQrZdNwIhgum+R4pK5QoNN8ZN4Lhgkl/LWWFEoX0m3EjGC6Y8k4pK5QolGOf/BoumOJvUlYoUSj+EDeC4YIp/CllhRKFQuwHrEyfwzDetPG7pIoJmjbjHKb081IjGL7ClPgZjeA1MU+U/6F2BloqxI1krGB45MwBDZUFXFHmZWgT8xN7y2Dp5uPJ3U79UBbh00OmIlkqmLHvHTmhRGJshfQIFgWb4NEmP16/SKqO5Ezn1fIjmscu242vLMxbJekRRIZvDTwIrXzsx19cUrQyQf83mc6rtSsMX2/go5p9+kkup/S10f+LpiM7epEt7EHr4gHoXftt95tMfufzSBuvoWBqp0334Ow7vXz3l18dGF/mqt9ksf1hFMp47HtG8+Hscx+YyPnlaA2856rfZDBwn+1CEYObsQ5obq8fm8R61Ry/hpF6Sjqv1uELb7fTgG/9SEDd6PPQFuc/m8U+WcY38fj5j7YuqXHUJ20T8O96xnXPYgVzE0x8aoZG8NdUbU56XJ7xFaSNP5envpMekDfwUlvkGv2BJ0uA1B7lIP3Q54sWg5u5HdDDs34k0JUe6ef8d0nnoW6Bgdueg+bP+pFYU3qpzPnpfzkxDU+O+S23Xrary/xIfFSt8H8J9BQ4n2elfU0MvHSvh3Z9Ah35zI/CuKkjeY5vnOO9X9o35RZ4zrMT2n0v9PgQr0ivGy6MFuhgO/s7xv7fkPbBNEn9n493oJW5Ddr6EjTLV0mbN0PT30DLT0KLE9DCJPSfd6GlkM/M/iU9P0VRFEVRFEVRFEVRFKUx+Bf7EbtqCt8N3QAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOC0wMy0xNFQxOToyOTo0Mi0wNDowMD++m78AAAAldEVYdG1vZGlmeS1kYXRlADIwMDgtMDMtMTRUMTk6Mjk6NDItMDQ6MDBgD+2LAAAAAElFTkSuQmCC',
  bIcon:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGEAYAAAAhvj7HAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABGAAAARgBq8Lz7AAAE4UlEQVR42u2dTWhcVRiG7512tBNI2kxptU1ji7/0T8WFRNKo7UKjJI2ltNFFoW4EF/4tbJtV68aNuBJdNcGCCFIXUiWFklARhohC/SEVU9G0o4RWdGw7JZMwmRkX71uQYpJL7jnnOzP3ezYvZ/Odc97vyz1nzv1JECiKoiiKoiiKoiiKoiiK4h2h9ABcU6sFQRAErWitmIRm+6kt0OZ2aHoUWu6EFvPQwiz1FHRmQwgn/5aen7JEUBgrX4V2/wodPAutXaDWzGilAj2+C/r0JPtvl/ZBuQUkJvUo9PE10NFOswURV0c+gna9z/GulvYtMcDwsA/aM82/8EE/CiOqVgegvVs4n2ekfW04YOzWK9BLL/qReFOaXwXddkLa57qFl+6HoEfO+5FYV3r4DOe/RToP3sPN4mpobo8fCZTS3A1oyw3pvHgHjFk3S8MabMmJveehH+vfkc6TODTiZT8SUy+6Tuy8JyXVMS+119H64wmpcdQnU2u5dN/tumfnBcPN3CNonT4HDftdj6POmYMM8/wp9YD0gKzBXwE/+XFpbxQd2CidV+PwnOGQHwY3qm79xXYerS9JmEjYjdbwrO3+ks1wN/3ea6sH63erMYHeLFqn9G6uE3Yvx93zzyumI1srGG7G1qI1x918OGarP+W/VD+Epk+gcKpfmopseUnqfBuqheKW1EHojqrxyHYHfrTJbnxlYY52mI5ofEnigdJ2tK7+aNsSJQqr9mNpunYybiRLV5gOLRSveKzXVCRLBbPvFVdWKFHYVzQVydiShKUoWINWdQPDn3PoijI/X0DCA3xY/epSAxkumEwGrelpKWeUhcjkUTAzS76VYHhJan1B1hBlYbKx9zKGCya7UsoKJQrZdNwIhgum+R4pK5QoNN8ZN4Lhgkl/LWWFEoX0m3EjGC6Y8k4pK5QolGOf/BoumOJvUlYoUSj+EDeC4YIp/CllhRKFQuwHrEyfwzDetPG7pIoJmjbjHKb081IjGL7ClPgZjeA1MU+U/6F2BloqxI1krGB45MwBDZUFXFHmZWgT8xN7y2Dp5uPJ3U79UBbh00OmIlkqmLHvHTmhRGJshfQIFgWb4NEmP16/SKqO5Ezn1fIjmscu242vLMxbJekRRIZvDTwIrXzsx19cUrQyQf83mc6rtSsMX2/go5p9+kkup/S10f+LpiM7epEt7EHr4gHoXftt95tMfufzSBuvoWBqp0334Ow7vXz3l18dGF/mqt9ksf1hFMp47HtG8+Hscx+YyPnlaA2856rfZDBwn+1CEYObsQ5obq8fm8R61Ry/hpF6Sjqv1uELb7fTgG/9SEDd6PPQFuc/m8U+WcY38fj5j7YuqXHUJ20T8O96xnXPYgVzE0x8aoZG8NdUbU56XJ7xFaSNP5envpMekDfwUlvkGv2BJ0uA1B7lIP3Q54sWg5u5HdDDs34k0JUe6ef8d0nnoW6Bgdueg+bP+pFYU3qpzPnpfzkxDU+O+S23Xrary/xIfFSt8H8J9BQ4n2elfU0MvHSvh3Z9Ah35zI/CuKkjeY5vnOO9X9o35RZ4zrMT2n0v9PgQr0ivGy6MFuhgO/s7xv7fkPbBNEn9n493oJW5Ddr6EjTLV0mbN0PT30DLT0KLE9DCJPSfd6GlkM/M/iU9P0VRFEVRFEVRFEVRFKUx+Bf7EbtqCt8N3QAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOC0wMy0xNFQxOToyOTo0Mi0wNDowMD++m78AAAAldEVYdG1vZGlmeS1kYXRlADIwMDgtMDMtMTRUMTk6Mjk6NDItMDQ6MDBgD+2LAAAAAElFTkSuQmCC',
  cIcon:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGEAYAAAAhvj7HAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABGAAAARgBq8Lz7AAAE4UlEQVR42u2dTWhcVRiG7512tBNI2kxptU1ji7/0T8WFRNKo7UKjJI2ltNFFoW4EF/4tbJtV68aNuBJdNcGCCFIXUiWFklARhohC/SEVU9G0o4RWdGw7JZMwmRkX71uQYpJL7jnnOzP3ezYvZ/Odc97vyz1nzv1JECiKoiiKoiiKoiiKoiiK4h2h9ABcU6sFQRAErWitmIRm+6kt0OZ2aHoUWu6EFvPQwiz1FHRmQwgn/5aen7JEUBgrX4V2/wodPAutXaDWzGilAj2+C/r0JPtvl/ZBuQUkJvUo9PE10NFOswURV0c+gna9z/GulvYtMcDwsA/aM82/8EE/CiOqVgegvVs4n2ekfW04YOzWK9BLL/qReFOaXwXddkLa57qFl+6HoEfO+5FYV3r4DOe/RToP3sPN4mpobo8fCZTS3A1oyw3pvHgHjFk3S8MabMmJveehH+vfkc6TODTiZT8SUy+6Tuy8JyXVMS+119H64wmpcdQnU2u5dN/tumfnBcPN3CNonT4HDftdj6POmYMM8/wp9YD0gKzBXwE/+XFpbxQd2CidV+PwnOGQHwY3qm79xXYerS9JmEjYjdbwrO3+ks1wN/3ea6sH63erMYHeLFqn9G6uE3Yvx93zzyumI1srGG7G1qI1x918OGarP+W/VD+Epk+gcKpfmopseUnqfBuqheKW1EHojqrxyHYHfrTJbnxlYY52mI5ofEnigdJ2tK7+aNsSJQqr9mNpunYybiRLV5gOLRSveKzXVCRLBbPvFVdWKFHYVzQVydiShKUoWINWdQPDn3PoijI/X0DCA3xY/epSAxkumEwGrelpKWeUhcjkUTAzS76VYHhJan1B1hBlYbKx9zKGCya7UsoKJQrZdNwIhgum+R4pK5QoNN8ZN4Lhgkl/LWWFEoX0m3EjGC6Y8k4pK5QolGOf/BoumOJvUlYoUSj+EDeC4YIp/CllhRKFQuwHrEyfwzDetPG7pIoJmjbjHKb081IjGL7ClPgZjeA1MU+U/6F2BloqxI1krGB45MwBDZUFXFHmZWgT8xN7y2Dp5uPJ3U79UBbh00OmIlkqmLHvHTmhRGJshfQIFgWb4NEmP16/SKqO5Ezn1fIjmscu242vLMxbJekRRIZvDTwIrXzsx19cUrQyQf83mc6rtSsMX2/go5p9+kkup/S10f+LpiM7epEt7EHr4gHoXftt95tMfufzSBuvoWBqp0334Ow7vXz3l18dGF/mqt9ksf1hFMp47HtG8+Hscx+YyPnlaA2856rfZDBwn+1CEYObsQ5obq8fm8R61Ry/hpF6Sjqv1uELb7fTgG/9SEDd6PPQFuc/m8U+WcY38fj5j7YuqXHUJ20T8O96xnXPYgVzE0x8aoZG8NdUbU56XJ7xFaSNP5envpMekDfwUlvkGv2BJ0uA1B7lIP3Q54sWg5u5HdDDs34k0JUe6ef8d0nnoW6Bgdueg+bP+pFYU3qpzPnpfzkxDU+O+S23Xrary/xIfFSt8H8J9BQ4n2elfU0MvHSvh3Z9Ah35zI/CuKkjeY5vnOO9X9o35RZ4zrMT2n0v9PgQr0ivGy6MFuhgO/s7xv7fkPbBNEn9n493oJW5Ddr6EjTLV0mbN0PT30DLT0KLE9DCJPSfd6GlkM/M/iU9P0VRFEVRFEVRFEVRFKUx+Bf7EbtqCt8N3QAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOC0wMy0xNFQxOToyOTo0Mi0wNDowMD++m78AAAAldEVYdG1vZGlmeS1kYXRlADIwMDgtMDMtMTRUMTk6Mjk6NDItMDQ6MDBgD+2LAAAAAElFTkSuQmCC',
};

const styles = {
  base: {
    iconImage: 'aIcon',
  },
};

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '1',
      geometry: {
        type: 'Point',
        coordinates: [-2.991648, 54.497054],
      },
    },
    {
      type: 'Feature',
      id: '2',
      geometry: {
        type: 'Point',
        coordinates: [-3.049789, 54.639949],
      },
    },
    {
      type: 'Feature',
      id: '3',
      geometry: {
        type: 'Point',
        coordinates: [-3.025048, 54.540904],
      },
    },
    {
      type: 'Feature',
      id: '4',
      geometry: {
        type: 'Point',
        coordinates: [-3.277905, 54.571635],
      },
    },
  ],
};

ShapeSourceIconFunc.propTypes = {
  ...BaseExamplePropTypes,
};

export default function ShapeSourceIconFunc(props) {
  const renderMapIcons = () => {
    // occasionally crashes
    // check: https://github.com/react-native-mapbox-gl/maps/pull/143
    return (
      <React.Fragment>
        <MapboxGL.ShapeSource
          id="testShape"
          shape={featureCollection}>
          <MapboxGL.SymbolLayer id="x" style={styles.base} />
        </MapboxGL.ShapeSource>
      </React.Fragment>
    );
  };

  return (
    <Page {...props}>
      <MapboxGL.MapView style={sheet.matchParent}>
        <MapboxGL.Camera
          zoomLevel={11}
          centerCoordinate={[-2.991648, 54.497054]}
        />
        <MapboxGL.Images images={mapIcons} />
        {renderMapIcons()}
      </MapboxGL.MapView>
    </Page>
  );
}
