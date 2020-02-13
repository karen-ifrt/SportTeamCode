import React from 'react'
import { StyleSheet, Share, View, Platform, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getTeamsDetailFromApi } from '../API/FCApi'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

class TeamDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        if (params.team != undefined && Platform.OS === 'ios') {
            return {
                headerRight: <TouchableOpacity
                                style={styles.share_touchable_headerrightbutton}
                                onPress={() => params.shareTeam()}>
                                <Image
                                    style={styles.share_image}
                                    source={require('../assets/share_ios.png')}
                                />    
                                </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            teams: undefined,
            isLoading: true
        }
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareTeam: this._shareTeam,
            team: this.state.teams
        })
    }

    componentDidMount() {
        const favoriteTeamIndex = this.props.favoritesTeam.findIndex(item => item.idTeam === this.props.navigation.state.params.idTeam)
        if (favoriteTeamIndex !== -1) {
            this.setState({
                team: this.props.favoritesTeam[favoriteTeamIndex]
            }, () => { this._updateNavigationParams() })
            return
        }
        this.setState({ isLoading: true })
        getTeamsDetailFromApi(this.props.navigation.state.params.idTeam).then(data => {
            this.setState({
                teams: data.teams[0],
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })
    }

    _shareTeam() {
        const team = this.state.teams
        Share.share({ title: team.strTeam, message: team.strDescriptionEN })
    }

    _displayFloatingActionButton() {
        const team = this.state.teams
        
        if (team != undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                style={styles.share_touchable_floatingactionbutton}
                onPress={() => this._shareTeam()}>
                    <Image 
                    style={styles.share_image}
                    source={require('../assets/share.png')}
                    />
                </TouchableOpacity>
            )
        }
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.teams }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../assets/heart_empty.png')
        var shouldEnlarge = false
        if (this.props.favoritesTeam.findIndex(item => item.idTeam === this.state.teams.idTeam) !== -1) {
            sourceImage = require('../assets/heart_full.png')
            shouldEnlarge = true
        }
        return (
            <EnlargeShrink shouldEnlarge={shouldEnlarge}>
            <Image
            source={sourceImage}
            style={styles.favorite_image} />
            </EnlargeShrink>
        )
    }

    _displayTeam() {
        const team = this.state.teams

        if (team != undefined) {

            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image} source={team.strTeamBanner ? { uri: team.strTeamBanner } : require('../assets/banner-img.jpg')} />
                    <Text style={styles.name}>{team.strTeam}</Text>
                    <Text style={styles.alternate}>Sport: {team.strSport}</Text>
                    <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <View style={styles.infoleague}>
                        <Text style={styles.country}>{team.strCountry}</Text>
                        <Text style={styles.league}>League: {team.strLeague}</Text>
                    </View>
                    <Text style={styles.description}>{team.strDescriptionEN}</Text>
                    <Image style={styles.stadiumimg} source={team.strStadiumThumb ? { uri: team.strStadiumThumb } : require('../assets/stadium.jpg')} />
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
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayTeam()}
                {this._displayFloatingActionButton()}
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
        resizeMode: 'cover',
        alignSelf: "center",
        aspectRatio: 4
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
        height: 150,
        resizeMode: "cover",
        alignSelf: "center",
        aspectRatio: 3
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
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        width: null,
        height: null
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: "#e91e63",
        justifyContent: "center",
        alignItems: "center"
    },
    share_image: {
        width: 30,
        height: 30
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesTeam: state.favoritesTeam
    }
}

export default connect(mapStateToProps)(TeamDetail)