import { find } from 'lodash/fp';

const organisations = [{
  Name: "Vensa Health Clinic",
  Address: "10 Marau Cres, Mission Bay, Auckland, Auckland, 1010",
  Phone: "09 321 4567",
  IsOnline: true,
  Id: "1",
  PracticeId: "1",
  MaxDays: 50,
  UrlName: "vensahealth",
},{
  Name: "Knicks Knee Club",
  Address: "58a Akoranga Dr, Northcote, Auckland, Auckland, 2345",
  Phone: "",
  IsOnline: true,
  PracticeId: "2",
  MaxDays: 10,
  UrlName: "knicksknees",
  Id: "2",
},{
  Name: "Dr Hu's Tardis",
  Address: "58a Akoranga Dr, Northcote, Auckland, Auckland, 2345",
  Phone: "",
  IsOnline: false,
  PracticeId: "3",
  MaxDays: 50,
  UrlName: "drhus",
  Id: "3",
},{
  Name: "Real House Wives of Auckland Medical Center",
  Address: "58a Akoranga Dr, Northcote, Auckland, Auckland, 2345",
  Phone: "",
  IsOnline: true,
  PracticeId: "4",
  MaxDays: 50,
  UrlName: "realhousewives",
  Id: "4",
}]

const getOrganisation = (id) => find(({UrlName}) => UrlName === id, organisations)
export default getOrganisation;
