import React, { useEffect } from "react";
import useGoogleAuthToken from "../../../hooks/useGoogleAuthToken";
import useGoogleAuthLink from "../../../hooks/useGoogleAuthLink";
import usePerfil from "../../../hooks/usePerfil";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { data: profile, refetch: fetchProfile } = usePerfil();
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink();
  const { mutate, isSuccess } = useGoogleAuthToken();

  const history = useHistory();

  useEffect(() => {
    if (profile) {
      history.push("/landing");
    }
  }, [profile, history]);

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorization_url);
    }
  }, [googleAuth]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      mutate({ code, state });
    }
  }, [mutate]);

  useEffect(() => {
    if (isSuccess) {
      fetchProfile();
    }
  }, [isSuccess, fetchProfile]);

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorization_url);
    }
  }, [googleAuth]);

  const handleGoogleLogin = () => {
    fetchGoogleAuth();
  };

  return (
    <div className="App">
      {profile ? (
        <h1>Hello {profile.first_name}!</h1>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Login;
