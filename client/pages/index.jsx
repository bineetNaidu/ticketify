import React from 'react';
import Link from 'next/link';

const Index = ({ currentUser, tickets }) => {
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>${ticket.price}</td>
              <td>
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                  <a>View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');
  return { tickets: data };
};

export default Index;

// http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser
