export class AnswerVo {
  constructor(
    public readonly questionId: string,
    public readonly answerText?: string,
  ) {}
}
