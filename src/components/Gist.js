import styled from 'styled-components';
import Octicon from 'react-octicon';
import { cleanDate } from '../utilities/formatDate';

const Gist = ({ gist }) => <>
    <Wrapper>
        <Header>
            <HeaderLeft>
                <Avatar src={gist.owner.avatar_url}></Avatar>
                <Username href={gist.owner.html_url}>{gist.owner.login}</Username>
            </HeaderLeft>
            <HeaderRight>
                <Item>
                    <Octicon name="code" style={{color:"#0077EA", paddingTop: "12px", paddingLeft: "12px", paddingBottom: "12px"}}/>
                    <ItemText href={gist.html_url}>{Object.keys(gist.files).length} Files</ItemText>
                </Item>
                <Item>
                    <Octicon name="repo-forked" style={{color:"#0077EA", paddingTop: "12px", paddingLeft: "12px", paddingBottom: "12px"}}/>
                    <ItemText href={"https://gist.github.com/" + gist.owner.login + "/" + gist.id +"/forks"}>Forks</ItemText>
                </Item>
                <Item>
                    <Octicon name="comment" style={{color:"#0077EA", paddingTop: "12px", paddingLeft: "12px", paddingBottom: "12px"}}/>
                    {
                        gist.comments === 0 ? 
                            <ItemText href={"https://gist.github.com/" + gist.owner.login + "/" + gist.id +"#comments"}>Comments</ItemText>
                            :
                            <ItemText href={"https://gist.github.com/" + gist.owner.login + "/" + gist.id +"#comments"}>{gist.comments} Comments</ItemText>
                    }
                </Item>
                <Item>
                    <Octicon name="star" style={{color:"#0077EA", paddingTop: "12px", paddingLeft: "12px", paddingBottom: "12px"}}/>
                    <ItemText href={"https://gist.github.com/" + gist.owner.login + "/" + gist.id +"/stargazers"}>Stars</ItemText>
                </Item>
            </HeaderRight>
        </Header>
        <Dates>
            Created at: {cleanDate(gist.created_at)} &nbsp;&nbsp; Last updated: {cleanDate(gist.updated_at)}
        </Dates>
        <Description>
            {gist.description}
        </Description>
        <Files>
            {
                Object.entries(gist.files).map(([key, value]) => (
                    <Item key={key}>
                        <Octicon name="file" style={{color:"#0077EA", paddingTop: "12px", paddingLeft: "12px", paddingBottom: "12px"}}/>
                        <ItemText href={value.raw_url}>{value.filename}</ItemText>
                    </Item>
                ))
            }
        </Files>
        <br/>
        <hr/>
    </Wrapper>
</>

const Wrapper = styled.div`
    width: 100%;
`;

const Username = styled.a`
    text-decoration: none;
    color: #0077EA;
    padding: 10px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Item = styled.div`
    display: flex;
`;

const ItemText = styled.a`
    color: #0077EA;
    text-decoration: none;
    padding-top: 10px;
    padding-left: 5px;
    padding-bottom: 10px;
`;

const Header = styled.div`
    display: grid;
    grid-template-areas: 
      "left right";
`;

const HeaderLeft = styled.div`
    grid-area: left;
    display: grid;
    grid-template-columns: 40px auto;
`;

const HeaderRight = styled.div`
    grid-area: right;
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: flex-end;
`;

const Dates = styled.span`
    font-size: 12px;
`;

const Description = styled.p`
    word-wrap: normal;
`;

const Files = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default Gist
