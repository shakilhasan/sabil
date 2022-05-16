// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock';
// components
import Page from '../components/Page';
// sections
import { PricingPlanCard } from '../sections/pricing';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> community&apos;s size and needs
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and make modern online conversation magic
          </Typography>

          <Box sx={{ my: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Typography variant="overline" sx={{ mr: 1.5 }}>
                MONTHLY
              </Typography>
              <Switch />
              <Typography variant="overline" sx={{ ml: 1.5 }}>
                YEARLY (save 10%)
              </Typography>
            </Stack>
            <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>
              * Plus applicable taxes
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {_pricingPlans.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard card={card} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
