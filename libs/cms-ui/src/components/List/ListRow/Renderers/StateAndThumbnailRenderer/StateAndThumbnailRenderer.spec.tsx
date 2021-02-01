jest.mock('../ThumbnailRenderer/ThumbnailRenderer');
jest.mock('../StateRenderer/StateRenderer');

import { ColumnMap, Data } from 'components/List/List.model';
import { ImageLoader } from 'components/Loaders';
import { shallow } from 'enzyme';
import { asSpy } from 'helpers/testing';
import React from 'react';
import { createStateRenderer, createThumbnailRenderer } from '../index';
import { createStateAndThumbnailRenderer } from './StateAndThumbnailRenderer';

const stateMap: ColumnMap = {
  success: '#68a357',
  failure: 'red',
  warning: 'rgba(255, 165, 0, 1)',
};

interface RendererWrapperProps {
  /** Column data */
  value: unknown;
  /** Row data */
  data: Data;
  map: {};
  extras: string;
}

const defaultProps: RendererWrapperProps = {
  value: 'value',
  data: {},
  map: stateMap,
  extras: 'extras',
};

const RendererWrapper: React.FC<RendererWrapperProps> = ({
  value,
  data,
  map,
  extras,
}) => {
  return <>{createStateAndThumbnailRenderer(map, extras)(value, data)}</>;
};

describe('StateAndThumbnailRenderer', () => {
  beforeEach(() => {
    // Use the actual implementation for the mocks
    asSpy(createThumbnailRenderer).mockImplementation(
      jest.requireActual('../ThumbnailRenderer/ThumbnailRenderer')
        .createThumbnailRenderer,
    );
    asSpy(createStateRenderer).mockImplementation(
      jest.requireActual('../StateRenderer/StateRenderer').createStateRenderer,
    );
  });

  it('renders the component without crashing', () => {
    const wrapper = shallow(<RendererWrapper {...defaultProps} />);
    expect(wrapper).toBeTruthy();
  });

  it(`renders thumbnail using the 'extras' column property`, () => {
    const mockUrl = '/location/image.png';
    const mockExtras = 'thumbnail';

    const wrapper = shallow(
      <RendererWrapper
        {...defaultProps}
        data={{ [mockExtras]: mockUrl }}
        extras={mockExtras}
      />,
    );

    const imageUrl = wrapper.find(ImageLoader).prop('imgSrc');

    expect(imageUrl).toBe(mockUrl);
  });

  it('passes correct values to sub-renderers', () => {
    const ThumbnailRendererSpy = jest.fn();
    asSpy(createThumbnailRenderer).mockReturnValueOnce(ThumbnailRendererSpy);

    const StateRendererSpy = jest.fn();
    asSpy(createStateRenderer).mockReturnValueOnce(StateRendererSpy);

    const mockUrl = '/location/image.png';
    const mockExtras = 'thumbnail';

    const data = { [mockExtras]: mockUrl };

    const wrapper = shallow(
      <RendererWrapper {...defaultProps} data={data} extras={mockExtras} />,
    );

    expect(createThumbnailRenderer).toHaveBeenCalled();
    expect(ThumbnailRendererSpy).toHaveBeenCalledWith(mockUrl, data);
    expect(createStateRenderer).toHaveBeenCalledWith(stateMap);
    expect(StateRendererSpy).toHaveBeenCalledWith('value', data);
  });
});
