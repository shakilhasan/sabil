import { Autocomplete, InputAdornment, Link, Popper, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/Iconify';
// components
import Image from '../../../../components/Image';
import InputStyle from '../../../../components/InputStyle';
import SearchNotFound from '../../../../components/SearchNotFound';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import {searchProducts} from "../../../../helpers/backend_helper";


// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function ShopProductSearch() {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await searchProducts({name:value,pageSize:20});
        if (isMountedRef.current) {
          setSearchResults(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (id) => {
    // navigate(`${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(name)}`);
    navigate(`${PATH_DASHBOARD.eCommerce.root}/product/${id}`);

  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);  // todo, pass _id
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product) => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder="Search product..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { _id, name, cover } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
          <li {...props}>
            <Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />
            <Link underline="none" onClick={() => handleClick(_id)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
