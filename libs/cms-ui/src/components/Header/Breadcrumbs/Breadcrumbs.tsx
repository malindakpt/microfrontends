import { ValueOrOnDemand } from 'hooks';
import { useExpand } from 'hooks/useExpand/useExpand';
import { useValueOrOnDemand } from 'hooks/useValueOrOnDemand/useValueOrOnDemand';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../Loaders/Loader/Loader';
import { Breadcrumb } from '../Header.models';
import classes from './Breadcrumbs.scss';

interface LabelProps {
  label: ValueOrOnDemand;
}

export interface BreadcrumbProps {
  crumbs?: Breadcrumb[];
}

/**
 * HomeButton
 * @example
 * <HomeButton />
 */
const HomeButton: React.FC = () => (
  <div className={classes.homeButton}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 31">
      <g transform="translate(-124.694 -229.964)">
        <polygon
          points="155.2,245.9 140.7,233.2 134.3,239 134.3,233.9 132.6,233.9 132.6,240.3 126.5,245.9 125.2,244.4
      130.6,239.4 130.6,231.9 136.3,231.9 136.3,234.4 140.6,230.5 156.5,244.4"
        />
        <path
          d="M153.4,260.3h-9.9v-7.1h-5.7v7.1h-9.7v-13l12.6-10.8l12.7,10.8L153.4,260.3z M145.5,258.3h5.9l0-10.1
      l-10.7-9.1l-10.6,9.1v10.1h5.7v-7.1h9.7V258.3z"
        />
      </g>
    </svg>
  </div>
);

/**
 * Breadcrumb label
 * @example
 * <Label label={'Movies'} />
 * @param label ValueOrOnDemand
 */
const Label: React.FC<LabelProps> = ({ label }) => {
  const [labelValue, isLabelLoading] = useValueOrOnDemand(label);
  const { isExpanded, expand, collapse } = useExpand();
  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  // useCallback instead of useRef: https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const measuredRef = useCallback((node: HTMLParagraphElement) => {
    // only show tooltips for labels that are truncated: https://stackoverflow.com/a/10017343
    if (node !== null) {
      setIsTruncated(node.offsetWidth < node.scrollWidth);
    }
  }, []);

  return (
    <span className={classes.crumbLabel}>
      <Loader showLoader={isLabelLoading}>
        <p onMouseEnter={expand} onMouseLeave={collapse} ref={measuredRef}>
          {labelValue}
        </p>
        {isExpanded && isTruncated && (
          <span className={classes.toolTip}>{labelValue}</span>
        )}
      </Loader>
    </span>
  );
};

/**
 * Breadcrumb arrow
 * @example
 * <CrumbArrow />
 */
const CrumbArrow: React.FC = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 70"
    className={classes.crumbArrow}
  >
    <polygon className={classes.arrow} points="0,0 19.8,35 0,70 " />
    <polygon
      className={classes.arrowHead}
      points="0.5,70 0,70 19.5,35 0,0 0.5,0 20,35 19.9,35.2 "
    />
  </svg>
);

/**
 * Dropdown chevron
 * @example
 * <DropDownChevron />
 */
const DropDownChevron: React.FC = () => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 31"
    className={classes.dropDownChevron}
  >
    <path
      id="Path_8"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="square"
      d="M2.98,2.94l14.17,11.9L2.98,27.94"
    ></path>
  </svg>
);

/**
 * Displays breadcrumbs.
 * If there are more than 3 breadcrumbs, only the first, last and next-to-last are shown inline. The rest are shown in a dropdown.
 * Long breadcrumb labels are truncated and shown when highlighted.
 * @example
 * <Breadcrumbs
 *  crumbs={[{label: 'Movies', url: '/movies', params: []}]}
 * />
 */
export const Breadcrumbs: React.FC<BreadcrumbProps> = ({ crumbs = [] }) => {
  const { isExpanded, expand, collapse } = useExpand();

  return (
    <div className={classes.container}>
      <Link
        className={classes.homeLink}
        to={{
          pathname: '/',
        }}
      >
        <HomeButton />
        <CrumbArrow />
      </Link>
      {crumbs.length <= 3 ? (
        crumbs.map((crumb, idx) => (
          <Link key={`${idx}`} to={{ pathname: crumb.url }}>
            <Label label={crumb.label} />
            <CrumbArrow />
          </Link>
        ))
      ) : (
        <>
          <Link to={{ pathname: crumbs[0].url }}>
            <Label label={crumbs[0].label} />
            <CrumbArrow />
          </Link>
          <div
            className={classes.dropDownAnchor}
            onMouseEnter={expand}
            onMouseLeave={collapse}
          >
            <span className={classes.dropDownLabel}>
              <p className={classes.ellipsisLabel}>. . .</p>
              {isExpanded && (
                <div className={classes.dropDownList}>
                  {crumbs.slice(1, -2).map((crumb, idx) => (
                    <Link
                      key={idx}
                      to={{ pathname: crumb.url }}
                      className={classes.blockCrumb}
                    >
                      <Label label={crumb.label} />
                      <DropDownChevron />
                    </Link>
                  ))}
                </div>
              )}
            </span>
            <CrumbArrow />
          </div>
          <Link to={{ pathname: crumbs[crumbs.length - 2].url }}>
            <Label label={crumbs[crumbs.length - 2].label} />
            <CrumbArrow />
          </Link>
          <Link to={{ pathname: crumbs[crumbs.length - 1].url }}>
            <Label label={crumbs[crumbs.length - 1].label} />
            <CrumbArrow />
          </Link>
        </>
      )}
    </div>
  );
};
