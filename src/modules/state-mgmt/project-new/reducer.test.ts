import { reducer } from './reducer';
import { initialState } from './state';

describe('project-new reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });
});
