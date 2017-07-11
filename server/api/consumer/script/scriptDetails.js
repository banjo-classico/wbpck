import moment from "moment";
import { find } from "lodash/fp";

const scripts = [
  {
    Id: "123-456-789",
    Message: "Hi Hellen, unfortunately we cannot prescribe this medication for you at the moment as we need to see you to follow up with your tests. Please make an appointment by clicking here:.",
    PmsUserName: "Dr. Matthew Jordan",
    PmsUserId: "",
    PmsUserTitle: "General Practitioner",
    PmsUserProfilePictureUrl: "https://68.media.tumblr.com/0a9ae9e7ed267155eabc4a9b0fdc4479/tumblr_inline_ni5eyzOew51qzgik2.png",
    Pricing: {Name: "Mission Bay Doctors", Price: 1500, Note: 48, Option: 1, Fax: "093009878", Phone: "095882233", Address: "12 Tamaki Drive, Mission Bay, Auckland" },
  },
  {
    Id: "345-678-912",
    Message: "Hi Hellen, your repeat script from Mission Bay Doctors is ready to pick up at Ellerslie Family Pharmacy.",
    PmsUserName: "Dr. Matthew Jordan",
    PmsUserId: "",
    PmsUserTitle: "General Practitioner",
    PmsUserProfilePictureUrl: "https://68.media.tumblr.com/0a9ae9e7ed267155eabc4a9b0fdc4479/tumblr_inline_ni5eyzOew51qzgik2.png",
    Pricing: {Name: "Ellerslie Family Pharmacy", Price: 2000, Note: 24, Option: 0, Fax: "093456712", Phone: "095669292", Address: "365 Great South Road, One Tree Hill" },
  },
  {
    Id: "234-567-891",
    Message: "Hi Hellen, your repeat script from Mission Bay Doctors is ready to pick up at Ellerslie Family Pharmacy.",
    PmsUserName: "Dr. Matthew Jordan",
    PmsUserId: "",
    PmsUserTitle: "General Practitioner",
    PmsUserProfilePictureUrl: "https://68.media.tumblr.com/0a9ae9e7ed267155eabc4a9b0fdc4479/tumblr_inline_ni5eyzOew51qzgik2.png",
    Pricing: {Name: "Ellerslie Family Pharmacy", Price: 2000, Note: 24, Option: 0, Fax: "093456712", Phone: "095669292", Address: "365 Great South Road, One Tree Hill" },
  },
  {
    Id: "789-123-456",
    Message: "Hi Hellen, your repeat script from Mission Bay Doctors is ready to pick up at Ellerslie Family Pharmacy.",
    PmsUserName: "Dr. Matthew Jordan",
    PmsUserId: "",
    PmsUserTitle: "General Practitioner",
    PmsUserProfilePictureUrl: "https://68.media.tumblr.com/0a9ae9e7ed267155eabc4a9b0fdc4479/tumblr_inline_ni5eyzOew51qzgik2.png",
    Pricing: {Name: "Ellerslie Family Pharmacy", Price: 2000, Note: 24, Option: 0, Fax: "093456712", Phone: "095669292", Address: "365 Great South Road, One Tree Hill" },
  },
  {
    Id: "456-789-123",
    Message: "Hi Hellen, unfortunately we cannot prescribe this medication for you at the moment as we need to see you to follow up with your tests. Please make an appointment by clicking here:.",
    PmsUserName: "Dr. Matthew Jordan",
    PmsUserId: "",
    PmsUserTitle: "General Practitioner",
    PmsUserProfilePictureUrl: "https://68.media.tumblr.com/0a9ae9e7ed267155eabc4a9b0fdc4479/tumblr_inline_ni5eyzOew51qzgik2.png",
    Pricing: {Name: "Ellerslie Family Pharmacy", Price: 1500, Note: 48, Option: 0, Fax: "093456712", Phone: "095669292", Address: "365 Great South Road, One Tree Hill" },
  },
];

const getScriptDetails = (id) => find(({ Id }) => Id === id, scripts)

export default getScriptDetails;
