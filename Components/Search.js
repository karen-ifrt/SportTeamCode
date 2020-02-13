import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import TeamItem from './TeamItem'
import TeamList from './TeamList'
import { getTeamsFromApiWithSearchedText } from '../API/FCApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadTeams() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getTeamsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ 
                    teams: data.teams, 
                   isLoading: false 
                })
            })
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayDetailForTeam = (idTeam) => {
        this.props.navigation.navigate("TeamDetail", {idTeam: idTeam })
    }

    render() {
        
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._loadTeams()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="Team" />
                <Button style={{ height: 50 }} title="Search" onPress={() => this._loadTeams()} />
                <TeamList
                teams={this.state.teams}
                navigation={this.props.navigation}
                loadTeams={this._loadTeams}
                favoriteList={false}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Search