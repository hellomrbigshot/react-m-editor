```
cd react-m-editor
yarn link
yarn install
cd node_modules/react
yarn link
cd ../react-dom
yarn link

cd example
yarn link react-m-editor react react-dom
yarn start
```
[issue](https://github.com/facebook/react/issues/14257)
