import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Radio,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
//
import PaymentNewCardForm from './PaymentNewCardForm';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    icons: [
      'https://minimal-assets-api.vercel.app/assets/icons/ic_mastercard.svg',
      'https://minimal-assets-api.vercel.app/assets/icons/ic_visa.svg',
    ],
  },
];
const CARD_OPTIONS = [
  {
    value: 'visa1',
    label: '**** **** **** 1212 - Jimmy Holland',
  },
  {
    value: 'visa2',
    label: '**** **** **** 2424 - Shawn Stokes',
  },
  {
    value: 'mastercard',
    label: '**** **** **** 4545 - Cole Armstrong',
  },
];

const OptionStyle = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

export default function PaymentMethods() {
  const [show, setShow] = useState(false);

  const [method, setMethod] = useState('paypal');

  const handleCollapseIn = () => {
    if (method !== 'paypal') {
      setShow(!show);
    }
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  const handleChangeMethod = (event) => {
    if (method === 'paypal') {
      setShow(false);
    }
    setMethod(event.target.value);
  };

  return (
    <div>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Payment Method
      </Typography>

      <RadioGroup value={method} onChange={handleChangeMethod}>
        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((option) => {
            const { value, title, icons } = option;

            const hasChildren = value === 'credit_card';

            const isSelected = method === value;

            return (
              <OptionStyle
                key={title}
                sx={{
                  ...(isSelected && {
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                  ...(hasChildren && { flexWrap: 'wrap' }),
                }}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                  label={
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {title}
                    </Typography>
                  }
                  sx={{ py: 3, mx: 0 }}
                />

                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ position: 'absolute', right: 20, top: 32 }}
                >
                  {icons.map((icon) => (
                    <Image key={icon} alt="logo card" src={icon} />
                  ))}
                </Stack>

                {hasChildren && (
                  <Collapse in={method === 'credit_card'} sx={{ width: 1 }}>
                    <TextField select fullWidth label="Card" SelectProps={{ native: true }}>
                      {CARD_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <Button
                      size="small"
                      startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                      onClick={handleCollapseIn}
                      sx={{ my: 3 }}
                    >
                      Add new card
                    </Button>

                    <Collapse in={show}>
                      <PaymentNewCardForm onCancel={handleCollapseOut} />
                    </Collapse>
                  </Collapse>
                )}
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>
    </div>
  );
}
