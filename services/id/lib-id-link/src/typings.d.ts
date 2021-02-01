/** * Default CSS definition for typescript, * will be overridden with file-specific definitions by rollup */
declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SvgrComponent extends React.FC<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare module '*.png';
