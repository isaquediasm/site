import Inferno from 'inferno'
import Component from 'inferno-component'
import './style.css'
import arrowIcon from './assets/down-arrow.svg'

const ButtonExpand = ({ children, onClick }) => (
  <button
    className="button button-expand"
    onClick={onClick}
  >
    <img src={arrowIcon} />
    {children}
  </button>
)

export { ButtonExpand }
