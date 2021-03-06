import { find } from 'lodash/fp';

const doctors = [
  {
    Picture: "http://68.media.tumblr.com/avatar_4789266bd94d_128.png",
    Name: "Bob Belcher",
    Title: "Restaurateur, Meat Artist",
    Description: "Dr. Bob Belcher is a third-generation restaurateur, and runs 'Bob's Burgers' with the help of his wife, Linda, and their three kids, Tina, Louise, and Gene. While poor with business management and cursed with an unlucky streak, his skills at burger cooking has been shown to be excellent, to the point where he has been referred to as a 'beef artist'.",
    Language: ["English", "Maori", "Italian"],
    MedicalInterests: ["Fighting paranormal activities", "Head and Neck Surgeon", "Comedy"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical"],
    Id: "1",
    OrganisationId: "1",
  },
  {
    Picture: "http://rs38.pbsrc.com/albums/e103/BuddhaJ/TV/Bobs%20Burgers/Series%20Stars/Linda.png~c200",
    Name: "Linda Belcher",
    Title: "Enthusiastic Support",
    Description: "Dr. Linda Belcher is happy-go-lucky, enthusiastic, funny, and friendly, and supports her husband Bob's dream through thick and thin. She has a joyful enthusiasm for whatever she undertakes, from dinner theater to synchronized swimming to road rage.",
    Language: ["English", "Maori", "Italian"],
    MedicalInterests: ["Ear, Nose and Throat Doctor", "Head and Neck Surgeon"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders", "Swimming school", "Scientific Centre for Research of Underwater Cretures", "School of woolen beanies", "Bill Murray's acting college"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical", "Steve Zissou's Underwater Adventures", "Murray's Medical"],
    Id: "2",
    OrganisationId: "2",
  },
  {
    Picture: "https://pbs.twimg.com/profile_images/827115901006647298/8pFmlaU6_200x200.jpg",
    Name: "Tina Belcher",
    Title: "Oldest Child",
    Description: "Tina Ruth Belcher is the oldest child. She is a hopeless romantic with a powerful sex drive and minimal social skills.  She likes horses, rainbows, butts, zombies, writing erotic fiction, and movies.",
    Language: ["English"],
    MedicalInterests: ["Learning everything possible", "Escaping the loop"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical"],
    Id: "3",
    OrganisationId: "3",
  },
  {
    Picture: "http://vignette3.wikia.nocookie.net/bobsburgerpedia/images/8/8d/Regular-Rudy.jpg/revision/latest?cb=20160410170923",
    Name: "Regular Sized Rudy",
    Title: "Regular Sized Child, Friend",
    Description: "Rudolph Stieblitz is a student at Wagstaff School, he is more frequently known as Regular Sized Rudy. Rudy has a number of health problems including asthma which was initially misdiagnosed as 'having a bad attitude'.",
    Language: ["Groundhog"],
    MedicalInterests: ["Meteorology", "Digging Holes"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical"],
    Id: "4",
    OrganisationId: "4",
  },
  {
    Picture: "http://pixel.nymag.com/imgs/daily/vulture/2015/12/23/23-spirits-xmas-bobs-burgers.w190.h190.2x.jpg",
    Name: "Calvin Fischoeder",
    Title: "Real Estate Mogul",
    Description: "Dr. Calvin Fischoeder, more commonly referred to as Mr. Fischoeder is Bob's wealthy and eccentric landlord. He owns Bob's Burgers and many other properties on Ocean Avenue. He also owns the Wonder Wharf amusement park, the Wonder Wharf Wonderdogs baseball team and some other shady side businesses.",
    Language: ["English"],
    MedicalInterests: ["Fighting paranormal activities", "Head and Neck Surgeon", "Comedy"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical"],
    Id: "5",
    OrganisationId: "5",
  },
  {
    Picture: "https://pbs.twimg.com/profile_images/544600779252695040/l8j-URHd_reasonably_small.jpeg",
    Name: "Gene Belcher",
    Title: "Middle Child, Budding Musician",
    Description: "Dr. Eugene 'Gene' Belcher is the middle child of Bob and Linda Belcher. He is the only boy out of the three siblings. Gene is an aspiring musician and a prankster. He maintains very close relationships with both of his parents and two sisters, Tina and Louise Belcher. Gene, along with Tina, is usually a pawn in schemes set up by Louise. He attends Wagstaff School with his siblings.",
    Language: ["English", "Maori", "Italian"],
    MedicalInterests: ["Fighting paranormal activities", "Head and Neck Surgeon", "Comedy"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical"],
    Id: "6",
    OrganisationId: "6",
  },
  {
    Picture: "https://pbs.twimg.com/profile_images/620828985165922305/wXwp6f7R_reasonably_small.jpg",
    Name: "Louise Belcher",
    Title: "Youngest Child, Schemer",
    Description: "Dr. Louise Belcher is the youngest in the family, and an antiheroine of the series. Her off-balance sense of humor and hunger for conflict makes her somewhat of a liability in the kitchen. Like her siblings, Gene and Tina, Louise goes to Wagstaff School. She is a 4th grader.",
    Language: ["English", "Italian"],
    MedicalInterests: ["Ear, Nose and Throat Doctor", "Head and Neck Surgeon"],
    Education: ["Medical School - St. George's University School of Medicine", "Saint Luke's-Roosevelt Hospital Center, Residency in Intersomething", "Children's Hospital of Wisconsin, Fellowship in Adult Congenital Disorders"],
    PracticeAffiliations: ["Mission Bay Doctors", "575 Doctors", "Bakerfield Urgent Care and Medical"],
    Id: "7",
    OrganisationId: "7",
  },
]

const getDoctor = (id) => find(({Id}) => Id === id, doctors)
export default getDoctor
