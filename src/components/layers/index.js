import StoresLayer from './StoresLayer';
import TilesetLayer from './TilesetLayer';
import { FeatureSelectionLayer } from '@carto/react-widgets';
// [hygen] Import layers

export const getLayers = (setPopupInfo) => {
  return [
    StoresLayer(setPopupInfo),
    TilesetLayer(),
    FeatureSelectionLayer(),
    // [hygen] Add layer
  ];
};
