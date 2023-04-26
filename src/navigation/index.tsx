import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '~screens/HomeScreeen';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeScreen">
        <RootStack.Screen
          name="HomeScreen"
          options={{
            title: 'Search for your places',
            headerShown: false,
          }}
          component={HomeScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
