import Logo from '../../assets/robo-logo.png'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="grid header row" style={{ paddingLeft: 25 }}>
      <h3 style={{ color: '#974bb7' }}>
        <img src={Logo} alt="Page Logo" style={{ width: 40 }} />
        <a href="/" style={{ textDecoration: 'none' }}>
          <strong>Cha-Ching</strong>
        </a>
      </h3>
      <div className="grid">
        <div className="col grid align-items-end" style={{ paddingLeft: 25 }}>
          <div className="grid" style={{ paddingLeft: 50 }}>
            <a className="p-button-text" href="/billers" style={{ textDecoration: 'none' }}>
              <strong>Billers</strong>
            </a>
          </div>
          <div className="grid" style={{ paddingLeft: 50 }}>
            <a className="p-button-text" href="/bills" style={{ textDecoration: 'none' }}>
              <strong>Bills</strong>
            </a>
          </div>
          <div className="grid" style={{ paddingLeft: 50 }}>
            <a className="p-button-text" href="/pay" style={{ textDecoration: 'none' }}>
              <strong>Paychecks</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
