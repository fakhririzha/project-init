import Head from 'next/head';

const Layout = (props) => {
    const { children, pageProps } = props;

    return (
        <>
            <Head>
                <meta
                    name='keywords'
                    content={
                        pageProps.title ? pageProps.title : 'Website Title'
                    }
                />
                <meta
                    name='viewport'
                    content='initial-scale=1, width=device-width'
                />
                <meta name='format-detection' content='telephone=no' />
                {pageProps.title ? (
                    <title>{pageProps.title}</title>
                ) : (
                    'Website Title'
                )}
                {pageProps.description && (
                    <meta
                        name='description'
                        content={pageProps.description || 'Website Title'}
                    />
                )}
            </Head>
            <div>{children}</div>
        </>
    );
};

export default Layout;
