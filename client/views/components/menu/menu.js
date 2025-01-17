import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './menu.styl'

export default function Menu() {
  const location = useLocation()
  const current_path = location.pathname

  const menu_items = [
    { path: '/parcels', label: 'Data' },
    { path: '/map', label: 'Map' }
  ]

  return (
    <nav className='menu'>
      <ul className='menu__list'>
        {menu_items.map(({ path, label }) => (
          <li key={path} className='menu__item'>
            <Link
              to={path}
              className={`menu__link ${
                current_path === path ? 'menu__link--active' : ''
              }`}>
              <span className='menu__label'>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
