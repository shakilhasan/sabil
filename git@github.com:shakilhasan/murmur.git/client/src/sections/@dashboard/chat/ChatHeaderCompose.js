import PropTypes from 'prop-types';
import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, TextField, Typography, Autocomplete, Chip } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
}));

const AutocompleteStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    minWidth: 280,
    marginLeft: theme.spacing(2),
    '&.Mui-focused .MuiAutocomplete-inputRoot': {
      boxShadow: theme.customShadows.z8,
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  },
}));

// ----------------------------------------------------------------------

ChatHeaderCompose.propTypes = {
  contacts: PropTypes.array,
  recipients: PropTypes.array,
  onAddRecipients: PropTypes.func,
};

export default function ChatHeaderCompose({ contacts, recipients, onAddRecipients }) {
  const [query, setQuery] = useState('');

  const handleAddRecipients = (recipients) => {
    setQuery('');
    onAddRecipients(recipients);
  };

  return (
    <RootStyle>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        To:
      </Typography>

      <AutocompleteStyle>
        <Autocomplete
          multiple
          size="small"
          disablePortal
          popupIcon={null}
          noOptionsText={<SearchNotFound searchQuery={query} />}
          onChange={(event, value) => handleAddRecipients(value)}
          onInputChange={(event, value) => setQuery(value)}
          options={contacts}
          getOptionLabel={(recipient) => recipient.name}
          renderOption={(props, recipient, { inputValue, selected }) => {
            const { name, avatar } = recipient;
            const matches = match(name, inputValue);
            const parts = parse(name, matches);
            return (
              <Box component="li" sx={{ p: '12px !important' }} {...props}>
                <Box
                  sx={{
                    mr: 1.5,
                    width: 32,
                    height: 32,
                    overflow: 'hidden',
                    borderRadius: '50%',
                    position: 'relative',
                  }}
                >
                  <Avatar alt={name} src={avatar} />
                  <Box
                    sx={{
                      top: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                      transition: (theme) =>
                        theme.transitions.create('opacity', {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.shorter,
                        }),
                      ...(selected && {
                        opacity: 1,
                        color: 'primary.main',
                      }),
                    }}
                  >
                    <Iconify icon="eva:checkmark-fill" width={20} height={20} />
                  </Box>
                </Box>

                {parts.map((part, index) => (
                  <Typography key={index} variant="subtitle2" color={part.highlight ? 'primary' : 'textPrimary'}>
                    {part.text}
                  </Typography>
                ))}
              </Box>
            );
          }}
          renderTags={(recipients, getTagProps) =>
            recipients.map((recipient, index) => {
              const { id, name, avatar } = recipient;
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={id}
                  size="small"
                  label={name}
                  color="info"
                  avatar={<Avatar alt={name} src={avatar} />}
                />
              );
            })
          }
          renderInput={(params) => <TextField {...params} placeholder={recipients.length === 0 ? 'Recipients' : ''} />}
        />
      </AutocompleteStyle>
    </RootStyle>
  );
}
