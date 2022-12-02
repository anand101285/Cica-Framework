import { ArcLayer } from 'deck.gl';

const vsDeclaration = `
attribute float instanceFrequency;
varying float vArcLength;
varying float vFrequency;`;
const vsMain = `
vArcLength = distance(source, target);
vFrequency = instanceFrequency;
`;
const fsDeclaration = `
uniform float tailLength;
uniform float timestamp;
uniform float animationSpeed;

varying float vArcLength;
varying float vFrequency;`;
const fsColorFilter = `
float tripDuration = vArcLength / animationSpeed;
float flightInterval = 1.0 / vFrequency;
float r = mod(geometry.uv.x, flightInterval);

// Head of the trip (alpha = 1.0)
float rMax = mod(fract(timestamp / tripDuration), flightInterval);
// Tail of the trip (alpha = 0.0)
float rMin = rMax - tailLength / vArcLength;
// Two consecutive trips can overlap
float alpha = (r > rMax ? 0.0 : smoothstep(rMin, rMax, r)) + smoothstep(rMin + flightInterval, rMax + flightInterval, r);
if (alpha == 0.0) {
  discard;
}
color.a *= alpha;
`;

// Our custom layer class
class AnimatedArcLayer extends ArcLayer {
  getShaders() {
    const shaders = super.getShaders();
    shaders.inject = {
      'vs:#decl': vsDeclaration,
      'vs:#main-end': vsMain,
      'fs:#decl': fsDeclaration,
      'fs:DECKGL_FILTER_COLOR': fsColorFilter
    };
    return shaders;
  }

  initializeState(params) {
    super.initializeState(params);

    this.getAttributeManager().addInstanced({
      instanceFrequency: {
        size: 1,
        accessor: 'getFrequency',
        defaultValue: 1
      }
    });
  }

  draw(opts) {
    this.state.model.setUniforms({
      tailLength: this.props.tailLength,
      animationSpeed: this.props.animationSpeed,
      timestamp: (Date.now() / 1000) % 86400
    });
    super.draw(opts);

    // By default, the needsRedraw flag is cleared at each render. We want the layer to continue
    // refreshing.
    this.setNeedsRedraw();
  }
}
AnimatedArcLayer.layerName = 'AnimatedArcLayer';
// AnimatedArcLayer.defaultProps = defaultProps;

export default AnimatedArcLayer;

// const layer = new AnimatedArcLayer({
//   id: `arc-${Date.now()}`,
//   data,
//   getTargetColor: [0, 200, 255],
//   getSourceColor: (d) => [255, 200 - d.distance / 50, 0],
//   getFrequency: (d) => d.routes,
//   animationSpeed: 3,
//   tailLength: 5
// });

// deckgl.setProps({ layers: [layer] });

// return layer;
