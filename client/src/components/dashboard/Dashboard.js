import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    if(!this.props.auth.isAuthenticated){
      this.props.history.push('/login')
    }
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    let dashboardContent;

    // Check if logged in user has profile data
    if (profile === null) {
      dashboardContent = <h4>Please login or register</h4>;
    } else {
      //User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
