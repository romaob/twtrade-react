import React, {createContext, useState} from 'react';


export type Profile = {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
}

export const fakeProfile: Profile = {
    _id: '655f77fc4a26857b76d33703',
    name: 'Omar Hessel',
    email: 'Oma_Sauer98@mail.com',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
}

type ProfileContextType = {
  profile?: Profile | null;
  setProfile: (profile: Profile | null) => void;
};

export const ProfileContext = createContext<ProfileContextType>({
    profile: undefined,
    setProfile: () => {/**/},
});

export const useProfileContext = () => React.useContext(ProfileContext);

export const ProfileContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <ProfileContext.Provider value={{profile, setProfile}}>
      {children}
    </ProfileContext.Provider>
  );
};