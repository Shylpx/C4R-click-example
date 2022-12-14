import { lazy, useState } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { FeatureSelectionWidget, LegendWidget } from '@carto/react-widgets';
import { Grid, Hidden } from '@material-ui/core';

const Map = lazy(() => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'));

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    // [theme.breakpoints.down('xs')]: {
    //   height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    // },

    // Fix Mapbox attribution button not clickable
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  drawingTool: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cartoLogoMap: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(18.5),
      right: theme.spacing(2),
    },
  },
}));

export default function MapContainer() {
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');
  const classes = useStyles();
  const [popupInfo, setPopupInfo] = useState(null);

  const layers = getLayers(setPopupInfo);

  return (
    <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
      <Map layers={layers} popup={popupInfo} setPopup={setPopupInfo} />

      <Hidden xsDown>
        <ZoomControl className={classes.zoomControl} showCurrentZoom />
        <FeatureSelectionWidget className={classes.drawingTool} />
      </Hidden>
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
      <LegendWidget className={classes.legend} />
    </Grid>
  );
}
