import React, { useEffect, useState } from 'react';

const GetProfile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return setProfile(user), console.log(user);
    }
  }, [setProfile]);
  return <div>GetProfile</div>;
};

export default GetProfile;
