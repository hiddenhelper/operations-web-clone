import { ReducerRegistry } from '../ReducerRegistry';
import { EpicRegistry } from '../EpicRegistry';
import { initialState } from './state';
import { actions, ActionType } from './actions';
import { reducer } from './reducer';
import { epics } from './epics';

export const procoreState = { reducer, initialState, actions, ActionType, epics };

ReducerRegistry.register('procore', reducer);
epics.forEach(epic => EpicRegistry.addEpic(epic));
