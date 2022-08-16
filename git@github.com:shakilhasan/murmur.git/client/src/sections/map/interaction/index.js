import MapGL from 'react-map-gl';
import { useState, useCallback } from 'react';
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

export default function MapInteraction({ ...other }) {
  const [interactionState, setInteractionState] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 37.729,
    longitude: -122.36,
    zoom: 11,
    bearing: 0,
    pitch: 50,
  });
  const [settings, setSettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
  });

  const handleChangeSetting = useCallback(
    (name, value) =>
      setSettings((settings) => ({
        ...settings,
        [name]: value,
      })),
    []
  );

  return (
    <>
      <MapGL
        {...viewport}
        {...settings}
        onViewportChange={setViewport}
        onInteractionStateChange={(interactionState) => setInteractionState(interactionState)}
        {...other}
      >
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />

        <ControlPanel settings={settings} interactionState={interactionState} onChange={handleChangeSetting} />
      </MapGL>
    </>
  );
}
