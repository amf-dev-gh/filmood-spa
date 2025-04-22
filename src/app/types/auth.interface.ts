export interface LoginCredentials {
  username: string,
  password: string
}

export interface LoginResponse {
  username: string,
  role: string,
  token: string,
  expirationTime: number
}

export interface RegisterResponse {
  username: string,
  rol: string
}

export interface RegisterUser {
  fullName: string,
  username: string,
  password: String
}