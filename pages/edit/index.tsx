import Head from 'next/head';
import Edit from '../../components/editing'
import Layout from '../../components/layout';
function EditPage() {
    return (
        <>
            <Head>
                <title>Submit to Bluedit</title>
            </Head>
            <Layout>
                <Edit />
            </Layout>
        </>
    );
}


export default EditPage;