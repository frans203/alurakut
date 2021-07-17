import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/mainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/components/lib/AlurakutCommons.js";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations/index.js";

function ProfileRelationsBox(properties) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul className="ulFollowers">
        {properties.items.slice(0, 9).map((item, i) => {
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
      <button className="followersBtn allBtn">Mostrar Tudo</button>
    </ProfileRelationsBoxWrapper>
  );
}
export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunities, setComunities] = React.useState([]);

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
    /*
            fetch("https://api.github.com/users/frans203/followers")
              .then((data) => {
                return data.json();
              })
              .then((data) => {
                console.log(data);
                setFollowers(data);
                return data;
              })
              .catch(function (e) {
                console.error(e);
              });
      */
    let response = await fetch(
      `https://api.github.com/users/${githubUser}/followers`
    );
    let userData = await response.json();
    setFollowers(userData);
    return userData;
  }, []);

  React.useEffect(async function () {
    //API GraphQl
    let datoCms = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "b60e8d6cdf96de01a72a8c4c506ccb",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query{
          allCommunities{
            title
            id 
            imageUrl
            creatorSlug 
            link
          }
        }`,
      }),
    });

    let { data } = await datoCms.json();
    let { allCommunities } = data;
    setComunities(allCommunities);
  }, []);

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
                const formData = new FormData(e.target);

                // comunities.push("Alura Stars");
                let community = {
                  title: formData.get("title"),
                  imageUrl: formData.get("image"),
                  creatorSlug: githubUser,
                  link: formData.get("link"),
                };

                fetch("/api/communities", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(community),
                }).then(async (response) => {
                  const data = await response.json();
                  const community = data.createdRegister;
                  const updatedCommunities = [...comunities, community];
                  setComunities(updatedCommunities);
                });

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
                <input
                  placeholder="URL da comunidade"
                  name="link"
                  tyoe="text"
                  aria-label="URL da comunidade"
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
          {}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas Comunidades ({comunities.length})
            </h2>
            <ul className="communities">
              {comunities.slice(0, 6).map((item) => {
                return (
                  <li key={item.id}>
                    <a target="_blank" href={`${item.link}`} key={item.title}>
                      <img src={item.imageUrl}></img>
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
              {favoritePeople.slice(0, 6).map((fav, i) => {
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);
  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((response) => response.json());
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
