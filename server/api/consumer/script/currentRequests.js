import moment from "moment";

const requests = [
  {
    Id: "123-456-789",
    Status: "Denied",
    FirstName: "Hellen",
    LastName: "Smith",
    OrganisationName: "Mission Bay Doctors",
    OrganisationId: "vensahealth",
    DateTime: moment().subtract(5, "days"),
    FreeFormMedications: ["Paracetamol"],
    IsRed: true,
  },
  {
    Id: "345-678-912",
    Status: "Requested",
    FirstName: "Hellen",
    LastName: "Smith",
    OrganisationName: "Mission Bay Doctors",
    OrganisationId: "vensahealth",
    DateTime: moment().subtract(25, "minutes"),
    FreeFormMedications: ["Pantoprazole 20mg", "suffamethoxazole / trimethoprim", "panzorelacoptatrim"],
    IsRed: false,
  },
];

export default requests;
