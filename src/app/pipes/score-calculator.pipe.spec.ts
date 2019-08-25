import { ScoreCalculatorPipe } from './score-calculator.pipe';

describe('ScoreCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new ScoreCalculatorPipe();
    expect(pipe).toBeTruthy();
  });
});
