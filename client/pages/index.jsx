import Axios from 'axios';
import React from 'react';

const Index = ({ currentUser }) => {
  console.log(props);
  return (
    <div>
      <h1>Index File</h1>
    </div>
  );
};

Index.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // On server!
    const { data } = await Axios.get(
      'http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      },
    );
    return data;
  } else {
    // on Browser!
    const { data } = await Axios.get('/api/users/currentuser');
    return data;
  }
};

export default Index;

// http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser
