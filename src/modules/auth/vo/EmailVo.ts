export class EmailVo {
  private readonly email: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error("Invalid email addres");
    }
    this.email = email;
  }

  private validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public get value(): string {
    return this.email;
  }
}
