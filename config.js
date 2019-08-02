/**
 * API configuration object
 */
const scriptDir = __dirname;

const environments = {
  staging: {
    httpPort: process.env.PORT ? process.env.PORT : 3000,
    httpsPort: process.env.HTTPS_PORT ? process.env.HTTPS_PORT : 3001,
    httpsKeyFilePath: `${scriptDir}/https/key.pem`,
    httpsCertFilePath: `${scriptDir}/https/cert.pem`,
    envName: 'staging'
  }, 
  production: {
    httpPort: process.env.PORT ? process.env.PORT : 5000,
    httpsPort: process.env.HTTPS_PORT ? process.env.HTTPS_PORT : 5001,
    httpsKeyFilePath: `${scriptDir}/https/key.pem`,
    httpsCertFilePath: `${scriptDir}/https/cert.pem`,
    envName: 'production'
  }
}

const envProvided = process.env.NODE_ENV && environments.hasOwnProperty(process.env.NODE_ENV);
const envToExport = envProvided ? process.env.NODE_ENV : 'staging';

module.exports = environments[envToExport];
