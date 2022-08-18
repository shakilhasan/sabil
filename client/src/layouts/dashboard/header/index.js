import {AppBar, Box, Stack, Toolbar, Tooltip} from '@mui/material';
// @mui
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';

import {IconButtonAnimate} from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import Image from "../../../components/Image";
// components
import Logo from '../../../components/Logo';
// config
import {HEADER, NAVBAR} from '../../../config';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';

import AccountPopover from './AccountPopover';
import ContactsPopover from './ContactsPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
//
import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp : (prop) =>
      prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({isCollapse, isOffset, verticalLayout, theme}) => ({
     ...cssStyles(theme).bgBlur(),
     boxShadow : 'none',
     height : HEADER.MOBILE_HEIGHT,
     zIndex : theme.zIndex.appBar + 1,
     transition : theme.transitions.create([ 'width', 'height' ], {
       duration : theme.transitions.duration.shorter,
     }),
     [theme.breakpoints.up('lg')] : {
       height : HEADER.DASHBOARD_DESKTOP_HEIGHT,
       width : `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
       ...(isCollapse && {
         width : `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
       }),
       ...(isOffset && {
         height : HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
       }),
       ...(verticalLayout && {
         width : '100%',
         height : HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
         backgroundColor : theme.palette.background.default,
       }),
     },
   }));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar : PropTypes.func,
  isCollapse : PropTypes.bool,
  verticalLayout : PropTypes.bool,
};

export default function DashboardHeader(
    {onOpenSidebar, isCollapse = false, verticalLayout = false}) {
  const isOffset =
      useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
  sx = {{ minHeight: '100% !important', px: {lg: 5}, }} > {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <IconButtonAnimate placement="right">
            <a href="https://github.com/shakilhasan/sabil">
              <Image
                  disabledEffect
                  // src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                  src={`/icons/ic_github.svg`}
                  sx={{width: 32, height: 32}}
              />
            </a>
          </IconButtonAnimate>
          <LanguagePopover />
          <NotificationsPopover />
          <ContactsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
