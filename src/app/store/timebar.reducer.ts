export interface Timebar {
  timeslices: any[];
  selectedTimeslice: number;
  timebarLoading: boolean;
}

const DEFAULTS: Timebar = {
  timeslices: [],
  selectedTimeslice: null,
  timebarLoading: false
};

export function TimebarReducer(state: Timebar = DEFAULTS, action: any ): any {

  switch (action.type) {

    case 'LOADING_TIMEBAR':
      return Object.assign( {}, state, { timebarLoading: true } );

    case 'LOAD_TIMEBAR':
      return Object.assign( {}, state, { timeslices: action.payload.timebar, timebarLoading: false } );

    case 'SELECT_TIMESLICE':
      return Object.assign( {}, state, { selectedTimeslice: action.payload } );

    default: {
      return state;
    }
  }
}