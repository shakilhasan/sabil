import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, SpeedDial, Typography, SpeedDialAction } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: <Iconify icon="ant-design:instagram-filled" width={20} height={20} color="#D7336D" />,
  },
  {
    name: 'Linkedin',
    icon: <Iconify icon="eva:linkedin-fill" width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />,
  },
];

const OverlayStyle = styled('h1')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  ...theme.typography.h2,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

BlogPostHero.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostHero({ post }) {
  const { cover, title, author, createdAt } = post;

  const isDesktop = useResponsive('up', 'sm');

  return (
    <Box sx={{ position: 'relative' }}>
      <TitleStyle>{title}</TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={author.name} src={author.avatarUrl} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {author.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(createdAt)}
            </Typography>
          </Box>
        </Box>

        <SpeedDial
          direction={isDesktop ? 'left' : 'up'}
          ariaLabel="Share post"
          icon={<Iconify icon="eva:share-fill" sx={{ width: 20, height: 20 }} />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          {SOCIALS.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          ))}
        </SpeedDial>
      </FooterStyle>

      <OverlayStyle />
      <Image alt="post cover" src={cover} ratio="16/9" />
    </Box>
  );
}
