import { StyleSheet } from 'react-native'
import TabBarIcon from '../components/TabBarIcon'
import CameraButton from '../components/CameraButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CheckinStack from './stacks/CheckinStack'
import StockStack from './stacks/StockStack'
import DeliveryStack from './stacks/DeliveryStack'
import ArchiveStack from './stacks/ArchiveStack'
import CameraModal from '../screens/CameraModal'

const Tab = createBottomTabNavigator()

const TabNavigator = ({onPressCameraButton}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:styles.tabBar
      }}>
      <Tab.Screen
        name='HomeStack'
        component={CheckinStack}
        options={{
          tabBarIcon:({focused}) => {
            return <TabBarIcon focused={focused} icon="home"/>
          }
        }}
      />
      <Tab.Screen
        name='StockStack'
        component={StockStack}
        options={{
          tabBarIcon:({focused}) => {
            return <TabBarIcon focused={focused} icon="playlist-add-check"/>
          }
        }}
      />
      <Tab.Screen
        name='Camera'
        component={CameraModal}
        options={{
          tabBarIcon:({focused}) => {
              return <CameraButton onPressCameraButton={onPressCameraButton}/>
          }
        }}
      />
        
      <Tab.Screen
        name='DeliveryStack'
        component={DeliveryStack}
        options={{
          tabBarIcon:({focused}) => {
            return <TabBarIcon focused={focused} icon="delivery-dining"/>
          }
        }}
      />
      <Tab.Screen
        name='ArchiveStack'
        component={ArchiveStack}
        options={{
          tabBarIcon:({focused}) => {
            return <TabBarIcon focused={focused} icon="archive"/>
          }
        }}
      />
    </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar:{
      backgroundColor:"white",
      height:110
    }
})