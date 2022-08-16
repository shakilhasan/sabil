// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Container, Typography, useTheme } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const IMG = [...Array(10)].map(
  (_, index) => `https://minimal-assets-api.vercel.app/assets/images/home/clean-${index + 1}.png`
);

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    zIndex: 11,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <MotionInView variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              clean & clear
            </Typography>
          </MotionInView>

          <MotionInView variants={varFade().inUp}>
            <Typography
              variant="h2"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              Beautiful, modern and clean user interfaces
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Box sx={{ position: 'relative' }}>
          {IMG.map((_, index) => (
            <MotionInView
              key={index}
              variants={varFade().inUp}
              sx={{
                top: 0,
                left: 0,
                position: 'absolute',
                ...(index === 0 && { zIndex: 8 }),
                ...(index === 9 && { position: 'relative', zIndex: 9 }),
              }}
            >
              <Image
                disabledEffect
                visibleByDefault
                alt={`clean-${index + 1}`}
                src={`https://minimal-assets-api.vercel.app/assets/images/home/clean-${index + 1}.png`}
              />
            </MotionInView>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
