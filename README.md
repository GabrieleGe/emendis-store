Page is deployed to github pages: https://gabrielege.github.io/emendis-store/

Tests info in coverage folder.

To run the code locally run command:
- `npm run`

To deploy your changes to gh pages:
Before deploying your code run:
- `ng build --configuration=production`
- `rm -rf docs/*`                     
- `cp -r dist/emendis-store/browser/* docs/`
