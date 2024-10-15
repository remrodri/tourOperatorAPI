export class QuestionVo {
  constructor(
    public readonly questionId: string,
    public readonly questionText?: string,
    public readonly answerId?: string,
  ) {}
}
