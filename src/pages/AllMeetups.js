//<ul>
//{DUMMY_DATA.map((meetup) => {
//    return <li key={meetup.id}>{meetup.title}</li>;
//  })}
//</ul>
//我们已经做了meetuplist了，可以不用写上面的代码了，倒入meetuplist就可以运用了。
import MeetupList from "../components/meetups/MeetupList";

//首先添加一个常量名称，虚拟数据，然后替换它。
//{[<li>Item1</li>, <li>Item2</li>]}  可以这样. 也可以用map方法，map方法存在于javascript中,map()允许我们执行一个函数，在 li中要添加 key

const DUMMY_DATA = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://assets-global.website-files.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss.",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://assets-global.website-files.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a second, amazing meetup which you definitely should not miss.",
  },
];

function AllMeetupsPage() {
  return (
    <section>
      <h1>All Meetups</h1>
      {/* <ul>
        {DUMMY_DATA.map((meetup) => {
          return <li key={meetup.id}>{meetup.title}</li>;
        })}
      </ul> */}
      <MeetupList meetups={DUMMY_DATA} />
    </section>
  );
}

export default AllMeetupsPage;
