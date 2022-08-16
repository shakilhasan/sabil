import PropTypes from 'prop-types';
import isString from 'lodash/isString';
// @mui
import { LoadingButton } from '@mui/lab';
import { alpha } from '@mui/material/styles';
import { Box, Button, Container, Typography, DialogActions } from '@mui/material';
// components
import Image from '../../../components/Image';
import Markdown from '../../../components/Markdown';
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
import { DialogAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

BlogNewPostPreview.propTypes = {
  values: PropTypes.object,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default function BlogNewPostPreview({ values, isValid, isSubmitting, isOpen, onClose, onSubmit }) {
  const { title, content, description } = values;

  const cover = isString(values.cover) ? values.cover : values.cover?.preview;

  const hasContent = title || description || content || cover;

  const hasHero = title || cover;

  return (
    <DialogAnimate fullScreen open={isOpen} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Preview Post
        </Typography>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton type="submit" variant="contained" disabled={!isValid} loading={isSubmitting} onClick={onSubmit}>
          Post
        </LoadingButton>
      </DialogActions>

      {hasContent ? (
        <Scrollbar>
          {hasHero && <PreviewHero title={title || ''} cover={cover} />}
          <Container>
            <Box sx={{ mt: 5, mb: 10 }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {description}
              </Typography>
              <Markdown children={content || ''} />
            </Box>
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

PreviewHero.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
};

function PreviewHero({ title, cover }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          pt: { xs: 3, lg: 10 },
        }}
      >
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Container>

      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8,
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        }}
      />
      <Image alt="cover" src={cover} ratio="16/9" />
    </Box>
  );
}
