import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class TeamItem extends React.Component {
    render() {
     
        const { team, displayDetailForTeam } = this.props        

        return (
            <TouchableOpacity onPress={() => displayDetailForTeam(team.idTeam)} style={styles.main_container}>
                <Image style={styles.image} source={{uri: team.strTeamBadge}}/>
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{team.strTeam}</Text>
                        <Text style={styles.sport_text}>{team.strSport}</Text>
                        <Text style={styles.stadium_text}>{team.strStadium}</Text>
                        <Text style={styles.capacity_text}>{team.intStadiumCapacity} places</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Club fondé en {team.intFormedYear}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        marginTop: 20,
    },
    content_container: {
        flex:1,
    },
    header_container: {
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    sport_text: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    stadium_text: {
        fontStyle: 'italic',
    },
    capacity_text: {
        fontSize: 12,
    },
    date_text: {
        textAlign: 'right',
        marginRight: 20,
        marginTop: 20,
    }
   
})

export default TeamItem