import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import TeamDetail from '../Components/TeamDetail'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    TeamDetail: {
        screen: TeamDetail
    }
})

export default createAppContainer(SearchStackNavigator)