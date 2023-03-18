import React from 'react';
import styled from 'styled-components'
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from './components/GistList';

const App = () => {
  // Use setUsername in <Header/> => <Search/> to update state of username on the fly.
  // username is then used in <GistList/> => <gistService/> to query the API for specific data.
  const [username, setUsername] = React.useState('');

  return (
    <Wrapper className="App" data-testid="app">
      <Header setUsername={setUsername}/>
      <GistList username={username}/>
      <GlobalStyles />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
