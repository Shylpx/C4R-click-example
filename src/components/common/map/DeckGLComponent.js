import DeckGL from '@deck.gl/react';
import { useSelector } from 'react-redux';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { BASEMAPS } from '@carto/react-basemaps';
import { Map } from 'react-map-gl';
import { useMapHooks } from './useMapHooks';
import { useAppContext } from '../../../context/AppContext'
import InfoWindowWrapper from 'components/common/map/InfoWindowWrapper';

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
maplibregl.workerClass = maplibreglWorker;

export default function DeckGLComponent({ layers, popup, setPopup }) {
  const viewState = useSelector((state) => state.carto.viewState);
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    handleCursor,
    handleHover,
    handleSizeChange,
    handleTooltip,
    handleViewStateChange,
  } = useMapHooks();
  const { setDeckInstance } = useAppContext()

  return (
    <>
      {popup && (<InfoWindowWrapper infoWindow={popup} viewState={viewState} />)}
      <DeckGL
        onClick={ (event) => { if (!event.picked) setPopup(null); } }
        ref={ (ref) => setDeckInstance(ref) }
        viewState={{ ...viewState }}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        onHover={handleHover}
        getCursor={handleCursor}
        getTooltip={handleTooltip}
        pickingRadius={isMobile ? 10 : 0}
      >
        <Map
          mapLib={maplibregl}
          reuseMaps
          mapStyle={basemap.options.mapStyle}
          styleDiffing={false}
        />
      </DeckGL>
    </>
  );
}
