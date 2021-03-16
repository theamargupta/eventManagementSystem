import React, { useEffect, useState } from 'react';

const GetProfile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // eslint-disable-next-line no-sequences
      return setProfile(user), console.log(user);
    }
  }, []);
  console.log(profile);
  return <div>GetProfile</div>;
};

export default GetProfile;
