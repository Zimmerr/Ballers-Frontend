import React, { useEffect, useState } from "react";
import useGoogleAuthToken from "../../../hooks/useGoogleAuthToken";
import useGoogleAuthLink from "../../../hooks/useGoogleAuthLink";
import usePerfil from "../../../hooks/usePerfil";
import { useHistory } from "react-router-dom";
import "./style.scss"
import logo from "../../../assets/ballers_logo.png"
import LoginButton from "../../Shareable/LoginButton";
import { Spin } from "antd";

const Login = () => {
  const { data: profile, refetch: fetchProfile } = usePerfil();
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink();
  const { mutate, isSuccess } = useGoogleAuthToken();
  const [carregando, setCarregando] = useState(false);

  const history = useHistory();

  useEffect(() => {
    console.log('1')
    console.log(isSuccess)
    console.log(googleAuth)
    if (profile) {
      console.log('2')
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
      setCarregando(true)
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
    <Spin spinning={carregando} tip={"Carregando..."} fullscreen={carregando}>
    <div className="App login-screen">
      
        <div className="login-container">
          <div className="img">
            <img src={logo} alt="Logo" />
          </div>
    
          <p className="texto"> Bem-vindo ao Ballers! Faça a autenticação através do Google para acessar o sistema:</p>
          <LoginButton handleLogin={handleGoogleLogin}/>
        </div>
      
      
    </div>
    </Spin>
  );
};

export default Login;
