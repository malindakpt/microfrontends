//TODO: for now it is only for the media service. Should be one file per project
module.exports = {
  client: {
    excludes: [
      '**/node_modules',
      '**/src/tests/**',
      '**/src/generated/**/*.{ts,tsx,js,jsx,graphql,gql}',
    ],
    service: {
      name: 'client',
      localSchemaFile: 'services/media/service/src/generated/schema.graphql',
    },
  },
};
