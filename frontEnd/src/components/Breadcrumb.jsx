import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function Breadcrumb({ paths, pageName }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          className="cursor-pointer"
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/"
        >
          Home
        </Link>
        {paths.map((path, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={path.link}
          >
            {path.name}
          </Link>
        ))}
        <Typography sx={{ color: 'text.primary' }}>{pageName}</Typography>
      </Breadcrumbs>
    </div>
  );
}
