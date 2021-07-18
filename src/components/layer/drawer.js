import { Component } from 'react';
// eslint-disable-next-line
import { Stage, Layer, Line, Text, Image } from 'react-konva';

import './drawer.css';

let history = [{ lines: [] }];
let historyStep = 0;

class Drawer extends Component {
  state = {
    tool: 'pen',
    lines: [],
    isDrawing: false,
  }
  stageRef;

  handleMouseDown = (e) => {
    this.setState({ isDrawing: true })
    const pos = e.target.getStage().getPointerPosition();
    const lines = [...this.state.lines, { tool: this.state.tool, points: [pos.x, pos.y] }];
    this.setState({ lines: lines })
  };

  handleMouseMove = (e) => {
    // no drawing - skipping
    if (!this.state.isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = this.state.lines[this.state.lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    this.state.lines.splice(this.state.lines.length - 1, 1, lastLine);
    this.setState({ lines: this.state.lines.concat() })
  };

  handleMouseUp = () => {
    this.setState({ isDrawing: false })
    history = history.slice(0, historyStep + 1);
    historyStep++;
    history.push({ lines: this.state.lines });
  };

  handleUndo = () => {
    console.log('undo')
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    this.setState({ lines: previous.lines })
  };

  handleRedo = () => {
    console.log('redo')
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    this.setState({ lines: next.lines })
  };

  render() {
    const { lines, tool } = this.state;
    return (
      <div>
        <div style={{ height: '28px', textAlign: 'right' }}>
          <select
            value={tool}
            onChange={(e) => {
              this.setState({ tool: e.target.value });
            }}
          >
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
          </select>
          <button text="undo" onClick={this.handleUndo}>undo</button>
          <button text="redo" x={40} onClick={this.handleRedo}>redo</button>
        </div>
        <Stage
          width={900}
          height={600}
          onMouseDown={this.handleMouseDown}
          onMousemove={this.handleMouseMove}
          onMouseup={this.handleMouseUp}
          ref={(stage) => { this.stageRef = stage; }}
          className='drawer'
          style={this.props.image ? {
            backgroundRepeat: 'no-repeat',
            backgroundSize: '900px 600px',
            backgroundImage: `url(${this.props.image})`,
          } : {}}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div >
    );
  }
};

export default Drawer;