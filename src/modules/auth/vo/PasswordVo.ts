export class PasswordVo {
  private readonly password: string;

  constructor(password: string) {
    if (!this.validatePassword(password)) {
      throw new Error("Password must be at leat 6 characteres");
    }
    this.password = password;
  }

  private validatePassword(password: string) {
    return password.length >= 6;
  }

  public get value(): string {
    return this.password;
  }
}
