import Inferno from 'inferno'
import Component from 'inferno-component'

class PlaceholderLine extends Component {
  invertIntervals(intervals = []) {
    const transformer = intervals.reduce(({ intervals, currentOffset }, [beginning, end]) => {
      return {
        intervals: currentOffset !== beginning ? [...intervals, [currentOffset, beginning]] : intervals,
        currentOffset: end,
      };
    }, { intervals: [], currentOffset: 0 });

    return transformer.currentOffset !== 100
      ? [...transformer.intervals, [transformer.currentOffset, 100]]
      : transformer.intervals;
  }

  renderIntervals(intervals) {
    return intervals.map(([beginning, end], idx) => {
      const style = {
        left: `${beginning}%`,
        width: `${end - beginning}%`,
      };
      return <div key={idx} className="placeholder-offset" style={style}></div>;
    });
  }

  render() {
    const { height, intervals } = this.props;
    return (
        <div className="placeholder-line" style={{ height }}>
            {this.renderIntervals(this.invertIntervals(intervals))}
        </div>
    );
  }
}

export default PlaceholderLine
