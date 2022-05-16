import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  query: PropTypes.string,
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ query, options, onSort }) {
  return (
    <TextField select size="small" value={query} onChange={(e) => onSort(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
