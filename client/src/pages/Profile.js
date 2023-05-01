import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getRefreshToken, getUserProfile } from "../services/UserServices";

const Profile = () => {
  const location = useLocation();
  const { state } = location;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchUserProfile = async () => {
    try {
      console.log(state.id);
      const response = await getUserProfile(state.id);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setUser(null);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      const refreshToken = await getRefreshToken();
      console.log(refreshToken);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 1000 * 20);
    return () => clearInterval(interval);
  }, [handleRefresh]);
  return (
    <div>
      <h2>User Profile:</h2>
      {/* <h2>{user.isAdmin ? "Admin" : "User"} Profile</h2> */}
      <div>
        {isLoading && <p>Profile is Loading!</p>}
        {error && <p style={{ color: "orange" }}>{error}</p>}
        {user && (
          <div>
            <h3>Name:{user.name}</h3>
            <p>Email:{user.email}</p>
            <p>Phone:{user.phone}</p>
            <div>
              <button>Update</button>
              <button>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
