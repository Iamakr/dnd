import './global.css'
import { useEffect, useRef, useState } from 'react'
import {
  Box, Button, IconButton, Stack,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
} from '@mui/material'
import PDropZone from './components/PDropZone'
import { Iconify } from './components/iconify'
import { varAlpha } from './theme/styles'
import SharePopover from './components/SharePopover'


function App() {
  const [files, setFiles] = useState([]);

  const dropzoneRef = useRef();

  const handleAddMore = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flex: '1 1 auto',
      minHeight: '100vh',
      flexDirection: 'column',

    }}>
      <Box sx={{
        display: 'flex',
        flex: '1 1 auto',
        minHeight: '100vh',
        flexDirection: 'column',
      }}>
        <Box sx={{
          display: 'flex',
          top: '0px',
          left: '0px',
          height: '100%',
          position: 'fixed',
          flexDirection: 'column',
          width: 240,
        }}>
          Ankur
        </Box>
        <Box sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          paddingLeft: '240px'
        }}>

          <Stack sx={{
            padding: 2,
            flex: '1 1 auto',
            // backgroundImage: 'url(https://images.unsplash.com/photo-1476553986076-d59060d397e4?q=80&w=3032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundColor: '#18191B',
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat'
          }}>
            <Stack sx={{
              flex: '1 1 auto',
              borderRadius: 2,
              backdropFilter: 'blur(8) saturate(180%)',
              WebkitBackdropFilter: 'blur(0) saturate(180%)',
              backgroundColor: files.length === 0 ? 'transparent' : '#212225',
              backgroundImage: files.length === 0
                ? 'url(https://s3-alpha-sig.figma.com/img/97da/ffac/37296da6a19529197013b33a4fbb7c30?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dEzOK1T5gTduQOBuXv9mk2iHeWzEjKqrhW8Dh66vN2G8rOK3jQjmvoaXJIkAnPhw~CPzUT--qrlGqUXmXbBLLKlrK~sLpkx5g85hC4aGGi5E9l3a66nQseFtnc1MYJmO9XmbK~AdVCvjidmLOuh2CuQy2Zlbl65GKP1rQ~funYRidc0tSW2A~c9Hbb2L-TSDzcsifFGpWo7Z3radaGquJsWUEtupJR~QmQWuoq4rygiUVH0mp1QRnrSHstvMCUMm~h8-HMQI2I1v57z0Q1kNG8OmcVZQnlGyANJT2qwP88439J2JcZezdjnbpq63sclilX81kWbGZZXb2Fu4TFKzIQ__)'
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '1px solid #FFFFFF1A',
            }}>
              <Box component={'header'} sx={{
                transition: 'boxShadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
                flexShrink: 0,
                position: 'sticky',
                top: '0px',
                left: 'auto',
                right: '0px',
                color: 'inherit',

                boxShadow: 'none',
                height: 72
              }}>
                <Stack sx={{ pt: 1.5, px: 2 }} flexDirection="row" justifyContent="flex-end">

                  <SharePopover files={files} onAddMore={handleAddMore} />

                </Stack>
              </Box>
              <Box
                component={'main'}
                sx={{
                  display: 'flex',
                  flex: '1 1 auto',
                  flexDirection: 'column',

                }}>
                <PDropZone onFileChange={setFiles} ref={dropzoneRef} />
              </Box>
            </Stack>
          </Stack>

        </Box>
      </Box>

    </Box>
  )
}

export default App;

