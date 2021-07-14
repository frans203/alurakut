import React from "react";
import styled from "styled-components";
import MainGrid from "../src/components/mainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/components/lib/AlurakutCommons.js";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations/index.js";
function ProfileRelationsBox(properties) {
  console.log(properties);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul>
        {properties.items.map((item) => {
          return (
            <li key={item.id}>
              <a target="_blank" href={`${item.html_url}`} key={item}>
                <img src={`${item.avatar_url}.png`}></img>
                <span>{item.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <button className="comunityBtn allBtn">Mostrar Tudo</button>
    </ProfileRelationsBoxWrapper>
  );
}
export default function Home() {
  const githubUser = "frans203";
  const [comunities, setComunities] = React.useState([
    {
      id: "22222",
      title: "eu odeio acordar cedo",
      image:
        "https://cliparting.com/wp-content/uploads/2016/05/Garfield-the-cat-clipart.jpg",
    },
  ]);
  console.log("COMUNITIES", comunities);

  const favoritePeople = [
    "user1",
    "user2",
    "user4",
    "user5",
    "user7",
    "user8",
    "user10",
  ];
  function ProfileSideBar(pro) {
    return (
      <Box as="aside">
        <img
          style={{ borderRadius: "8px" }}
          src={`https://github.com/${pro.githubUser}.png`}
        ></img>
        <hr />

        <a className="boxLink" href={`https://github.com/${pro.githubUser}`}>
          @{pro.githubUser}
        </a>
        <hr />
        <AlurakutProfileSidebarMenuDefault
          githubUser={githubUser}
        ></AlurakutProfileSidebarMenuDefault>
      </Box>
    );
  }
  //0 - pegar o array de dados do github
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(async function () {
    // fetch("https://api.github.com/users/frans203/followers")
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setFollowers(data);
    //     return data;
    //   })
    //   .catch(function (e) {
    //     console.error(e);
    //   });

    let response = await fetch(
      "https://api.github.com/users/frans203/followers"
    );
    let userData = await response.json();
    setFollowers(userData);
    return userData;
  }, []);
  console.log("seguidores" + followers);
  //1-criar um box que vai ter um map baseado nos item do array que pegamos do github

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>

          <Box>
            <h2 className="Subtitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCrateComunity(e) {
                e.preventDefault();
                console.log(e);
                const formData = new FormData(e.target);
                console.log("Input:", formData.get("title"));
                console.log("Input:", formData.get("image"));

                // comunities.push("Alura Stars");
                const comunity = {
                  id: new Date().toISOString,
                  title: formData.get("title"),
                  image: formData.get("image"),
                };
                if (comunities.length < 6) {
                  const updatedComunities = [...comunities, comunity];
                  setComunities(updatedComunities);
                } else if (comunities.length >= 6) {
                  document.querySelector(".allBtn").style.display = "block";
                  return;
                }

                const inputs = document.querySelectorAll(".form-1-input");
                inputs.forEach((el) => {
                  el.value = "";
                });
              }}
            >
              <div>
                <input
                  placeholder="Nome da sua comunidade"
                  name="title"
                  aria-label="Nome da sua comunidade"
                  type="text"
                  className="form-1-text form-1-input"
                />
              </div>

              <div>
                <input
                  placeholder="URL Da imagem"
                  name="image"
                  aria-label="URL Da imagem"
                  className="form-1-image form-1-input"
                />
              </div>

              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas Comunidades ({comunities.length})
            </h2>
            <ul>
              {comunities.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`} key={item.title}>
                      <img src={item.image}></img>
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <button className="comunityBtn allBtn">Mostrar Tudo</button>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((fav, i) => {
                if (i > 6) {
                  return;
                }
                const listItem = (fav) => {
                  return (
                    <li key={fav}>
                      <a href={`/users/${fav}`} key={fav}>
                        <img src={`https://github.com/${fav}.png`}></img>
                        <span>{fav}</span>
                      </a>
                    </li>
                  );
                };

                return listItem(fav);
              })}
            </ul>
            <button className="peopleBtn allBtn">Mostrar Tudo</button>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
