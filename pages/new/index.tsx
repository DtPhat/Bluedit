import Layout from '../../components/layout';
import NewPost from '../../components/creating'
import Head from 'next/head';
function New() {
    return (
        <>
            <Head>
                <title>Submit to Bluedit</title>
            </Head>
            <Layout>
                <NewPost/>
            </Layout>
        </>
    );
}

export default New;