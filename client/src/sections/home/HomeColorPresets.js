import { capitalCase } from 'change-case';
import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Radio,
  Tooltip,
  Container,
  Typography,
  RadioGroup,
  CardActionArea,
  FormControlLabel,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
}));

// ----------------------------------------------------------------------

export default function HomeColorPresets() {
  const { themeColorPresets, onChangeColor, colorOption } = useSettings();

  return (
    <RootStyle>
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <MotionInView variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
            choose your style
          </Typography>
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Color presets
          </Typography>
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <Typography
            sx={{
              color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary'),
            }}
          >
            Express your own style with just one click.
          </Typography>
        </MotionInView>

        <RadioGroup name="themeColorPresets" value={themeColorPresets} onChange={onChangeColor} sx={{ my: 5 }}>
          <Stack
            direction={{ xs: 'row', lg: 'column' }}
            justifyContent="center"
            spacing={1}
            sx={{
              position: { lg: 'absolute' },
              right: { lg: 0 },
            }}
          >
            {colorOption.map((color) => {
              const colorName = color.name;
              const colorValue = color.value;
              const isSelected = themeColorPresets === colorName;

              return (
                <Tooltip key={colorName} title={capitalCase(colorName)} placement="right">
                  <CardActionArea sx={{ color: colorValue, borderRadius: '50%', width: 32, height: 32 }}>
                    <Box
                      sx={{
                        width: 1,
                        height: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        ...(isSelected && {
                          borderStyle: 'solid',
                          borderWidth: 4,
                          borderColor: alpha(colorValue, 0.24),
                        }),
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: colorValue,
                          ...(isSelected && {
                            width: 14,
                            height: 14,
                            transition: (theme) =>
                              theme.transitions.create('all', {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.shorter,
                              }),
                          }),
                        }}
                      />
                      <FormControlLabel
                        label=""
                        value={colorName}
                        control={<Radio sx={{ display: 'none' }} />}
                        sx={{
                          top: 0,
                          left: 0,
                          margin: 0,
                          width: 1,
                          height: 1,
                          position: 'absolute',
                        }}
                      />
                    </Box>
                  </CardActionArea>
                </Tooltip>
              );
            })}
          </Stack>
        </RadioGroup>

        <Box sx={{ position: 'relative' }}>
          <Image
            disabledEffect
            alt="grid"
            src="https://minimal-assets-api.vercel.app/assets/images/home/theme-color/grid.png"
          />

          <Box sx={{ position: 'absolute', top: 0 }}>
            <MotionInView variants={varFade().inUp}>
              <Image
                disabledEffect
                alt="screen"
                src={`https://minimal-assets-api.vercel.app/assets/images/home/theme-color/screen-${themeColorPresets}.png`}
              />
            </MotionInView>
          </Box>

          <Box sx={{ position: 'absolute', top: 0 }}>
            <MotionInView variants={varFade().inDown}>
              <m.div animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity }}>
                <Image
                  disabledEffect
                  alt="sidebar"
                  src={`https://minimal-assets-api.vercel.app/assets/images/home/theme-color/block1-${themeColorPresets}.png`}
                />
              </m.div>
            </MotionInView>
          </Box>

          <Box sx={{ position: 'absolute', top: 0 }}>
            <MotionInView variants={varFade().inDown}>
              <m.div animate={{ y: [-5, 10, -5] }} transition={{ duration: 8, repeat: Infinity }}>
                <Image
                  disabledEffect
                  alt="sidebar"
                  src={`https://minimal-assets-api.vercel.app/assets/images/home/theme-color/block2-${themeColorPresets}.png`}
                />
              </m.div>
            </MotionInView>
          </Box>

          <Box sx={{ position: 'absolute', top: 0 }}>
            <MotionInView variants={varFade().inDown}>
              <m.div animate={{ y: [-25, 5, -25] }} transition={{ duration: 10, repeat: Infinity }}>
                <Image
                  disabledEffect
                  alt="sidebar"
                  src={`https://minimal-assets-api.vercel.app/assets/images/home/theme-color/sidebar-${themeColorPresets}.png`}
                />
              </m.div>
            </MotionInView>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
