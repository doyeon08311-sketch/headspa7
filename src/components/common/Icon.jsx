/* 선 아이콘 모음 — <Icon name="user" size={20} />
   색은 글자색(currentColor)을 따라감 */
const PATHS = {
  logIn: (
    <>
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 16l4-4-4-4M14 12H4" />
    </>
  ),
  logOut: (
    <>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M16 16l4-4-4-4M20 12H10" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M2.5 21c0-4 3.4-7 7.5-7 1.6 0 3 .4 4.2 1.1M19 14v6M16 17h6" />
    </>
  ),
  bag: (
    <>
      <path d="M4 8h16l-1 12.2a1 1 0 0 1-1 .8H6a1 1 0 0 1-1-.8z" />
      <path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.01" />
    </>
  ),
  phone: <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  crown: <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" />,
  gift: (
    <>
      <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M3 7h18v4H3zM12 7v14" />
      <path d="M12 7c-1.5-3-5-3.5-5-1.2C7 7 9 7 12 7zM12 7c1.5-3 5-3.5 5-1.2C17 7 15 7 12 7z" />
    </>
  ),
}

function Icon({ name, size = 20, strokeWidth = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

export default Icon
