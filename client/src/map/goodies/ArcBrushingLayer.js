import { ArcLayer } from 'deck.gl';

/**
 * https://github.com/uber/deck.gl/issues/2531
 */
class ArcBrushingLayer extends ArcLayer {
  // custom shader with step function to create opacity gradient with colorA and colorB
  // More at https://thebookofshaders.com/05/
  getShaders() {
    return Object.assign(super.getShaders(), {
      // inject: https://github.com/uber/luma.gl/blob/master/docs/api-reference/shadertools/assemble-shaders.md
      inject: {
        'vs:#decl': `
         uniform float coef;
        `,
        'vs:#main-end': `
        if (coef > 0.0) {
          vec4 pct = vec4(segmentRatio);
          pct.a = step(coef, segmentRatio);
          vec4 colorA = instanceSourceColors;
          vec4 colorB = vec4(instanceTargetColors.r, instanceTargetColors.g, instanceTargetColors.b, 0.0);
          vec4 color = mix(colorA, colorB, pct)/255.;
          vColor = color;
        }
         
        `,
        'fs:#main-start': `
        if (vColor.a == 0.0) discard;
        `
      }
    });
  }

  // overwrite draw fucntion
  draw(opts) {
    const { coef } = this.props;
    // add uniforms
    const uniforms = Object.assign(opts.uniforms, { coef });
    super.draw(Object.assign(opts, { uniforms }));
  }
}
ArcBrushingLayer.componentName = 'ArcBrushingLayer';

export default ArcBrushingLayer;

// new ArcLayer({
//   id: 'arc-layer',
//   data: libraries,
//   pickable: true,
//   getWidth: 6,
//   getSourcePosition: (d) => d.sourcePosition,
//   getTargetPosition: (d) => d.targetPosition,
//   getSourceColor: [255, 0, 128],
//   getTargetColor: [0, 200, 255],
//   visible: springProps.arcCoef > 1e-6,
//   coef: springProps.arcCoef
// })
// new ArcBrushingLayer({
//   id: 'arc-layer',
//   data: libraries,
//   getSourcePosition: () => [73.135, 31.4504],
//   getTargetPosition: (d) => d.coordinates,
//   getSourceColor: [0, 255, 0],
//   getTargetColor: [0, 200, 200],
//   getWidth: 6,
//   visible: springProps.arcCoef > 1e-6,
//   coef: springProps.arcCoef
// })
