import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class TeamDetail extends React.Component {
    render() {
        const idTeam = this.props.navigation.state.params.idTeam
        return (
            <View style={styles.main_container}>
                <Text>Détail de l'équipe {idTeam}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

export default TeamDetail