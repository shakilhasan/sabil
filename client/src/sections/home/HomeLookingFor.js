// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Grid } from '@mui/material';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeLookingFor() {
  return (
    <RootStyle>
      <Container>
        <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 8, md: 3 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <MotionInView variants={varFade().inDown}>
              <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
                Looking For a
              </Typography>
            </MotionInView>

            <MotionInView variants={varFade().inDown}>
              <Typography variant="h2" sx={{ mt: 2, mb: 5 }}>
                Landing Page Template?
              </Typography>
            </MotionInView>

            <MotionInView variants={varFade().inDown}>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                target="_blank"
                rel="noopener"
                href="https://material-ui.com/store/items/zone-landing-page/"
                endIcon={<Iconify icon={'ic:round-arrow-right-alt'} />}
              >
                Visit Zone Landing
              </Button>
            </MotionInView>
          </Grid>

          <Grid item xs={12} md={7}>
            <MotionInView
              variants={varFade().inUp}
              sx={{
                mb: { xs: 3, md: 0 },
              }}
            >
              <Image
                disabledEffect
                alt="rocket"
                src="https://minimal-assets-api.vercel.app/assets/images/home/zone_screen.png"
              />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
