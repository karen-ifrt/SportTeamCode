import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getTeamsDetailFromApi } from '../API/FCApi'

class TeamDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teams: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getTeamsDetailFromApi(this.props.navigation.state.params.idTeam).then(data => {
            this.setState({
                teams: data.teams[0],
                isLoading: false
            })
        })
    }

    _displayTeam() {
        const team = this.state.teams

        if (team != undefined) {

            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image} source={team.strTeamBanner ? { uri: team.strTeamBanner } : require('../assets/banner-img.jpg')} />
                    <Text style={styles.name}>{team.strTeam}</Text>
                    <Text style={styles.alternate}>Sport: {team.strSport}</Text>
                    <View style={styles.infoleague}>
                        <Text style={styles.country}>{team.strCountry}</Text>
                        <Text style={styles.league}>League: {team.strLeague}</Text>
                    </View>
                    <Text style={styles.description}>{team.strDescriptionEN}</Text>
                    <Image style={styles.stadiumimg} source={{ uri: team.strStadiumThumb }} />
                    <View style={styles.infostadium}>
                        <Text style={styles.stadium}>{team.strStadium}</Text>
                        <Text style={styles.town}>{team.strStadiumLocation}</Text>
                    </View>
                    <Text style={styles.capacity}>{team.intStadiumCapacity} places</Text>
                    <View style={styles.jerseyblock}>
                        <Image style={styles.jersey} source={{ uri: team.strTeamJersey }} />
                    </View>
                </ScrollView>
            )
        }
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    render() {
        const idTeam = this.props.navigation.state.params.idTeam
        return (
            <View style={styles.main_container}>
                {this._displayTeam()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 100,
        resizeMode: 'cover'
    },
    name: {
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: 22,
        marginTop: 10,
    },
    alternate: {
        textAlign: "center",
    },
    infoleague: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginBottom: 15
    },
    league: {
        marginTop: 10,
    },
    country: {
        textTransform: "uppercase",
        marginTop: 10,
        fontWeight: "bold"
    },
    description: {
        paddingTop: 10,
        padding: 10,
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'justify'
    },
    infostadium: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        marginBottom: 5,
    },
    stadium: {
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    stadiumimg: {
        height: 100
    },
    capacity: {
        textAlign: "center",
        marginBottom: 15,
    },
    jersey: {
        height: 100,
        width: 100,
    },
    jerseyblock: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    }
})

export default TeamDetail