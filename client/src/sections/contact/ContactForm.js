// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack spacing={5}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h3">
          Feel free to contact us. <br />
          We'll be glad to hear from you, buddy.
        </Typography>
      </MotionInView>

      <Stack spacing={3}>
        <MotionInView variants={varFade().inUp}>
          <TextField fullWidth label="Name" />
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <TextField fullWidth label="Email" />
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <TextField fullWidth label="Subject" />
        </MotionInView>

        <MotionInView variants={varFade().inUp}>
          <TextField fullWidth label="Enter your message here." multiline rows={4} />
        </MotionInView>
      </Stack>

      <MotionInView variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </MotionInView>
    </Stack>
  );
}
