import SearchBar from '../components/SearchBar/SearchBar';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import store from "../redux/store";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

const setup = () => render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
 
  describe('Search bar component should render', () => {
    beforeEach(setup)
    afterEach(cleanup);
 
    it('Success rendered', () => {
      const searchInput = screen.getByPlaceholderText('Search tracks here...');
      const clearSearch = screen.getByText('Clear Search');
 
      expect(searchInput).toBeInTheDocument();
      expect(clearSearch).toBeInTheDocument();
    });
 
    it('Can type in search track and button not disable', () => {
    const searchInput = screen.getByPlaceholderText('Search tracks here...');
    const clearSearch = screen.getByText('Clear Search');
 
      userEvent.type(searchInput, 'blackpink');
 
      expect(searchInput).toHaveValue('blackpink');
      expect(clearSearch).not.toBeDisabled();
    });
  }); 

