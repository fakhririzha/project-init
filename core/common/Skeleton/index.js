import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => (
    <Grid container wrap='nowrap'>
        <Box sx={{ width: '50vw', mx: '25vw', my: '10vh' }}>
            <Skeleton variant='rectangular' width='100%' height={250} />
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
            </Box>
        </Box>
    </Grid>
);

export default SkeletonLoader;
