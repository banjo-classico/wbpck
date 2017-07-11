import moment from 'moment'
import { times, reduce, compose } from 'lodash/fp';

const getAvailableTimeSlots = (numItems, date, range) => {
  return times(i => {
    return {
      [moment(date).add(i, "days")]: mandarinFunction(numItems, date)
    }
  })
  (range);
}

const mandarinFunction = (numItems, date) => {

  const randomDays = Math.floor(Math.random() * 10) + 1;
  const randomGuid = () => Math.random().toString()

  const items = compose(
    reduce((sum, next) => ({...sum, [next.Guid]: next.Time}), {}),
    times((i) => ({"Guid": randomGuid(), "Time": moment(date).add(8, "hours").add(i * 30, "minutes")}))
  )(numItems)

  const shouldReturn = !moment("2017-02-24").isSame(date, 'day')
  return shouldReturn ? items : [];
}
let data = (date, range) => [
  {
    PmsUserId: "1",
    Type: "Restaurateur, Beef Artist",
    Name: "Bob Belcher",
    ProfilePictureURL: 'http://68.media.tumblr.com/avatar_4789266bd94d_128.png',
    Description: "Dr. Bob Belcher is a third-generation restaurateur, and runs 'Bob's Burgers' with the help of his wife, Linda, and their three kids, Tina, Louise, and Gene. While poor with business management and cursed with an unlucky streak, his skills at burger cooking has been shown to be excellent, to the point where he has been referred to as a 'beef artist'.",
    AvailableSlots: {
      [moment(date)]: mandarinFunction(26, date),
      [moment(date).add(1, "days")]: mandarinFunction(26, moment(date).add(1, "days")),
      [moment(date).add(2, "days")]: mandarinFunction(26, moment(date).add(2, "days")),
      [moment(date).add(3, "days")]: mandarinFunction(26, moment(date).add(3, "days")),
      [moment(date).add(4, "days")]: mandarinFunction(26, moment(date).add(4, "days")),
    },
    NextAvailableSlot: moment().add(7,'days'),
  },{
    PmsUserId: "2",
    Type: "Enthusiastic Support",
    Name: "Linda Belcher",
    ProfilePictureURL: 'http://rs38.pbsrc.com/albums/e103/BuddhaJ/TV/Bobs%20Burgers/Series%20Stars/Linda.png~c200',
    Description: "Dr. Linda Belcher is happy-go-lucky, enthusiastic, funny, and friendly, and supports her husband Bob's dream through thick and thin. She has a joyful enthusiasm for whatever she undertakes, from dinner theater to synchronized swimming to road rage.",
    AvailableSlots: {
      [moment(date)]: mandarinFunction(26, date),
      [moment(date).add(1, "days")]: mandarinFunction(26, moment(date).add(1, "days")),
      [moment(date).add(2, "days")]: mandarinFunction(26, moment(date).add(2, "days")),
      [moment(date).add(3, "days")]: mandarinFunction(26, moment(date).add(3, "days")),
      [moment(date).add(4, "days")]: mandarinFunction(26, moment(date).add(4, "days")),
    },
    NextAvailableSlot: moment().add(7,'days'),
  },{
    PmsUserId: "3",
    Type: "Oldest Child",
    Name: "Tina Belcher",
    ProfilePictureURL: 'https://pbs.twimg.com/profile_images/827115901006647298/8pFmlaU6_200x200.jpg',
    Description: "Tina Ruth Belcher is the oldest child. She is a hopeless romantic with a powerful sex drive and minimal social skills.  She likes horses, rainbows, butts, zombies, writing erotic fiction, and movies.",
    AvailableSlots: {
      [moment(date)]: {},
      [moment(date).add(1, "days")]: {},
      [moment(date).add(2, "days")]: {},
      [moment(date).add(3, "days")]: {},
      [moment(date).add(4, "days")]: {},
    },
    NextAvailableSlot: moment().add(10,'days').add(8, "hours"),
  },{
    PmsUserId: "4",
    Type: "Regular Sized Child, Friend",
    Name: "Regular Sized Rudy",
    ProfilePictureURL: 'http://vignette3.wikia.nocookie.net/bobsburgerpedia/images/8/8d/Regular-Rudy.jpg/revision/latest?cb=20160410170923',
    Description: "Rudolph Stieblitz is a student at Wagstaff School, he is more frequently known as Regular Sized Rudy. Rudy has a number of health problems including asthma which was initially misdiagnosed as 'having a bad attitude'.",
    AvailableSlots: {
      [moment(date)]: mandarinFunction(26, date),
      [moment(date).add(1, "days")]: mandarinFunction(26, moment(date).add(1, "days")),
      [moment(date).add(2, "days")]: mandarinFunction(26, moment(date).add(2, "days")),
      [moment(date).add(3, "days")]: mandarinFunction(26, moment(date).add(3, "days")),
      [moment(date).add(4, "days")]: mandarinFunction(26, moment(date).add(4, "days")),
    },
    NextAvailableSlot: moment().add(7,'days'),
  },{
    PmsUserId: "5",
    Type: "Real Estate Mogul",
    Name: "Calvin Fischoeder",
    ProfilePictureURL: 'http://pixel.nymag.com/imgs/daily/vulture/2015/12/23/23-spirits-xmas-bobs-burgers.w190.h190.2x.jpg',
    Description: "Dr. Calvin Fischoeder, more commonly referred to as Mr. Fischoeder is Bob's wealthy and eccentric landlord. He owns Bob's Burgers and many other properties on Ocean Avenue. He also owns the Wonder Wharf amusement park, the Wonder Wharf Wonderdogs baseball team and some other shady side businesses.",
    AvailableSlots: {
      [moment(date)]: mandarinFunction(26, date),
      [moment(date).add(1, "days")]: mandarinFunction(26, moment(date).add(1, "days")),
      [moment(date).add(2, "days")]: mandarinFunction(26, moment(date).add(2, "days")),
      [moment(date).add(3, "days")]: mandarinFunction(26, moment(date).add(3, "days")),
      [moment(date).add(4, "days")]: mandarinFunction(26, moment(date).add(4, "days")),
    },
    NextAvailableSlot: moment().add(7,'days'),
  },{
    PmsUserId: "6",
    Type: "Middle Child, Budding Musician",
    Name: "Gene Belcher",
    ProfilePictureURL: 'https://pbs.twimg.com/profile_images/544600779252695040/l8j-URHd_reasonably_small.jpeg',
    Description: "Dr. Eugene 'Gene' Belcher is the middle child of Bob and Linda Belcher. He is the only boy out of the three siblings. Gene is an aspiring musician and a prankster. He maintains very close relationships with both of his parents and two sisters, Tina and Louise Belcher. Gene, along with Tina, is usually a pawn in schemes set up by Louise. He attends Wagstaff School with his siblings.",
    AvailableSlots: {
      [moment(date)]: mandarinFunction(26, date),
      [moment(date).add(1, "days")]: mandarinFunction(26, moment(date).add(1, "days")),
      [moment(date).add(2, "days")]: mandarinFunction(26, moment(date).add(2, "days")),
      [moment(date).add(3, "days")]: mandarinFunction(26, moment(date).add(3, "days")),
      [moment(date).add(4, "days")]: mandarinFunction(26, moment(date).add(4, "days")),
    },
    NextAvailableSlot: moment().add(7,'days'),
  },{
    PmsUserId: "7",
    Type: "Youngest Child, Schemer",
    Name: "Louise Belcher",
    ProfilePictureURL: 'https://pbs.twimg.com/profile_images/620828985165922305/wXwp6f7R_reasonably_small.jpg',
    Description: "Dr. Louise Belcher is the youngest in the family, and an antiheroine of the series. Her off-balance sense of humor and hunger for conflict makes her somewhat of a liability in the kitchen. Like her siblings, Gene and Tina, Louise goes to Wagstaff School. She is a 4th grader.",
    AvailableSlots: {
      [moment(date)]: mandarinFunction(26, date),
      [moment(date).add(1, "days")]: mandarinFunction(26, moment(date).add(1, "days")),
      [moment(date).add(2, "days")]: mandarinFunction(26, moment(date).add(2, "days")),
      [moment(date).add(3, "days")]: mandarinFunction(26, moment(date).add(3, "days")),
      [moment(date).add(4, "days")]: mandarinFunction(26, moment(date).add(4, "days")),
    },
    NextAvailableSlot: moment().add(7,'days'),
  }
]

export default data
