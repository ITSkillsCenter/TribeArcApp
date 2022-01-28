/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';
// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

    AppRegistry.registerComponent(appName, () => App);



//     Navigation.registerComponent('com.myApp.WelcomeScreen', () => gestureHandlerRootHOC(App));

    Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {

                stack: {
                    children: [
                        {
                            component: {
                                name: 'com.myApp.WelcomeScreen'
                            }
                        }
                    ],
                    options:{
                        topBar: { visible: false },

                    }
                }
            }
        });
    });


