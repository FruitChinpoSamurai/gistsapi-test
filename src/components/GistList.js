import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPublicGists, getGistForUser } from "../services/gistService";
import Gist from "./Gist";


const GistList = ({ username }) => {
    const [gists, setGists] = useState(null);   // Holds all the Gists received from the API.
    const [status, setStatus] = useState(null); // Holds response status.
    
    // Make API call and update relevant states using the response.
    // The two load functions could have turned into one had <gistService/> been 'optimized'.
    const loadGistList = () => {
        getPublicGists()
            .then(res => {
                setStatus(res.status);
                setGists(res.data);
            })
            .catch(err => {
                setStatus(err.status);
            });
    }

    const loadGistListByUsername = () => {
        getGistForUser(username)
            .then(res => {
                setStatus(res.status);
                setGists(res.data);
            })
            .catch(err => {
                setStatus(err.status);
            });
    }

    useEffect(() => {
        // Debouncing to further reduce the number of API calls while still being speedy.
        // Introduced a 1.5 seconds wait; an API call is only made 1.5 seconds after the user finishes typing.
        const getData = setTimeout(() => {
            // If username is an empty string, fetch 30 most recent Gists overall.
            // Otherwise, use the entered username to fetch 30 most recent Gists of the specified user.
            if (username === '') {
                loadGistList();
            } else {
                loadGistListByUsername();
            }
        }, 1500)
        return () => clearTimeout(getData)
    }, [username])

    return (
        <Wrapper>
            {   
            // If response is OK and we receive data properly from the API, render the gists.
                (status === 200 && gists !== null && gists.length !== 0) &&
                    <List>
                        <br/>
                        {
                            gists.map((gist) => (
                                <Gist key={gist.id} gist={gist}/>
                            ))
                        }
                    </List>
            }
            {
            // Since, on page load, and API call is fired, both states being null is a good check for a loading screen. 
                (status === null && gists === null) && 
                    <Fetching>
                        <p>Loading Gists...</p>
                    </Fetching>
            }
            {
            // If response is not OK but also has been updated with an error code, let the user know.
                (status !== 200 && status !== null) &&
                    <Fetching>
                        <p>Error loading Gists!</p>
                        <p>Refresh the page to retry</p>
                    </Fetching>
            }
            {
            // If the username does not exist, let the user know.
            // iirc, Github max name username length is 32 characters, could also introduce a check for that further limit redundant API calls.
                (status === 200 && Array.isArray(gists) && gists.length === 0) &&
                    <Fetching>
                        <p>Username does not exist or hasn't made any Gists</p>
                        <p>Is the spelling correct?</p>
                    </Fetching>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 50%;
`;

const Fetching = styled.div`
    text-align: center;
    justify-self: center;
    margin-top: 20%;
`;

export default GistList
