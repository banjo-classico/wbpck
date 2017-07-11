import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import moment from "moment";

import practiceAppointmentReducer from "./practiceAppointmentReducer";
import { actions } from "../actions/actions";
import { actions as filterActions, filterTypes } from "../actions/filterActions";

chai.use(dirtyChai);

describe("Testing practiceAppointment:", () => {
  const initState = practiceAppointmentReducer(undefined, { type: "init" });
  describe("seletedTime", () => {
    describe("On init", () => {
      it("should have a time set to null", () => {
        const state = practiceAppointmentReducer(undefined, { type: "init" });
        expect(state.selectedTime.time).to.equal(null);
      });
      it("should have a doctorId set to empty string", () => {
        const state = practiceAppointmentReducer(undefined, { type: "init" });
        expect(state.selectedTime.doctorId).to.equal("");
      });
    });
    describe("action selectTime: ", () => {
      it("should set the time that you have set", () => {
        const state = practiceAppointmentReducer(initState, actions.selectTime("docId", "apptId", "date"));
        expect(state.selectedTime.time).to.equals("date");
      });
      it("should set the doctorId that you have set", () => {
        const state = practiceAppointmentReducer(initState, actions.selectTime("docId", "apptId", "date"));
        expect(state.selectedTime.doctorId).to.equals("docId");
      });
      it("should set the appointmentId that you have set", () => {
        const state = practiceAppointmentReducer(initState, actions.selectTime("docId", "apptId", "date"));
        expect(state.selectedTime.appointmentId).to.equals("apptId");
      });
    });
    describe("action: clearSelection", () => {
      it("should set the time to null", () => {
        const state = practiceAppointmentReducer(initState, actions.clearSelection());
        expect(state.selectedTime.time).to.equals(null);
      });
      it("should set the doctorId to empty string", () => {
        const state = practiceAppointmentReducer(initState, actions.clearSelection());
        expect(state.selectedTime.doctorId).to.equals("");
      });
    });
  });
  describe("selectedDay", () => {
    describe("On init: ", () => {
      it("should set the selected day to today", () => {
        const state = practiceAppointmentReducer(undefined, { type: "init" });
        const m = moment().days();
        expect(moment(state.selectedDay).days()).to.equal(m);
      });
    });
    describe("selectDay", () => {
      it("should set the selected day to the one passed in", () => {
        const date = new Date();
        const state = practiceAppointmentReducer(initState, actions.selectDay("", date));
        expect(state.selectedDay).to.equals(date);
      });
    });
  });
  describe("practiceInfo", () => {
    describe("action fetchPracticeInfo", () => {
      it("should set the isFetching to true", () => {
        const state = practiceAppointmentReducer(initState, actions.fetchPracticeInfo("id"));
        expect(state.practiceInfo.isFetching).to.equal(true);
      });
      it("should reset the error to null", () => {
        const state = practiceAppointmentReducer(initState, actions.fetchPracticeInfo("id"));
        expect(state.practiceInfo.error).to.equal(null);
      });
      it("should set the Guid of the practice", () => {
        const state = practiceAppointmentReducer(initState, actions.fetchPracticeInfo("id"));
        expect(state.practiceInfo.practice.Guid).to.equal("id");
      });
      it("should set the address and the name to empty string", () => {
        const state = practiceAppointmentReducer(initState, actions.fetchPracticeInfo("id"));
        expect(state.practiceInfo.practice.Address).to.equal("");
        expect(state.practiceInfo.practice.Name).to.equal("");
      });
    });
    describe("action fetchPracticeInfoSuccess", () => {
      let practice;
      beforeEach(() => {
        practice = {
          Name: "some name",
          Address: "some address",
        };
      });
      it("should set the isFetching to false", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoSuccess(practice)
        );
        expect(state.practiceInfo.isFetching).to.equal(false);
      });
      it("should keep the Guid", () => {
        initState.practiceInfo.practice.Guid = "some guid";
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoSuccess(practice)
        );
        expect(state.practiceInfo.practice.Guid).to.equal("some guid");
      });
      it("should reset the address and name", () => {
        initState.practiceInfo.practice.Guid = "some guid";
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoSuccess(practice)
        );
        expect(state.practiceInfo.practice.Name).to.equal("some name");
        expect(state.practiceInfo.practice.Address).to.equal("some address");
      });
      it("should clear the error", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoSuccess(practice)
        );
        expect(state.practiceInfo.error).to.equal(null);
      });
    });
    describe("action fetchPracticeInfoFailure", () => {
      it("should set the isFetching to false", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoFailure("some error")
        );
        expect(state.practiceInfo.isFetching).to.equal(false);
      });
      it("should set the error to what was passed", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoFailure("some error")
        );
        expect(state.practiceInfo.error).to.equal("some error");
      });
      it("should keep the practice guid", () => {
        initState.practiceInfo.practice.Guid = "some guid";
        const state = practiceAppointmentReducer(
          initState, actions.fetchPracticeInfoFailure("some error")
        );
        expect(state.practiceInfo.practice.Guid).to.equal("some guid");
      });
    });
  });
  describe("doctorInfo", () => {
    describe("action fetchDoctorAppointments", () => {
      it("should set the isFetching flag", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointments()
        );
        expect(state.doctorInfo.isFetching).to.equal(true);
      });
      it("should clear the error", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointments()
        );
        expect(state.doctorInfo.error).to.equal(null);
      });
      it("should clear the list of doctors", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointments()
        );
        expect(state.doctorInfo.doctors).to.deep.equal([]);
      });
      it("should clear the morning, afternoon, evening appointments", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointments()
        );
        expect(state.days.first.morningAppointments).to.deep.equal([]);
        expect(state.days.first.afternoonAppointments).to.deep.equal([]);
        expect(state.days.first.eveningAppointments).to.deep.equal([]);
      })
    });
    describe("action fetchDoctorAppointmentsSuccess", () => {
      let doctors;
      beforeEach(() => {
        doctors = [{AvailableSlots: [
          {"Time": moment("2016-12-15 09:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 10:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 11:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 12:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 13:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 16:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 17:01:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 18:42:13", "YYYY-MM-DD HH:mm:ss").format()},
	       ]}];
      });
      it("should set the isFetching flag to false", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.doctorInfo.isFetching).to.equal(false);
      });
      it("should clear the error", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.doctorInfo.error).to.equal(null);
      });
      it("should set the doctor to the value provided", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.doctorInfo.doctors).to.equal(doctors);
      });
      it("should set morning appointments to times before 12pm", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointmentsSuccess(doctors, "first")
        );
        expect(state.days.first.morningAppointments[0].AvailableSlots).to.deep.equal([
          {"Time": moment("2016-12-15 09:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 10:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 11:42:13", "YYYY-MM-DD HH:mm:ss").format()}
        ])
      });
      it("should set afternoon appointments to times between 12 and 5pm", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointmentsSuccess(doctors, "first")
        );
        expect(state.days.first.afternoonAppointments[0].AvailableSlots).to.deep.equal([
          {"Time": moment("2016-12-15 12:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 13:42:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 16:42:13", "YYYY-MM-DD HH:mm:ss").format()}
        ])
      });
      it("should set evening appointments to times after 5pm", () => {
        const state = practiceAppointmentReducer(
          initState, actions.fetchDoctorAppointmentsSuccess(doctors, "first")
        );
        expect(state.days.first.eveningAppointments[0].AvailableSlots).to.deep.equal([
          {"Time": moment("2016-12-15 17:01:13", "YYYY-MM-DD HH:mm:ss").format()},
          {"Time": moment("2016-12-15 18:42:13", "YYYY-MM-DD HH:mm:ss").format()}
        ])
      });
      it("should keep the currentFilter if we have appointments at that time", () => {
        const oldState = {...initState, currentFilter: filterTypes.afternoon}
        const state = practiceAppointmentReducer(
          oldState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.currentFilter).to.equal(filterTypes.afternoon)
      })
      it("should change the currentFilter if we have no appointments at that time", () => {
        const oldState = {...initState, currentFilter: filterTypes.afternoon}
        doctors[0].AvailableSlots.splice(3, 3)
        const state = practiceAppointmentReducer(
          oldState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.currentFilter).to.equal(filterTypes.morning)
      })
      it("should change the currentFilter to the first available period with appointments", () => {
        const oldState = {...initState, currentFilter: filterTypes.afternoon}
        doctors[0].AvailableSlots.splice(0, 6)
        const state = practiceAppointmentReducer(
          oldState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.currentFilter).to.equal(filterTypes.evening)
      })
      it("should not change the currentFilter if no appointments", () => {
        const oldState = {...initState, currentFilter: filterTypes.afternoon}
        doctors[0].AvailableSlots = []
        const state = practiceAppointmentReducer(
          oldState, actions.fetchDoctorAppointmentsSuccess(doctors)
        );
        expect(state.currentFilter).to.equal(filterTypes.afternoon)
      })
    });
  });
  describe("filter", () => {
    describe("action filterMorning: ", () => {
      it("should set the currentFilter to morning", () => {
        const state = practiceAppointmentReducer(initState, filterActions.filterMorning());
        expect(state.currentFilter).to.equal(filterTypes.morning);
      });
    });
    describe("action filterAfternoon: ", () => {
      it("should set the currentFilter to afternoon", () => {
        const state = practiceAppointmentReducer(initState, filterActions.filterAfternoon());
        expect(state.currentFilter).to.equal(filterTypes.afternoon);
      });
    });
    describe("action filterEvening: ", () => {
      it("should set the currentFilter to evening", () => {
        const state = practiceAppointmentReducer(initState, filterActions.filterEvening());
        expect(state.currentFilter).to.equal(filterTypes.evening);
      });
    });
    describe("action clearFilter: ", () => {
      it("should set the currentFilter to morning", () => {
        const state = practiceAppointmentReducer(initState, filterActions.clearFilter());
        expect(state.currentFilter).to.equal(filterTypes.morning);
      });
    });
  })
});
