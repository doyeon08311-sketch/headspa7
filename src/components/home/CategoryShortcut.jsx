import { Link } from 'react-router-dom'
import { categoryShortcuts } from '../../data/home.js'

function CategoryShortcut() {
  return (
    <section className="home-section category-shortcut">
      <ul>
        {categoryShortcuts.map((cat) => (
          <li key={cat.key}>
            <Link to={`/category/${cat.key}`}>
              <span className="category-shortcut-img">
                <img src={cat.image} alt="" />
              </span>
              <span className="t-nav-category">{cat.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoryShortcut
