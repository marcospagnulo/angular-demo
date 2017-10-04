import { combineReducers } from 'redux';
import { ConfigReducer, Config } from './config.reducer';
import { DevicesReducer } from './devices.reducer';
import { UserReducer } from './user.reducer';
import { Device } from '../model/device';
import { User } from '../model/user';

export class IAppState {
  config?: Config;
  devices?: Device;
  user?: User;
}

export const rootReducer = combineReducers<IAppState>({
  config: ConfigReducer,
  devices: DevicesReducer,
  user: UserReducer
});
