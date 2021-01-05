import buildClient from '../api/buildClient';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Header from '../components/Header';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <Head>
        <title>Ticketify App</title>
      </Head>
      <div>
        <Header />
        <div className="container">
          <Component {...pageProps} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (Component.getInitialProps)
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
