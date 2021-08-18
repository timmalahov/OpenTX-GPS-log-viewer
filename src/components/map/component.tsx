import React, { FunctionComponent } from 'react';
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from '@react-google-maps/api';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Gradient from 'javascript-color-gradient';
import { LogItemInterface } from '../../utilities/logItem';
import { MapComponentPropsInterface } from './MapComponentPropsInterface';
import {SensorType} from "../../utilities/LogItemEnum";

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const colorGradient = new Gradient();

const color1 = '#004ad4';
const color2 = '#00e6ff';
const color3 = '#00ff9b';
const color4 = '#00d42d';
const color5 = '#54ff00';
const color6 = '#ffd300';
const color7 = '#ff000b';

colorGradient.setGradient(
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  color7
);

// eslint-disable-next-line react/prop-types
const MapComponent: FunctionComponent<MapComponentPropsInterface> = ({
  logInfo,
}: MapComponentPropsInterface) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB4GL2flAQBGxzOjrbVXQUvpU2UqJfoPo8', // TODO c'mon guys, protect it
  });
  const [map, setMap] = React.useState(null);

  const path = logInfo
    .filter((item) => !!item.GPS)
    .map((item) => ({
      lat: Number(item.GPS.split(' ')[0]),
      lng: Number(item.GPS.split(' ')[1]),
    }));

  const highest = logInfo.reduce((prev, current) =>
    Number(prev[SensorType.Alt] || '') > Number(current[SensorType.Alt] || '')
      ? prev
      : current
  );
  colorGradient.setMidpoint(Math.floor(Number(highest[SensorType.Alt]) * 0.66));

  const onLoad = React.useCallback((loadedMap) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((position) => {
      bounds.extend(position);
    });
    loadedMap.fitBounds(bounds);
    setMap(loadedMap);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const getPolylines = (logArray: Array<LogItemInterface>) => {
    const lines = path.reduce((acc, cur, index, arr) => {
      if (!arr[index + 1]) {
        return acc;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc.push({ start: cur, end: arr[index + 1] });

      return acc;
    }, []);

    return lines.map((line: any, index: number) => {
      const colorSourceData =
        Number(logArray[index + 1][SensorType.Alt]) > 0
          ? logArray[index + 1][SensorType.Alt]
          : 1;

      return (
        <Polyline
          // key={`${line.start.lat}${line.start.lng}${line.end.lat}${line.end.lng}`}
          key={`poly_${logInfo[index].Date}${logInfo[index].Time}`}
          path={[line.start, line.end]}
          options={{
            strokeColor: colorGradient.getColor(colorSourceData),
            strokeOpacity: 1,
            strokeWeight: 5,
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30000,
            zIndex: 1,
          }}
        />
      );
    });
  };

  return (
    <div className="map-container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* <Polyline path={path} options={options} /> */}
          {getPolylines(logInfo)}
          {path.map((item, index) => (
            <Marker
              onMouseOver={() => {
                // const index = path.indexOf(item);
                console.log(JSON.stringify(logInfo[index], null, 2));
              }}
              opacity={0}
              key={`marker_${logInfo[index].Date}${logInfo[index].Time}`}
              position={item}
            />
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(MapComponent);
