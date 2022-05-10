import { ReducerRegistry } from '../ReducerRegistry';
import { EpicRegistry } from '../EpicRegistry';
import { actions, ActionType } from './actions';
import { initialState } from './state';
import { reducer } from './reducer';
import { epics } from './epics';

export const workerState = { initialState, reducer, actions, ActionType, epics };

ReducerRegistry.register('worker', reducer);
epics.forEach(epic => EpicRegistry.addEpic(epic));
