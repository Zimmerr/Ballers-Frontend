export interface OAuthUrl {
  authorization_url: string;
}

export interface OAuthCredential {
  state: string;
  code: string;
}

export interface Perfil {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}