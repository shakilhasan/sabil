// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Total Booking" total={714000} icon={<BookingIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Check In" total={311000} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Check Out" total={124000} icon={<CheckOutIllustration />} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingRoomAvailable />
          </Grid>

          <Grid item xs={12} md={8}>
            <BookingReservationStats />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid>

          <Grid item xs={12}>
            <BookingNewestBooking />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
