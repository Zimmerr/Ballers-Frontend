import React, { useEffect } from "react";
import useGoogleAuthToken from "./hooks/useGoogleAuthToken";
import useGoogleAuthLink from "./hooks/useGoogleAuthLink";
import usePerfil from "./hooks/usePerfil";

function App() {
  const { data: profile, refetch: fetchProfile } = usePerfil();
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink();
  const { mutate, isSuccess } = useGoogleAuthToken();

  useEffect(() => {   
    if (googleAuth) {
      window.location.replace(googleAuth.authorization_url);
    }
  }, [googleAuth]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log(code)
    console.log(state)

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
        <h1>Hello {profile.nome}!</h1>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;