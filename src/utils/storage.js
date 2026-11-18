/* 브라우저 저장소(localStorage) 도우미
   - 시크릿 모드 등에서 저장이 막혀도 오류 없이 기본값으로 동작 */

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 저장 불가 환경 — 무시 */
  }
}

/* ---------- 최근 본 상품 (상품 id, 최신순, 최대 20개) ---------- */
const RECENT_KEY = 'headspa7-recent'

export function getRecent() {
  const list = read(RECENT_KEY, [])
  return Array.isArray(list) ? list : []
}

export function addRecent(id) {
  write(RECENT_KEY, [id, ...getRecent().filter((v) => v !== id)].slice(0, 20))
}

export function clearRecent() {
  write(RECENT_KEY, null)
}

/* ---------- 최근 검색어 (최신순, 최대 10개) ---------- */
const SEARCH_KEY = 'headspa7-searches'

export function getSearches() {
  const list = read(SEARCH_KEY, [])
  return Array.isArray(list) ? list : []
}

export function addSearch(word) {
  const w = word.trim()
  if (!w) return
  write(SEARCH_KEY, [w, ...getSearches().filter((v) => v !== w)].slice(0, 10))
}

export function removeSearch(word) {
  write(SEARCH_KEY, getSearches().filter((v) => v !== word))
}

export function clearSearches() {
  write(SEARCH_KEY, null)
}

/* ---------- 가입한 회원 목록 (연습용: 이름·이메일만, 비밀번호는 저장하지 않음) ---------- */
const MEMBERS_KEY = 'headspa7-members'

export function getMembers() {
  const list = read(MEMBERS_KEY, [])
  return Array.isArray(list) ? list : []
}

export function findMember(email) {
  return getMembers().find((m) => m.email.toLowerCase() === email.trim().toLowerCase()) ?? null
}

export function addMember(member) {
  write(MEMBERS_KEY, [...getMembers().filter((m) => m.email !== member.email), member])
}

/* ---------- 로그인한 회원 (없으면 null) ---------- */
const USER_KEY = 'headspa7-user'

export function getUser() {
  return read(USER_KEY, null)
}

export function saveUser(user) {
  write(USER_KEY, user)
}

/* 로그아웃 — 회원 목록에는 남겨 두어 다시 로그인할 수 있게 */
export function clearUser() {
  const user = getUser()
  if (user?.email && !findMember(user.email)) addMember(user)
  write(USER_KEY, null)
}
