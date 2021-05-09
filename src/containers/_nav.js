export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavDropdown",
        name: "Дисциплины",
        to: "/disciplines",
        icon: "cilLayers",
        items: [
          {
            name: "Мои дисциплины",
            to: "/my-disciplines",
          },
          {
            name: "Все дисциплины",
            to: "/disciplines",
          },
        ],
      },
      {
        _name: "CSidebarNavItem",
        name: "Преподаватели",
        to: "/teachers",
        icon: "cilHappy",
      },
      {
        _name: "CSidebarNavItem",
        name: "Доступ к дисциплине",
        to: "/access-discipline",
        icon: "cilLockUnlocked",
      },
      {
        _name: "CSidebarNavItem",
        name: "Мой профиль",
        to: "/profile",
        icon: "cilInfo",
      },
      {
        _name: "CSidebarNavItem",
        name: "Скачать настольный клиент",
        href: "",
        icon: { name: "cil-cloud-download", class: "text-white" },
        _class: "bg-success text-white",
        target: "_blank",
      },
    ],
  },
];
