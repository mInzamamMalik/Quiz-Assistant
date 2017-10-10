// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAFOf27clnj39WcgzdSVMYw_smjt_ANRrE",
    authDomain: "inzi-quiz-assistant.firebaseapp.com",
    databaseURL: "https://inzi-quiz-assistant.firebaseio.com",
    projectId: "inzi-quiz-assistant",
    storageBucket: "inzi-quiz-assistant.appspot.com",
    messagingSenderId: "190190683842"
  }
};
