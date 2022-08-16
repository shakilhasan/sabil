// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { ComponentHero, ComponentOther, ComponentFoundation, ComponentMUI } from '../sections/overview';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function ComponentsOverview() {
  return (
    <Page title="Components Overview">
      <RootStyle>
        <ComponentHero />
        <Container>
          <ComponentFoundation />
          <ComponentMUI />
          <ComponentOther />
        </Container>
      </RootStyle>
    </Page>
  );
}
