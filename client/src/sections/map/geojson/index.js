import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';
import MapGL, { Source, Layer } from 'react-map-gl';
import { useState, useEffect, useMemo, useCallback } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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

function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: 'FeatureCollection',
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return { ...f, properties };
    }),
  };
}

export default function MapGeojson({ ...other }) {
  const theme = useTheme();

  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [year, setYear] = useState(2010);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'percentile',
        stops: [
          [0, theme.palette.primary.light],
          [1, theme.palette.primary.main],
          [2, theme.palette.info.light],
          [3, theme.palette.info.main],
          [4, theme.palette.warning.light],
          [5, theme.palette.warning.main],
          [6, theme.palette.error.light],
          [7, theme.palette.error.light],
          [8, theme.palette.primary.dark],
        ],
      },
      'fill-opacity': 0.72,
    },
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson')
      .then((resp) => resp.json())
      .then((json) => setAllData(json));
  }, []);

  const onHover = useCallback((event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
          }
        : null
    );
  }, []);

  const data = useMemo(() => allData && updatePercentiles(allData, (f) => f.properties.income[year]), [allData, year]);

  return (
    <>
      <MapGL {...viewport} onViewportChange={setViewport} interactiveLayerIds={['data']} onHover={onHover} {...other}>
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />

        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>

        {hoverInfo && (
          <Box
            sx={{
              p: 1,
              zIndex: 99,
              borderRadius: 1,
              position: 'absolute',
              pointerEvents: 'none',
              color: 'common.white',
              backgroundColor: alpha(theme.palette.grey[900], 0.8),
            }}
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <Typography component="div" variant="caption">
              <strong>State:</strong> {hoverInfo.feature.properties.name}
            </Typography>
            <Typography component="div" variant="caption">
              <strong> Median Household Income: </strong>
              {hoverInfo.feature.properties.value}
            </Typography>
            <Typography component="div" variant="caption">
              <strong>Percentile:</strong>
              {(hoverInfo.feature.properties.percentile / 8) * 100}
            </Typography>
          </Box>
        )}
      </MapGL>

      <ControlPanel year={year} onChange={(event) => setYear(event.target.value)} />
    </>
  );
}
