import React, { useState } from 'react';

import './ProfileMenu.css';
import { fakeProfile, useProfileContext } from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonColors } from '../Button';
import SidePanel from '../SidePanel';
import TextInput from '../TextInput';
import Skeleton from '../Skeleton';

export default function ProfileMenu(): JSX.Element {
  const { profile, setProfile } = useProfileContext();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(!profile);

  function simulateLogin(useFakeProfile = false) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (useFakeProfile) {
        setProfile(fakeProfile);
      }
    }, 1000);
  }

  React.useEffect(() => {
    simulateLogin();
  }, []);

  function handleLogin() {
    setShowLogin(false);
    simulateLogin(true);
  }

  function handleLogout() {
    setProfile(null);
    setShowProfile(false);
    setEmail('');
    setPassword('');
  }

  function handleToggleProfile() {
    setShowProfile(!showProfile);
  }

  return (
    <div className="profile-menu" data-testid="profile-menu">
      {profile || loading ? (
        <div
          className={`profile-image-container ${loading ? 'loading' : ''}`}
          onClick={() => {
            profile && handleToggleProfile();
          }}
        >
          <Skeleton loading={loading}>
            <h2>{profile?.name || 'Lorem Ipsum'}</h2>
          </Skeleton>
          <Skeleton loading={loading}>
            <img
              src={profile?.profileImage || ''}
              alt="profile"
              className="profile-image"
            />
          </Skeleton>
        </div>
      ) : (
        <Button
          text="Login"
          onClick={() => setShowLogin(true)}
          data-testid="profile-login"
        />
      )}
      <SidePanel show={showLogin} onClose={() => setShowLogin(false)}>
        <h2>Login your account</h2>
        <div className="form">
          <TextInput placeholder="Email" value={email} onChange={setEmail} />
          <TextInput
            placeholder="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <Button
            text="Login"
            onClick={handleLogin}
            color={ButtonColors.accent}
          />
        </div>
      </SidePanel>
      <SidePanel show={showProfile} onClose={() => setShowProfile(false)}>
        <h2>My Profile</h2>
        <div className="profile">
          <div className="profile-group">
            <img
              src={profile?.profileImage || ''}
              alt="profile"
              className="profile-image-large"
            />
            <h1>{profile?.name || 'Lorem Ipsum'}</h1>
          </div>
          <p>{profile?.email || 'Lorem Ipsum'}</p>
          <Button
            text="Logout"
            onClick={handleLogout}
            color={ButtonColors.accent}
          />
        </div>
      </SidePanel>
    </div>
  );
}
