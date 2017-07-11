import { find } from "lodash/fp";

const contains = (string1, string2) => {
  const lowerCaseString = string1.toLowerCase();
  return lowerCaseString.includes(string2.toLowerCase());
};

const filterDoctors = (filterStr) => (doctors) => {
  if (!filterStr) return doctors;
  return doctors.filter(d => contains(d.Name, filterStr));
};

const matchAppointments = (id, appointments) =>
  find(({ PmsUserId }) => PmsUserId === id, appointments);

export {
  contains,
  filterDoctors,
  matchAppointments,
};
