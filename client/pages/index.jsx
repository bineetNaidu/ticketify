import Axios from 'axios';
import React from 'react';
import buildClient from '../api/buildClient';

const Index = ({ currentUser }) => {
  return (
    <div className="container">
      {currentUser === null ? (
        <h1 className="text-center">Your are sign out</h1>
      ) : (
        <h1 className="text-center">Your are signed in</h1>
      )}
    </div>
  );
};

Index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/currentuser');
  console.log(data);
  return data;
};

export default Index;

// http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser
