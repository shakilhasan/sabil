import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Rating, CardHeader, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
import { _appRelated } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function AppTopRelated() {
  return (
    <Card>
      <CardHeader title="Top Related Applications" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_appRelated.map((app) => (
            <ApplicationItem key={app.id} app={app} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    review: PropTypes.number,
    shortcut: PropTypes.string,
    system: PropTypes.string,
  }),
};

function ApplicationItem({ app }) {
  const theme = useTheme();
  const { shortcut, system, price, rating, review, name } = app;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <Image src={shortcut} alt={name} sx={{ width: 24, height: 24 }} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          <Iconify
            width={16}
            height={16}
            icon={system === 'Mac' ? 'ant-design:apple-filled' : 'ant-design:windows-filled'}
          />
          <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            {system}
          </Typography>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={price === 0 ? 'success' : 'error'}
          >
            {price === 0 ? 'Free' : fCurrency(price)}
          </Label>
        </Stack>
      </Box>

      <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        <Rating readOnly size="small" precision={0.5} name="reviews" value={rating} />
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {fShortenNumber(review)}&nbsp;reviews
        </Typography>
      </Stack>
    </Stack>
  );
}
