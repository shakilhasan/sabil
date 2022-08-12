import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, List, Drawer, Button, Divider } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAVBAR } from '../../../config';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { SkeletonMailSidebarItem } from '../../../components/skeleton';
//
import MailSidebarItem from './MailSidebarItem';

// ----------------------------------------------------------------------

MailSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onOpenCompose: PropTypes.func,
  onCloseSidebar: PropTypes.func,
};

export default function MailSidebar({ isOpenSidebar, onOpenCompose, onCloseSidebar }) {
  const { pathname } = useLocation();

  const { labels } = useSelector((state) => state.mail);

  const isDesktop = useResponsive('up', 'md');

  const loading = !labels.length;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenCompose = () => {
    onCloseSidebar();
    onOpenCompose();
  };

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          onClick={handleOpenCompose}
        >
          Compose
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {(loading ? [...Array(8)] : labels).map((label, index) =>
          label ? <MailSidebarItem key={label.id} label={label} /> : <SkeletonMailSidebarItem key={index} />
        )}
      </List>
    </Scrollbar>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer variant="permanent" PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH, position: 'relative' } }}>
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
