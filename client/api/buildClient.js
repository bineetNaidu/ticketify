import Axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return Axios.create({
      baseURL: 'http://ingress-nginx-controller.kube-system.svc.cluster.local/',
      headers: req.headers,
    });
  } else {
    return Axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
