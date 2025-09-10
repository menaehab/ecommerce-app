import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
  const location = useLocation();

  // نقسم المسار اللي في URL
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div role="presentation" style={{ marginBottom: '16px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          component={RouterLink}
          color="primary"
          to="/"
        >
          Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={name} sx={{ color: 'text.primary' }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          ) : (
            <Link
              key={name}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={routeTo}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
