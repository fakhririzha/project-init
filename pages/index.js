import Content from '@modules/backend/home/content';
import Layout from '@modules/backend/layout';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { getLoginInfo } from 'core/helpers/auth';
import React from 'react';

import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const position = {
        vertical: 'bottom',
        horizontal: 'center',
    };
    const { vertical, horizontal } = position;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const isLogin = getLoginInfo();

    if (isLogin) {
        return (
            <Layout
                pageProps={{
                    title: 'Website Title',
                    description: 'Website Title',
                }}
            >
                <Content />
            </Layout>
        );
    }

    React.useEffect(() => {
        if (!isLogin) router.push('/login');
    }, []);

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={3500}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity='error'
                sx={{ width: '100%' }}
            >
                You dont have permission to open this page!
            </Alert>
        </Snackbar>
    );
};

export default Index;
