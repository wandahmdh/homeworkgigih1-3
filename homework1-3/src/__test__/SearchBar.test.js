import SearchBar from "../components/playlist/SearchBar/index"
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import store from "../redux/store";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";

const setup = () => render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
 
  describe('Search bar component should render', () => {
    beforeEach(setup)
    afterEach(cleanup);
 
    it('Success rendered', () => {
      const searchInput = screen.getByPlaceholderText('Search here');
      const searchBtn = screen.getByText('Search');
 
      expect(searchInput).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
    });
 
    it('Can type in search track and button not disable', () => {
    const searchInput = screen.getByPlaceholderText('Search here');
    const searchBtn = screen.getByText('Search');
 
      userEvent.type(searchInput, 'blackpink');
 
      expect(searchInput).toHaveValue('blackpink');
      expect(searchBtn).not.toBeDisabled();
    });
  }); 

