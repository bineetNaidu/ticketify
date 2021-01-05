import React from 'react';

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
  return {};
};

export default Index;

// http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser
