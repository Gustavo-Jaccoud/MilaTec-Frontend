import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { authSession } from '@/services/authSession';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const displayNameFromEmail = email => {
  const normalized = (email || '').trim();

  if (!normalized) {
    return 'Usuário';
  }

  const local = normalized.split('@')[0] || '';
  const words = local.replace(/[._-]+/g, ' ').trim();

  if (!words) {
    return 'Usuário';
  }

  return words
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

const avatarLetter = (email, displayName) => {
  const fromName = (displayName || '').trim().charAt(0);
  if (fromName) {
    return fromName.toUpperCase();
  }

  const fromEmail = (email || '').trim().charAt(0);
  return fromEmail ? fromEmail.toUpperCase() : 'U';
};

const SidebarUserMenu = () => {
  const email = authSession.getUserEmail();
  const displayName = displayNameFromEmail(email);
  const initial = avatarLetter(email, displayName);

  return (
    <div className="milatec-sidebar-user-wrap">
      <Dropdown drop="up" align="start" className="milatec-sidebar-user-dropdown">
        <Dropdown.Toggle
          aria-label="Menu da conta"
          className="milatec-sidebar-user-avatar milatec-sidebar-user-toggle"
          variant="link"
        >
          {initial}
        </Dropdown.Toggle>
        <Dropdown.Menu className="milatec-sidebar-user-menu border-0 py-0">
          <div className="milatec-sidebar-user-panel">
            <div className="milatec-sidebar-user-name">{displayName}</div>
            <div className="milatec-sidebar-user-email text-truncate" title={email || undefined}>
              {email || '—'}
            </div>
            <div className="milatec-sidebar-user-divider" />
            <Dropdown.Item as={Link} className="milatec-sidebar-user-logout" to="/auth/logout">
              <IconifyIcon className="milatec-sidebar-user-logout-icon" icon="ri:logout-box-r-line" />
              <span>Sair</span>
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SidebarUserMenu;
