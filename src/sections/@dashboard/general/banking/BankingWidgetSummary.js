import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import BaseOptionChart from '../../../../components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  width: '100%',
  boxShadow: 'none',
  position: 'relative',
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(3),
  right: theme.spacing(3),
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

BankingWidgetSummary.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function BankingWidgetSummary({ title, total, icon, percent, color = 'primary', chartData }) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette[color].main],
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 4 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fCurrency(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } },
  });

  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].lighter,
          bgcolor: (theme) => theme.palette[color].dark,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography sx={{ typography: 'subtitle2' }}>{title}</Typography>
        <Typography sx={{ typography: 'h3' }}>{fCurrency(total)}</Typography>
        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <Iconify width={20} height={20} icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
            &nbsp;than last month
          </Typography>
        </Stack>
      </Stack>

      <ReactApexChart type="area" series={[{ data: chartData }]} options={chartOptions} height={120} />
    </RootStyle>
  );
}
