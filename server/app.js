const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")

const typeDefs = gql`
    type Plant {
        id: ID
        common_name: String
        family_common_name: String
        year: Int
        image_url: String
    }

    type Query {
        plants: [Plant]
    }
`

const resolvers = {
    Query: {
      plants: async () => {
        try {
          const plants = await axios.get("https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=teffds_KrxlJYfrs-7jXaic21UVeDdo-SlrtFfDVdn8")
          const plantData = plants && plants.data;

          return plantData.data.map(({ id, common_name, family_common_name, year, image_url }) => ({
            id,
            common_name,
            family_common_name,
            year,
            image_url,
          }))
        } catch (error) {
            console.error(error);
            throw error
        }
      },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.listen().then(({ url }) => console.log(`Your GraphQL Server is ready at ${url}`));
