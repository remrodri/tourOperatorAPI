export class UserQuestionsAnswersV3vo {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly questionsAnswers: [any, any],
  ) {}
}
