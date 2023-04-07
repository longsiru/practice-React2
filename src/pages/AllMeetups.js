import { useState, useEffect } from "react";
//<ul>
//{DUMMY_DATA.map((meetup) => {
//    return <li key={meetup.id}>{meetup.title}</li>;
//  })}
//</ul>
//我们已经做了meetuplist了，可以不用写上面的代码了，倒入meetuplist就可以运用了。
import MeetupList from "../components/meetups/MeetupList";

//首先添加一个常量名称，虚拟数据，然后替换它。
//{[<li>Item1</li>, <li>Item2</li>]}  可以这样. 也可以用map方法，map方法存在于javascript中,map()允许我们执行一个函数，在 li中要添加 key

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "This is a first meetup",
//     image:
//       "https://assets-global.website-files.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description:
//       "This is a first, amazing meetup which you definitely should not miss.",
//   },
//   {
//     id: "m2",
//     title: "This is a second meetup",
//     image:
//       "https://assets-global.website-files.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description:
//       "This is a second, amazing meetup which you definitely should not miss.",
//   },
// ];

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true); //命名常量为isLoading，并添加setIsLoading来担当状态更新功能，因为useState总是返回一个正好有两个元素的数组。目前我们只是在管理加载状态，并没有做正在获取世纪数据的行动。
  //此时可以向此组件调价另外一个状态，
  const [loadedMeetups, setLoadedMeetups] = useState([]); //会有很多meetup所以用空数组。用loadedMeetups替代return的DUMMY_DATA,意味着我们不需要名字叫DUMMY_DATA的虚拟数据了。
  //先不要保存，因为现在的代码会导致无限循环。问题在于state和http请求有关。state允许我们重新评估一个组件，并可以每当状态改变时在屏幕上呈现不同的内容。
  //问题是我们改变了state，一旦我们提出了请求，将更改加载和加载meetups state。然后组件将function再次执行。frtch将再次执行。这是一个循环，会破坏我们的应用程序，并通过请求向我们的api发送垃圾邮件。
  //如何防止：用useEffect()  hook, useEffect()允许在一定条件下，执行代码。可以限制我们刚刚循环问题，并定义次代码应该运行的条件。所以它并不是总是运行。
  //useEffect()有两个参数，一个是函数，另一个是数组和依赖数组，然后返回数组。  在第一个函数里面我们可以放入我们要执行的代码fetch（），
  useEffect(() => {
    //使用useEffect后，位置转移，成为useEffect的第一个参数。
    //在form获取数据之后已经传送到database了，然后在newmeetup里面传送到了allmeetup，那么现在我们需要在allmeetup页面上吧数据get到。
    setIsLoading(true);
    fetch(
      "https://practice-react-474b8-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        return response.json(); //这里是我们从json转换数据到javascript对象。但是有一个问题，json实际上也会返回一个promiss，所以我们也需要等待这个promiss解决，所以要在这里return 我们写的reponse json
      })
      .then((data) => {
        //在这里我们得到实际数据。现在有一个问题，由于fetch return了一个promiss，在这个promiss链中javascript不会在我们回到这里之前等待我们，所以我们可以使用 异步等待（async await），但是这意味着整个组件返回了一个promiss。这意味着不再符合react的条件。
        //react的component function必须是同步的，并且不能return promiass，但是必须直接返回JSX.
        //所以需要返回一些临时的代码，例如加载微调器，人后一旦得到了响应，要更新返回的jsx代码。如何更新改变屏幕上的课件的内容---用state,useState().
        //const [isLoading, setIsLoading] = useState(false);
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }
        setIsLoading(false); //设置为假，因为不再加载
        setLoadedMeetups(meetups);
      });
  }, []); //react会检查添加到数组的value，然后将value和上次执行此功能的value进行比较，如果是空的数组则没有依赖关系，然后react只会只想执行前面的函数。然后执行组件的后续执行项目，fetch将不再执行。  所以依赖项的值总是相同的。正在依赖项应该添加所有的外部值。

  //然后我们可以在这里检查是否在此处加载。
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <section>
      <h1>All Meetups</h1>
      {/* <ul>
        {DUMMY_DATA.map((meetup) => {
          return <li key={meetup.id}>{meetup.title}</li>;
        })}
      </ul> */}
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
