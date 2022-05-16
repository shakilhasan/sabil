import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import {useLocation} from "react-router-dom";
import {checkPermissionAccess} from "../helpers/checkPermission";

// ----------------------------------------------------------------------
RoleGuard.propTypes = {
  children: PropTypes.node
};

export default function RoleGuard({ children }) {
  const { pathname } = useLocation();
  console.log("RoleGuard path:-",pathname)
  if (!checkPermissionAccess(pathname)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
