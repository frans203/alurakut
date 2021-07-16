import { SiteClient } from "datocms-client";
export default async function requestReceiver(request, response) {
  if (request.method === "POST") {
    const TOKEN = "6f2d0e98558c3d98947abca2c4eaee";
    const client = new SiteClient(TOKEN);

    //validar os dados, antes de cadastrar
    const createdRegister = await client.items.create({
      itemType: "967236",
      ...request.body,
      //   title: "Test",
      //   imageUrl: "https://github.com/frans203.png",
      //   creatorSlug: "frans203",
    });
    console.log(createdRegister);
    await response.json({
      createdRegister: createdRegister,
    });
    return;
  }
  response.status(404).json({
    message: "Nada no GET",
  });
}
