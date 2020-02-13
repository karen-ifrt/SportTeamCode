import React from 'react'
import { StyleSheet, Text } from 'react-native'
import TeamList from './TeamList'
import { connect } from 'react-redux'

class Favorites extends React.Component {
    render() {
        return (
            <TeamList 
            teams={this.props.favoritesTeam}
            navigation={this.props.navigation}
            favoriteList={true}
            />
        )
    }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
    return {
        favoritesTeam: state.favoritesTeam
    }
}

export default connect(mapStateToProps)(Favorites)