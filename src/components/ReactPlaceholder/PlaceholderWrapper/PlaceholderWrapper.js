import Inferno from 'inferno'
import Component from 'inferno-component'
import PlaceholderLine from '../PlaceholderLine/PlaceholderLine'
import './PlaceholderWrapper.style.css'

const PlaceholderWrapper = ({
  lines,
  height = lines.reduce((prev, curr) => { return prev + curr.height }, 0) 
}) => (
  <div className="placeholder-wrapper" style={{ height }}>
    {lines.map((props, idx) => (<PlaceholderLine key={idx} {...props} />))}
  </div>
)

export default PlaceholderWrapper
