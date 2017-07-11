import moment from "moment";
import { actionTypes } from "../actions/actions";
// import { toCorrectFormat } from "../../../libs/Dates";

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  dateOfBirth: "",
  mobile: "",
  email: "",
  avatar: "",
  isFetching: false,
  success: false,
  error: null,
  isProcessingFile: false,
  avatarSuccess: false,
  avatarError: null,
};

const editProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.initEditProfile: {
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        dateOfBirth: moment(action.payload.dateOfBirth).format("DD-MM-YYYY"),
        mobile: action.payload.mobile,
        email: action.payload.email,
        avatar: action.payload.avatar,
        isFetching: false,
        error: null,
        success: false,
      };
    }
    case actionTypes.clearEditProfile: {
      return INITIAL_STATE;
    }
    case actionTypes.changeProfile: {
      return {
        ...state,
        isFetching: true,
        success: false,
        error: null,
      };
    }
    case actionTypes.changeProfileSuccess: {
      return {
        ...state,
        isFetching: false,
        success: true,
        error: null,
      };
    }
    case actionTypes.changeProfileFailure: {
      return {
        ...state,
        isFetching: false,
        success: false,
        error: action.payload.err,
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
        avatarError: action.payload.err,
      };
    }
    case actionTypes.setFirstName: {
      return {
        ...state,
        firstname: action.payload.name,
        success: false,
      };
    }
    case actionTypes.setLastName: {
      return {
        ...state,
        success: false,
        lastname: action.payload.name,
      };
    }
    case actionTypes.setDateOfBirth: {
      return {
        ...state,
        success: false,
        dateOfBirth: action.payload.date,
      };
    }
    case actionTypes.setMobile: {
      return {
        ...state,
        success: false,
        mobile: action.payload.mobile,
      };
    }
    default: {
      return state;
    }
  }
};

export default editProfileReducer;
