import { find } from "lodash/fp"

const allPractices = [
  {
    "Id": "1",
    "UrlName": "vensahealth",
    "Doctors": [
      {
        "Name": "Dr Oz",
        "Id": "10",
      },
      {
        "Name": "Dr Phil",
        "Id": "11",
      },
      {
        "Name": "Dr Oprah",
        "Id": "12",
      },
      {
        "Name": "Dr Ellen",
        "Id": "13",
      },
    ]
  },
  {
    "Id": "2",
    "UrlName": "knicksknees",
    "Doctors": [
      {
        "Name": "Dr Michelangelo",
        "Id": "14",
      },
      {
        "Name": "Dr Leonardo",
        "Id": "15",
      },
      {
        "Name": "Dr Rafael",
        "Id": "16",
      },
      {
        "Name": "Dr Donatello",
        "Id": "17",
      },
    ]
  },
  {
    "Id": "3",
    "UrlName": "drhus",
    "Doctors": [
      {
        "Name": "Dr Oz",
        "Id": "10",
      },
      {
        "Name": "Dr Phil",
        "Id": "11",
      },
      {
        "Name": "Dr Oprah",
        "Id": "12",
      },
      {
        "Name": "Dr Ellen",
        "Id": "13",
      },
    ]
  },
  {
    "Id": "4",
    "UrlName": "realhousewives",
    "Doctors": [
      {
        "Name": "Dr Michelangelo",
        "Id": "14",
      },
      {
        "Name": "Dr Leonardo",
        "Id": "15",
      },
      {
        "Name": "Dr Rafael",
        "Id": "16",
      },
      {
        "Name": "Dr Donatello",
        "Id": "17",
      },
    ]
  },
  {
    "Id": "5",
    "UrlName": "shanebondssportsinjuries",
    "Doctors": [
      {
        "Name": "Dr Oz",
        "Id": "10",
      },
      {
        "Name": "Dr Phil",
        "Id": "11",
      },
      {
        "Name": "Dr Oprah",
        "Id": "12",
      },
      {
        "Name": "Dr Ellen",
        "Id": "13",
      },
    ]
  },
  {
    "Id": "6",
    "UrlName": "chris-martin-batting-school",
    "Doctors": [
      {
        "Name": "Dr Michelangelo",
        "Id": "14",
      },
      {
        "Name": "Dr Leonardo",
        "Id": "15",
      },
      {
        "Name": "Dr Rafael",
        "Id": "16",
      },
      {
        "Name": "Dr Donatello",
        "Id": "17",
      },
    ]
  },
  {
    "Id": "7",
    "UrlName": "aggies-emergency",
    "Doctors": [
      {
        "Name": "Dr Oz",
        "Id": "10",
      },
      {
        "Name": "Dr Phil",
        "Id": "11",
      },
      {
        "Name": "Dr Oprah",
        "Id": "12",
      },
      {
        "Name": "Dr Ellen",
        "Id": "13",
      },
    ]
  },
  {
    "Id": "8",
    "UrlName": "dinos-dental",
    "Doctors": [
      {
        "Name": "Dr Michelangelo",
        "Id": "14",
      },
      {
        "Name": "Dr Leonardo",
        "Id": "15",
      },
      {
        "Name": "Dr Rafael",
        "Id": "16",
      },
      {
        "Name": "Dr Donatello",
        "Id": "17",
      },
    ]
  },
  {
    "Id": "9",
    "UrlName": "fix-it-now",
    "Doctors": [
      {
        "Name": "Dr Oz",
        "Id": "10",
      },
      {
        "Name": "Dr Phil",
        "Id": "11",
      },
      {
        "Name": "Dr Oprah",
        "Id": "12",
      },
      {
        "Name": "Dr Ellen",
        "Id": "13",
      },
    ]
  },
  {
    "Id": "10",
    "UrlName": "ima-eat-your-ear",
    "Doctors": [
      {
        "Name": "Dr Michelangelo",
        "Id": "14",
      },
      {
        "Name": "Dr Leonardo",
        "Id": "15",
      },
      {
        "Name": "Dr Rafael",
        "Id": "16",
      },
      {
        "Name": "Dr Donatello",
        "Id": "17",
      },
    ]
  },
];

const getDoctors = (id) => find(({Id, UrlName}) => (id === Id) || (UrlName === id), allPractices).Doctors

export default getDoctors;
