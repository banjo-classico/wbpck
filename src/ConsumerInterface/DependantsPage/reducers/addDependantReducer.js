import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isAdding: false,
  success: false,
  error: null,
  isProcessingFile: false,
  avatarSuccess: false,
  avatarError: null,
};

const addDependantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addDependant: {
      return {
        ...state,
        isAdding: true,
        success: false,
        error: null,
      };
    }
    case actionTypes.addDependantSuccess: {
      return {
        ...state,
        isAdding: false,
        success: true,
        error: null,
      };
    }
    case actionTypes.addDependantFailure: {
      return {
        ...state,
        isAdding: false,
        success: false,
        error: action.payload.error,
      };
    }
    case actionTypes.addAvatar: {
      return {
        ...state,
        isProcessingFile: true,
        avatarSuccess: false,
        avatarError: null,
      };
    }
    case actionTypes.addAvatarSuccess: {
      return {
        ...state,
        isProcessingFile: false,
        avatarSuccess: true,
        avatarError: null,
      };
    }
    case actionTypes.addAvatarFailure: {
      return {
        ...state,
        isProcessingFile: false,
        avatarSuccess: false,
        avatarError: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default addDependantReducer;
