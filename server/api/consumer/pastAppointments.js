import moment from "moment";

let appointments = [{
  PracticeName: "Mission Bay Doctors",
  Address: "10 Marau Cres, Mission Bay, Auckland, Auckland 1345, New Zealand",
  ProviderName: "Dr Tina Belcher sadfgdsfg dfsgsdfgsdfgf",
  ProviderTitle: "Oldest Child",
  ProviderPictureUrl: 'https://pbs.twimg.com/profile_images/827115901006647298/8pFmlaU6_200x200.jpg',
  Time: new Date().toISOString(),
  CalendarUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg',
  GoogleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment%20%40%20Beehive%20Medical%20Center&dates=20170228T193000Z/20170228T194500Z&details=&location=Molesworth%20St&pli=1&sf=true&output=xml",
  DependantId: "1234-5678-1234-5678",
  Id: "1",
  SessionId: "123-456",
  FirstName: "Walt Jr",
  LastName: "White",
  Note: "Walt Jr was feeling a little headache yesterday after playing rugby.",
  Status: "CONFIRMED",
},{
  PracticeName: "Te Incredibly long name for a health clinic Health Clinic",
  Address: "58a Akoranga Dr, Northcote",
  ProviderName: "Dr Tina Belcher",
  ProviderTitle: "Oldest Child",
  ProviderPictureUrl: 'https://pbs.twimg.com/profile_images/827115901006647298/8pFmlaU6_200x200.jpg',
  Time: new Date().toISOString(),
  CalendarUrl: 'http://vignette2.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest?cb=20121110131754',
  GoogleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment%20%40%20Beehive%20Medical%20Center&dates=20170228T193000Z/20170228T194500Z&details=&location=Molesworth%20St&pli=1&sf=true&output=xml",
  DependantId: null,
  Id: "2",
  SessionId: "123-456",
  FirstName: "Walter",
  LastName: "White",
  Note: "I've had a mirgraine for the last 2 days.",
  Status: "CONFIRMED",
},
{
  PracticeName: "Te Puna Hauora",
  Address: "58a Akoranga Dr, Northcote",
  ProviderName: "Dr Darth Vader",
  ProviderTitle: "Sith Lord",
  ProviderPictureUrl: 'http://vignette2.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest?cb=20121110131754',
  Time: new Date().toISOString(),
  CalendarUrl: 'http://vignette2.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest?cb=20121110131754',
  GoogleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment%20%40%20Beehive%20Medical%20Center&dates=20170228T193000Z/20170228T194500Z&details=&location=Molesworth%20St&pli=1&sf=true&output=xml",
  DependantId: null,
  Id: "3",
  SessionId: "123-456",
  FirstName: "Walter",
  LastName: "White",
  Note: "I need some blood tests for a trip overseas",
  Status: "CONFIRMED",
}];

// appointments = [];

const getAppointments = () => appointments
export default getAppointments;
