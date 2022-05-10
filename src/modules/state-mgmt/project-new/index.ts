import { ReducerRegistry } from '../ReducerRegistry';
import { EpicRegistry } from '../EpicRegistry';
import { initialState } from './state';
import { actions, ActionType } from './actions';
import { reducer } from './reducer';
import { epics } from './epics';

export const projectNewState = { initialState, reducer, actions, ActionType, epics };

ReducerRegistry.register('projectNew', reducer);
epics.forEach(epic => EpicRegistry.addEpic(epic));
