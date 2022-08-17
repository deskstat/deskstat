export interface IAppSettings {
  _id?: string;
  _rev?: string;
  theme: string;
  shouldOpenOnStart: boolean;
}

export interface IPomodoroSettings {
  _id?: string;
  _rev?: string;
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  remindBefore: number;
}

export interface SettingsState {
  appSettings: IAppSettings;
  pomodoroSettings: IPomodoroSettings;
}
