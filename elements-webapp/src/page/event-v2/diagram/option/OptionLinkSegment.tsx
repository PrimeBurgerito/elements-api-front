import OptionLinkModel from './OptionLinkModel';
import React, { useRef } from 'react';
import './option-link-segment.scss';

type Props = {
  selected: boolean,
  model: OptionLinkModel,
  path: string,
};

const OptionLinkSegment: React.FC<Props> = props => {
  const pathRef = useRef<SVGPathElement>();
  const circleRef = useRef<SVGCircleElement>();

  /*  useEffect(() => {
      setMounted(true);
      setCallback(() => {
        if (!circleRef?.current || !pathRef?.current) {
          return;
        }

        const newPercent = percent + 2;
        setPercent(newPercent > 100 ? 0 : newPercent);

        const point = pathRef.current.getPointAtLength(pathRef.current.getTotalLength() * (percent / 100.0));

        circleRef.current.setAttribute('cx', '' + point.x);
        circleRef.current.setAttribute('cy', '' + point.y);

        if (mounted) {
          requestAnimationFrame(callback);
        }
      })

      return () => {
        setMounted(false);
      }
    }, []);*/


  return (
    <>
      <path
        className={`option-link-segment${props.selected ? ' selected' : ''}`}
        ref={pathRef}
        strokeWidth={props.model.getOptions().width}
        stroke={props.selected ? props.model.getOptions().selectedColor : props.model.getOptions().color}
        d={props.path}
      />
      <circle ref={circleRef} r={10} fill="orange" />
    </>
  );
}

export default OptionLinkSegment;
