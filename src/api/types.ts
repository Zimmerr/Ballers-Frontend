export interface OAuthUrl {
  authorization_url: string;
}

export interface OAuthCredential {
  state: string;
  code: string;
}

export interface Perfil {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
}