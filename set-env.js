const fs = require('fs');

const envProdFilePath = './src/environments/environment.prod.ts';

const envFileContent = `
export const environment = {
  production: true,
  tmdbApiKey: '${process.env.NG_APP_TMDB_API_KEY}'
};
`;

fs.writeFileSync(envProdFilePath, envFileContent);