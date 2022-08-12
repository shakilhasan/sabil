import MapGL, { Source, Layer } from 'react-map-gl';
import { useEffect, useState, useMemo } from 'react';
// components
import {
  MapControlScale,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlFullscreen,
} from '../../../components/map';
//
import ControlPanel from './ControlPanel';

// ----------------------------------------------------------------------

const HEATMAP_LAYER = {
  maxzoom: 9,
  type: 'heatmap',
  paint: {
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      0.9,
      'rgb(255,201,101)',
    ],
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
  },
};

// ----------------------------------------------------------------------

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature) => {
    const featureDate = new Date(feature.properties.time);
    return featureDate.getFullYear() === year && featureDate.getMonth() === month && featureDate.getDate() === day;
  });
  return { type: 'FeatureCollection', features };
}

export default function MapHeatmap({ ...other }) {
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
      .then((resp) => resp.json())
      .then((json) => {
        const { features } = json;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      });
  }, []);

  const data = useMemo(
    () => (allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime)),
    [earthquakes, allDays, selectedTime]
  );

  return (
    <>
      <MapGL {...viewport} onViewportChange={setViewport} {...other}>
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />

        {data && (
          <Source type="geojson" data={data}>
            <Layer {...HEATMAP_LAYER} />
          </Source>
        )}
      </MapGL>

      <ControlPanel
        startTime={timeRange[0]}
        endTime={timeRange[1]}
        allDays={allDays}
        selectedTime={selectedTime}
        onChangeTime={selectTime}
        onChangeAllDays={useAllDays}
      />
    </>
  );
}
