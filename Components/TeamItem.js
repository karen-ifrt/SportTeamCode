import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FadeIn from '../Animations/FadeIn'

class TeamItem extends React.Component {


    _displayFavoriteImage() {
        if (this.props.isTeamFavorite) {
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../assets/heart_full.png')} />
            )
        }
    }

    render() {

        const { team, displayDetailForTeam } = this.props

        return (
            <FadeIn>
                <TouchableOpacity onPress={() => displayDetailForTeam(team.idTeam)} style={styles.main_container}>
                    <Image style={styles.image} source={{ uri: team.strTeamBadge }} />
                    <View style={styles.content_container}>
                        <View style={styles.date_container}>
                            {this._displayFavoriteImage()}
                        </View>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>{team.strTeam}</Text>
                            <Text style={styles.sport_text}>{team.strSport}</Text>
                            <Text style={styles.stadium_text}>{team.strStadium}</Text>
                            <Text style={styles.capacity_text}>{team.intStadiumCapacity} places</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        marginTop: 20,
    },
    content_container: {
        flex: 1,
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
    date_container: {
        position: "absolute",
        top: 10,
        right: 20
    },
    favorite_image: {
        width: 25,
        height: 25,
    }

})

export default TeamItem