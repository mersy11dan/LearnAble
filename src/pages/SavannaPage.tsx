import { Breadcrumbs } from "../components/Breadcrumbs";

const PAGES = [
  {
    href: "/reference/savanna/index.html",
    title: "Index of the three captures",
    detail: "The landing page the organizers shipped. It links the paced homepage, the self-paced homepage, and the concept page.",
  },
  {
    href: "/reference/savanna/pages/homepage-v1-paced.html",
    title: "Paced learner homepage",
    detail:
      "Björn Sibanda, week 10 of WR 100. The week strip, score modal, and courses dropdown still work. Other links are inert, as captured.",
  },
  {
    href: "/reference/savanna/pages/homepage-v1-self-paced.html",
    title: "Self-paced learner homepage",
    detail: "Amara Nwosu on VA-1. The module switcher and programme modal still open. The page needs no server.",
  },
  {
    href: "/reference/savanna/pages/concept-with-navigation.html",
    title: "Concept with curriculum navigation",
    detail: "The Future of the VA Industry, with read, current, and unread states in the curriculum panel.",
  },
];

export function SavannaPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Savanna" }]} />
      <h1>Savanna reference pages</h1>
      <p className="measure">
        These three pages are copied, unmodified, from the public repository alx-africa/Savanna-static-pages. They are
        frozen learner screens from Savanna, ALX’s learning platform. The repository does not include a license, so
        the pages stay attributed to that project and are not relicensed by LearnAble.
      </p>
      <p className="measure">
        LearnAble uses them as the shell a learner already knows: home, course, and concept. The accessible player is
        the piece those captures do not have. Sidebar items such as conference rooms and sandboxes are inert in the
        capture, on purpose.
      </p>
      <ul className="reference-list">
        {PAGES.map((page) => (
          <li key={page.href}>
            <a href={page.href}>{page.title}</a>
            <p>{page.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
