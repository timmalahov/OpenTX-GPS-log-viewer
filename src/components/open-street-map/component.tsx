import React, {FunctionComponent, useState} from 'react';
// @ts-ignore
import Gradient from 'javascript-color-gradient';
import {LogItemInterface} from '../../utilities/logItem';
import {OpenStreetMapComponentPropsInterface} from "./OpenStreetMapComponentPropsInterface";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {Map as LeafletMap} from "leaflet";
import {SensorType} from "../../utilities/LogItemEnum";

const containerStyle = {
  width: '100%',
  height: '100%',
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
const OSMComponent: FunctionComponent<OpenStreetMapComponentPropsInterface> = ({
  logInfo,
}: OpenStreetMapComponentPropsInterface) => {

  const [map, setMap] = useState<LeafletMap | null>(null);

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
  // colorGradient.setMidpoint(100);

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

      // @ts-ignore
      map?.panTo([lines[0].start.lat, lines[0].start.lng]);

    return lines.map((line: any, index: number) => {
      const colorSourceData =
        Number(logArray[index + 1][SensorType.Alt]) > 0
          ? logArray[index + 1][SensorType.Alt]
          : 1;

      return (
        <Polyline
          pathOptions={{
              color: colorGradient.getColor(colorSourceData),
              stroke: true,
          }}
          positions={[
            [line.start.lat, line.start.lng],
            [line.end.lat, line.end.lng],
          ]}
          key={`poly_${logInfo[index].Date}${logInfo[index].Time}`}
        />
      )
    });
  };

    return (
    <div className="map-container">
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={containerStyle}
            whenCreated={setMap}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                getPolylines(logInfo)
            }
        </MapContainer>
    </div>
  );
};

export default React.memo(OSMComponent);
