import styled from "styled-components";
import MainGrid from "../src/components/mainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/components/lib/AlurakutCommons.js";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations/index.js";

function ProfileSideBar(pro) {
  return (
    <Box>
      <img
        className="profileImg"
        src={`https://github.com/${pro.githubUser}.png`}
      ></img>
    </Box>
  );
}

export default function Home() {
  const githubUser = "frans203";
  const favoritePeople = ["user1", "user2", "user4", "user5", "user7", "user8"];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((fav) => {
                return (
                  <li key={fav}>
                    <a href={`/users/${fav}`} key={fav}>
                      <img src={`https://github.com/${fav}.png`}></img>
                      <span>{fav}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
