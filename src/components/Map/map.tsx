import { Component, RefObject, createRef } from "react";

class Map extends Component {
  canvasRef: RefObject<HTMLCanvasElement>;
  test: Array<any>;

  constructor(props: Component) {
    super(props);
    this.canvasRef = createRef<HTMLCanvasElement>();

    this.test = [];

    for (let i = 0; i < 2500; i++) {
      this.test.push({
        color: "red",
        x: (i % 50) * 10,
        y: Math.floor(i / 50) * 10,
      });
    }

    this.test[555].color = "white";
    this.test[556].color = "white";
    this.test[557].color = "white";
  }

  componentDidMount() {
    const ctx = this.canvasRef.current?.getContext("2d");
    if (ctx) {
      this.test.map((data: any) => {
        ctx.fillStyle = data.color;
        ctx.fillRect(data.x, data.y, 10, 10);
      });
    }
  }

  render() {
    return (
      <canvas
        style={{ transform: "scale(0.5)" }}
        width={500}
        height={500}
        ref={this.canvasRef}
        onClick={(event) => {
          const canvas = this.canvasRef.current;
          if (!canvas) return;

          const rect = canvas.getBoundingClientRect();
          const x = Math.floor(event.clientX - rect.left);
          const y = Math.floor(event.clientY - rect.top);
          this.test[(x + y) * 5].color = "white";

          const ctx = canvas.getContext("2d");
          if (ctx) {
            this.test.map((data: any) => {
              ctx.fillStyle = data.color;
              ctx.fillRect(data.x, data.y, 10, 10);
            });
          }
          console.log(x, y);
        }}
      />
    );
  }
}

export default Map;
