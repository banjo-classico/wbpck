import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import ProtectedComponent from "../protectedComponent";

const mapStateToProps = (state) => ({
  predicate: state.loginReducer.token !== null,
});
const mapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(push, dispatch)("login"),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedComponent);
