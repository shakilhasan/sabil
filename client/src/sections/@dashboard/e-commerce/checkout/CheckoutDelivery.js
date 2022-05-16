import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Radio,
  Stack,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

CheckoutDelivery.propTypes = {
  deliveryOptions: PropTypes.array,
  onApplyShipping: PropTypes.func,
};

export default function CheckoutDelivery({ deliveryOptions, onApplyShipping }) {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader title="Delivery options" />
      <CardContent>
        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(event) => {
                const { value } = event.target;
                field.onChange(Number(value));
                onApplyShipping(Number(value));
              }}
            >
              <Stack spacing={2} alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                {deliveryOptions.map((delivery) => {
                  const selected = field.value === delivery.value;

                  return (
                    <OptionStyle
                      key={delivery.value}
                      sx={{
                        ...(selected && {
                          boxShadow: (theme) => theme.customShadows.z20,
                        }),
                      }}
                    >
                      <FormControlLabel
                        value={delivery.value}
                        control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                        label={
                          <Box sx={{ ml: 1 }}>
                            <Typography variant="subtitle2">{delivery.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {delivery.description}
                            </Typography>
                          </Box>
                        }
                        sx={{ py: 3, flexGrow: 1, mr: 0 }}
                      />
                    </OptionStyle>
                  );
                })}
              </Stack>
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
}
