import Link from 'next/link';

const Header = ({ currentUser }) => {
  const ifCurrentUserShowLinks = [
    { label: 'Sell Tickets', href: '/tickets/new' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Sign Out', href: '/auth/signout' },
  ].map(({ label, href }) => {
    return (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    );
  });

  const ifNotCurrentUserShowLinks = [
    { label: 'Sign Up', href: '/auth/signup' },
    { label: 'Sign In', href: '/auth/signin' },
  ].map(({ label, href }) => {
    return (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Ticketify</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {currentUser ? ifCurrentUserShowLinks : ifNotCurrentUserShowLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
