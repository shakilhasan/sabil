import PropTypes from 'prop-types';
import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tooltip, IconButton, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../../components/Iconify';
import { DialogAnimate } from '../../../../components/animate';
//
import InvoicePDF from './InvoicePDF';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(5),
}));

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceToolbar({ invoice, ...other }) {
  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  return (
    <RootStyle {...other}>
      <Button color="error" size="small" variant="contained" endIcon={<Iconify icon={'eva:share-fill'} />}>
        Share
      </Button>

      <Button
        color="info"
        size="small"
        variant="contained"
        onClick={handleOpenPreview}
        endIcon={<Iconify icon={'eva:eye-fill'} />}
        sx={{ mx: 1 }}
      >
        Preview
      </Button>

      <PDFDownloadLink
        document={<InvoicePDF invoice={invoice} />}
        fileName={`INVOICE-${invoice.id}`}
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <LoadingButton
            size="small"
            loading={loading}
            variant="contained"
            loadingPosition="end"
            endIcon={<Iconify icon={'eva:download-fill'} />}
          >
            Download
          </LoadingButton>
        )}
      </PDFDownloadLink>

      <DialogAnimate fullScreen open={openPDF}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClosePreview}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </Box>
        </Box>
      </DialogAnimate>
    </RootStyle>
  );
}
