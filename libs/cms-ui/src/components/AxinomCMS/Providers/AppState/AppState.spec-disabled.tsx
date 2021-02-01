// import { mount, shallow } from 'enzyme';
// import React from 'react';
// import { AppStateProvider, useAppState } from './AppState';
// import { AuthProps } from 'components/Header/Auth/Auth';

// const newMockUserName: AuthProps = { userName: 'Changed User' };

// const TestComponent: React.FC = () => {
//   const state = useAppState();

//   return (
//     <div>
//       <span data-testid="value">{state.user.userName}</span>
//       <button
//         onClick={() => {
//           state.updateAppState({
//             user: newMockUserName,
//           });
//         }}
//       ></button>
//     </div>
//   );
// };

// describe('AppContext', () => {
//   it('renders component without crashing', () => {
//     const wrapper = shallow(<AppStateProvider />);

//     expect(wrapper).toBeTruthy();
//   });

//   it('renders the new state when any part of the state is updated', () => {
//     const wrapper = mount(
//       <AppStateProvider>
//         <TestComponent />
//       </AppStateProvider>,
//     );

//     const defaultUserName = wrapper.find('span').text();
//     expect(defaultUserName).toEqual('🧒 Axinom User');

//     wrapper.find('button').simulate('click');

//     const updatedUserName = wrapper.find('span').text();
//     expect(updatedUserName).toEqual(newMockUserName.userName);
//   });
// });
