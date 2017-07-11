import moment from "moment";

const requests = [
  {
    Id: "456-789-123",
    Status: "Denied",
    FirstName: "Hellen",
    LastName: "Smith",
    OrganisationName: "Mission Bay Doctors",
    OrganisationId: "vensahealth",
    DateTime: moment().subtract(20, "days"),
    FreeFormMedications: ["Pseudoephadrin"],
    IsRed: true,
  },
  // {
  //   Id: "234-567-891",
  //   Status: "Ready",
  //   FirstName: "Hellen",
  //   LastName: "Smith",
  //   OrganisationName: "Mission Bay Doctors",
  //   OrganisationId: "vensahealth",
  //   DateTime: moment().subtract(25, "minutes"),
  //   FreeFormMedications: ["Pantoprazole 20mg", "suffamethoxazole / trimethoprim", "panzorelacoptatrim"],
  //   IsRed: false,
  // },
  // {
  //   Id: "789-123-456",
  //   Status: "Ready",
  //   FirstName: "Hellen",
  //   LastName: "Smith",
  //   OrganisationName: "Mission Bay Doctors",
  //   OrganisationId: "vensahealth",
  //   DateTime: moment().subtract(2, "days"),
  //   FreeFormMedications: ["Pantoprazole 20mg", "suffamethoxazole / trimethoprim", "panzorelacoptatrim"],
  //   IsRed: false,
  // },
];

export default requests;
