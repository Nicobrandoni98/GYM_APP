import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "@counter/incremented":
      return state + 1;
    case "@counter/decremented":
      return state - 1;
    case "@counter/reseted":
      return 0;
  }
};

const store = createStore(counterReducer);

const actionIncremented = {
  type: "@counter/incremented",
};

const actionDecremented = {
  type: "@counter/decremented",
};

const actionReset = {
  type: "@counter/reseted",
};

store.dispatch(actionIncremented)
store.getState()