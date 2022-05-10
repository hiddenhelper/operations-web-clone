import { ReducerRegistry } from '../ReducerRegistry';
import { EpicRegistry } from '../EpicRegistry';
import { actions, ActionType } from './actions';
import { initialState } from './state';
import { reducer } from './reducer';
import { epics } from './epics';

export const invoiceState = { initialState, reducer, actions, ActionType, epics };

ReducerRegistry.register('invoice', reducer);
epics.forEach(epic => EpicRegistry.addEpic(epic));
