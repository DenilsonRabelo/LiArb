import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { ReactTyped } from 'react-typed';

interface PageTitleProps {
  title: string;
  content?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, content }) => {
  return (
    <>
      <Box sx={{
        mt: 2,
        mb: 4,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          <ReactTyped
            strings={[title]}
            typeSpeed={50}
            backSpeed={30}
            loop={true}
          />
        </Typography>
        {content && (
          <Typography variant="body1" sx={{ ml: 2 }} style={{ marginTop: 10 }}>
            {content}
          </Typography>
        )}
      </Box>
      <Divider sx={{ width: '100%', mb: 4 }} />
    </>
  );
};

export default PageTitle;
