import CreatePlaylist from "../components/playlist/CreatePlaylist/index"
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import store from "../redux/store";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";

const setup = () => render(
    <Provider store={store}>
      <CreatePlaylist />
    </Provider>
  );
 
  describe('Form Playlist component should render', () => {
    beforeEach(setup)
    afterEach(cleanup);
 
    it('Success rendered Form Playlist', () => {
        const nameInput = screen.getByPlaceholderText('Enter title here');
        const descInput = screen.getByPlaceholderText('Enter description here');
        const submitBtn = screen.getByText('Submit');
    
        expect(nameInput).toBeInTheDocument();
        expect(descInput).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    });

    it('Can type in search track and button not disable', () => {
        const nameInput = screen.getByPlaceholderText('Enter title here');
        const descInput = screen.getByPlaceholderText('Enter description here');

        userEvent.type(nameInput, 'blackpink playlist');
        userEvent.type(descInput, 'blackpink playlist');

        expect(nameInput).toHaveValue('blackpink playlist');
        expect(descInput).toHaveValue('blackpink playlist');
    });
  }); 

