import FormPlaylist from '../components/FormPlaylist/FormPlaylist';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import store from "../redux/store";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';


const setup = () => render(
    <Provider store={store}>
      <FormPlaylist />
    </Provider>
  );
 
  describe('Form Playlist component should render', () => {
    beforeEach(setup)
    afterEach(cleanup);
 
    it('Success rendered Form Playlist', () => {
        const nameInput = screen.getByPlaceholderText('Playlist name');
        const descInput = screen.getByPlaceholderText('Description');
        const submitBtn = screen.getByText('Submit');
    
        expect(nameInput).toBeInTheDocument();
        expect(descInput).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    });

    it('Can type in search track and button not disable', () => {
        const nameInput = screen.getByPlaceholderText('Playlist name');
        const descInput = screen.getByPlaceholderText('Description');

        userEvent.type(nameInput, 'blackpink playlist');
        userEvent.type(descInput, 'blackpink playlist');

        expect(nameInput).toHaveValue('blackpink playlist');
        expect(descInput).toHaveValue('blackpink playlist');
    });
  }); 

