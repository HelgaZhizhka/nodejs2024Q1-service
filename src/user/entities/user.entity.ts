export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  setPassword(password: string) {
    this.password = password;
  }

  incrementVersion() {
    this.version++;
  }

  setUpdatedAt() {
    this.updatedAt = Date.now();
  }
}
