import MapGL from 'react-map-gl';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// _mock
import { _mapContact } from '../../_mock';
// config
import { MAPBOX_API } from '../../config';
// components
import Iconify from '../../components/Iconify';
import { MapControlPopup, MapControlMarker, MapControlScale, MapControlNavigation } from '../../components/map';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function ContactMap() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 12,
    longitude: 42,
    zoom: 2,
  });

  return (
    <RootStyle>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={`mapbox://styles/mapbox/${isLight ? 'light' : 'dark'}-v10`}
        mapboxApiAccessToken={MAPBOX_API}
        width="100%"
        height="100%"
      >
        <MapControlScale />
        <MapControlNavigation />

        {_mapContact.map((country) => (
          <MapControlMarker
            key={country.phoneNumber}
            latitude={country.latlng[0]}
            longitude={country.latlng[1]}
            onClick={() => setTooltip(country)}
          />
        ))}

        {tooltip && (
          <MapControlPopup
            longitude={tooltip.latlng[1]}
            latitude={tooltip.latlng[0]}
            onClose={() => setTooltip(null)}
            sx={{
              '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
              '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
              '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Address
            </Typography>
            <Typography component="p" variant="caption">
              {tooltip.address}
            </Typography>

            <Typography component="p" variant="caption" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <Iconify icon={'eva:phone-fill'} sx={{ mr: 0.5, width: 14, height: 14 }} />
              {tooltip.phoneNumber}
            </Typography>
          </MapControlPopup>
        )}
      </MapGL>
    </RootStyle>
  );
}
