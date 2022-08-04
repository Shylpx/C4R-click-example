import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/AppContext'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: ({ x, y }) =>
      `translate(${x}px, ${y}px) translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,
    zIndex: 1,
  },
  paper: {
    padding: '6px 12px',
    borderRadius: '5px'
  },
}))

export default function InfoWindowWrapper({ infoWindow, viewState }) {
  const { coordinates, propsObject } = infoWindow
  const { deckInstance } = useAppContext()
  const [position, setPosition] = useState(
    coordinates2pixels(coordinates, deckInstance?.current),
  )
  const [x, y] = position || [0, 0]
  const classes = useStyles({ x, y })

  useEffect(() => {
    setPosition(coordinates2pixels(coordinates, deckInstance?.current))
  }, [coordinates, deckInstance, viewState])

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <Box>
          <Typography>{propsObject.storeId}</Typography>
        </Box>
      </Paper>
    </Box>
  )
}

function coordinates2pixels(coordinates, deckInstance) {
  let pixels

  if (deckInstance) {
    try {
      const viewports = deckInstance.getViewports(undefined)
      const viewport = viewports[0]

      if (viewport) {
        pixels = viewport.project(coordinates)
      }
    } catch (e) {
      // console.warn('viewManager in deckInstance not ready yet')
    }
  }

  return pixels
}
